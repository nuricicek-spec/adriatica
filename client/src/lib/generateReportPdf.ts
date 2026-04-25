import html2pdf from "html2pdf.js";

// ============================
// HATA SINIFLANDIRMASI
// ============================
export class PdfError extends Error {
  code:
    | "LOGO_FETCH"
    | "RENDER_MEMORY"
    | "RENDER_ABORTED"
    | "RENDER_CONCURRENT"
    | "RENDER_UNKNOWN";

  constructor(message: string, code: PdfError["code"]) {
    super(message);
    this.name = "PdfError";
    this.code = code;
  }
}

// ============================
// TİPLER
// ============================
type ReportInput = {
  label: string;
  value: string | number | boolean;
};

type ReportOptions = {
  headerTitle?: string;
  toolName?: string;
  signal?: AbortSignal; // İptal sinyali
};

// ============================
// EŞZAMANLI İŞLEM KİLİDİ
// ============================
let activeRender = false;

// ============================
// LOGO CACHE (tekrar deneme + geri çekilme)
// ============================
let cachedLogo: string | null = null;

const getLogoBase64 = async (signal?: AbortSignal): Promise<string> => {
  if (cachedLogo) return cachedLogo;

  const fetchOnce = async () => {
    const res = await fetch("/logo.png", { cache: "no-store", signal });
    if (!res.ok) throw new Error("Logo fetch failed");

    const blob = await res.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () =>
        reject(new PdfError("FileReader error", "RENDER_UNKNOWN"));
      reader.readAsDataURL(blob);
    });
  };

  for (let i = 0; i < 2; i++) {
    try {
      cachedLogo = await fetchOnce();
      return cachedLogo;
    } catch {
      if (i === 1)
        throw new PdfError("Logo fetch failed after retry", "LOGO_FETCH");
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }

  throw new PdfError("Logo fetch failure", "LOGO_FETCH");
};

// ============================
// ANA PDF OLUŞTURMA
// ============================
export async function generateReportPdf(
  pdfRef: React.RefObject<HTMLDivElement | null>,
  filename: string,
  inputs: ReportInput[],
  options?: ReportOptions
): Promise<void> {
  // Aynı anda sadece bir PDF oluşturulmasına izin ver
  if (activeRender) {
    throw new PdfError(
      "Another PDF is already being generated",
      "RENDER_CONCURRENT"
    );
  }

  activeRender = true;
  const signal = options?.signal;

  // İptal kontrolü
  const checkAbort = () => {
    if (signal?.aborted) {
      throw new PdfError("PDF generation aborted", "RENDER_ABORTED");
    }
  };

  try {
    checkAbort();

    if (!pdfRef.current) {
      throw new PdfError("PDF reference not found", "RENDER_UNKNOWN");
    }

    const headerTitle =
      options?.headerTitle || "PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.";
    const toolName = options?.toolName || "";

    // ============================
    // 1. KLONLAMA VE GİZLEME
    // ============================
    const element = pdfRef.current.cloneNode(true) as HTMLElement;
    element.classList.add("pdf-mode");

    Object.assign(element.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "800px",
      opacity: "0.01",
      pointerEvents: "none",
      zIndex: "0",
    });

    // ============================
    // 2. FORM ALANLARINI SENKRONİZE ET
    // ============================
    element.querySelectorAll("input, select, textarea").forEach((el: any) => {
      if (el.tagName === "SELECT") {
        el.querySelectorAll("option").forEach((opt: any) => {
          if (opt.value === el.value)
            opt.setAttribute("selected", "selected");
        });
      } else if (el.type === "checkbox" || el.type === "radio") {
        el.checked
          ? el.setAttribute("checked", "checked")
          : el.removeAttribute("checked");
      } else if (el.tagName === "TEXTAREA") {
        el.textContent = el.value;
      } else {
        el.setAttribute("value", el.value);
      }
    });

    document.body.appendChild(element);
    checkAbort();

    // ============================
    // 3. GİRDİ ÖZETİ (DOM API)
    // ============================
    const summary = document.createElement("div");
    summary.style.cssText =
      "margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #ddd;font-size:11px;";

    const headerRow = document.createElement("div");
    headerRow.style.cssText =
      "display:flex;justify-content:space-between;margin-bottom:8px;font-weight:bold;";

    const titleEl = document.createElement("span");
    titleEl.textContent = "VESSEL INPUT SUMMARY";

    const ts =
      new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

    const metaEl = document.createElement("span");
    metaEl.style.fontWeight = "normal";
    metaEl.textContent = toolName
      ? `Generated: ${ts} | ${toolName}`
      : `Generated: ${ts}`;

    headerRow.appendChild(titleEl);
    headerRow.appendChild(metaEl);
    summary.appendChild(headerRow);

    inputs.forEach((input) => {
      if (input.value === "" || input.value === undefined) return;

      const row = document.createElement("div");
      row.style.display = "flex";

      const left = document.createElement("div");
      left.style.width = "40%";
      left.style.color = "#666";
      left.textContent = String(input.label);

      const right = document.createElement("div");
      right.style.fontWeight = "bold";
      right.textContent = String(input.value);

      row.appendChild(left);
      row.appendChild(right);
      summary.appendChild(row);
    });

    element.prepend(summary);

    // ============================
    // 4. YAZI TİPİ VE BOYAMA HAZIRLIĞI
    // ============================
    if (document.fonts?.ready) {
      try {
        await document.fonts.ready;
      } catch {}
    }

    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 30));
    checkAbort();

    // ============================
    // 5. RESİM YÜKLEME (zaman aşımı + temizlik)
    // ============================
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return;

        return new Promise<void>((resolve) => {
          let done = false;

          const finalize = () => {
            if (done) return;
            done = true;
            img.onload = null;
            img.onerror = null;
            resolve();
          };

          const timeout = setTimeout(finalize, 5000);

          img.onload = () => {
            clearTimeout(timeout);
            finalize();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            finalize();
          };
        });
      })
    );

    // ============================
    // 6. LOGO (hata olsa da devam)
    // ============================
    let logoBase64: string | null = null;
    try {
      logoBase64 = await getLogoBase64(signal);
    } catch {
      console.warn("Logo yüklenemedi, rapor logosuz devam edecek.");
    }

    checkAbort();

    // ============================
    // 7. BELLEK VE BOYUT KONTROLÜ
    // ============================
    const contentHeight = element.scrollHeight;
    const contentWidth = element.offsetWidth;
    const dpr = window.devicePixelRatio || 1;

    // Kademeli ölçeklendirme
    let scale = 2;
    if (contentHeight > 12000) scale = 1.1;
    else if (contentHeight > 9000) scale = 1.3;
    else if (contentHeight > 6000) scale = 1.6;

    const maxCanvasDim = 32767;
    if (
      contentHeight * scale * dpr > maxCanvasDim ||
      contentWidth * scale * dpr > maxCanvasDim
    ) {
      throw new PdfError(
        "Canvas dimension limit exceeded",
        "RENDER_MEMORY"
      );
    }

    const totalPixels =
      contentWidth * contentHeight * scale * scale * dpr * dpr;

    if (totalPixels > 20_000_000) {
      // Çökmek yerine ölçeği düşür
      scale = 1;
    }

    // ============================
    // 8. PDF AYARLARI VE ÜRETİM
    // ============================
    const worker = html2pdf()
      .set({
        margin: [40, 20, 45, 20],
        image: { type: "jpeg", quality: 0.9 },
        html2canvas: {
          scale,
          useCORS: true,
          allowTaint: false,
          onclone: (clonedDoc: Document) => {
            // Sistem fontu yerine Arial kullan (kararlı baskı)
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
              body, p, span, div, table, td, th,
              h1, h2, h3, h4, li, label {
                font-family: Arial, Helvetica, sans-serif !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          },
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(element);

    const pdf: any = await worker.toPdf().get("pdf");

    // ============================
    // 9. BAŞLIK / ALT BİLGİ
    // ============================
    const totalPages = pdf.getNumberOfPages();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      if (logoBase64) {
        // Orijinal logo oranı 553:152
        pdf.addImage(logoBase64, "PNG", 20, 12, 40, 11);
      }

      // Başlık
      pdf.setFontSize(10);
      pdf.setTextColor(11, 59, 92);
      pdf.text(headerTitle, pageWidth - 20, 22, { align: "right" });
      pdf.line(20, 30, pageWidth - 20, 30);

      // Alt bilgi
      pdf.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
      pdf.setFontSize(9);
      pdf.setTextColor(11, 59, 92);
      pdf.text("ADRIATICA D.O.O.", pageWidth / 2, pageHeight - 18, {
        align: "center",
      });

      pdf.setFontSize(7);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        "Marine Engineering & Technical Consultancy",
        pageWidth / 2,
        pageHeight - 13,
        { align: "center" }
      );
      pdf.text(
        "Podgorica, Montenegro | info@adriaticadoo.com | www.adriaticadoo.com",
        pageWidth / 2,
        pageHeight - 8,
        { align: "center" }
      );
    }

    // ============================
    // 10. KAYDET
    // ============================
    const sanitized = filename.replace(/[^\w.-]/g, "_");
    const safeFilename = sanitized.endsWith(".pdf")
      ? sanitized
      : sanitized + ".pdf";

    pdf.save(safeFilename);
    (worker as any).destroy?.();
  } catch (error) {
    if (error instanceof PdfError) throw error;
    throw new PdfError("Unexpected PDF error", "RENDER_UNKNOWN");
  } finally {
    activeRender = false;

    // DOM'da kalan .pdf-mode elementini temizle
    const strayElement = document.querySelector(".pdf-mode");
    if (strayElement) strayElement.remove();
  }
}
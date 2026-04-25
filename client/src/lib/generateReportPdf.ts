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
  signal?: AbortSignal;
};

// ============================
// EŞZAMANLI İŞLEM KİLİDİ
// ============================
let activeRender = false;

// ============================
// LOGO CACHE
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
// ANA PDF OLUŞTURMA - REVİZE EDİLMİŞ
// ============================
export async function generateReportPdf(
  pdfRef: React.RefObject<HTMLDivElement | null>,
  filename: string,
  inputs: ReportInput[],
  options?: ReportOptions
): Promise<void> {
  if (activeRender) {
    throw new PdfError("Another PDF is already being generated", "RENDER_CONCURRENT");
  }

  activeRender = true;
  const signal = options?.signal;

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

    const headerTitle = options?.headerTitle || "PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.";
    const toolName = options?.toolName || "";

    // ============================
    // 1. KLONLAMA - Düzeltilmiş pozisyonlama
    // ============================
    const element = pdfRef.current.cloneNode(true) as HTMLElement;
    element.classList.add("pdf-mode");

    Object.assign(element.style, {
      position: "absolute",
      top: "-9999px",           // left: -9999px yerine top kullanıyoruz
      left: "0",
      width: "750px",
      padding: "25px",          // sıfırlamıyoruz, güvenli padding
      margin: "0",
      border: "none",
      boxShadow: "none",
      opacity: "1",
      visibility: "visible",
      pointerEvents: "none",
      zIndex: "-1",
      backgroundColor: "#ffffff",
    });

    document.body.appendChild(element);
    checkAbort();

    // ============================
    // 2. FORM SENKRONİZASYONU
    // ============================
    element.querySelectorAll("input, select, textarea").forEach((el: any) => {
      if (el.tagName === "SELECT") {
        el.querySelectorAll("option").forEach((opt: any) => {
          if (opt.value === el.value) opt.setAttribute("selected", "selected");
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

    // ============================
    // 3. GİRDİ ÖZETİ
    // ============================
    const summary = document.createElement("div");
    summary.style.cssText =
      "margin-top:0; margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #ddd; font-size:11px;";

    const headerRow = document.createElement("div");
    headerRow.style.cssText =
      "display:flex; justify-content:space-between; margin-bottom:8px; font-weight:bold;";

    const titleEl = document.createElement("span");
    titleEl.textContent = "VESSEL INPUT SUMMARY";

    const ts = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

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
    // 4. RENDER HAZIRLIĞI + BEKLEME
    // ============================
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 100));   // React render için önemli
    checkAbort();

    // ============================
    // 5. RESİM YÜKLEME
    // ============================
    const images = element.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          let done = false;
          const finalize = () => { if (!done) { done = true; img.onload = img.onerror = null; resolve(); } };
          const timeout = setTimeout(finalize, 5000);
          img.onload = () => { clearTimeout(timeout); finalize(); };
          img.onerror = () => { clearTimeout(timeout); finalize(); };
        });
      })
    );

    // ============================
    // 6. LOGO
    // ============================
    let logoBase64: string | null = null;
    try {
      logoBase64 = await getLogoBase64(signal);
    } catch {
      console.warn("Logo yüklenemedi, rapor logosuz devam edecek.");
    }

    checkAbort();

    // ============================
    // 7. BOYUT KONTROLÜ
    // ============================
    const contentHeight = element.scrollHeight;
    console.log("[PDF Debug] Content Height:", contentHeight); // debug

    let scale = 2;
    if (contentHeight > 12000) scale = 1.1;
    else if (contentHeight > 9000) scale = 1.3;
    else if (contentHeight > 6000) scale = 1.6;

    // ============================
    // 8. PDF ÜRETİMİ - ÖNEMLİ DEĞİŞİKLİKLER BURADA
    // ============================
    const worker = html2pdf()
      .set({
        margin: [35, 15, 35, 15],
        pagebreak: { mode: ['css', 'legacy'], avoid: '.no-break' },
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale,
          useCORS: true,
          allowTaint: true,
          scrollY: 0,
          windowWidth: 750,
          logging: false,
          onclone: (clonedDoc: Document) => {
            const pdfModeEl = clonedDoc.querySelector(".pdf-mode") as HTMLElement;
            if (pdfModeEl) {
              pdfModeEl.style.position = "relative";
              pdfModeEl.style.top = "0";
              pdfModeEl.style.left = "0";
              pdfModeEl.style.width = "750px";
              pdfModeEl.style.padding = "25px";
              pdfModeEl.style.margin = "0";
              pdfModeEl.style.backgroundColor = "#ffffff";
              pdfModeEl.style.opacity = "1";
              pdfModeEl.style.visibility = "visible";
            }

            // En agresif stil reset
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
              .pdf-mode, .pdf-mode * {
                font-family: Arial, Helvetica, sans-serif !important;
                color: #000000 !important;
                background-color: #ffffff !important;
                border-color: #d1d5db !important;
                line-height: 1.5 !important;
              }
              .pdf-mode .no-break {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
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
      } as any)
      .from(element);

    const pdf: any = await worker.toPdf().get("pdf");

    // ============================
    // 9. HEADER / FOOTER
    // ============================
    const totalPages = pdf.getNumberOfPages();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      if (logoBase64) {
        pdf.addImage(logoBase64, "PNG", 15, 12, 35, 10);
      }

      pdf.setFontSize(10);
      pdf.setTextColor(11, 59, 92);
      pdf.text(headerTitle, pageWidth - 15, 20, { align: "right" });

      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, 28, pageWidth - 15, 28);
      pdf.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);

      pdf.setFontSize(8);
      pdf.setTextColor(11, 59, 92);
      pdf.text("ADRIATICA D.O.O.", pageWidth / 2, pageHeight - 22, { align: "center" });

      pdf.setFontSize(7);
      pdf.setTextColor(120, 120, 120);
      pdf.text("Marine Engineering & Technical Consultancy", pageWidth / 2, pageHeight - 17, { align: "center" });
      pdf.text("info@adriaticadoo.com | www.adriaticadoo.com", pageWidth / 2, pageHeight - 12, { align: "center" });
      pdf.text(`${i} / ${totalPages}`, pageWidth - 15, pageHeight - 12, { align: "right" });
    }

    // ============================
    // 10. KAYDET
    // ============================
    const sanitized = filename.replace(/[^\w.-]/g, "_");
    const safeFilename = sanitized.endsWith(".pdf") ? sanitized : sanitized + ".pdf";

    pdf.save(safeFilename);
    (worker as any).destroy?.();

  } catch (error) {
    if (error instanceof PdfError) throw error;
    console.error("PDF Generation Error:", error);
    throw new PdfError("Unexpected PDF error", "RENDER_UNKNOWN");
  } finally {
    activeRender = false;
    const strayElement = document.querySelector(".pdf-mode");
    if (strayElement) strayElement.remove();
  }
}
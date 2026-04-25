import html2pdf from "html2pdf.js";

// ============================
// HATA SINIFLANDIRMASI
// ============================
export class PdfError extends Error {
  code:
    | "LOGO_FETCH"
    | "RENDER_MEMORY"
    | "RENDER_ABORTED"
    | "RENDER_UNKNOWN";

  constructor(
    message: string,
    code:
      | "LOGO_FETCH"
      | "RENDER_MEMORY"
      | "RENDER_ABORTED"
      | "RENDER_UNKNOWN"
  ) {
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
// LOGO CACHE (tekrar dene + backoff)
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
    } catch (err) {
      if (i === 1) {
        throw new PdfError("Logo fetch failed after retry", "LOGO_FETCH");
      }
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }

  throw new PdfError("Logo fetch failure", "LOGO_FETCH");
};

// ============================
// ANA FONKSİYON
// ============================
export async function generateReportPdf(
  pdfRef: React.RefObject<HTMLDivElement | null>,
  filename: string,
  inputs: ReportInput[],
  options?: ReportOptions
): Promise<void> {
  const signal = options?.signal;

  // -- iptal kontrolü --
  const checkAbort = () => {
    if (signal?.aborted) {
      throw new PdfError("PDF generation aborted", "RENDER_ABORTED");
    }
  };

  checkAbort();

  if (!pdfRef.current) {
    throw new PdfError("PDF reference not found", "RENDER_UNKNOWN");
  }

  const headerTitle =
    options?.headerTitle || "PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.";
  const toolName = options?.toolName || "";

  // ============================
  // 1. KLONLAMA VE İZOLASYON
  // ============================
  const element = pdfRef.current.cloneNode(true) as HTMLElement;
  element.classList.add("pdf-mode");

  Object.assign(element.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "800px",
    opacity: "0.01",
    zIndex: "0",
    pointerEvents: "none",
  });

  // ============================
  // 2. FORM STATE SENKRONİZASYONU
  // ============================
  element.querySelectorAll("input, select, textarea").forEach((el: any) => {
    if (el.tagName === "SELECT") {
      el.querySelectorAll("option").forEach((opt: any) => {
        if (opt.value === el.value) opt.setAttribute("selected", "selected");
      });
    } else if (el.type === "checkbox" || el.type === "radio") {
      if (el.checked) {
        el.setAttribute("checked", "checked");
        el.defaultChecked = true;
      } else {
        el.removeAttribute("checked");
        el.defaultChecked = false;
      }
    } else if (el.tagName === "TEXTAREA") {
      el.textContent = el.value;
    } else {
      el.setAttribute("value", String(el.value));
      el.value = el.value;
    }
  });

  let appended = false;

  try {
    document.body.appendChild(element);
    appended = true;
    checkAbort();

    // ============================
    // 3. GİRDİ ÖZETİ (DOM API, innerHTML yok)
    // ============================
    const summary = document.createElement("div");
    summary.className = "no-break";
    summary.style.cssText =
      "margin-bottom:20px;padding-bottom:15px;border-bottom:1px solid #d1d5db;";

    const headRow = document.createElement("div");
    headRow.style.cssText =
      "display:flex;justify-content:space-between;margin-bottom:10px;";

    const titleSpan = document.createElement("span");
    titleSpan.style.cssText =
      "font-weight:bold;color:#0B3B5C;font-size:12px;";
    titleSpan.textContent = "VESSEL INPUT SUMMARY";

    const ts =
      new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
    const audit = document.createElement("span");
    audit.style.cssText = "font-size:10px;color:#6b7280;";
    audit.textContent = toolName
      ? `Generated: ${ts} | Tool: ${toolName}`
      : `Generated: ${ts}`;

    headRow.appendChild(titleSpan);
    headRow.appendChild(audit);
    summary.appendChild(headRow);

    const table = document.createElement("table");
    table.style.cssText =
      "width:100%;border-collapse:collapse;font-size:11px;";

    inputs.forEach((input) => {
      if (input.value === "" || input.value === undefined) return;

      const tr = document.createElement("tr");

      const tdLabel = document.createElement("td");
      tdLabel.style.cssText =
        "padding:3px 0;color:#6b7280;width:40%;";
      tdLabel.textContent = String(input.label);

      const tdValue = document.createElement("td");
      tdValue.style.cssText =
        "padding:3px 0;font-weight:bold;color:#0B3B5C;";
      tdValue.textContent = String(input.value);

      tr.appendChild(tdLabel);
      tr.appendChild(tdValue);
      table.appendChild(tr);
    });

    summary.appendChild(table);
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
          const timeout = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            resolve();
          }, 5000);

          img.onload = () => {
            clearTimeout(timeout);
            img.onload = null;
            img.onerror = null;
            resolve();
          };
          img.onerror = () => {
            clearTimeout(timeout);
            img.onload = null;
            img.onerror = null;
            resolve();
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
    const h = Math.max(
      element.scrollHeight,
      element.offsetHeight,
      element.getBoundingClientRect().height
    );
    const w = element.offsetWidth;
    const dpr = window.devicePixelRatio || 1;

    let scale = 2;
    if (h > 12000) scale = 1.1;
    else if (h > 9000) scale = 1.3;
    else if (h > 6000) scale = 1.6;

    const canvasPixelHeight = h * scale * dpr;
    if (canvasPixelHeight > 32767) {
      throw new PdfError(
        "Content height exceeds canvas rendering limit",
        "RENDER_MEMORY"
      );
    }

    const pixelBudget = w * h * scale * scale * dpr * dpr;
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const MEMORY_LIMIT = isMobile ? 8_000_000 : 20_000_000;
    if (pixelBudget > MEMORY_LIMIT) {
      throw new PdfError(
        `Content exceeds safe rendering limit (${Math.round(
          pixelBudget / 1e6
        )}M pixels)`,
        "RENDER_MEMORY"
      );
    }

    // ============================
    // 8. PDF AYARLARI VE ÜRETİM
    // ============================
    const worker = html2pdf()
      .set({
        margin: [40, 20, 45, 20],
        image: { type: "jpeg", quality: 0.92 },
        html2canvas: {
          scale,
          useCORS: true,
          allowTaint: false,
          onclone: (clonedDoc: Document) => {
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
              body, p, span, div, table, td, th, h1, h2, h3, h4, li, label {
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
        const logoWidth = 40;
        const logoHeight = logoWidth * (152 / 553);
        pdf.addImage(logoBase64, "PNG", 20, 12, logoWidth, logoHeight);
      }

      pdf.setFontSize(10);
      pdf.setTextColor(11, 59, 92);
      pdf.text(headerTitle, pageWidth - 20, 22, { align: "right" });
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(20, 30, pageWidth - 20, 30);

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
    const sanitized = filename
      .replace(/[^a-z0-9_\-\.]/gi, "_")
      .replace(/\.{2,}/g, ".")
      .replace(/^\.+/, "")
      .replace(/\.+$/, "");
    const safeFilename = sanitized.toLowerCase().endsWith(".pdf")
      ? sanitized
      : `${sanitized}.pdf`;

    pdf.save(safeFilename);

    // Worker temizliği
    await Promise.resolve();
    (worker as any).destroy?.();
  } catch (error) {
    if (error instanceof PdfError) throw error;
    console.error("Unexpected PDF failure:", error);
    throw new PdfError(
      "An unexpected error occurred during PDF generation.",
      "RENDER_UNKNOWN"
    );
  } finally {
    if (appended && document.body.contains(element)) {
      element.style.opacity = "0";
      document.body.removeChild(element);
    }
  }
}
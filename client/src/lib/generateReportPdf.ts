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
// ANA PDF OLUŞTURMA
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

  // Off-screen wrapper — bu wrapper görünür alanda ama ekran dışında
  const offscreenWrapper = document.createElement("div");
  offscreenWrapper.style.cssText = `
    position: fixed;
    top: 0;
    left: -9999px;
    width: 750px;
    overflow: visible;
    z-index: -1000;
    pointer-events: none;
  `;
  document.body.appendChild(offscreenWrapper);

  try {
    checkAbort();

    if (!pdfRef.current) {
      throw new PdfError("PDF reference not found", "RENDER_UNKNOWN");
    }

    const headerTitle = options?.headerTitle || "PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.";
    const toolName = options?.toolName || "";

    // ============================
    // 1. WRAPPER İÇİNE KONTEYNIR OLUŞTUR
    //    Orijinal elementi klonlama — sadece içeriği alıyoruz
    // ============================
    const container = document.createElement("div");
    container.style.cssText = `
      width: 750px;
      background-color: #ffffff;
      padding: 25px;
      margin: 0;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
      color: #000000;
    `;
    offscreenWrapper.appendChild(container);

    // ============================
    // 2. GİRDİ ÖZETİ (INPUT SUMMARY TABLOSU)
    // ============================
    const ts = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";

    const summary = document.createElement("div");
    summary.style.cssText = `
      margin: 0 0 20px 0;
      padding-bottom: 15px;
      border-bottom: 1px solid #ddd;
      font-size: 11px;
      font-family: Arial, Helvetica, sans-serif;
      color: #000000;
    `;

    const headerRow = document.createElement("div");
    headerRow.style.cssText = `
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      color: #000000;
    `;

    const titleEl = document.createElement("span");
    titleEl.style.cssText = "font-weight: bold; color: #000000;";
    titleEl.textContent = "VESSEL INPUT SUMMARY";

    const metaEl = document.createElement("span");
    metaEl.style.cssText = "font-weight: normal; color: #555555;";
    metaEl.textContent = toolName
      ? `Generated: ${ts} | ${toolName}`
      : `Generated: ${ts}`;

    headerRow.appendChild(titleEl);
    headerRow.appendChild(metaEl);
    summary.appendChild(headerRow);

    inputs.forEach((input) => {
      if (input.value === "" || input.value === undefined) return;
      const row = document.createElement("div");
      row.style.cssText = "display: flex; margin-bottom: 3px;";

      const left = document.createElement("div");
      left.style.cssText = "width: 45%; color: #666666; font-family: Arial, Helvetica, sans-serif;";
      left.textContent = String(input.label);

      const right = document.createElement("div");
      right.style.cssText = "font-weight: bold; color: #000000; font-family: Arial, Helvetica, sans-serif;";
      right.textContent = String(input.value);

      row.appendChild(left);
      row.appendChild(right);
      summary.appendChild(row);
    });

    container.appendChild(summary);

    // ============================
    // 3. ASIL İÇERİĞİ KLONLA VE EKLE
    //    pdf-mode class'ı EKLEME — inline style ile kontrol et
    // ============================
    const contentClone = pdfRef.current.cloneNode(true) as HTMLElement;

    // Tüm Tailwind class'larını kaldır, inline style uygula
    applyPdfStyles(contentClone);

    container.appendChild(contentClone);

    // ============================
    // 4. FORM SENKRONİZASYONU
    // ============================
    container.querySelectorAll("input, select, textarea").forEach((el: any) => {
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
    // 5. RENDER HAZIRLIĞI
    // ============================
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => requestAnimationFrame(r)); // iki frame bekle
    await new Promise((r) => setTimeout(r, 150));
    checkAbort();

    // ============================
    // 6. RESİM YÜKLEME
    // ============================
    const images = container.querySelectorAll("img");
    await Promise.all(
      Array.from(images).map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise<void>((resolve) => {
          let done = false;
          const finalize = () => {
            if (!done) {
              done = true;
              img.onload = img.onerror = null;
              resolve();
            }
          };
          const timeout = setTimeout(finalize, 5000);
          img.onload = () => { clearTimeout(timeout); finalize(); };
          img.onerror = () => { clearTimeout(timeout); finalize(); };
        });
      })
    );

    // ============================
    // 7. LOGO
    // ============================
    let logoBase64: string | null = null;
    try {
      logoBase64 = await getLogoBase64(signal);
    } catch {
      console.warn("Logo yüklenemedi, rapor logosuz devam edecek.");
    }

    checkAbort();

    // ============================
    // 8. BOYUT KONTROLÜ VE SCALE
    // ============================
    const contentHeight = container.scrollHeight;
    console.log("[PDF Debug] Container scrollHeight:", contentHeight);

    let scale = 2;
    if (contentHeight > 12000) scale = 1.1;
    else if (contentHeight > 9000) scale = 1.3;
    else if (contentHeight > 6000) scale = 1.6;

    // ============================
    // 9. PDF ÜRETİMİ
    // ============================
    const worker = html2pdf()
      .set({
        margin: [35, 15, 35, 15],
        pagebreak: { mode: ["css", "legacy"], avoid: ".no-break" },
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale,
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: 750,
          logging: false,
          backgroundColor: "#ffffff",
          // onclone içinde sadece güvenlik reset — artık pdf-mode class'ına gerek yok
          onclone: (_clonedDoc: Document, clonedEl: HTMLElement) => {
            clonedEl.style.cssText = `
              position: relative !important;
              top: 0 !important;
              left: 0 !important;
              width: 750px !important;
              padding: 0 !important;
              margin: 0 !important;
              background-color: #ffffff !important;
              color: #000000 !important;
              opacity: 1 !important;
              visibility: visible !important;
              overflow: visible !important;
            `;
          },
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      } as any)
      .from(container);

    const pdf: any = await worker.toPdf().get("pdf");

    // ============================
    // 10. HEADER / FOOTER
    // ============================
    const totalPages = pdf.getNumberOfPages();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);

      // Header arka plan
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pageWidth, 30, "F");

      if (logoBase64) {
        pdf.addImage(logoBase64, "PNG", 15, 12, 35, 10);
      }

      pdf.setFontSize(10);
      pdf.setTextColor(11, 59, 92);
      pdf.text(headerTitle, pageWidth - 15, 20, { align: "right" });

      pdf.setDrawColor(200, 200, 200);
      pdf.line(15, 28, pageWidth - 15, 28);
      pdf.line(15, pageHeight - 30, pageWidth - 15, pageHeight - 30);

      // Footer arka plan
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, pageHeight - 32, pageWidth, 32, "F");

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
    // 11. KAYDET
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
    // Off-screen wrapper'ı temizle
    if (offscreenWrapper.parentNode) {
      offscreenWrapper.parentNode.removeChild(offscreenWrapper);
    }
  }
}

// ============================
// YARDIMCI: İÇERİĞE İNLINE STYLE UYGULA
// Tailwind class'larına bağlı kalmak yerine
// tüm elementlere güvenli PDF stilleri uygular
// ============================
function applyPdfStyles(root: HTMLElement): void {
  // Root element
  root.style.cssText = `
    width: 100%;
    background-color: #ffffff;
    color: #000000;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    padding: 0;
    margin: 0;
    border: none;
    box-shadow: none;
  `;

  // Tüm alt elementlere temel reset uygula
  root.querySelectorAll("*").forEach((el) => {
    const htmlEl = el as HTMLElement;
    const computedStyle = window.getComputedStyle(htmlEl);
    const tagName = htmlEl.tagName.toLowerCase();

    // Mevcut computed renkleri oku — Tailwind'in uyguladığı renkleri koru
    const color = computedStyle.color;
    const bgColor = computedStyle.backgroundColor;
    const borderColor = computedStyle.borderColor;
    const fontSize = computedStyle.fontSize;
    const fontWeight = computedStyle.fontWeight;
    const padding = computedStyle.padding;
    const margin = computedStyle.margin;
    const borderWidth = computedStyle.borderWidth;
    const borderStyle = computedStyle.borderStyle;
    const borderRadius = computedStyle.borderRadius;
    const display = computedStyle.display;
    const flexDirection = computedStyle.flexDirection;
    const justifyContent = computedStyle.justifyContent;
    const alignItems = computedStyle.alignItems;
    const gap = computedStyle.gap;
    const width = computedStyle.width;
    const textAlign = computedStyle.textAlign;

    // Form elementlerini gizle (input, select, textarea) — PDF'te anlamsız
    if (["input", "select", "textarea", "button"].includes(tagName)) {
      htmlEl.style.display = "none";
      return;
    }

    // Computed style'ı inline'a dönüştür (Tailwind purge'dan kaçış)
    htmlEl.style.cssText = `
      font-family: Arial, Helvetica, sans-serif !important;
      color: ${isTransparentOrDefault(color) ? "#000000" : color};
      background-color: ${isTransparentOrDefault(bgColor) ? "transparent" : bgColor};
      border-color: ${borderColor};
      border-width: ${borderWidth};
      border-style: ${borderStyle};
      border-radius: ${borderRadius};
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      padding: ${padding};
      margin: ${margin};
      display: ${display};
      flex-direction: ${flexDirection};
      justify-content: ${justifyContent};
      align-items: ${alignItems};
      gap: ${gap};
      width: ${width};
      text-align: ${textAlign};
      box-shadow: none;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    `;
  });
}

function isTransparentOrDefault(value: string): boolean {
  return (
    !value ||
    value === "rgba(0, 0, 0, 0)" ||
    value === "transparent" ||
    value === ""
  );
}
import html2pdf from "html2pdf.js";

export class PdfError extends Error {
  code: "LOGO_FETCH" | "RENDER_MEMORY" | "RENDER_ABORTED" | "RENDER_CONCURRENT" | "RENDER_UNKNOWN";
  constructor(message: string, code: PdfError["code"]) {
    super(message);
    this.name = "PdfError";
    this.code = code;
  }
}

type ReportInput = { label: string; value: string | number | boolean };
type ReportOptions = { headerTitle?: string; toolName?: string; signal?: AbortSignal; };

let activeRender = false;
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
      reader.onerror = () => reject(new PdfError("FileReader error", "RENDER_UNKNOWN"));
      reader.readAsDataURL(blob);
    });
  };
  for (let i = 0; i < 2; i++) {
    try {
      cachedLogo = await fetchOnce();
      return cachedLogo;
    } catch {
      if (i === 1) throw new PdfError("Logo fetch failed after retry", "LOGO_FETCH");
      await new Promise((r) => setTimeout(r, 300 * (i + 1)));
    }
  }
  throw new PdfError("Logo fetch failure", "LOGO_FETCH");
};

export async function generateReportPdf(
  pdfRef: React.RefObject<HTMLDivElement | null>,
  filename: string,
  inputs: ReportInput[],
  options?: ReportOptions
): Promise<void> {
  if (activeRender) throw new PdfError("Another PDF is already being generated", "RENDER_CONCURRENT");
  activeRender = true;
  const signal = options?.signal;

  try {
    if (!pdfRef.current) throw new PdfError("PDF reference not found", "RENDER_UNKNOWN");

    const headerTitle = options?.headerTitle || "PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.";
    const toolName = options?.toolName || "";

    // 1. KLONLAMA VE GİZLEME
    const element = pdfRef.current.cloneNode(true) as HTMLElement;
    element.classList.add("pdf-mode");
    Object.assign(element.style, {
      position: "absolute",
      top: "-9999px",
      left: "0",
      width: "750px",
      padding: "0",
      margin: "0",
      border: "none",
      boxShadow: "none",
      opacity: "1",
      visibility: "visible",
      pointerEvents: "none",
      zIndex: "-1",
      backgroundColor: "#ffffff",
    });

    // 2. HEADER HTML
    const logoBase64 = await getLogoBase64(signal).catch(() => null);
    const headerDiv = document.createElement("div");
    headerDiv.style.cssText = "padding: 15px 0; border-bottom: 1px solid #ccc; margin-bottom: 20px;";
    headerDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        ${logoBase64 ? `<img src="${logoBase64}" style="height: 11mm;" />` : ""}
        <span style="font-size: 10px; color: #0B3B5C; font-family: Arial, sans-serif;">${headerTitle}</span>
      </div>
    `;
    element.insertBefore(headerDiv, element.firstChild);

    // 3. FOOTER HTML
    const footerDiv = document.createElement("div");
    footerDiv.style.cssText = "margin-top: 20px; padding-top: 10px; border-top: 1px solid #ccc; text-align: center; font-size: 7px; color: #666; font-family: Arial, sans-serif;";
    footerDiv.innerHTML = `
      <div style="margin-bottom: 3px;">ADRIATICA D.O.O.</div>
      <div>Marine Engineering & Technical Consultancy</div>
      <div>info@adriaticadoo.com | www.adriaticao.com</div>
    `;
    element.appendChild(footerDiv);

    // 4. FORM senkronizasyonu
    element.querySelectorAll("input, select, textarea").forEach((el: any) => {
      if (el.tagName === "SELECT") {
        el.querySelectorAll("option").forEach((opt: any) => {
          if (opt.value === el.value) opt.setAttribute("selected", "selected");
        });
      } else if (el.type === "checkbox" || el.type === "radio") {
        el.checked ? el.setAttribute("checked", "checked") : el.removeAttribute("checked");
      } else if (el.tagName === "TEXTAREA") {
        el.textContent = el.value;
      } else {
        el.setAttribute("value", el.value);
      }
    });

    // 5. Özet (Özet, header'in hemen altına)
    const summary = document.createElement("div");
    summary.style.cssText = "margin-bottom:20px; padding-bottom:15px; border-bottom:1px solid #ddd; font-size:11px;";
    const headerRow = document.createElement("div");
    headerRow.style.cssText = "display:flex; justify-content:space-between; margin-bottom:8px; font-weight:bold;";
    const titleEl = document.createElement("span");
    titleEl.textContent = "VESSEL INPUT SUMMARY";
    const ts = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
    const metaEl = document.createElement("span");
    metaEl.style.fontWeight = "normal";
    metaEl.textContent = toolName ? `Generated: ${ts} | ${toolName}` : `Generated: ${ts}`;
    headerRow.appendChild(titleEl);
    headerRow.appendChild(metaEl);
    summary.appendChild(headerRow);
    inputs.forEach((input) => {
      if (input.value === "" || input.value === undefined) return;
      const row = document.createElement("div");
      row.style.display = "flex";
      const left = document.createElement("div");
      left.style.width = "40%"; left.style.color = "#666";
      left.textContent = String(input.label);
      const right = document.createElement("div");
      right.style.fontWeight = "bold";
      right.textContent = String(input.value);
      row.appendChild(left); row.appendChild(right);
      summary.appendChild(row);
    });
    element.insertBefore(summary, element.querySelector(".pdf-header")?.nextSibling || element.firstChild);

    document.body.appendChild(element);

    // 6. Render bekleme
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});
    await new Promise((r) => requestAnimationFrame(r));
    await new Promise((r) => setTimeout(r, 100));

    // 7. PDF oluştur
    await html2pdf()
      .set({
        margin: [25, 15, 25, 15],
        pagebreak: { mode: ['css', 'legacy'], avoid: '.no-break' },
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: false, // Eğer gerçekten cross-origin sorun yoksa false, HTML dahilinde zaten logolar var
          ignoreElements: ".pdf-header, .pdf-footer",
          logging: false,
          onclone: (clonedDoc: Document) => {
            const pdfModeEl = clonedDoc.querySelector(".pdf-mode") as HTMLElement;
            if (pdfModeEl) {
              pdfModeEl.style.cssText = `
                position: relative !important;
                top: 0 !important;
                left: 0 !important;
                width: 750px !important;
                padding: 0 !important;
                margin: 0 auto !important;
                background-color: #ffffff !important;
                color: #000000 !important;
                opacity: 1 !important;
                visibility: visible !important;
              `;
            }
            const style = clonedDoc.createElement("style");
            style.innerHTML = `
              .pdf-mode, .pdf-mode * {
                font-family: Arial, Helvetica, sans-serif !important;
                color: #000000 !important;
                background-color: #ffffff !important;
                border-color: #d1d5db !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          },
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      } as any)
      .from(element)
      .save(filename);

  } catch (error) {
    if (error instanceof PdfError) throw error;
    throw new PdfError("Unexpected PDF error", "RENDER_UNKNOWN");
  } finally {
    activeRender = false;
    const strayElement = document.querySelector(".pdf-mode");
    if (strayElement) strayElement.remove();
  }
}
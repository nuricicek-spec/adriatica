import html2pdf from "html2pdf.js";

// ERROR CLASSIFICATION
export class PdfError extends Error {
  code: 'LOGO_FETCH' | 'RENDER_MEMORY' | 'RENDER_UNKNOWN';
  constructor(message: string, code: 'LOGO_FETCH' | 'RENDER_MEMORY' | 'RENDER_UNKNOWN') {
    super(message);
    this.name = 'PdfError';
    this.code = code;
  }
}

type ReportInput = {
  label: string;
  value: string | number | boolean;
};

type ReportOptions = {
  headerTitle?: string;
  toolName?: string;
};

// XSS Prevention
const escapeHtml = (str: any): string =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

// Module-level cache (no-store fetch handles deploy updates)
let cachedLogo: string | null = null;

const getLogoBase64 = async (): Promise<string> => {
  if (cachedLogo) return cachedLogo;
  
  try {
    const response = await fetch('/logo.png', { cache: 'no-store' });
    if (!response.ok) throw new Error("Network response was not ok");
    
    const blob = await response.blob();
    cachedLogo = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("FileReader failed"));
      reader.readAsDataURL(blob);
    });

    return cachedLogo;
  } catch (error) {
    throw new PdfError("Failed to fetch or process logo.", 'LOGO_FETCH');
  }
};

export async function generateReportPdf(
  pdfRef: React.RefObject<HTMLDivElement | null>,
  filename: string,
  inputs: ReportInput[],
  options?: ReportOptions
): Promise<void> {
  if (!pdfRef.current) {
    throw new PdfError("PDF reference not found.", 'RENDER_UNKNOWN');
  }

  const headerTitle = options?.headerTitle || 'PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.';
  const toolName = options?.toolName || '';

  // 1. DOM CLONE & İZOLASYON
  const element = pdfRef.current.cloneNode(true) as HTMLElement;
  element.classList.add("pdf-mode");
  
  // Görünür layout'ta tut ama kullanıcıya gösterme (off-screen yerine fixed + opacity)
  element.style.position = "fixed";
  element.style.top = "0";
  element.style.left = "0";
  element.style.width = "800px";
  element.style.zIndex = "-1";
  element.style.opacity = "0";
  element.style.pointerEvents = "none";

  // 2. ADVANCED FORM STATE FIX (Select, Checkbox, Textarea, React Edge-case)
  const formElements = element.querySelectorAll('input, select, textarea');
  formElements.forEach((el: any) => {
    if (el.tagName === 'SELECT') {
      const options = el.querySelectorAll('option');
      options.forEach((opt: any) => {
        if (opt.value === el.value) opt.setAttribute('selected', 'selected');
      });
    } else if (el.type === 'checkbox' || el.type === 'radio') {
      if (el.checked) {
        el.setAttribute('checked', 'checked');
      } else {
        el.removeAttribute('checked'); // Explicit unchecked state
      }
    } else if (el.tagName === 'TEXTAREA') {
      el.textContent = el.value; // innerHTML yerine textContent (encoding fix)
    } else {
      el.setAttribute('value', String(el.value));
      el.value = el.value; // Force sync for React controlled components
    }
  });

  // 3. MEMORY LEAK / FAIL SAFE STATE
  let appended = false;

  try {
    document.body.appendChild(element);
    appended = true;

    // 4. INPUT SUMMARY VE TIMESTAMP ENJEKSİYONU (XSS Safe)
    const summaryDiv = document.createElement("div");
    summaryDiv.classList.add("no-break");
    summaryDiv.style.marginBottom = "20px";
    summaryDiv.style.paddingBottom = "15px";
    summaryDiv.style.borderBottom = "1px solid #d1d5db";

    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
    const auditTrail = toolName ? `Generated: ${timestamp} | Tool: ${toolName}` : `Generated: ${timestamp}`;

    let summaryHtml = `
      <div style="display:flex; justify-content:space-between; margin-bottom:10px;">
        <span style="font-weight:bold; color:#0B3B5C; font-size:12px;">VESSEL INPUT SUMMARY</span>
        <span style="font-size:10px; color:#6b7280;">${escapeHtml(auditTrail)}</span>
      </div>
      <table style="width:100%; border-collapse:collapse; font-size:11px;">
    `;

    for (const input of inputs) {
      if (input.value !== undefined && input.value !== "") {
        summaryHtml += `
          <tr>
            <td style="padding:3px 0; color:#6b7280; width:40%;">${escapeHtml(input.label)}</td>
            <td style="padding:3px 0; font-weight:bold; color:#0B3B5C;">${escapeHtml(input.value)}</td>
          </tr>
        `;
      }
    }
    
    summaryHtml += `</table>`;
    summaryDiv.innerHTML = summaryHtml;
    element.prepend(summaryDiv);

    // 5. RENDER DELAY (Safari Safe)
    if (document.fonts && document.fonts.ready) {
      try { await document.fonts.ready; } catch (e) { /* Safari fallback */ }
    }
    await new Promise(r => requestAnimationFrame(() => r(null)));

    // 6. IMAGE RENDERING RACE CONDITION FIX
    const images = element.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>(res => {
          img.onload = () => res();
          img.onerror = () => res(); // Hata olsa bile PDF'i durdurma
        });
      })
    );

    // 7. LOGO FETCH (Cached)
    const logoBase64 = await getLogoBase64();

    // 8. LARGE DOM DEGRADE STRATEGY (getBoundingClientRect ile güvenli ölçüm)
    const rect = element.getBoundingClientRect();
    const isLarge = rect.height > 8000;
    if (isLarge) {
      console.warn("Large PDF content detected – reduced quality mode enabled.");
    }

    // 9. OPTIMIZE EDİLMİŞ AYARLAR (Layout Drift Riski Azaltılmış onclone)
    const opt = {
      margin: [40, 20, 45, 20] as [number, number, number, number],
      image: { type: 'jpeg' as const, quality: 0.92 },
      html2canvas: { 
        scale: isLarge ? 1.2 : 2, 
        useCORS: true, 
        allowTaint: false, 
        logging: false,
        imageTimeout: 15000,
        onclone: (clonedDoc: Document) => {
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            body, p, span, div, table, td, th, h1, h2, h3, h4, li, label {
              font-family: Arial, Helvetica, sans-serif !important;
            }
          `;
          clonedDoc.head.appendChild(style);
        }
      },
      pagebreak: { mode: ['css', 'legacy'] },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    // 10. ASYNC PDF FLOW
    const worker = html2pdf().set(opt).from(element);
    const pdf: any = await worker.toPdf().get('pdf');

    // 11. HEADER / FOOTER LOOP
    const totalPages = pdf.getNumberOfPages();
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;

    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      if (logoBase64) pdf.addImage(logoBase64, 'PNG', 20, 12, 15, 15);
      pdf.setFontSize(10);
      pdf.setTextColor(11, 59, 92);
      pdf.text(headerTitle, pageWidth - 20, 22, { align: 'right' });
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(20, 30, pageWidth - 20, 30);

      pdf.setDrawColor(200, 200, 200);
      pdf.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
      pdf.setFontSize(9);
      pdf.setTextColor(11, 59, 92);
      pdf.text('ADRIATICA D.O.O.', pageWidth / 2, pageHeight - 18, { align: 'center' });
      pdf.setFontSize(7);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Marine Engineering & Technical Consultancy', pageWidth / 2, pageHeight - 13, { align: 'center' });
      pdf.text('Podgorica, Montenegro | info@adriaticadoo.com | www.adriaticadoo.com', pageWidth / 2, pageHeight - 8, { align: 'center' });
    }

    // 12. FILENAME SANITIZE
    const sanitized = filename.replace(/[^a-z0-9_\-\.]/gi, '_').replace(/\.{2,}/g, '.');
    const safeFilename = sanitized.toLowerCase().endsWith('.pdf') ? sanitized : `${sanitized}.pdf`;

    // 13. SAVE
    pdf.save(safeFilename);

    // 14. WORKER LIFECYCLE CLEANUP (Micro-delay ile)
    await new Promise(r => setTimeout(r, 100));
    (worker as any).destroy?.();

  } catch (error) {
    if (error instanceof PdfError) {
      console.error(`PDF Error [${error.code}]:`, error.message);
      throw error;
    } else {
      console.error('PDF generation failed:', error);
      throw new PdfError('An unknown error occurred during PDF generation.', 'RENDER_UNKNOWN');
    }
  } finally {
    if (appended && document.body.contains(element)) {
      document.body.removeChild(element);
    }
  }
}
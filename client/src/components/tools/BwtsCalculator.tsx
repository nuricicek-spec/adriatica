// BwtsCalculator.tsx
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";

export function BwtsCalculator() {
  const [pumpDesignCap, setPumpDesignCap] = useState("");
  const [pumpCount, setPumpCount] = useState("1");
  const [safetyMargin, setSafetyMargin] = useState("1.10");
  const [result, setResult] = useState<number | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const capNum = parseFloat(pumpDesignCap);
    const countNum = parseInt(pumpCount);
    const marginNum = parseFloat(safetyMargin) || 1.10;
    if (!capNum || !countNum) return;

    const requiredCapacity = capNum * countNum * marginNum;
    setResult(parseFloat(requiredCapacity.toFixed(1)));

    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: "compliant" }
    }));
  };

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;

    let logoBase64 = '';
    try {
      const response = await fetch('/logo.svg');
      const blob = await response.blob();
      logoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) { console.error("Logo fetch failed", e); }

    const opt = {
      margin: [40, 20, 45, 20] as [number, number, number, number],
      filename: 'Adriatica_BWTS_Sizing_Report.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(pdfRef.current).toPdf().get('pdf').then((pdf: any) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        if (logoBase64) pdf.addImage(logoBase64, 'SVG', 20, 12, 15, 15);
        
        pdf.setFontSize(10);
        pdf.setTextColor(11, 59, 92);
        pdf.text('PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.', pageWidth - 20, 22, { align: 'right' });
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
      
      pdf.save(opt.filename);
    });
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">BWTS Capacity Sizing</h2>
      <p className="text-xs text-muted-foreground mb-6">Retrofit sizing based on peak ballast pump discharge rates and system safety margins.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Ballast System Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Largest Ballast Pump Design Capacity (m³/h)</label>
              <input type="number" value={pumpDesignCap} onChange={e => setPumpDesignCap(e.target.value)} placeholder="e.g., 250" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              <p className="text-[10px] text-muted-foreground mt-1">* Use the design capacity from the pump nameplate, not operational estimates.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Number of Parallel Pumps</label>
              <select value={pumpCount} onChange={e => setPumpCount(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                <option value="1">1 (Single Pump Setup)</option>
                <option value="2">2 (Twin Pump Setup)</option>
                <option value="3">3 (Triple Pump Setup)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Design Safety Margin</h3>
          <div className="flex flex-col gap-3">
            {[
              { val: "1.10", label: "10% (Standard Clean Water)" },
              { val: "1.15", label: "15% (Moderate Sediment)" },
              { val: "1.20", label: "20% (High Sediment/Port Conditions)" },
            ].map(opt => (
              <label key={opt.val} className="flex items-center gap-2 cursor-pointer p-2 border rounded-sm text-xs hover:bg-white transition">
                <input type="radio" name="margin" value={opt.val} checked={safetyMargin === opt.val} onChange={e => setSafetyMargin(e.target.value)} className="text-primary" />
                <span className="text-muted-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Required BWTS Capacity
      </button>

      {result && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 border-primary rounded-sm" style={{color: '#000'}}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0B3B5C]">BWTS CAPACITY SIZING REPORT</h3>
              <p className="text-xs text-gray-500">Generated by Adriatica D.O.O. Engineering Tools</p>
            </div>
          </div>

          <div className="p-4 bg-primary/5 border-2 border-primary rounded-sm mb-4">
            <div className="flex justify-between items-end mb-2">
              <h4 className="text-sm font-bold text-[#0B3B5C]">Minimum Required BWTS Capacity</h4>
              <p className="text-3xl font-display font-bold text-primary">{result} <span className="text-sm font-normal">m³/h</span></p>
            </div>
            <p className="text-[10px] text-gray-600">Calculated with {(parseFloat(safetyMargin) - 1) * 100}% system margin</p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-sm border text-xs text-gray-700">
            <p className="font-bold text-[#0B3B5C] mb-1">ENGINEERING NOTE:</p>
            <p>When selecting a BWTS vendor, ensure the system's rated capacity (at the worst-case filtrate differential pressure) meets or exceeds this calculated value. Undersized systems lead to bypass scenarios during peak ballast operations, resulting in PSC deficiencies under the BWM Convention.</p>
          </div>

          <div className="mt-4 bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY:</p>
            <p>Sizing based on peak ballast pump discharge flow rates multiplied by a user-defined safety factor. This does not account for specific filter backwash volumes or system self-cleaning cycles unique to individual OEM technologies.</p>
          </div>
        </div>
      )}

      {result && (
        <button onClick={handleDownloadPdf} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm">
          Download Sizing Report (PDF)
        </button>
      )}
    </div>
  );
}
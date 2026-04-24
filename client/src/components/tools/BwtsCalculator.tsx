import { useState, useRef } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";

export function BwtsCalculator() {
  const [pumpDesignCap, setPumpDesignCap] = useState("");
  const [pumpCount, setPumpCount] = useState("1");
  const [safetyMargin, setSafetyMargin] = useState("1.10");
  const [result, setResult] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const capNum = parseFloat(pumpDesignCap);
    const countNum = parseInt(pumpCount);
    const marginNum = parseFloat(safetyMargin) || 1.10;

    // NaN Fix
    if (isNaN(capNum) || isNaN(countNum) || capNum <= 0 || countNum <= 0) return;

    const requiredCapacity = capNum * countNum * marginNum;
    setResult(parseFloat(requiredCapacity.toFixed(1)));

    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: "compliant" }
    }));
  };

  const handleDownloadPdf = async () => {
    if (!result) return;
    setIsGenerating(true);
    
    try {
      const marginLabel = safetyMargin === "1.10" ? "10% (Standard Clean Water)" 
                        : safetyMargin === "1.15" ? "15% (Moderate Sediment)" 
                        : "20% (High Sediment/Port Conditions)";

      await generateReportPdf(pdfRef, 'Adriatica_BWTS_Sizing_Report.pdf', [
        { label: "Largest Ballast Pump Design Capacity (m³/h)", value: pumpDesignCap },
        { label: "Number of Parallel Pumps", value: pumpCount },
        { label: "Design Safety Margin", value: marginLabel }
      ], {
        toolName: 'BWTS Capacity Sizing'
      });
    } catch (err) {
      if (err instanceof PdfError && err.code === 'RENDER_MEMORY') {
        alert("PDF content is too large to process safely. Please try again or contact support.");
      } else {
        alert("An error occurred while generating the PDF. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
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
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 border-primary rounded-sm no-break">
          <h3 className="text-lg font-bold text-[#0B3B5C]">BWTS CAPACITY SIZING REPORT</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>

          <div className="p-4 bg-primary/5 border-2 border-primary rounded-sm mb-4 no-break">
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
        <button 
          onClick={handleDownloadPdf} 
          disabled={isGenerating}
          className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating PDF..." : "Download Sizing Report (PDF)"}
        </button>
      )}
    </div>
  );
}
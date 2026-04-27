import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { FUEL_TYPES, ETS_PHASE_IN_RATES } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated } from "@/lib/analytics";

export function EtsCalculator() {
  const [fuelType, setFuelType] = useState("VLSFO");
  const [annualFuel, setAnnualFuel] = useState("");
  const [targetYear, setTargetYear] = useState("2025");
  const [euaPrice, setEuaPrice] = useState("65"); 

  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("ets");
  }, []);

  const handleCalculate = () => {
    const fuelNum = parseFloat(annualFuel);
    const priceNum = parseFloat(euaPrice);
    const yearNum = parseInt(targetYear);

    if (isNaN(fuelNum) || isNaN(priceNum) || fuelNum <= 0 || priceNum <= 0) return;

    const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
    if (!fuelData) return;

    const phaseInRate = ETS_PHASE_IN_RATES[yearNum] || 1.00;
    const totalCo2 = fuelNum * fuelData.cf;
    const requiredEua = totalCo2 * phaseInRate;
    const estimatedCost = requiredEua * priceNum;

    const isHighRisk = estimatedCost > 500000;

    const finalResult = {
      totalCo2: totalCo2.toFixed(0),
      requiredEua: requiredEua.toFixed(0),
      phaseIn: (phaseInRate * 100).toFixed(0),
      estimatedCost: estimatedCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      isHighRisk,
    };

    setResult(finalResult);

    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: isHighRisk ? "non-compliant" : "compliant" },
    }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);

    try {
      const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
      await generateReportPdf(
        pdfRef,
        "Adriatica_ETS_Preliminary_Report.pdf",
        [
          { label: "Fuel Type", value: fuelData?.label || fuelType },
          { label: "Annual Fuel Consumption (MT)", value: annualFuel },
          { label: "Target Year", value: targetYear },
          { label: "Estimated EUA Price (€/ton)", value: euaPrice },
        ],
        { toolName: "EU ETS Cost Predictor" }
      );
      trackPdfGenerated("ets");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") {
        alert("PDF content is too large to process safely.");
      } else {
        alert("An error occurred while generating the PDF.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">EU ETS Cost Predictor</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Based on EU MRV Regulation - Preliminary carbon cost estimation for budgeting.
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">
            Operational & Market Data
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type Consumed</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Fuel Consumption (MT)</label>
              <input type="number" value={annualFuel} onChange={e => setAnnualFuel(e.target.value)} placeholder="5000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
              <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {Object.keys(ETS_PHASE_IN_RATES).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Estimated EUA Price (€/ton)</label>
              <input type="number" step="0.1" value={euaPrice} onChange={e => setEuaPrice(e.target.value)} placeholder="65" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              <p className="text-[10px] text-muted-foreground mt-1">* Use forward curve estimates for future budgeting.</p>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Estimate ETS Cost
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm no-break">
          <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY EU ETS ASSESSMENT</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>

          <div className={`p-4 border-2 rounded-sm mb-4 ${result.isHighRisk ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}`}>
            <h4 className={`text-base font-bold mb-2 ${result.isHighRisk ? "text-red-800" : "text-green-800"}`}>
              ESTIMATED ANNUAL COST: €{result.estimatedCost}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm no-break">
              <div>
                <span className="text-gray-600 block">Total CO2 (MT)</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.totalCo2}</p>
              </div>
              <div>
                <span className="text-gray-600 block">EUA Allowances</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.requiredEua}</p>
              </div>
              <div>
                <span className="text-gray-600 block">Surrender Rate ({targetYear})</span>
                <p className="font-bold text-base text-[#0B3B5C]">%{result.phaseIn}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY & ASSUMPTIONS:</p>
            <p>Estimation based on standard Carbon Factors (CF). Assumes 100% of voyages fall under EU MRV scope. Does not account for cargo carried waivers. EUA price is user-provided; actual market volatility will affect final ledger costs.</p>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {isGenerating ? "Generating PDF..." : "Download Cost Report (PDF)"}
        </button>
      )}
    </div>
  );
}
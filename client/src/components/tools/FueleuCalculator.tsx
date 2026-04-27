import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { FUEL_TYPES, FUELEU_WTW_FACTORS, FUELEU_NCV_FACTORS, FUELEU_BASELINE, FUELEU_REDUCTION_FACTORS, FUELEU_PENALTY_PER_TON_CO2 } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated } from "@/lib/analytics";

export function FueleuCalculator() {
  const applicableFuels = FUEL_TYPES.filter(f => ["VLSFO", "HFO", "LNG", "MGO", "Methanol"].includes(f.value));

  const [fuelType, setFuelType] = useState("VLSFO");
  const [annualFuel, setAnnualFuel] = useState("");
  const [targetYear, setTargetYear] = useState("2025");

  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("fueleu");
  }, []);

  const handleCalculate = () => {
    const fuelNum = parseFloat(annualFuel);
    const yearNum = parseInt(targetYear);

    if (isNaN(fuelNum) || fuelNum <= 0) return;

    const wtwFactor = FUELEU_WTW_FACTORS[fuelType];
    const ncvFactor = FUELEU_NCV_FACTORS[fuelType];
    if (!wtwFactor || !ncvFactor) return;

    const reductionFactor = FUELEU_REDUCTION_FACTORS[yearNum] || 0.02;

    const totalEnergyMj = fuelNum * ncvFactor;
    const attainedGhg = wtwFactor;
    const requiredGhg = FUELEU_BASELINE * (1 - reductionFactor);

    let penaltyEur = 0;
    let isCompliant = true;

    if (attainedGhg > requiredGhg) {
      isCompliant = false;
      const excessCO2_t = ((attainedGhg - requiredGhg) * totalEnergyMj) / 1_000_000;
      penaltyEur = excessCO2_t * FUELEU_PENALTY_PER_TON_CO2;
    }

    const finalResult = {
      attainedGhg: attainedGhg.toFixed(2),
      requiredGhg: requiredGhg.toFixed(2),
      totalEnergyGj: (totalEnergyMj / 1000).toFixed(0),
      penaltyEur: penaltyEur > 0 ? penaltyEur.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0",
      isCompliant,
    };

    setResult(finalResult);

    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: isCompliant ? "compliant" : "non-compliant" },
    }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);

    try {
      const fuelData = applicableFuels.find(f => f.value === fuelType);
      await generateReportPdf(
        pdfRef,
        "Adriatica_FuelEU_Preliminary_Report.pdf",
        [
          { label: "Fuel Type (WTT Baseline)", value: fuelData?.label || fuelType },
          { label: "Annual Fuel Consumption (MT)", value: annualFuel },
          { label: "Target Year", value: targetYear },
        ],
        { toolName: "FuelEU Maritime Penalty Predictor" }
      );
      trackPdfGenerated("fueleu");
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
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">FuelEU Penalty Predictor</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Based on EC Delegated Regulation 2023/2543 - Well-to-Wake (WTW) intensity baseline check.
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Fuel Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Primary Fuel Type</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {applicableFuels.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Fuel Consumption (MT)</label>
              <input type="number" value={annualFuel} onChange={e => setAnnualFuel(e.target.value)} placeholder="5000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
              <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {Object.keys(FUELEU_REDUCTION_FACTORS).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Predict FuelEU Status
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm no-break">
          <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY FUELEU ASSESSMENT</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>

          <div className={`p-4 border-2 rounded-sm mb-4 ${result.isCompliant ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            <h4 className={`text-base font-bold mb-2 ${result.isCompliant ? "text-green-800" : "text-red-800"}`}>
              STATUS: {result.isCompliant ? "COMPLIANT" : "NON-COMPLIANT - PENALTY TRIGGERED"}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm no-break">
              <div>
                <span className="text-gray-600 block">Attained GHG (WTW)</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.attainedGhg}</p>
              </div>
              <div>
                <span className="text-gray-600 block">Required Target ({targetYear})</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.requiredGhg}</p>
              </div>
              <div>
                <span className="text-gray-600 block">Total Energy (GJ)</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.totalEnergyGj}</p>
              </div>
            </div>

            {!result.isCompliant && (
              <div className="mt-4 pt-3 border-t border-red-300 bg-white/50 p-3 rounded-sm no-break">
                <h5 className="font-bold text-sm text-red-800 mb-1">ESTIMATED ANNUAL PENALTY</h5>
                <p className="font-mono font-bold text-lg text-[#0B3B5C]">€{result.penaltyEur}</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY & ASSUMPTIONS:</p>
            <p>Uses fixed Well-to-Wake (WTW) factors from EC 2023/2543. Does not account for biofuel blending or RNFBO usage which would lower the attained intensity. Penalty calculated strictly via Regulation (EU) 2023/1804 Art. 14 formula using VLSFO equivalent baseline.</p>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {isGenerating ? "Generating PDF..." : "Download Penalty Report (PDF)"}
        </button>
      )}
    </div>
  );
}
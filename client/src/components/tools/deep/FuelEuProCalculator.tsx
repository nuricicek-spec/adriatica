import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { FUEL_TYPES, FUEL_NCV, FUELEU_BASELINE, FUELEU_REDUCTION_FACTORS, FUELEU_PENALTY_PER_TON_CO2 } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated, trackComplianceFail } from "@/lib/analytics";

interface FuelBlend {
  fuelType: string;
  annualMt: number;
}

interface BlendDetail {
  fuelType: string;
  annualMt: number;
  energyMj: number;
  ghgContribution: number;
}

interface FuelEuProResult {
  attainedGhg: number;
  requiredGhg: number;
  totalEnergyMj: number;
  penaltyEur: number;
  isCompliant: boolean;
  surplus: number;
  blendDetails: BlendDetail[];
}

const WTW_OVERRIDES: Record<string, number> = {
  VLSFO: 94.5, HFO: 94.5, LNG: 93.2, MGO: 94.8, Methanol: 66.3, Ethanol: 70.8,
};

export function FuelEuProCalculator() {
  const [targetYear, setTargetYear] = useState("2030");
  const [blends, setBlends] = useState<FuelBlend[]>([
    { fuelType: "VLSFO", annualMt: 3000 },
    { fuelType: "LNG", annualMt: 1000 },
    { fuelType: "", annualMt: 0 },
  ]);
  const [result, setResult] = useState<FuelEuProResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("fueleu-pro");
  }, []);

  const updateBlend = (index: number, field: keyof FuelBlend, value: string | number) => {
    const newBlends = [...blends];
    newBlends[index] = { ...newBlends[index], [field]: value };
    setBlends(newBlends);
  };

  const getWtw = (fuelType: string): number => WTW_OVERRIDES[fuelType] || 94.5;

  const handleCalculate = () => {
    const yearNum = parseInt(targetYear);
    const validBlends = blends.filter((b) => b.fuelType && b.annualMt > 0);
    if (validBlends.length === 0) return;

    let totalEnergyMj = 0;
    let totalGhgNumerator = 0;

    const blendDetails = validBlends.map((b) => {
      const ncv = FUEL_NCV[b.fuelType] || 40200;
      const wtw = getWtw(b.fuelType);
      const energyMj = b.annualMt * ncv;
      const ghgContribution = b.annualMt * ncv * wtw;
      totalEnergyMj += energyMj;
      totalGhgNumerator += ghgContribution;
      return { fuelType: b.fuelType, annualMt: b.annualMt, energyMj, ghgContribution };
    });

    const attainedGhg = totalGhgNumerator / totalEnergyMj;
    const reductionFactor = FUELEU_REDUCTION_FACTORS[yearNum] || 0.02;
    const requiredGhg = FUELEU_BASELINE * (1 - reductionFactor);

    let penalty = 0;
    let surplus = 0;
    let isCompliant = true;

    if (attainedGhg > requiredGhg) {
      isCompliant = false;
      const excessCO2_t = ((attainedGhg - requiredGhg) * totalEnergyMj) / 1_000_000;
      penalty = excessCO2_t * FUELEU_PENALTY_PER_TON_CO2;
    } else {
      surplus = ((requiredGhg - attainedGhg) * totalEnergyMj) / 1_000_000;
    }

    setResult({
      attainedGhg: parseFloat(attainedGhg.toFixed(2)),
      requiredGhg: parseFloat(requiredGhg.toFixed(2)),
      totalEnergyMj,
      penaltyEur: Math.round(penalty),
      isCompliant,
      surplus: parseFloat(surplus.toFixed(2)),
      blendDetails,
    });

    if (!isCompliant) trackComplianceFail("fueleu-pro");
    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status: isCompliant ? "compliant" : "non-compliant" } }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);
    try {
      await generateReportPdf(
        pdfRef,
        "Adriatica_FuelEU_Pro_Report.pdf",
        [
          { label: "Target Year", value: targetYear },
          { label: "Attained GHG", value: result.attainedGhg.toString() },
          { label: "Required GHG", value: result.requiredGhg.toString() },
          ...result.blendDetails.map((b, i) => ({ label: `Fuel ${i + 1}: ${b.fuelType}`, value: `${b.annualMt} MT` })),
        ],
        { toolName: "FuelEU Pro Multi-Fuel Calculator" }
      );
      trackPdfGenerated("fueleu-pro");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") alert("PDF content is too large.");
      else alert("An error occurred while generating the PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">FuelEU Pro — Multi-Fuel Compliance</h2>
      <p className="text-xs text-muted-foreground mb-6">Calculate blended fuel GHG intensity per EC 2023/2543. Optimize your fuel mix for compliance and surplus banking.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Target Year</h3>
          <select value={targetYear} onChange={(e) => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
            {Object.keys(FUELEU_REDUCTION_FACTORS).map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Fuel Blend Composition</h3>
          {blends.map((blend, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type {index + 1}</label>
                <select value={blend.fuelType} onChange={(e) => updateBlend(index, "fuelType", e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
                  <option value="">Select fuel...</option>
                  {FUEL_TYPES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Consumption (MT)</label>
                <input type="number" value={blend.annualMt || ""} onChange={(e) => updateBlend(index, "annualMt", parseFloat(e.target.value) || 0)} placeholder="0" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Blended GHG Intensity
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm break-inside-avoid">
          <h3 className="text-lg font-bold text-[#0B3B5C]">FUELEU PRO MULTI-FUEL ASSESSMENT</h3>
          <div className={`p-4 border-2 rounded-sm mb-4 ${result.isCompliant ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            <h4 className={`text-base font-bold mb-2 ${result.isCompliant ? "text-green-800" : "text-red-800"}`}>
              STATUS: {result.isCompliant ? "COMPLIANT — SURPLUS AVAILABLE" : "NON-COMPLIANT — PENALTY TRIGGERED"}
            </h4>
            <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm break-inside-avoid">
              <div><span className="text-gray-600 block">Attained GHG</span><p className="font-bold text-base text-[#0B3B5C]">{result.attainedGhg}</p><span className="text-[10px] text-gray-500">g CO₂eq/MJ</span></div>
              <div><span className="text-gray-600 block">Required ({targetYear})</span><p className="font-bold text-base text-[#0B3B5C]">{result.requiredGhg}</p><span className="text-[10px] text-gray-500">g CO₂eq/MJ</span></div>
              <div><span className="text-gray-600 block">{result.isCompliant ? "Surplus" : "Penalty"}</span><p className="font-bold text-base text-[#0B3B5C]">{result.isCompliant ? `${result.surplus} t` : `€${result.penaltyEur.toLocaleString()}`}</p></div>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-xs text-gray-700 mb-4">
            <p className="font-bold text-[#0B3B5C] mb-2">BLEND BREAKDOWN:</p>
            {result.blendDetails.map((b, i) => (
              <div key={i} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
                <span>{b.fuelType}</span>
                <span>{b.annualMt} MT ({((b.energyMj / result.totalEnergyMj) * 100).toFixed(1)}% energy)</span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 p-3 rounded-sm border border-blue-200 text-xs text-blue-800">
            <p className="font-bold mb-1">OPTIMIZATION NOTE:</p>
            <p>{result.isCompliant ? `Your blend generates ${result.surplus} tonnes CO₂eq surplus eligible for banking.` : `To achieve compliance, increase lower-GHG fuel share (LNG, Methanol) or add RNFBO/biofuel credits.`}</p>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50">
          {isGenerating ? "Generating PDF..." : "Download Pro Report (PDF)"}
        </button>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { FUEL_TYPES, ETS_PHASE_IN_RATES } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated } from "@/lib/analytics";

interface FleetVesselInput {
  id: string;
  name: string;
  meFuel: string;
  annualFuel: number;
  targetYear: number;
}

interface FleetResult {
  vessels: { name: string; co2: number; eua: number; cost: number }[];
  totalCo2: number;
  totalEua: number;
  totalCost: number;
  hedgingCost: number;
  netCost: number;
}

export function EtsFleetCalculator() {
  const [vessels, setVessels] = useState<FleetVesselInput[]>([
    { id: "1", name: "Vessel A", meFuel: "VLSFO", annualFuel: 3500, targetYear: 2026 },
    { id: "2", name: "Vessel B", meFuel: "HFO", annualFuel: 5000, targetYear: 2026 },
  ]);
  const [euaPrice, setEuaPrice] = useState("85");
  const [hedgingRatio, setHedgingRatio] = useState("0");
  const [hedgingPremium, setHedgingPremium] = useState("5");
  const [result, setResult] = useState<FleetResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("ets-fleet");
  }, []);

  const updateVessel = (index: number, field: keyof FleetVesselInput, value: string | number) => {
    const newVessels = [...vessels];
    newVessels[index] = { ...newVessels[index], [field]: value };
    setVessels(newVessels);
  };

  const handleCalculate = () => {
    const priceNum = parseFloat(euaPrice) || 85;
    const hedgeRatio = parseFloat(hedgingRatio) || 0;
    const hedgePremium = parseFloat(hedgingPremium) || 5;

    const vesselResults = vessels.map((v) => {
      const fuelData = FUEL_TYPES.find((f) => f.value === v.meFuel);
      const cf = fuelData?.cf || 3.106;
      const phaseIn = ETS_PHASE_IN_RATES[v.targetYear] || 1.0;
      const co2 = v.annualFuel * cf;
      const eua = co2 * phaseIn;
      const cost = eua * priceNum;
      return { name: v.name, co2: Math.round(co2), eua: Math.round(eua), cost: Math.round(cost) };
    });

    const totalCo2 = vesselResults.reduce((sum, v) => sum + v.co2, 0);
    const totalEua = vesselResults.reduce((sum, v) => sum + v.eua, 0);
    const totalCost = vesselResults.reduce((sum, v) => sum + v.cost, 0);
    const hedgingCost = totalCost * (hedgeRatio / 100) * (hedgePremium / 100);
    const netCost = totalCost + hedgingCost;

    setResult({ vessels: vesselResults, totalCo2, totalEua, totalCost, hedgingCost: Math.round(hedgingCost), netCost: Math.round(netCost) });
    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status: netCost > 500000 ? "non-compliant" : "compliant" } }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);
    try {
      await generateReportPdf(
        pdfRef,
        "Adriatica_ETS_Fleet_Report.pdf",
        [
          { label: "Fleet Size", value: vessels.length.toString() },
          { label: "EUA Price", value: `€${euaPrice}/ton` },
          { label: "Total CO2", value: result.totalCo2.toLocaleString() },
          { label: "Total EUA", value: result.totalEua.toLocaleString() },
          { label: "Net Cost", value: `€${result.netCost.toLocaleString()}` },
        ],
        { toolName: "EU ETS Fleet Exposure Calculator" }
      );
      trackPdfGenerated("ets-fleet");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") alert("PDF too large.");
      else alert("PDF generation error.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">EU ETS Fleet Exposure</h2>
      <p className="text-xs text-muted-foreground mb-6">Multi-vessel carbon cost forecasting with hedging scenarios.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Fleet Composition</h3>
          {vessels.map((v, i) => (
            <div key={v.id} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 p-3 border rounded-sm bg-white">
              <div>
                <label className="block text-[10px] font-medium text-muted-foreground mb-1">Name</label>
                <input value={v.name} onChange={(e) => updateVessel(i, "name", e.target.value)} className="w-full p-1.5 border rounded-sm text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-muted-foreground mb-1">Fuel</label>
                <select value={v.meFuel} onChange={(e) => updateVessel(i, "meFuel", e.target.value)} className="w-full p-1.5 border rounded-sm text-sm">
                  {FUEL_TYPES.map((f) => <option key={f.value} value={f.value}>{f.value}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-muted-foreground mb-1">Annual Fuel (MT)</label>
                <input type="number" value={v.annualFuel} onChange={(e) => updateVessel(i, "annualFuel", parseFloat(e.target.value) || 0)} className="w-full p-1.5 border rounded-sm text-sm" />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-muted-foreground mb-1">Year</label>
                <select value={v.targetYear} onChange={(e) => updateVessel(i, "targetYear", parseInt(e.target.value))} className="w-full p-1.5 border rounded-sm text-sm">
                  {Object.keys(ETS_PHASE_IN_RATES).map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Market & Hedging</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">EUA Price (€/ton)</label>
              <input type="number" value={euaPrice} onChange={(e) => setEuaPrice(e.target.value)} className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Hedging Ratio (%)</label>
              <input type="number" value={hedgingRatio} onChange={(e) => setHedgingRatio(e.target.value)} className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Hedging Premium (%)</label>
              <input type="number" value={hedgingPremium} onChange={(e) => setHedgingPremium(e.target.value)} className="w-full p-2 border rounded-sm text-base" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Fleet Exposure
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm break-inside-avoid">
          <h3 className="text-lg font-bold text-[#0B3B5C]">FLEET ETS EXPOSURE REPORT</h3>
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-50 border-b-2 border-border">
                  <th className="text-left p-2">Vessel</th>
                  <th className="text-right p-2">CO₂ (t)</th>
                  <th className="text-right p-2">EUA</th>
                  <th className="text-right p-2">Cost (€)</th>
                </tr>
              </thead>
              <tbody>
                {result.vessels.map((v, i) => (
                  <tr key={i} className="border-b border-border/20">
                    <td className="p-2 font-medium">{v.name}</td>
                    <td className="p-2 text-right">{v.co2.toLocaleString()}</td>
                    <td className="p-2 text-right">{v.eua.toLocaleString()}</td>
                    <td className="p-2 text-right">€{v.cost.toLocaleString()}</td>
                  </tr>
                ))}
                <tr className="bg-neutral-50 font-bold">
                  <td className="p-2">TOTAL</td>
                  <td className="p-2 text-right">{result.totalCo2.toLocaleString()}</td>
                  <td className="p-2 text-right">{result.totalEua.toLocaleString()}</td>
                  <td className="p-2 text-right">€{result.totalCost.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-sm">
              <span className="text-xs text-yellow-800 block">Hedging Cost</span>
              <p className="font-bold text-lg text-[#0B3B5C]">€{result.hedgingCost.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
              <span className="text-xs text-primary block">Net Total Cost</span>
              <p className="font-bold text-lg text-[#0B3B5C]">€{result.netCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50">
          {isGenerating ? "Generating PDF..." : "Download Fleet Report (PDF)"}
        </button>
      )}
    </div>
  );
}
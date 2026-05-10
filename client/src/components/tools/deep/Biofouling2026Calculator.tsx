import { useState, useRef, useEffect } from "react";
import { trackToolUsage } from "@/lib/analytics";
import { AlertTriangle, Shield, Droplets } from "lucide-react";

interface BioResult {
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  complianceReady: boolean;
  ghgImpactPercent: number;
  recommendations: string[];
}

export function Biofouling2026Calculator() {
  const [idleDays, setIdleDays] = useState("");
  const [tradingRegion, setTradingRegion] = useState("temperate");
  const [coatingAge, setCoatingAge] = useState("");
  const [lastCleaning, setLastCleaning] = useState("");
  const [nicheCleaned, setNicheCleaned] = useState(false);
  const [result, setResult] = useState<BioResult | null>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("biofouling");
  }, []);

  const handleCalculate = () => {
    const idle = parseInt(idleDays) || 0;
    const coating = parseInt(coatingAge) || 0;
    const cleaning = parseInt(lastCleaning) || 0;

    let score = 0;
    score += Math.min(idle * 2, 30);
    score += tradingRegion === "tropical" ? 25 : tradingRegion === "temperate" ? 15 : 5;
    score += Math.min(coating * 2, 25);
    score += cleaning > 24 ? 20 : cleaning > 12 ? 10 : 0;
    score += nicheCleaned ? 0 : 10;

    const riskLevel = score > 60 ? "high" : score > 35 ? "medium" : "low";
    const complianceReady = score < 50 && nicheCleaned && cleaning < 18;
    const ghgImpact = Math.min(3 + (score / 100) * 12, 15);

    const recommendations: string[] = [];
    if (idle > 14) recommendations.push("Reduce idle time or implement in-water cleaning schedule");
    if (coating > 36) recommendations.push("Plan hull recoating at next dry-dock");
    if (cleaning > 12) recommendations.push("Schedule in-water cleaning");
    if (!nicheCleaned) recommendations.push("Clean niche areas (sea chests, thrusters, rudders)");
    if (tradingRegion === "tropical") recommendations.push("Increase cleaning frequency for tropical waters");

    setResult({
      riskScore: score,
      riskLevel,
      complianceReady,
      ghgImpactPercent: parseFloat(ghgImpact.toFixed(1)),
      recommendations,
    });

    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status: complianceReady ? "compliant" : "non-compliant" } }));
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Biofouling 2026 Readiness</h2>
      <p className="text-xs text-muted-foreground mb-6">IMO Biofouling Management Regulations (MEPC.331(76)) compliance assessment.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel & Operating Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Idle Days (last 6 months)</label>
              <input type="number" value={idleDays} onChange={(e) => setIdleDays(e.target.value)} placeholder="e.g., 30" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Primary Trading Region</label>
              <select value={tradingRegion} onChange={(e) => setTradingRegion(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base">
                <option value="tropical">Tropical (&gt;25°C SST)</option>
                <option value="temperate">Temperate (15-25°C)</option>
                <option value="cold">Cold (&lt;15°C)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Hull Coating Age (months)</label>
              <input type="number" value={coatingAge} onChange={(e) => setCoatingAge(e.target.value)} placeholder="e.g., 24" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Last In-Water Cleaning (months ago)</label>
              <input type="number" value={lastCleaning} onChange={(e) => setLastCleaning(e.target.value)} placeholder="e.g., 6" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={nicheCleaned} onChange={(e) => setNicheCleaned(e.target.checked)} className="text-primary" />
                <span className="text-sm text-[#0B3B5C]">Niche areas cleaned (sea chests, thrusters, rudders)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Assess Biofouling Risk
      </button>

      {result !== null && (
        <div className="mt-6 space-y-4">
          <div className={`p-4 border-2 rounded-sm ${result.riskLevel === "high" ? "border-red-500 bg-red-50" : result.riskLevel === "medium" ? "border-yellow-500 bg-yellow-50" : "border-green-500 bg-green-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              {result.riskLevel === "high" ? <AlertTriangle className="h-6 w-6 text-red-600" /> : result.riskLevel === "medium" ? <Droplets className="h-6 w-6 text-yellow-600" /> : <Shield className="h-6 w-6 text-green-600" />}
              <div>
                <h4 className={`font-bold ${result.riskLevel === "high" ? "text-red-800" : result.riskLevel === "medium" ? "text-yellow-800" : "text-green-800"}`}>
                  RISK LEVEL: {result.riskLevel.toUpperCase()} ({result.riskScore}/100)
                </h4>
                <p className="text-xs text-gray-600">GHG Impact: +{result.ghgImpactPercent}% fuel consumption</p>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-sm border ${result.complianceReady ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
            <h5 className="font-bold text-sm mb-2">IMO 2026 Compliance: {result.complianceReady ? "READY" : "ACTION REQUIRED"}</h5>
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
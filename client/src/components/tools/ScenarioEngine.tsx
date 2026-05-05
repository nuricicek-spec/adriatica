import { useState, useEffect } from "react";
import { useVesselProfile } from "@/hooks/useVesselProfile";
import { SCENARIOS } from "@/data/scenarios";
import { VESSEL_TYPES, FUEL_TYPES } from "@/data/calculators";
import { trackToolUsage } from "@/lib/analytics";
import { calculateEEXI, calculateCII, calculateETS, calculateFuelEU } from "@/data/calculators";
import { ArrowRight, ArrowLeft, Zap, Fuel, Gauge, Anchor, BarChart3 } from "lucide-react";

type Step = "mode" | "quick" | "profile" | "scenarios" | "results";
type ComplianceStatus = "idle" | "compliant" | "non-compliant";

interface ScenarioResult {
  scenarioId: string;
  label: string;
  eexi: { attained: number; required: number; compliant: boolean };
  cii: { rating: string; attained: number; required: number };
  ets: { cost: number; co2: number };
  fueleu: { penalty: number; compliant: boolean };
}

function estimateAnnualFuel(dwt: number): number {
  if (dwt <= 0) return 450;
  return Math.round(450 + (dwt / 50000) * 3050);
}

function estimateAnnualDistance(dwt: number): number {
  if (dwt <= 0) return 15000;
  return Math.round(20000 - (dwt / 50000) * 5000);
}

export function ScenarioEngine() {
  const { profile, setField, setProfile } = useVesselProfile();
  const [step, setStep] = useState<Step>("mode");
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["current"]);
  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>("idle");
  const [hasTracked, setHasTracked] = useState(false);
  const [quickLength, setQuickLength] = useState("");
  const [quickEngineType, setQuickEngineType] = useState("slow");
  const [euaPrice, setEuaPrice] = useState(65);

  useEffect(() => {
    if (hasTracked) return;
    setHasTracked(true);
    trackToolUsage("scenario");
  }, [hasTracked]);

  const runCalculations = () => {
    const newResults: ScenarioResult[] = selectedScenarios.map((scenarioId) => {
      const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
      let scenarioProfile = { ...profile };
      if (scenario.compute) {
        const computed = scenario.compute(scenarioProfile);
        scenarioProfile = { ...scenarioProfile, ...computed };
      }
      if (scenario.changes) {
        scenarioProfile = { ...scenarioProfile, ...scenario.changes };
      }
      const eexiResult = calculateEEXI(scenarioProfile);
      const ciiResult = calculateCII(scenarioProfile);
      const etsResult = calculateETS(scenarioProfile, euaPrice);
      const fueleuResult = calculateFuelEU(scenarioProfile);
      return {
        scenarioId,
        label: scenario.label,
        eexi: eexiResult,
        cii: ciiResult,
        ets: etsResult,
        fueleu: fueleuResult,
      };
    });
    setResults(newResults);
    const hasNonCompliant = newResults.some(
      (r) => !r.eexi.compliant || r.cii.rating === "D" || r.cii.rating === "E" || !r.fueleu.compliant
    );
    const status = hasNonCompliant ? "non-compliant" : "compliant";
    setComplianceStatus(status);
    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status } }));
  };

  const handleQuickContinue = () => {
    const length = parseFloat(quickLength) || 0;
    if (length <= 0) return;
    const estimatedDwt = Math.round(length * 10);
    const estimatedMcr = Math.round(length * 40);
    const estimatedVref = parseFloat((length * 0.28).toFixed(1));
    const estimatedSfc = quickEngineType === "slow" ? 175 : 195;

    setProfile({
      vesselType: "bulkCarrier",
      dwt: estimatedDwt,
      meMcr: estimatedMcr,
      vref: estimatedVref,
      meSfc: estimatedSfc,
      meFuel: "VLSFO",
      auxPower: Math.round(estimatedMcr * 0.15),
      auxSfc: 215,
      hasPto: false,
      ptoPower: 0,
      ptoEff: 1.0,
      targetYear: 2026,
      annualFuel: estimateAnnualFuel(estimatedDwt),
      annualDistance: estimateAnnualDistance(estimatedDwt),
    });

    setStep("scenarios");
  };

  const vesselTypeLabel = VESSEL_TYPES.find((v) => v.value === profile.vesselType)?.label || profile.vesselType;

  if (step === "mode") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Scenario Engine</h2>
        <p className="text-xs text-muted-foreground mb-6">
          Compare regulatory outcomes across multiple configurations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep("quick")}
            className="p-6 border-2 border-primary/20 rounded-sm hover:border-primary hover:bg-primary/5 transition text-left group"
          >
            <Zap className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="font-display font-bold text-[#0B3B5C] mb-1">Quick Estimate</h3>
            <p className="text-xs text-muted-foreground">3 questions → auto-filled values → instant comparison</p>
          </button>
          <button
            onClick={() => setStep("profile")}
            className="p-6 border-2 border-primary/20 rounded-sm hover:border-primary hover:bg-primary/5 transition text-left group"
          >
            <Gauge className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="font-display font-bold text-[#0B3B5C] mb-1">Full Profile</h3>
            <p className="text-xs text-muted-foreground">All technical parameters → precise vessel-specific results</p>
          </button>
        </div>
      </div>
    );
  }

  if (step === "quick") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("mode")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Quick Estimate</h2>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Basic Info</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Approximate Length (m)</label>
                <input
                  type="number"
                  value={quickLength}
                  onChange={(e) => setQuickLength(e.target.value)}
                  placeholder="50"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Engine Type</label>
                <select
                  value={quickEngineType}
                  onChange={(e) => setQuickEngineType(e.target.value)}
                  className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none"
                >
                  <option value="slow">Slow-Speed 2-Stroke (SFC ~175 g/kWh)</option>
                  <option value="medium">Medium-Speed 4-Stroke (SFC ~195 g/kWh)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-sm">
            <h4 className="text-sm font-bold text-blue-800 mb-2">Auto-Filled Values</h4>
            <p className="text-[10px] text-blue-600 mb-2">
              * DWT, MCR, Vref, and SFC estimated from length. Annual fuel & distance estimated from DWT.
            </p>
            {quickLength && !isNaN(parseFloat(quickLength)) && (
              <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                <div>DWT: {Math.round(parseFloat(quickLength) * 10)}</div>
                <div>MCR: {Math.round(parseFloat(quickLength) * 40)} kW</div>
                <div>Vref: {(parseFloat(quickLength) * 0.28).toFixed(1)} kn</div>
                <div>SFC: {quickEngineType === "slow" ? 175 : 195} g/kWh</div>
                <div>Annual Fuel: {estimateAnnualFuel(parseFloat(quickLength) * 10)} MT</div>
                <div>Avg. Distance: {estimateAnnualDistance(parseFloat(quickLength) * 10)} NM</div>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleQuickContinue}
          className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6 flex items-center justify-center gap-2"
        >
          Continue to Scenarios <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (step === "profile") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("mode")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Full Profile</h2>
        </div>
        <div className="space-y-6">
          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
                <select
                  value={profile.vesselType}
                  onChange={(e) => setField("vesselType", e.target.value)}
                  className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none"
                >
                  {VESSEL_TYPES.map((v) => (
                    <option key={v.value} value={v.value}>{v.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Deadweight (DWT)</label>
                <input
                  type="number"
                  value={profile.dwt || ""}
                  onChange={(e) => setField("dwt", parseFloat(e.target.value) || 0)}
                  placeholder="50000"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
                <input
                  type="number"
                  value={profile.targetYear || ""}
                  onChange={(e) => setField("targetYear", parseInt(e.target.value) || 2026)}
                  placeholder="2026"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Main Engine (ME)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">MCR (kW)</label>
                <input
                  type="number"
                  value={profile.meMcr || ""}
                  onChange={(e) => setField("meMcr", parseFloat(e.target.value) || 0)}
                  placeholder="8000"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type</label>
                <select
                  value={profile.meFuel}
                  onChange={(e) => setField("meFuel", e.target.value)}
                  className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none"
                >
                  {FUEL_TYPES.map((f) => (
                    <option key={f.value} value={f.value}>{f.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">SFC (g/kWh)</label>
                <input
                  type="number"
                  value={profile.meSfc || ""}
                  onChange={(e) => setField("meSfc", parseFloat(e.target.value) || 0)}
                  placeholder="190"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Vref (Knots)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.vref || ""}
                  onChange={(e) => setField("vref", parseFloat(e.target.value) || 0)}
                  placeholder="14.5"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Auxiliary & PTO</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Aux Power (kW)</label>
                <input
                  type="number"
                  value={profile.auxPower || ""}
                  onChange={(e) => setField("auxPower", parseFloat(e.target.value) || 0)}
                  placeholder="500"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Aux SFC (g/kWh)</label>
                <input
                  type="number"
                  value={profile.auxSfc || ""}
                  onChange={(e) => setField("auxSfc", parseFloat(e.target.value) || 0)}
                  placeholder="215"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="ptoCheck"
                  checked={profile.hasPto}
                  onChange={(e) => setField("hasPto", e.target.checked)}
                  className="rounded border-border text-primary"
                />
                <label htmlFor="ptoCheck" className="text-sm font-medium text-[#0B3B5C]">Shaft Generator / PTO</label>
              </div>
              {profile.hasPto && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">PTO Power (kW)</label>
                    <input
                      type="number"
                      value={profile.ptoPower || ""}
                      onChange={(e) => setField("ptoPower", parseFloat(e.target.value) || 0)}
                      placeholder="1000"
                      className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">PTO Efficiency</label>
                    <input
                      type="number"
                      step="0.1"
                      value={profile.ptoEff || ""}
                      onChange={(e) => setField("ptoEff", parseFloat(e.target.value) || 0)}
                      placeholder="1.0"
                      className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Operational Data & EU ETS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Fuel (MT)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.annualFuel || ""}
                  onChange={(e) => setField("annualFuel", parseFloat(e.target.value) || 0)}
                  placeholder="5000"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Distance (NM)</label>
                <input
                  type="number"
                  value={profile.annualDistance || ""}
                  onChange={(e) => setField("annualDistance", parseFloat(e.target.value) || 0)}
                  placeholder="15000"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">EUA Price (€/ton CO₂)</label>
                <input
                  type="number"
                  step="0.1"
                  value={euaPrice}
                  onChange={(e) => setEuaPrice(parseFloat(e.target.value) || 65)}
                  placeholder="65"
                  className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none"
                />
                <p className="text-[10px] text-muted-foreground mt-1">* Default is 65 €. Update for current market price.</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setStep("scenarios")}
          className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6 flex items-center justify-center gap-2"
        >
          Continue to Scenarios <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  if (step === "scenarios") {
    const canAddMore = selectedScenarios.length < 4;
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("mode")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Select Scenarios</h2>
        </div>
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-sm text-xs text-yellow-800">
          <p className="font-bold mb-1">Selection Rules:</p>
          <p>• "Current" is always included (baseline)</p>
          <p>• Select up to 3 additional scenarios to compare</p>
          <p>• Selected: {selectedScenarios.length}/4</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {SCENARIOS.map((scenario) => {
            const isSelected = selectedScenarios.includes(scenario.id);
            const isCurrent = scenario.id === "current";
            const Icon =
              scenario.icon === "fuel" ? Fuel
              : scenario.icon === "speed" ? Gauge
              : scenario.icon === "power" ? Zap
              : Anchor;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  if (isCurrent) return;
                  if (isSelected) setSelectedScenarios((prev) => prev.filter((id) => id !== scenario.id));
                  else if (canAddMore) setSelectedScenarios((prev) => [...prev, scenario.id]);
                }}
                disabled={isCurrent}
                className={`p-4 border-2 rounded-sm text-left transition flex items-start gap-3 ${
                  isSelected ? "border-primary bg-primary/5" : "border-border/20 hover:border-primary/30"
                } ${isCurrent ? "opacity-75 cursor-default" : ""} ${
                  !isSelected && !canAddMore && !isCurrent ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-bold ${isSelected ? "text-[#0B3B5C]" : "text-muted-foreground"}`}>
                      {scenario.label}
                    </h4>
                    {isSelected && !isCurrent && (
                      <span className="text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-sm">Selected</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                </div>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            runCalculations();
            setStep("results");
          }}
          disabled={selectedScenarios.length === 0}
          className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <BarChart3 size={16} /> Run Comparison ({selectedScenarios.length} scenarios)
        </button>
      </div>
    );
  }

  if (step === "results") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("scenarios")} className="text-muted-foreground hover:text-primary">
            <ArrowLeft size={18} />
          </button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Scenario Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b-2 border-border">
                <th className="text-left p-3 font-bold text-[#0B3B5C]">Metric</th>
                {results.map((r) => (
                  <th
                    key={r.scenarioId}
                    className={`p-3 text-center font-bold ${r.scenarioId === "current" ? "text-[#0B3B5C]" : "text-primary"}`}
                  >
                    {r.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <tr>
                <td className="p-3 font-medium text-muted-foreground">EEXI Attained</td>
                {results.map((r) => (
                  <td key={r.scenarioId} className={`p-3 text-center ${r.eexi.compliant ? "text-green-600" : "text-red-600"}`}>
                    {r.eexi.attained.toFixed(2)}{!r.eexi.compliant && " ⚠️"}
                  </td>
                ))}
              </tr>
              <tr className="bg-neutral-50/50">
                <td className="p-3 font-medium text-muted-foreground">EEXI Required</td>
                {results.map((r) => (
                  <td key={r.scenarioId} className="p-3 text-center text-muted-foreground">
                    {r.eexi.required.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">CII Rating</td>
                {results.map((r) => (
                  <td
                    key={r.scenarioId}
                    className={`p-3 text-center font-bold ${
                      r.cii.rating === "A" || r.cii.rating === "B" ? "text-green-600"
                      : r.cii.rating === "C" ? "text-yellow-600"
                      : "text-red-600"
                    }`}
                  >
                    {r.cii.rating}
                  </td>
                ))}
              </tr>
              <tr className="bg-neutral-50/50">
                <td className="p-3 font-medium text-muted-foreground">ETS Cost (€)</td>
                {results.map((r) => (
                  <td key={r.scenarioId} className="p-3 text-center">€{r.ets.cost.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-medium text-muted-foreground">FuelEU Penalty (€)</td>
                {results.map((r) => (
                  <td
                    key={r.scenarioId}
                    className={`p-3 text-center ${r.fueleu.penalty > 0 ? "text-red-600 font-bold" : "text-green-600"}`}
                  >
                    {r.fueleu.penalty > 0 ? `€${r.fueleu.penalty.toLocaleString()}` : "✓ Compliant"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-sm">
          <h3 className="font-bold text-[#0B3B5C] mb-2">Executive Summary</h3>
          <p className="text-sm text-muted-foreground">
            Comparing {results.length} scenarios for {vesselTypeLabel} ({profile.dwt} DWT).
            {complianceStatus === "non-compliant"
              ? " Non-compliant scenarios detected. See red indicators above."
              : " All scenarios meet current regulatory thresholds."}
          </p>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setStep("mode")}
            className="flex-1 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition text-sm"
          >
            New Comparison
          </button>
          <button
            onClick={() => setStep("scenarios")}
            className="flex-1 py-2.5 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition text-sm"
          >
            Modify Scenarios
          </button>
        </div>
      </div>
    );
  }

  return null;
}
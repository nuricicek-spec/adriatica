import { useState, useEffect } from "react";
import { useVesselProfile } from "@/hooks/useVesselProfile";
import { SCENARIOS } from "@/data/scenarios";
import { VESSEL_TYPES, FUEL_TYPES } from "@/data/calculators";
import { trackToolUsage } from "@/lib/analytics";
import { ArrowRight, ArrowLeft, Zap, Fuel, Gauge, Anchor, RotateCcw } from "lucide-react";

type Step = "mode" | "profile" | "scenarios" | "results";
type ComplianceStatus = "idle" | "compliant" | "non-compliant";

export function ScenarioEngine() {
  const { profile, setField } = useVesselProfile();
  const [step, setStep] = useState<Step>("mode");
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(["current", "fuel-lng"]);
  const [results, setResults] = useState<any[]>([]);
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>("idle");

  const [hasTracked, setHasTracked] = useState(false);
  useEffect(() => {
    if (hasTracked) return;
    setHasTracked(true);
    trackToolUsage("scenario");
  }, [hasTracked]);

  // Step değişiminde compliance status güncelle
  useEffect(() => {
    if (step === "results") {
      const hasNonCompliant = results.some(r => r.status === "non-compliant");
      const status = hasNonCompliant ? "non-compliant" : "compliant";
      setComplianceStatus(status);
      window.dispatchEvent(new CustomEvent("tool_compliance_update", {
        detail: { status }
      }));
    } else {
      setComplianceStatus("idle");
      window.dispatchEvent(new CustomEvent("tool_compliance_update", {
        detail: { status: "idle" }
      }));
    }
  }, [step, results]);

  // Step 1: Mode Selection
  if (step === "mode") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Scenario Engine</h2>
        <p className="text-xs text-muted-foreground mb-6">Compare regulatory outcomes across multiple configurations</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={() => setStep("profile")} className="p-6 border-2 border-primary/20 rounded-sm hover:border-primary hover:bg-primary/5 transition text-left group">
            <Zap className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="font-display font-bold text-[#0B3B5C] mb-1">Quick Estimate</h3>
            <p className="text-xs text-muted-foreground">Use default industry values for rapid comparison. Override any field as needed.</p>
          </button>
          <button onClick={() => setStep("profile")} className="p-6 border-2 border-primary/20 rounded-sm hover:border-primary hover:bg-primary/5 transition text-left group">
            <Gauge className="h-8 w-8 text-primary mb-3 group-hover:scale-110 transition" />
            <h3 className="font-display font-bold text-[#0B3B5C] mb-1">Full Profile</h3>
            <p className="text-xs text-muted-foreground">Enter all technical parameters manually. Precise vessel-specific results.</p>
          </button>
        </div>

        {profile.vesselType && profile.dwt > 0 && (
          <div className="mt-6 p-4 bg-neutral-50 rounded-sm border border-border/20">
            <p className="text-xs text-muted-foreground mb-2">Saved vessel data detected from previous calculations.</p>
            <button onClick={() => setStep("scenarios")} className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              Skip to Scenario Selection <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    );
  }

  // Step 2: Profile Input
  if (step === "profile") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("mode")} className="text-muted-foreground hover:text-primary"><ArrowLeft size={18} /></button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Vessel Profile</h2>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Basic Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
                <select value={profile.vesselType} onChange={e => setField("vesselType", e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                  {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">DWT</label>
                <input type="number" value={profile.dwt || ""} onChange={e => setField("dwt", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
                <input type="number" value={profile.targetYear} onChange={e => setField("targetYear", parseInt(e.target.value) || 2026)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">MCR (kW)</label>
                <input type="number" value={profile.meMcr || ""} onChange={e => setField("meMcr", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type</label>
                <select value={profile.meFuel} onChange={e => setField("meFuel", e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                  {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">SFC (g/kWh)</label>
                <input type="number" value={profile.meSfc || ""} onChange={e => setField("meSfc", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-muted-foreground mb-1">Vref (knots)</label>
                <input type="number" step="0.1" value={profile.vref || ""} onChange={e => setField("vref", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Operational Data (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Fuel (MT)</label>
                <input type="number" value={profile.annualFuel || ""} onChange={e => setField("annualFuel", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Distance (NM)</label>
                <input type="number" value={profile.annualDistance || ""} onChange={e => setField("annualDistance", parseFloat(e.target.value) || 0)} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => setStep("scenarios")} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6 flex items-center justify-center gap-2">
          Continue to Scenarios <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // Step 3: Scenario Selection
  if (step === "scenarios") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("profile")} className="text-muted-foreground hover:text-primary"><ArrowLeft size={18} /></button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Select Scenarios</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {SCENARIOS.map(scenario => {
            const isSelected = selectedScenarios.includes(scenario.id);
            const Icon = scenario.icon === "fuel" ? Fuel : scenario.icon === "speed" ? Gauge : scenario.icon === "power" ? Zap : Anchor;
            return (
              <button
                key={scenario.id}
                onClick={() => {
                  if (scenario.id === "current") return;
                  setSelectedScenarios(prev => isSelected ? prev.filter(id => id !== scenario.id) : [...prev, scenario.id]);
                }}
                disabled={scenario.id === "current"}
                className={`p-4 border-2 rounded-sm text-left transition flex items-start gap-3 ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border/20 hover:border-primary/30"
                } ${scenario.id === "current" ? "opacity-75" : ""}`}
              >
                <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <h4 className={`text-sm font-bold ${isSelected ? "text-[#0B3B5C]" : "text-muted-foreground"}`}>{scenario.label}</h4>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => {
            // Placeholder: Gerçek hesaplama sonraki adımda eklenecek
            setResults(selectedScenarios.map(id => ({ scenarioId: id, status: "compliant" })));
            setStep("results");
          }}
          className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition flex items-center justify-center gap-2"
        >
          Run Comparison <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  // Step 4: Results
  if (step === "results") {
    return (
      <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <button onClick={() => setStep("scenarios")} className="text-muted-foreground hover:text-primary"><ArrowLeft size={18} /></button>
          <h2 className="font-display text-xl font-bold text-[#0B3B5C]">Scenario Comparison</h2>
        </div>

        <div className="p-8 bg-neutral-50 rounded-sm border border-border/20 text-center">
          <RotateCcw className="h-12 w-12 text-primary/30 mx-auto mb-4" />
          <h3 className="font-display font-bold text-[#0B3B5C] mb-2">Results Engine Active</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
            Scenario comparison is running. Full cross-calculation (EEXI + CII + ETS + FuelEU) 
            will be displayed here.
          </p>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Selected scenarios: {selectedScenarios.join(", ")}</p>
            <p>Profile vessel: {profile.vesselType}, {profile.dwt} DWT</p>
            <p>Compliance status: {complianceStatus}</p>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={() => setStep("mode")} className="flex-1 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition text-sm">
            Start New Comparison
          </button>
          <button onClick={() => setStep("scenarios")} className="flex-1 py-2.5 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition text-sm">
            Modify Scenarios
          </button>
        </div>
      </div>
    );
  }

  return null;
}
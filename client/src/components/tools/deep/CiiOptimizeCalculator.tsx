import { useState, useRef, useEffect } from "react";
import { CII_REDUCTION_FACTORS, getCiiReference, FUEL_TYPES } from "@/data/calculators";
import { trackToolUsage } from "@/lib/analytics";
import { DollarSign, Clock, ArrowUp } from "lucide-react";

interface ImprovementMeasure {
  id: string;
  label: string;
  costMin: number;
  costMax: number;
  ciiImprovementPercent: number;
  paybackYears?: number;
  description: string;
}

const MEASURES: ImprovementMeasure[] = [
  { id: "hull_clean", label: "Hull Cleaning", costMin: 15000, costMax: 80000, ciiImprovementPercent: 3, description: "In-water hull cleaning to remove biofouling" },
  { id: "prop_polish", label: "Propeller Polishing", costMin: 5000, costMax: 25000, ciiImprovementPercent: 2, description: "Restore propeller surface finish" },
  { id: "engine_tune", label: "Engine Tuning", costMin: 10000, costMax: 40000, ciiImprovementPercent: 2, description: "Optimize injection timing and turbocharger" },
  { id: "slow_steam", label: "Slow Steaming Policy", costMin: 0, costMax: 0, ciiImprovementPercent: 8, description: "Reduce service speed by 10-15%" },
  { id: "weather_route", label: "Weather Routing", costMin: 5000, costMax: 20000, ciiImprovementPercent: 1, description: "Optimize routes for sea conditions" },
  { id: "air_lube", label: "Air Lubrication System", costMin: 500000, costMax: 1500000, ciiImprovementPercent: 8, paybackYears: 4, description: "Micro-bubble hull lubrication system" },
  { id: "whr", label: "Waste Heat Recovery", costMin: 200000, costMax: 600000, ciiImprovementPercent: 3, paybackYears: 5, description: "Recover exhaust heat for power generation" },
  { id: "coating", label: "Advanced Hull Coating", costMin: 300000, costMax: 800000, ciiImprovementPercent: 4, paybackYears: 3, description: "Silicone-based low-friction coating" },
];

export function CiiOptimizeCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState("");
  const [annualFuel, setAnnualFuel] = useState("");
  const [annualDistance, setAnnualDistance] = useState("");
  const [fuelType, setFuelType] = useState("VLSFO");
  const [targetYear, setTargetYear] = useState("2026");
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);
  const [currentRating, setCurrentRating] = useState<string | null>(null);
  const [projectedRating, setProjectedRating] = useState<string | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("cii-optimize");
  }, []);

  const calculateCurrentCII = () => {
    const dwtNum = parseFloat(dwt);
    const fuelNum = parseFloat(annualFuel);
    const distNum = parseFloat(annualDistance);
    if (isNaN(dwtNum) || isNaN(fuelNum) || isNaN(distNum) || dwtNum <= 0 || fuelNum <= 0 || distNum <= 0) return null;
    const fuelData = FUEL_TYPES.find((f) => f.value === fuelType);
    if (!fuelData) return null;

    const attained = (fuelNum * fuelData.cf * 1e6) / (dwtNum * distNum);
    const reference = getCiiReference(dwtNum, vesselType);
    const reductionFactor = CII_REDUCTION_FACTORS[parseInt(targetYear)] || 0.11;
    const required = reference * (1 - reductionFactor);

    let rating = "E";
    if (attained <= required * 0.80) rating = "A";
    else if (attained <= required * 0.90) rating = "B";
    else if (attained <= required) rating = "C";
    else if (attained <= required * 1.10) rating = "D";

    return { attained, required, rating, reference };
  };

  const calculateProjected = () => {
    const current = calculateCurrentCII();
    if (!current) return null;
    const totalImprovement = selectedMeasures.reduce((sum, id) => sum + (MEASURES.find((x) => x.id === id)?.ciiImprovementPercent || 0), 0);
    const newAttained = current.attained * (1 - totalImprovement / 100);
    const required = current.required;
    let rating = "E";
    if (newAttained <= required * 0.80) rating = "A";
    else if (newAttained <= required * 0.90) rating = "B";
    else if (newAttained <= required) rating = "C";
    else if (newAttained <= required * 1.10) rating = "D";
    const totalCost = selectedMeasures.reduce((sum, id) => sum + (MEASURES.find((x) => x.id === id)?.costMax || 0), 0);
    return { newAttained, rating, totalImprovement, totalCost };
  };

  const handleCalculateCurrent = () => {
    const res = calculateCurrentCII();
    if (res) setCurrentRating(res.rating);
  };

  const toggleMeasure = (id: string) => {
    setSelectedMeasures((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleProject = () => {
    const res = calculateProjected();
    if (res) setProjectedRating(res.rating);
  };

  const current = calculateCurrentCII();
  const projected = calculateProjected();

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">CII Optimization Planner</h2>
      <p className="text-xs text-muted-foreground mb-6">From D to C (or better) — cost-benefit analysis of operational and technical measures.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Current Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select value={vesselType} onChange={(e) => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base">
                <option value="bulkCarrier">Bulk Carrier</option>
                <option value="tanker">Tanker</option>
                <option value="containerShip">Container Ship</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">DWT</label>
              <input type="number" value={dwt} onChange={(e) => setDwt(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
              <select value={targetYear} onChange={(e) => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base">
                {Object.keys(CII_REDUCTION_FACTORS).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Fuel (MT)</label>
              <input type="number" value={annualFuel} onChange={(e) => setAnnualFuel(e.target.value)} placeholder="3500" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Annual Distance (NM)</label>
              <input type="number" value={annualDistance} onChange={(e) => setAnnualDistance(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type</label>
              <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base">
                {FUEL_TYPES.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={handleCalculateCurrent} className="mt-4 w-full py-2 bg-primary/10 text-primary font-medium rounded-sm hover:bg-primary/20 transition">
            Calculate Current Rating
          </button>
          {currentRating && (
            <div className="mt-3 p-3 bg-gray-100 rounded-sm text-center">
              <span className="text-xs text-gray-600">Current Rating:</span>
              <span className={`ml-2 text-2xl font-bold ${currentRating === "A" || currentRating === "B" ? "text-green-600" : currentRating === "C" ? "text-yellow-600" : "text-red-600"}`}>
                {currentRating}
              </span>
            </div>
          )}
        </div>

        {currentRating && (
          <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Select Improvement Measures</h3>
            <div className="space-y-2">
              {MEASURES.map((m) => (
                <label key={m.id} className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition ${selectedMeasures.includes(m.id) ? "bg-primary/5 border-primary" : "hover:bg-white"}`}>
                  <input type="checkbox" checked={selectedMeasures.includes(m.id)} onChange={() => toggleMeasure(m.id)} className="text-primary" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-[#0B3B5C]">{m.label}</span>
                      <span className="text-xs font-bold text-green-600 flex items-center gap-1"><ArrowUp size={10} /> +{m.ciiImprovementPercent}% CII</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.description}</p>
                    <div className="flex gap-4 mt-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1"><DollarSign size={10} /> €{m.costMin.toLocaleString()} - €{m.costMax.toLocaleString()}</span>
                      {m.paybackYears && <span className="flex items-center gap-1"><Clock size={10} /> {m.paybackYears} yr payback</span>}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={handleProject} className="mt-4 w-full py-2 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition">
              Project New Rating
            </button>
          </div>
        )}

        {projected && (
          <div ref={pdfRef} className="p-4 bg-green-50 border border-green-200 rounded-sm">
            <h4 className="font-bold text-green-800 mb-2">Projected Outcome</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-xs text-gray-600 block">New Rating</span>
                <p className={`text-3xl font-bold ${projected.rating === "A" || projected.rating === "B" ? "text-green-600" : projected.rating === "C" ? "text-yellow-600" : "text-red-600"}`}>
                  {projected.rating}
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600 block">Total Improvement</span>
                <p className="text-xl font-bold text-[#0B3B5C]">{projected.totalImprovement}%</p>
              </div>
              <div>
                <span className="text-xs text-gray-600 block">Investment</span>
                <p className="text-xl font-bold text-[#0B3B5C]">€{projected.totalCost.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
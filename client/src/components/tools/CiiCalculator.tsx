import { useState } from "react";
import { VESSEL_TYPES, FUEL_TYPES, CII_REDUCTION_FACTORS, getCiiReference } from "@/data/calculators";

export function CiiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState("");
  const [fuelType, setFuelType] = useState("HFO");
  const [totalFuel, setTotalFuel] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [targetYear, setTargetYear] = useState("2026");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const fuelNum = parseFloat(totalFuel);
    const distNum = parseFloat(totalDistance);
    const yearNum = parseInt(targetYear);

    if (!dwtNum || !fuelNum || !distNum) return;

    const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
    if (!fuelData) return;

    const attainedCii = (fuelNum * fuelData.cf * 1e6) / (dwtNum * distNum);

    const ciiReference = getCiiReference(dwtNum, vesselType);
    const reductionFactor = CII_REDUCTION_FACTORS[yearNum] || 0.11;
    const requiredCii = ciiReference * (1 - reductionFactor);

    let rating = "E";
    const upperA = requiredCii * (1 - 0.20);
    const upperB = requiredCii * (1 - 0.10);
    const upperC = requiredCii;
    const upperD = requiredCii * 1.10;

    if (attainedCii <= upperA) rating = "A";
    else if (attainedCii <= upperB) rating = "B";
    else if (attainedCii <= upperC) rating = "C";
    else if (attainedCii <= upperD) rating = "D";
    else rating = "E";

    setResult({
      attained: attainedCii.toFixed(2),
      required: requiredCii.toFixed(2),
      reference: ciiReference.toFixed(2),
      rating,
      factor: reductionFactor
    });
  };

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case "A": return "text-green-800 bg-green-100 border-green-400";
      case "B": return "text-blue-800 bg-blue-100 border-blue-400";
      case "C": return "text-yellow-800 bg-yellow-100 border-yellow-400";
      case "D": return "text-orange-800 bg-orange-100 border-orange-400";
      case "E": return "text-red-800 bg-red-100 border-red-400";
      default: return "";
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">CII Operational Predictor</h2>
      <p className="text-xs text-muted-foreground mb-6">Using MEPC.364(79) exact formula: CII_ref = a × DWT^(-c)</p>

      <div className="space-y-6">
        {/* Üst Bölüm - 2 Satır */}
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel & Target Year</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select value={vesselType} onChange={e => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Deadweight (DWT)</label>
              <input type="number" value={dwt} onChange={e => setDwt(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
              <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {Object.keys(CII_REDUCTION_FACTORS).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Alt Bölüm - 2 Satır (Son Kutu Tam Genişlikte) */}
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Operational Data (Last 12 Months)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type Consumed</label>
              <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Total Fuel Consumed (Metric Tons)</label>
              <input type="number" step="0.1" value={totalFuel} onChange={e => setTotalFuel(e.target.value)} placeholder="3500.5" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Total Distance (NM)</label>
              <input type="number" value={totalDistance} onChange={e => setTotalDistance(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Predict CII Rating
      </button>

      {result && (
        <div className={`mt-6 p-5 border-2 rounded-sm ${getRatingColor(result.rating)}`}>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">Predicted CII Rating:</h3>
            <span className="text-3xl font-display font-bold">{result.rating}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm">
            <div>
              <span className="text-muted-foreground block">Attained CII</span>
              <p className="font-bold text-base">{result.attained}</p>
            </div>
            <div>
              <span className="text-muted-foreground block">Required CII ({targetYear})</span>
              <p className="font-bold text-base">{result.required}</p>
            </div>
            <div>
              <span className="text-muted-foreground block">Baseline CII_ref</span>
              <p className="font-bold text-base">{result.reference}</p>
            </div>
          </div>

          {(result.rating === "D" || result.rating === "E") && (
            <div className="mt-4 pt-3 border-t border-black/10">
              <p className="text-xs font-bold">
                * Vessel is predicted to fall below acceptable thresholds. A robust SEEMP with documented optimization measures is strictly required.
              </p>
            </div>
          )}
          <p className="text-[10px] text-black/50 mt-3 italic">Reference: MEPC.364(79) Table 1 coefficients used.</p>
        </div>
      )}
    </div>
  );
}
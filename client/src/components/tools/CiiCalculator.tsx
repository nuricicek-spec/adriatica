import { useState } from "react";
import { VESSEL_TYPES, FUEL_TYPES, CII_REDUCTION_FACTORS, CII_BASE_VALUES, getLimitFromTable } from "@/data/calculators";

interface CiiResult {
  attained: number;
  required: number;
  rating: string;
}

export function CiiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState<string>("");
  const [totalFuel, setTotalFuel] = useState<string>("");
  const [totalDistance, setTotalDistance] = useState<string>("");
  const [fuelType, setFuelType] = useState("HFO");
  const [targetYear, setTargetYear] = useState<string>("2026");
  const [result, setResult] = useState<CiiResult | null>(null);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const fuelNum = parseFloat(totalFuel);
    const distNum = parseFloat(totalDistance);
    const yearNum = parseInt(targetYear);

    if (!dwtNum || !fuelNum || !distNum) return;

    const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
    if (!fuelData) return;

    // CII Formülü: (Toplam Yakıt * CF) / (DWT * Mesafe)
    // Sonuç gCO2 / (DWT * nm) cinsinden çıkar.
    const attained = (fuelNum * fuelData.cf * 1e6) / (dwtNum * distNum);

    // Required CII Hesapla
    const baseCiiRow = CII_BASE_VALUES.find(r => dwtNum >= r.minDwt && dwtNum <= r.maxDwt);
    const baseCii = baseCiiRow ? baseCiiRow.base : 0;
    const reductionFactor = CII_REDUCTION_FACTORS[yearNum] || 0.11;
    const required = baseCii * (1 - reductionFactor);

    // Rating Belirle (A, B, C, D, E)
    let rating = "E";
    const upperA = required * 0.85;
    const upperB = required * 0.95;
    const upperC = required * 1.05;
    const upperD = required * 1.15;

    if (attained <= upperA) rating = "A";
    else if (attained <= upperB) rating = "B";
    else if (attained <= upperC) rating = "C";
    else if (attained <= upperD) rating = "D";
    else rating = "E";

    setResult({
      attained: parseFloat(attained.toFixed(2)),
      required: parseFloat(required.toFixed(2)),
      rating,
    });
  };

  const getRatingColor = (rating: string) => {
    switch(rating) {
      case "A": return "text-green-700 bg-green-100";
      case "B": return "text-blue-700 bg-blue-100";
      case "C": return "text-yellow-700 bg-yellow-100";
      case "D": return "text-orange-700 bg-orange-100";
      case "E": return "text-red-700 bg-red-100";
      default: return "text-gray-700 bg-gray-100";
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
        CII Operational Predictor
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Predict your operational CII rating based on last year's consumption.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Vessel Type</label>
          <select value={vesselType} onChange={e => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Target Year</label>
          <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Deadweight (DWT) - Tons</label>
          <input type="number" value={dwt} onChange={e => setDwt(e.target.value)} placeholder="e.g., 50000" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Main Fuel Type</label>
          <select value={fuelType} onChange={e => setFuelType(e.target.value)} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Total Fuel Consumed (Tons/Year)</label>
          <input type="number" value={totalFuel} onChange={e => setTotalFuel(e.target.value)} placeholder="e.g., 3500" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Total Distance (NM/Year)</label>
          <input type="number" value={totalDistance} onChange={e => setTotalDistance(e.target.value)} placeholder="e.g., 50000" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mb-6">
        Predict CII Rating
      </button>

      {result && (
        <div className={`p-4 border rounded-sm ${getRatingColor(result.rating)}`}>
          <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
            <span>Predicted CII Rating:</span>
            <span className="text-2xl">{result.rating}</span>
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm mt-4">
            <div>
              <span className="text-muted-foreground">Attained CII:</span>
              <p className="font-bold text-lg">{result.attained} gCO2/DWT·nm</p>
            </div>
            <div>
              <span className="text-muted-foreground">Required CII ({targetYear}):</span>
              <p className="font-bold text-lg">{result.required} gCO2/DWT·nm</p>
            </div>
          </div>
          {(result.rating === "D" || result.rating === "E") && (
            <p className="text-xs mt-3 font-medium italic">
              * Vessel is predicted to fall below acceptable rating thresholds. SEEMP optimization is required.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
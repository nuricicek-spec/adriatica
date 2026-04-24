import { useState } from "react";
import { VESSEL_TYPES, FUEL_TYPES, DEFAULT_SFC, FW_FACTOR, getLimitFromTable, EEXI_LIMITS_BULK_TANKER, EEXI_LIMITS_CONTAINER, EEXI_LIMITS_GENERAL } from "@/data/calculators";

interface EexiResult {
  attained: number;
  required: number;
  isCompliant: boolean;
}

export function EexiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState<string>("");
  const [mcr, setMcr] = useState<string>("");
  const [fuelType, setFuelType] = useState("HFO");
  const [vref, setVref] = useState<string>("");
  const [sfc, setSfc] = useState<string>(DEFAULT_SFC.toString());
  const [result, setResult] = useState<EexiResult | null>(null);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const mcrNum = parseFloat(mcr);
    const vrefNum = parseFloat(vref);
    const sfcNum = parseFloat(sfc) || DEFAULT_SFC;

    if (!dwtNum || !mcrNum || !vrefNum) return;

    const typeData = VESSEL_TYPES.find(v => v.value === vesselType);
    const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
    if (!typeData || !fuelData) return;

    // IMO EEXI Formülü: (SFC * CF * MCR * fw) / (fi * fc * DWT * Vref)
    // SFC g/kWh cinsinden ton/kWh'a çevrilir (/ 10^6). Sonuç gCO2/(DWT*nm) cinsinden çıkar.
    const attained = ((sfcNum / 1e6) * fuelData.cf * mcrNum * FW_FACTOR) / (typeData.fi * typeData.fc * dwtNum * vrefNum) * 1e9;

    // Required EEXI Limitini Bul (Gemi tipine göre doğru tabloyu seç)
    let requiredLimit = 0;
    if (vesselType === "containerShip") {
      requiredLimit = getLimitFromTable(dwtNum, EEXI_LIMITS_CONTAINER);
    } else if (vesselType === "tanker" || vesselType === "bulkCarrier") {
      requiredLimit = getLimitFromTable(dwtNum, EEXI_LIMITS_BULK_TANKER);
    } else {
      requiredLimit = getLimitFromTable(dwtNum, EEXI_LIMITS_GENERAL);
    }

    setResult({
      attained: parseFloat(attained.toFixed(2)),
      required: requiredLimit,
      isCompliant: attained <= requiredLimit,
    });
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
        EEXI Calculation
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Based on IMO MEPC.338(76) - Phase 3 requirements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Vessel Type</label>
          <select value={vesselType} onChange={e => { setVesselType(e.target.value); setResult(null); }} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Fuel Type</label>
          <select value={fuelType} onChange={e => { setFuelType(e.target.value); setResult(null); }} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Deadweight (DWT) - Tons</label>
          <input type="number" value={dwt} onChange={e => setDwt(e.target.value)} placeholder="e.g., 50000" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Main Engine MCR - kW</label>
          <input type="number" value={mcr} onChange={e => setMcr(e.target.value)} placeholder="e.g., 8000" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Reference Speed (Vref) - Knots</label>
          <input type="number" value={vref} onChange={e => setVref(e.target.value)} placeholder="e.g., 14.5" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">SFC (g/kWh) - Optional</label>
          <input type="number" value={sfc} onChange={e => setSfc(e.target.value)} placeholder={`Default: ${DEFAULT_SFC}`} className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mb-6">
        Calculate EEXI
      </button>

      {result && (
        <div className={`p-4 border-2 rounded-sm ${result.isCompliant ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <h3 className={`text-lg font-bold mb-2 ${result.isCompliant ? 'text-green-800' : 'text-red-800'}`}>
            Status: {result.isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Attained EEXI:</span>
              <p className="font-bold text-lg text-[#0B3B5C]">{result.attained} gCO2/DWT·nm</p>
            </div>
            <div>
              <span className="text-muted-foreground">Required Limit:</span>
              <p className="font-bold text-lg text-[#0B3B5C]">{result.required} gCO2/DWT·nm</p>
            </div>
          </div>
          {!result.isCompliant && (
            <p className="text-xs text-red-700 mt-3 italic">
              * Vessel exceeds limits. EPL (Engine Power Limitation) may be required to achieve compliance.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
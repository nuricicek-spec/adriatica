import { useState } from "react";

export function BwtsCalculator() {
  const [pumpCapacity, setPumpCapacity] = useState<string>("");
  const [pumpCount, setPumpCount] = useState<string>("1");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const capNum = parseFloat(pumpCapacity);
    const countNum = parseInt(pumpCount);

    if (!capNum || !countNum) return;

    // IMO Standartı: BWTS kapasitesi, en büyük balast pompasının debisinin %110'unu karşılamalıdır.
    const requiredCapacity = capNum * countNum * 1.1;
    setResult(parseFloat(requiredCapacity.toFixed(1)));
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
        BWTS Capacity Sizing
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Calculate minimum required Ballast Water Treatment System capacity based on main pump specifications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Main Ballast Pump Capacity (m³/h)</label>
          <input type="number" value={pumpCapacity} onChange={e => setPumpCapacity(e.target.value)} placeholder="e.g., 250" className="w-full p-2 border rounded-sm focus:border-primary outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#0B3B5C] mb-1">Number of Parallel Pumps</label>
          <select value={pumpCount} onChange={e => setPumpCount(e.target.value)} className="w-full p-2 border rounded-sm bg-white focus:border-primary outline-none">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mb-6">
        Calculate Required BWTS Capacity
      </button>

      {result && (
        <div className="p-4 border-2 border-primary bg-primary/5 rounded-sm">
          <h3 className="text-lg font-bold text-[#0B3B5C] mb-2">Minimum Required BWTS Capacity</h3>
          <p className="text-3xl font-display font-bold text-primary">{result} m³/h</p>
          <p className="text-xs text-muted-foreground mt-3">
            * Calculated with a 10% safety margin (Qreq = Qpump × 1.1) as per standard retrofit sizing practices.
          </p>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";

export function BwtsCalculator() {
  const [pumpDesignCap, setPumpDesignCap] = useState("");
  const [pumpCount, setPumpCount] = useState("1");
  const [safetyMargin, setSafetyMargin] = useState("1.10");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const capNum = parseFloat(pumpDesignCap);
    const countNum = parseInt(pumpCount);
    const marginNum = parseFloat(safetyMargin) || 1.10;

    if (!capNum || !countNum) return;

    const requiredCapacity = capNum * countNum * marginNum;
    setResult(parseFloat(requiredCapacity.toFixed(1)));
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">BWTS Capacity Sizing</h2>
      <p className="text-xs text-muted-foreground mb-6">Retrofit sizing based on peak ballast pump discharge rates and system safety margins.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Ballast System Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Largest Ballast Pump Design Capacity (m³/h)</label>
              <input type="number" value={pumpDesignCap} onChange={e => setPumpDesignCap(e.target.value)} placeholder="e.g., 250" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              <p className="text-[10px] text-muted-foreground mt-1">* Use the design capacity from the pump nameplate, not operational estimates.</p>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Number of Parallel Pumps</label>
              <select value={pumpCount} onChange={e => setPumpCount(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                <option value="1">1 (Single Pump Setup)</option>
                <option value="2">2 (Twin Pump Setup)</option>
                <option value="3">3 (Triple Pump Setup)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Design Safety Margin</h3>
          <div className="flex gap-4">
            {[
              { val: "1.10", label: "10% (Standard Clean Water)" },
              { val: "1.15", label: "15% (Moderate Sediment)" },
              { val: "1.20", label: "20% (High Sediment/Port Conditions)" },
            ].map(opt => (
              <label key={opt.val} className="flex items-center gap-2 cursor-pointer p-2 border rounded-sm text-xs hover:bg-white transition">
                <input 
                  type="radio" 
                  name="margin" 
                  value={opt.val} 
                  checked={safetyMargin === opt.val} 
                  onChange={e => setSafetyMargin(e.target.value)} 
                  className="text-primary"
                />
                <span className="text-muted-foreground">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Required BWTS Capacity
      </button>

      {result && (
        <div className="mt-6 p-5 border-2 border-primary bg-primary/5 rounded-sm">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0B3B5C] mb-1">Minimum Required BWTS Capacity</h3>
              <p className="text-[10px] text-muted-foreground">Calculated with {(parseFloat(safetyMargin) - 1) * 100}% system margin</p>
            </div>
            <p className="text-3xl font-display font-bold text-primary">{result} <span className="text-sm font-normal">m³/h</span></p>
          </div>
          
          <div className="bg-white p-3 rounded-sm text-xs text-muted-foreground border">
            <p className="font-bold text-[#0B3B5C] mb-1">Engineering Note:</p>
            <p>When selecting a BWTS vendor, ensure the system's rated capacity (at the worst-case filtrate differential pressure) meets or exceeds this calculated value. Undersized systems lead to bypass scenarios during peak ballast operations, resulting in PSC deficiencies under the BWM Convention.</p>
          </div>
        </div>
      )}
    </div>
  );
}
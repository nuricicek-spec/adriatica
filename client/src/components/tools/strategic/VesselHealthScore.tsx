import { useState, useEffect, useRef } from "react"; // ← useRef eklendi
import { trackToolUsage } from "@/lib/analytics";
import { AlertTriangle } from "lucide-react";

interface HealthItem {
  id: string;
  label: string;
  score: number;
  status: "pass" | "warn" | "fail";
  weight: number;
}

const DEFAULT_ITEMS: HealthItem[] = [
  { id: "eexi", label: "EEXI Compliance", score: 82, status: "pass", weight: 20 },
  { id: "cii", label: "CII Rating", score: 64, status: "warn", weight: 25 },
  { id: "fueleu", label: "FuelEU Status", score: 91, status: "pass", weight: 20 },
  { id: "bwts", label: "BWTS Readiness", score: 95, status: "pass", weight: 10 },
  { id: "ets", label: "ETS Exposure", score: 45, status: "fail", weight: 15 },
  { id: "shapoli", label: "ShaPoLi Compliance", score: 88, status: "pass", weight: 10 },
];

export function VesselHealthScore() {
  const [items, setItems] = useState<HealthItem[]>(DEFAULT_ITEMS);
  const [calculated, setCalculated] = useState(false);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("health-score");
  }, []);

  const updateItem = (id: string, score: number) => {
    const status = score >= 80 ? "pass" : score >= 60 ? "warn" : "fail";
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, score, status } : item));
  };

  const overall = Math.round(items.reduce((sum, item) => sum + item.score * item.weight, 0) / 100);
  const overallStatus = overall >= 80 ? "excellent" : overall >= 65 ? "good" : overall >= 50 ? "fair" : "poor";
  const priorities = items.filter((i) => i.status === "fail" || i.status === "warn").map((i) => i.label);

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Vessel Technical Health Score</h2>
      <p className="text-xs text-muted-foreground mb-6">Composite compliance and risk assessment across all regulatory domains.</p>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-neutral-50 rounded-sm border border-border/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-[#0B3B5C]">{item.label}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-sm ${item.status === "pass" ? "bg-green-100 text-green-700" : item.status === "warn" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                {item.status.toUpperCase()}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={item.score}
              onChange={(e) => updateItem(item.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-500">Score: {item.score}/100</span>
              <span className="text-[10px] text-gray-500">Weight: {item.weight}%</span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Health Score
      </button>

      {calculated && (
        <div className="mt-6">
          <div className={`p-6 rounded-sm border-2 text-center ${overallStatus === "excellent" ? "border-green-500 bg-green-50" : overallStatus === "good" ? "border-blue-500 bg-blue-50" : overallStatus === "fair" ? "border-yellow-500 bg-yellow-50" : "border-red-500 bg-red-50"}`}>
            <h3 className="text-sm font-bold text-gray-600 mb-2">OVERALL TECHNICAL HEALTH</h3>
            <p className={`text-5xl font-display font-bold ${overallStatus === "excellent" ? "text-green-600" : overallStatus === "good" ? "text-blue-600" : overallStatus === "fair" ? "text-yellow-600" : "text-red-600"}`}>
              {overall}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide mt-2 text-gray-600">{overallStatus}</p>
          </div>

          {priorities.length > 0 && (
            <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-sm">
              <h4 className="font-bold text-sm text-orange-800 mb-2 flex items-center gap-2">
                <AlertTriangle size={16} /> Priority Actions Required
              </h4>
              <ul className="space-y-1">
                {priorities.map((p, i) => (
                  <li key={i} className="text-xs text-orange-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-4 grid grid-cols-3 gap-2">
            {items.map((item) => (
              <div key={item.id} className="p-2 bg-gray-50 rounded-sm text-center">
                <div className="text-[10px] text-gray-500">{item.label}</div>
                <div className={`text-lg font-bold ${item.status === "pass" ? "text-green-600" : item.status === "warn" ? "text-yellow-600" : "text-red-600"}`}>
                  {item.score}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
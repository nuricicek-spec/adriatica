import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { trackToolUsage, trackPdfGenerated } from "@/lib/analytics";
import { Calendar, Wrench, Clock, DollarSign } from "lucide-react";

interface ScopeItem {
  id: string;
  label: string;
  mandatory: boolean;
  estimatedDays: number;
  costMin: number;
  costMax: number;
  regulation: string;
}

const SCOPE_ITEMS: ScopeItem[] = [
  { id: "eexi", label: "EEXI Verification & EPL Update", mandatory: true, estimatedDays: 2, costMin: 15000, costMax: 40000, regulation: "MEPC.338(76)" },
  { id: "bwts", label: "BWTS Retrofit (if not installed)", mandatory: false, estimatedDays: 14, costMin: 800000, costMax: 2500000, regulation: "BWM Convention" },
  { id: "shapoli", label: "ShaPoLi Verification", mandatory: true, estimatedDays: 1, costMin: 5000, costMax: 15000, regulation: "MEPC.350(78)" },
  { id: "hull_coating", label: "Hull Coating Renewal", mandatory: false, estimatedDays: 7, costMin: 300000, costMax: 800000, regulation: "Class IOPP" },
  { id: "steel_renewal", label: "Steel Renewal (estimated)", mandatory: false, estimatedDays: 10, costMin: 100000, costMax: 500000, regulation: "Class Special Survey" },
  { id: "propeller", label: "Propeller Inspection/Polish", mandatory: false, estimatedDays: 2, costMin: 15000, costMax: 50000, regulation: "Class" },
  { id: "tailshaft", label: "Tailshaft Survey", mandatory: true, estimatedDays: 3, costMin: 25000, costMax: 80000, regulation: "Class" },
];

export function DryDockPlanner() {
  const [vesselAge, setVesselAge] = useState("");
  const [lastDrydock, setLastDrydock] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [result, setResult] = useState<{ totalDays: number; costMin: number; costMax: number; criticalPath: string[] } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("drydock");
  }, []);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleCalculate = () => {
    const items = SCOPE_ITEMS.filter((item) => item.mandatory || selectedItems.includes(item.id));
    const totalDays = items.reduce((sum, item) => sum + item.estimatedDays, 0);
    const costMin = items.reduce((sum, item) => sum + item.costMin, 0);
    const costMax = items.reduce((sum, item) => sum + item.costMax, 0);
    const criticalPath = items.filter((i) => i.estimatedDays > 3).map((i) => i.label);
    setResult({ totalDays, costMin, costMax, criticalPath });
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);
    try {
      await generateReportPdf(
        pdfRef,
        "Adriatica_DryDock_Plan_Report.pdf",
        [
          { label: "Vessel Age", value: `${vesselAge} years` },
          { label: "Last Dry-Dock", value: `${lastDrydock} years ago` },
          { label: "Estimated Duration", value: `${result.totalDays} days` },
          { label: "Cost Range (Min)", value: `€${result.costMin.toLocaleString()}` },
          { label: "Cost Range (Max)", value: `€${result.costMax.toLocaleString()}` },
        ],
        { toolName: "Dry-Dock Scope Planner" }
      );
      trackPdfGenerated("drydock");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") alert("PDF too large.");
      else alert("PDF generation error.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Dry-Dock Scope Planner</h2>
      <p className="text-xs text-muted-foreground mb-6">Preliminary scope, duration, and cost estimation for next dry-dock.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Age (years)</label>
              <input type="number" value={vesselAge} onChange={(e) => setVesselAge(e.target.value)} placeholder="e.g., 12" className="w-full p-2 border rounded-sm text-base" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Last Dry-Dock (years ago)</label>
              <input type="number" value={lastDrydock} onChange={(e) => setLastDrydock(e.target.value)} placeholder="e.g., 4" className="w-full p-2 border rounded-sm text-base" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Scope Selection</h3>
          <div className="space-y-2">
            {SCOPE_ITEMS.map((item) => (
              <label key={item.id} className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition ${item.mandatory ? "bg-red-50 border-red-200" : selectedItems.includes(item.id) ? "bg-primary/5 border-primary" : "hover:bg-white"}`}>
                <input type="checkbox" checked={item.mandatory || selectedItems.includes(item.id)} disabled={item.mandatory} onChange={() => toggleItem(item.id)} className="text-primary" />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-[#0B3B5C]">{item.label}</span>
                    {item.mandatory && <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-sm">Mandatory</span>}
                  </div>
                  <div className="flex gap-4 mt-1 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><Clock size={10} /> {item.estimatedDays} days</span>
                    <span className="flex items-center gap-1"><DollarSign size={10} /> €{item.costMin.toLocaleString()} - €{item.costMax.toLocaleString()}</span>
                    <span>{item.regulation}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Dry-Dock Plan
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm break-inside-avoid">
          <h3 className="text-lg font-bold text-[#0B3B5C]">DRY-DOCK PLAN ESTIMATE</h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm text-center">
              <span className="text-xs text-gray-600 block">Estimated Duration</span>
              <p className="font-bold text-xl text-[#0B3B5C]">{result.totalDays} <span className="text-sm font-normal">days</span></p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm text-center">
              <span className="text-xs text-gray-600 block">Cost Range (min)</span>
              <p className="font-bold text-xl text-[#0B3B5C]">€{(result.costMin / 1000000).toFixed(2)}M</p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm text-center">
              <span className="text-xs text-gray-600 block">Cost Range (max)</span>
              <p className="font-bold text-xl text-[#0B3B5C]">€{(result.costMax / 1000000).toFixed(2)}M</p>
            </div>
          </div>
          {result.criticalPath.length > 0 && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-sm">
              <h5 className="font-bold text-sm text-yellow-800 mb-1">Critical Path Items:</h5>
              <ul className="list-disc list-inside text-xs text-yellow-700">
                {result.criticalPath.map((item, i) => (<li key={i}>{item}</li>))}
              </ul>
            </div>
          )}
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50">
          {isGenerating ? "Generating PDF..." : "Download Dry-Dock Plan (PDF)"}
        </button>
      )}
    </div>
  );
}
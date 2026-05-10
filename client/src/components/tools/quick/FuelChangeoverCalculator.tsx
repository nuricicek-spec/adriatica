import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { trackToolUsage, trackPdfGenerated } from "@/lib/analytics";
import { AlertTriangle } from "lucide-react";

interface ChangeoverResult {
  flushTime: number;
  coolingTime: number;
  totalTime: number;
  startDistance: number;
  residualFuel: number;
  blendRatio: number;
}

export function FuelChangeoverCalculator() {
  const [loa, setLoa] = useState("");
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [currentFuel, setCurrentFuel] = useState("HFO");
  const [targetFuel, setTargetFuel] = useState("MGO");
  const [pumpRate, setPumpRate] = useState("");
  const [speed, setSpeed] = useState("");
  const [hfoTemp, setHfoTemp] = useState("130");
  const [result, setResult] = useState<ChangeoverResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("changeover");
  }, []);

  const estimatePipeVolume = (length: number, type: string): number => {
    const factor = type === "tanker" ? 0.12 : type === "containerShip" ? 0.10 : 0.08;
    return parseFloat((length * factor).toFixed(2));
  };

  const handleCalculate = () => {
    const loaNum = parseFloat(loa);
    const pumpNum = parseFloat(pumpRate);
    const speedNum = parseFloat(speed);
    const hfoTempNum = parseFloat(hfoTemp);

    if (isNaN(loaNum) || isNaN(pumpNum) || isNaN(speedNum) || loaNum <= 0 || pumpNum <= 0 || speedNum <= 0) return;

    const pipeVolume = estimatePipeVolume(loaNum, vesselType);
    const flushTime = (pipeVolume / pumpNum) * 60 * 1.2;
    const coolingTime = currentFuel === "HFO" && targetFuel === "MGO" ? ((hfoTempNum - 80) / 2.5) : 0;
    const totalTime = flushTime + coolingTime;
    const startDistance = (speedNum * (totalTime / 60)) * 1.852;
    const residualFuel = pipeVolume * 0.05;
    const blendRatio = 95;

    setResult({
      flushTime: Math.round(flushTime),
      coolingTime: Math.round(coolingTime),
      totalTime: Math.round(totalTime),
      startDistance: parseFloat(startDistance.toFixed(1)),
      residualFuel: parseFloat(residualFuel.toFixed(2)),
      blendRatio,
    });

    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status: "compliant" } }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);
    try {
      await generateReportPdf(
        pdfRef,
        "Adriatica_Fuel_Changeover_Report.pdf",
        [
          { label: "Vessel LOA (m)", value: loa },
          { label: "Current Fuel", value: currentFuel },
          { label: "Target Fuel", value: targetFuel },
          { label: "Pump Rate (m³/h)", value: pumpRate },
          { label: "Service Speed (knots)", value: speed },
          { label: "Total Changeover Time", value: `${result.totalTime} min` },
          { label: "Start Before ECA", value: `${result.startDistance} NM` },
        ],
        { toolName: "Fuel Changeover Calculator" }
      );
      trackPdfGenerated("changeover");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") {
        alert("PDF content is too large to process safely.");
      } else {
        alert("An error occurred while generating the PDF.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">Fuel Changeover Calculator</h2>
      <p className="text-xs text-muted-foreground mb-6">Preliminary ECA entry/exit fuel switching estimation.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel & System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Length (LOA, m)</label>
              <input type="number" value={loa} onChange={(e) => setLoa(e.target.value)} placeholder="e.g., 180" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select value={vesselType} onChange={(e) => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
                <option value="bulkCarrier">Bulk Carrier</option>
                <option value="tanker">Tanker</option>
                <option value="containerShip">Container Ship</option>
                <option value="generalCargo">General Cargo</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Current Fuel</label>
              <select value={currentFuel} onChange={(e) => setCurrentFuel(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
                <option value="HFO">HFO (Heavy Fuel Oil)</option>
                <option value="VLSFO">VLSFO (0.5% S)</option>
                <option value="LNG">LNG</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Fuel</label>
              <select value={targetFuel} onChange={(e) => setTargetFuel(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
                <option value="MGO">MGO (Marine Gas Oil)</option>
                <option value="LSMGO">LSMGO (0.1% S)</option>
                <option value="VLSFO">VLSFO</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Transfer Pump Rate (m³/h)</label>
              <input type="number" value={pumpRate} onChange={(e) => setPumpRate(e.target.value)} placeholder="e.g., 50" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Service Speed (knots)</label>
              <input type="number" step="0.1" value={speed} onChange={(e) => setSpeed(e.target.value)} placeholder="e.g., 12.5" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
            {currentFuel === "HFO" && targetFuel === "MGO" && (
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Current HFO Temperature (°C)</label>
                <input type="number" value={hfoTemp} onChange={(e) => setHfoTemp(e.target.value)} placeholder="130" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
              </div>
            )}
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Changeover Plan
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm break-inside-avoid">
          <h3 className="text-lg font-bold text-[#0B3B5C]">FUEL CHANGEOVER PLAN</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>

          {currentFuel === "HFO" && targetFuel === "MGO" && result.coolingTime > 0 && (
            <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-sm">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0" />
                <p className="text-xs text-orange-700">
                  <strong>Temperature Critical:</strong> HFO must be cooled below 80°C before introducing MGO.
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
              <span className="text-xs text-gray-600 block">Flushing Time</span>
              <p className="font-bold text-xl text-[#0B3B5C]">{result.flushTime} <span className="text-sm font-normal">min</span></p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
              <span className="text-xs text-gray-600 block">Cooling Time</span>
              <p className="font-bold text-xl text-[#0B3B5C]">{result.coolingTime} <span className="text-sm font-normal">min</span></p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
              <span className="text-xs text-gray-600 block">Total Time</span>
              <p className="font-bold text-xl text-[#0B3B5C]">{result.totalTime} <span className="text-sm font-normal">min</span></p>
            </div>
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-sm">
              <span className="text-xs text-gray-600 block">Start Before ECA</span>
              <p className="font-bold text-xl text-[#0B3B5C]">{result.startDistance} <span className="text-sm font-normal">NM</span></p>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-xs text-gray-700">
            <p className="font-bold text-[#0B3B5C] mb-1">OPERATIONAL NOTES:</p>
            <p>Estimated pipe volume: {estimatePipeVolume(parseFloat(loa) || 0, vesselType)} m³. Residual old fuel: ~{result.residualFuel} m³. Target fuel blend ratio: ~{result.blendRatio}%.</p>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50">
          {isGenerating ? "Generating PDF..." : "Download Changeover Plan (PDF)"}
        </button>
      )}
    </div>
  );
}
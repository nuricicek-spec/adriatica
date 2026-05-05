import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { VESSEL_TYPES } from "@/data/calculators";
import { calculateShaPoLi, SHAPOLI_GUIDANCE, ShaPoLiResult } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated, trackComplianceFail } from "@/lib/analytics";
import { AlertTriangle, Shield, Info } from "lucide-react";

export function ShapoliCalculator() {
  const [vesselType, setVesselType] = useState("yacht");
  const [dwt, setDwt] = useState("");
  const [meMcr, setMeMcr] = useState("");
  const [shaftPower, setShaftPower] = useState("");
  const [isOverridable, setIsOverridable] = useState(true);
  const [result, setResult] = useState<ShaPoLiResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("shapoli");
  }, []);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const mcrNum = parseFloat(meMcr);
    const shaftNum = parseFloat(shaftPower);
    if (isNaN(dwtNum) || isNaN(mcrNum) || isNaN(shaftNum) || dwtNum <= 0 || mcrNum <= 0 || shaftNum <= 0) return;
    const res = calculateShaPoLi(vesselType, dwtNum, mcrNum, shaftNum, isOverridable);
    setResult(res);
    if (!res.isCompliant) trackComplianceFail("shapoli");
    window.dispatchEvent(new CustomEvent("tool_compliance_update", { detail: { status: res.isCompliant ? "compliant" : "non-compliant" } }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);
    try {
      const typeData = VESSEL_TYPES.find(v => v.value === vesselType);
      await generateReportPdf(pdfRef, "Adriatica_ShaPoLi_Preliminary_Report.pdf",
        [
          { label: "Vessel Type", value: typeData?.label || vesselType },
          { label: "Deadweight (DWT)", value: dwt },
          { label: "Main Engine MCR (kW)", value: meMcr },
          { label: "Measured Shaft Power (kW)", value: shaftPower },
          { label: "Limit Type", value: isOverridable ? "Overridable" : "Non-Overridable" },
          { label: "Calculated Limit (kW)", value: result.limitValue.toFixed(0) },
        ],
        { toolName: "ShaPoLi Preliminary Assessment" }
      );
      trackPdfGenerated("shapoli");
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
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">ShaPoLi Assessment</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Based on MEPC.350(78) — Shaft Power Limitation for EEXI compliance.
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel & Engine</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select value={vesselType} onChange={e => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-base focus:border-primary outline-none">
                {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Deadweight (DWT)</label>
              <input type="number" value={dwt} onChange={e => setDwt(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">MCR (kW)</label>
              <input type="number" value={meMcr} onChange={e => setMeMcr(e.target.value)} placeholder="8000" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Measured Shaft Power (kW)</label>
              <input type="number" value={shaftPower} onChange={e => setShaftPower(e.target.value)} placeholder="7200" className="w-full p-2 border rounded-sm text-base focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Limitation Type</h3>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-sm hover:bg-white transition">
              <input type="radio" name="shapoliType" checked={isOverridable} onChange={() => setIsOverridable(true)} className="text-primary" />
              <div>
                <span className="text-sm font-medium text-[#0B3B5C] block">Overridable</span>
                <span className="text-xs text-muted-foreground">Master can override for safety (110% limit)</span>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 border rounded-sm hover:bg-white transition">
              <input type="radio" name="shapoliType" checked={!isOverridable} onChange={() => setIsOverridable(false)} className="text-primary" />
              <div>
                <span className="text-sm font-medium text-[#0B3B5C] block">Non-Overridable</span>
                <span className="text-xs text-muted-foreground">Fixed limit, no override possible</span>
              </div>
            </label>
          </div>
          <button onClick={() => setShowGuidance(!showGuidance)} className="mt-3 text-xs text-primary flex items-center gap-1 hover:underline">
            <Info size={14} /> {showGuidance ? "Hide" : "Show"} guidance
          </button>
          {showGuidance && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-sm text-xs text-blue-800">
              <p className="font-bold mb-1">{isOverridable ? SHAPOLI_GUIDANCE.overridable.title : SHAPOLI_GUIDANCE.nonOverridable.title}</p>
              <p className="mb-2">{isOverridable ? SHAPOLI_GUIDANCE.overridable.description : SHAPOLI_GUIDANCE.nonOverridable.description}</p>
              <ul className="list-disc list-inside space-y-1">
                {(isOverridable ? SHAPOLI_GUIDANCE.overridable.requirements : SHAPOLI_GUIDANCE.nonOverridable.requirements).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">Calculate ShaPoLi Limit</button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm no-break">
          <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY SHAPOLI ASSESSMENT</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>
          <div className={`p-4 border-2 rounded-sm mb-4 ${result.isCompliant ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            <h4 className={`text-base font-bold mb-2 ${result.isCompliant ? "text-green-800" : "text-red-800"}`}>STATUS: {result.isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4 bg-white/50 p-3 rounded-sm no-break">
              <div><span className="text-xs text-gray-600">Measured Shaft Power</span><p className="font-bold text-xl text-[#0B3B5C]">{result.measuredShaftPower} <span className="text-sm font-normal">kW</span></p></div>
              <div><span className="text-xs text-gray-600">ShaPoLi Limit</span><p className="font-bold text-xl text-[#0B3B5C]">{result.limitValue.toFixed(0)} <span className="text-sm font-normal">kW</span></p></div>
            </div>
            {!result.isCompliant && (
              <div className="mt-4 pt-3 border-t border-red-300 bg-white/50 p-3 rounded-sm no-break">
                <h5 className="font-bold text-sm text-red-800 mb-1">OVERRIDE CAPACITY</h5>
                <p className="font-mono font-bold text-lg text-[#0B3B5C]">{result.maxOverridePower.toFixed(0)} kW <span className="text-xs font-normal text-gray-600">(110% of limit)</span></p>
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY:</p>
            <p>ShaPoLi limit calculated as percentage of MCR based on vessel size: {result.limitValue < result.measuredShaftPower * 0.8 ? "75%" : "80-85%"}. Overridable systems allow 110% transient power for safety per MEPC.350(78). Log accuracy requirement: {result.requiredLogAccuracy}. This is NOT a Class-approved ShaPoLi technical file.</p>
          </div>
        </div>
      )}

      {result !== null && (
        <button onClick={handleDownloadPdf} disabled={isGenerating} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {isGenerating ? "Generating PDF..." : "Download Preliminary Report (PDF)"}
        </button>
      )}
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { generateReportPdf, PdfError } from "@/lib/generateReportPdf";
import { VESSEL_TYPES, FUEL_TYPES, CII_REDUCTION_FACTORS, getCiiReference } from "@/data/calculators";
import { trackToolUsage, trackPdfGenerated, trackComplianceFail } from "@/lib/analytics";

// Rating renk sınıfları — component dışında sabit obje olarak tanımlandı.
// Her render'da yeniden oluşturulmasını önler.
const RATING_COLORS: Record<string, string> = {
  A: "text-green-800 bg-green-100 border-green-400",
  B: "text-blue-800 bg-blue-100 border-blue-400",
  C: "text-yellow-800 bg-yellow-100 border-yellow-400",
  D: "text-orange-800 bg-orange-100 border-orange-400",
  E: "text-red-800 bg-red-100 border-red-400",
};

export function CiiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState("");
  const [fuelType, setFuelType] = useState("HFO");
  const [totalFuel, setTotalFuel] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [targetYear, setTargetYear] = useState("2026");
  const [result, setResult] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  // StrictMode'da çift çalışmayı önlemek için ref ile guard
  const tracked = useRef(false);
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackToolUsage("cii");
  }, []);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const fuelNum = parseFloat(totalFuel);
    const distNum = parseFloat(totalDistance);
    const yearNum = parseInt(targetYear);

    if (
      isNaN(dwtNum) || isNaN(fuelNum) || isNaN(distNum) ||
      dwtNum <= 0 || fuelNum <= 0 || distNum <= 0
    ) return;

    const fuelData = FUEL_TYPES.find(f => f.value === fuelType);
    if (!fuelData) return;

    const attainedCii = (fuelNum * fuelData.cf * 1e6) / (dwtNum * distNum);
    const ciiReference = getCiiReference(dwtNum, vesselType);
    const reductionFactor = CII_REDUCTION_FACTORS[yearNum] || 0.11;
    const requiredCii = ciiReference * (1 - reductionFactor);

    // MEPC.364(79) rating bantları
    const upperA = requiredCii * 0.80;
    const upperB = requiredCii * 0.90;
    const upperC = requiredCii;
    const upperD = requiredCii * 1.10;

    let rating = "E";
    if (attainedCii <= upperA) rating = "A";
    else if (attainedCii <= upperB) rating = "B";
    else if (attainedCii <= upperC) rating = "C";
    else if (attainedCii <= upperD) rating = "D";

    const finalResult = {
      attained: attainedCii.toFixed(2),
      required: requiredCii.toFixed(2),
      reference: ciiReference.toFixed(2),
      rating,
      factor: reductionFactor,
      isCompliant: rating !== "D" && rating !== "E",
    };

    setResult(finalResult);

    if (!finalResult.isCompliant) {
      trackComplianceFail("cii");
    }

    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: finalResult.isCompliant ? "compliant" : "non-compliant" },
    }));
  };

  const handleDownloadPdf = async () => {
    if (result === null) return;
    setIsGenerating(true);

    try {
      const typeData = VESSEL_TYPES.find(v => v.value === vesselType);
      const fuelData = FUEL_TYPES.find(f => f.value === fuelType);

      await generateReportPdf(
        pdfRef,
        "Adriatica_CII_Preliminary_Report.pdf",
        [
          { label: "Vessel Type", value: typeData?.label || vesselType },
          { label: "Deadweight (DWT)", value: dwt },
          { label: "Target Year", value: targetYear },
          { label: "Fuel Type", value: fuelData?.label || fuelType },
          { label: "Total Fuel Consumed (MT)", value: totalFuel },
          { label: "Total Distance (NM)", value: totalDistance },
        ],
        { toolName: "CII Operational Predictor" }
      );

      trackPdfGenerated("cii");
    } catch (err) {
      if (err instanceof PdfError && err.code === "RENDER_MEMORY") {
        alert("PDF content is too large to process safely. Please try again or contact support.");
      } else {
        alert("An error occurred while generating the PDF. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">CII Operational Predictor</h2>
      <p className="text-xs text-muted-foreground mb-6">
        Using MEPC.364(79) exact formula: CII_ref = a × DWT^(-c)
      </p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">
            Vessel & Target Year
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select
                value={vesselType}
                onChange={e => setVesselType(e.target.value)}
                className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none"
              >
                {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Deadweight (DWT)</label>
              <input
                type="number"
                value={dwt}
                onChange={e => setDwt(e.target.value)}
                placeholder="50000"
                className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Year</label>
              <select
                value={targetYear}
                onChange={e => setTargetYear(e.target.value)}
                className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none"
              >
                {Object.keys(CII_REDUCTION_FACTORS).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">
            Operational Data (Last 12 Months)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Fuel Type Consumed
              </label>
              <select
                value={fuelType}
                onChange={e => setFuelType(e.target.value)}
                className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none"
              >
                {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Total Fuel Consumed (MT)
              </label>
              <input
                type="number"
                step="0.1"
                value={totalFuel}
                onChange={e => setTotalFuel(e.target.value)}
                placeholder="3500.5"
                className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Total Distance (NM)
              </label>
              <input
                type="number"
                value={totalDistance}
                onChange={e => setTotalDistance(e.target.value)}
                placeholder="50000"
                className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleCalculate}
        className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6"
      >
        Predict CII Rating
      </button>

      {result !== null && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm no-break">
          <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY CII ASSESSMENT</h3>
          <p className="text-xs text-gray-500 mb-6">Generated by Adriatica D.O.O. Engineering Tools</p>

          <div className={`p-4 border-2 rounded-sm mb-4 ${RATING_COLORS[result.rating] ?? ""}`}>
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold">Predicted CII Rating:</h4>
              <span className="text-4xl font-display font-bold">{result.rating}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm no-break">
              <div>
                <span className="text-gray-600 block">Attained CII</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.attained}</p>
              </div>
              <div>
                <span className="text-gray-600 block">Required ({targetYear})</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.required}</p>
              </div>
              <div>
                <span className="text-gray-600 block">Baseline Ref</span>
                <p className="font-bold text-base text-[#0B3B5C]">{result.reference}</p>
              </div>
            </div>

            {!result.isCompliant && (
              <div className="mt-4 pt-3 border-t border-black/10">
                <p className="text-xs font-bold">
                  * Vessel falls below acceptable thresholds. Robust SEEMP required.
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY & ASSUMPTIONS:</p>
            <p>
              Uses exact MEPC.364(79) Table 1 coefficients (a, c). Assumes standard fuel Carbon
              Factors (CF). Does not account for weather routing adjustments or ice-class
              corrections. D/E ratings indicate non-compliance for operational planning purposes;
              formal enforcement requires consecutive year assessment per MEPC.364(79).
              This is NOT an official CII verification statement.
            </p>
          </div>
        </div>
      )}

      {result !== null && (
        <button
          onClick={handleDownloadPdf}
          disabled={isGenerating}
          className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? "Generating PDF..." : "Download Preliminary Report (PDF)"}
        </button>
      )}
    </div>
  );
}
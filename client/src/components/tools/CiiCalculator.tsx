// CiiCalculator.tsx
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { VESSEL_TYPES, FUEL_TYPES, CII_REDUCTION_FACTORS, getCiiReference } from "@/data/calculators";

export function CiiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState("");
  const [fuelType, setFuelType] = useState("HFO");
  const [totalFuel, setTotalFuel] = useState("");
  const [totalDistance, setTotalDistance] = useState("");
  const [targetYear, setTargetYear] = useState("2026");
  const [result, setResult] = useState<any>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

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

    const finalResult = {
      attained: attainedCii.toFixed(2),
      required: requiredCii.toFixed(2),
      reference: ciiReference.toFixed(2),
      rating,
      factor: reductionFactor,
      isCompliant: rating !== "D" && rating !== "E"
    };

    setResult(finalResult);
    window.dispatchEvent(new CustomEvent("tool_compliance_update", {
      detail: { status: finalResult.isCompliant ? "compliant" : "non-compliant" }
    }));
  };

  const handleDownloadPdf = async () => {
    if (!pdfRef.current) return;

    let logoBase64 = '';
    try {
      const response = await fetch('/logo.svg');
      const blob = await response.blob();
      logoBase64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) { console.error("Logo fetch failed", e); }

    const opt = {
      margin: [40, 20, 45, 20] as [number, number, number, number],
      filename: 'Adriatica_CII_Preliminary_Report.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
    };

    html2pdf().set(opt).from(pdfRef.current).toPdf().get('pdf').then((pdf: any) => {
      const totalPages = pdf.internal.getNumberOfPages();
      const pageHeight = pdf.internal.pageSize.height;
      const pageWidth = pdf.internal.pageSize.width;

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        if (logoBase64) pdf.addImage(logoBase64, 'SVG', 20, 12, 15, 15);
        
        pdf.setFontSize(10);
        pdf.setTextColor(11, 59, 92);
        pdf.text('PRELIMINARY ASSESSMENT - ADRIATICA D.O.O.', pageWidth - 20, 22, { align: 'right' });
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(20, 30, pageWidth - 20, 30);

        pdf.setDrawColor(200, 200, 200);
        pdf.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);
        pdf.setFontSize(9);
        pdf.setTextColor(11, 59, 92);
        pdf.text('ADRIATICA D.O.O.', pageWidth / 2, pageHeight - 18, { align: 'center' });
        pdf.setFontSize(7);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Marine Engineering & Technical Consultancy', pageWidth / 2, pageHeight - 13, { align: 'center' });
        pdf.text('Podgorica, Montenegro | info@adriaticadoo.com | www.adriaticadoo.com', pageWidth / 2, pageHeight - 8, { align: 'center' });
      }
      
      pdf.save(opt.filename);
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
              <label className="block text-xs font-medium text-muted-foreground mb-1">Total Fuel Consumed (MT)</label>
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
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm" style={{color: '#000'}}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY CII ASSESSMENT</h3>
              <p className="text-xs text-gray-500">Generated by Adriatica D.O.O. Engineering Tools</p>
            </div>
          </div>

          <div className={`p-4 border-2 rounded-sm mb-4 ${getRatingColor(result.rating)}`}>
            <div className="flex justify-between items-start">
              <h4 className="text-lg font-bold">Predicted CII Rating:</h4>
              <span className="text-4xl font-display font-bold">{result.rating}</span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-xs mt-4 bg-white/50 p-3 rounded-sm">
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

            {(!result.isCompliant) && (
              <div className="mt-4 pt-3 border-t border-black/10">
                <p className="text-xs font-bold">* Vessel falls below acceptable thresholds. Robust SEEMP required.</p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY & ASSUMPTIONS:</p>
            <p>Uses exact MEPC.364(79) Table 1 coefficients (a, c). Assumes standard fuel Carbon Factors (CF). Does not account for weather routing adjustments or ice-class corrections. This is NOT an official CII verification statement.</p>
          </div>
        </div>
      )}

      {result && (
        <button onClick={handleDownloadPdf} className="w-full mt-4 py-2.5 border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition flex items-center justify-center gap-2 text-sm">
          Download Preliminary Report (PDF)
        </button>
      )}
    </div>
  );
}
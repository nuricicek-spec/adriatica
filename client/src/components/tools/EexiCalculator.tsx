// EexiCalculator.tsx
import { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { VESSEL_TYPES, FUEL_TYPES, DEFAULT_SFC_ME, DEFAULT_SFC_AUX, FW_FACTOR, EEXI_REDUCTION_FACTORS, getEediBaseline } from "@/data/calculators";

export function EexiCalculator() {
  const [vesselType, setVesselType] = useState("bulkCarrier");
  const [dwt, setDwt] = useState("");
  const [targetYear, setTargetYear] = useState("2026");
  
  const [meMcr, setMeMcr] = useState("");
  const [meFuel, setMeFuel] = useState("HFO");
  const [meSfc, setMeSfc] = useState(DEFAULT_SFC_ME.toString());
  const [vref, setVref] = useState("");

  const [hasPto, setHasPto] = useState(false);
  const [ptoPower, setPtoPower] = useState("");
  const [ptoEff, setPtoEff] = useState("1.0");
  const [auxPower, setAuxPower] = useState("");
  const [auxSfc, setAuxSfc] = useState(DEFAULT_SFC_AUX.toString());
  
  const [result, setResult] = useState<any>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleCalculate = () => {
    const dwtNum = parseFloat(dwt);
    const mcrNum = parseFloat(meMcr);
    const vrefNum = parseFloat(vref);
    const sfcMe = parseFloat(meSfc) || DEFAULT_SFC_ME;
    const sfcAux = parseFloat(auxSfc) || DEFAULT_SFC_AUX;
    const auxNum = parseFloat(auxPower) || 0;
    const ptoNum = parseFloat(ptoPower) || 0;
    const ptoEffNum = parseFloat(ptoEff) || 1.0;
    const yearNum = parseInt(targetYear);

    if (!dwtNum || !mcrNum || !vrefNum) return;

    const typeData = VESSEL_TYPES.find(v => v.value === vesselType);
    const fuelData = FUEL_TYPES.find(f => f.value === meFuel);
    if (!typeData || !fuelData) return;

    const meEmissions = (sfcMe * fuelData.cf * mcrNum) / 1e6;
    const ptoReduction = hasPto ? ((ptoEffNum * ptoNum) * fuelData.cf) / 1e6 : 0;
    const auxEmissions = (sfcAux * fuelData.cf * auxNum) / 1e6;

    const totalEmissions = Math.max(0, meEmissions - ptoReduction + auxEmissions);
    const attainedEexi = (totalEmissions * 1e6) / (typeData.fi * typeData.fc * dwtNum * vrefNum);

    const baselineEedi = getEediBaseline(dwtNum, vesselType);
    const reductionFactor = EEXI_REDUCTION_FACTORS[yearNum] || 0.08;
    const requiredEexi = baselineEedi * (1 - reductionFactor);

    let eplLimit = null;
    if (attainedEexi > requiredEexi) {
      eplLimit = mcrNum * Math.pow((requiredEexi / attainedEexi), (1 / 3.5));
    }

    const finalResult = {
      attained: attainedEexi.toFixed(2),
      required: requiredEexi.toFixed(2),
      isCompliant: attainedEexi <= requiredEexi,
      eplLimit: eplLimit ? eplLimit.toFixed(0) : null,
      baselineEedi: baselineEedi.toFixed(2)
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
      filename: 'Adriatica_EEXI_Preliminary_Report.pdf',
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

  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-1">EEXI Calculation</h2>
      <p className="text-xs text-muted-foreground mb-6">Based on MEPC.338(76) - Including PTO/PTI and Auxiliary Engine parameters.</p>

      <div className="space-y-6">
        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Vessel Parameters</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vessel Type</label>
              <select value={vesselType} onChange={e => setVesselType(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {VESSEL_TYPES.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Deadweight at Design Draft (DWT)</label>
              <input type="number" value={dwt} onChange={e => setDwt(e.target.value)} placeholder="50000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1">Target Compliance Year</label>
              <select value={targetYear} onChange={e => setTargetYear(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {Object.keys(EEXI_REDUCTION_FACTORS).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Main Engine (ME)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">MCR (kW)</label>
              <input type="number" value={meMcr} onChange={e => setMeMcr(e.target.value)} placeholder="8000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Fuel Type</label>
              <select value={meFuel} onChange={e => setMeFuel(e.target.value)} className="w-full p-2 border rounded-sm bg-white text-sm focus:border-primary outline-none">
                {FUEL_TYPES.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">SFC (g/kWh)</label>
              <input type="number" value={meSfc} onChange={e => setMeSfc(e.target.value)} placeholder={DEFAULT_SFC_ME.toString()} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">Vref (Knots)</label>
              <input type="number" step="0.1" value={vref} onChange={e => setVref(e.target.value)} placeholder="14.5" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
            </div>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-sm border border-border/20">
          <h3 className="text-sm font-bold text-[#0B3B5C] mb-3 uppercase tracking-wider">Auxiliary & Power Take-In (PTI)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Total Auxiliary Power - PAE (kW)</label>
                <input type="number" value={auxPower} onChange={e => setAuxPower(e.target.value)} placeholder="500" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1">Aux SFC (g/kWh)</label>
                <input type="number" value={auxSfc} onChange={e => setAuxSfc(e.target.value)} placeholder={DEFAULT_SFC_AUX.toString()} className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
              </div>
            </div>
            <div className="space-y-3 border-l-2 border-primary/20 pl-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="ptoCheck" checked={hasPto} onChange={e => setHasPto(e.target.checked)} className="rounded border-border text-primary" />
                <label htmlFor="ptoCheck" className="text-sm font-medium text-[#0B3B5C]">Shaft Generator / PTO Installed?</label>
              </div>
              {hasPto && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">PTO Power Capacity (kW)</label>
                    <input type="number" value={ptoPower} onChange={e => setPtoPower(e.target.value)} placeholder="1000" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">PTO Efficiency Factor (f_eff)</label>
                    <input type="number" step="0.1" value={ptoEff} onChange={e => setPtoEff(e.target.value)} placeholder="1.0" className="w-full p-2 border rounded-sm text-sm focus:border-primary outline-none" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCalculate} className="w-full py-3 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition mt-6">
        Calculate Attained EEXI
      </button>

      {result && (
        <div ref={pdfRef} className="mt-6 p-6 bg-white border-2 rounded-sm" style={{color: '#000'}}>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0B3B5C]">PRELIMINARY EEXI ASSESSMENT</h3>
              <p className="text-xs text-gray-500">Generated by Adriatica D.O.O. Engineering Tools</p>
            </div>
          </div>
          
          <div className={`p-4 border-2 rounded-sm mb-4 ${result.isCompliant ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
            <h4 className={`text-base font-bold mb-2 ${result.isCompliant ? 'text-green-800' : 'text-red-800'}`}>
              STATUS: {result.isCompliant ? "COMPLIANT" : "NON-COMPLIANT"}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-gray-600">Attained EEXI:</span>
                <p className="font-bold text-xl text-[#0B3B5C]">{result.attained}</p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Required EEXI ({targetYear}):</span>
                <p className="font-bold text-xl text-[#0B3B5C]">{result.required}</p>
              </div>
            </div>
            {!result.isCompliant && result.eplLimit && (
              <div className="mt-4 pt-3 border-t border-red-300 bg-white/50 p-3 rounded-sm">
                <h5 className="font-bold text-sm text-red-800 mb-1">EPL LIMITATION ESTIMATE</h5>
                <p className="font-mono font-bold text-lg text-[#0B3B5C]">{result.eplLimit} kW <span className="text-xs font-normal text-gray-600">(from {meMcr} kW)</span></p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 p-3 rounded-sm border text-[10px] text-gray-600 leading-relaxed">
            <p className="font-bold text-[#0B3B5C] mb-1">CALCULATION METHODOLOGY & ASSUMPTIONS:</p>
            <p>This estimation uses a simplified baseline formula derived from MEPC.338(76) guidelines, mapping vessel parameters to Attained EEDI baselines. Weather corrections (fw) assume standard sea trials. It excludes specific hull line optimization factors (C_FV). This document is NOT an IEE Certificate or Class-approved EEXI technical file.</p>
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
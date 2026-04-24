export function EexiCalculator() {
  return (
    <div className="bg-white border border-border/40 rounded-sm p-6 md:p-8">
      <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-2">
        EEXI (Existing Ship Energy Efficiency Index)
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Preliminary assessment of your vessel's EEXI value against IMO MARPOL Annex VI Phase 3 limits.
      </p>
      
      <div className="bg-neutral-50 border border-dashed border-primary/30 rounded-sm p-8 text-center text-muted-foreground">
        <p className="font-medium">EEXI Input Form & Calculation Logic</p>
        <p className="text-xs mt-2">(IMO Formülasyonu ve State Yönetimi bir sonraki adımda buraya eklenecek)</p>
      </div>
    </div>
  );
}
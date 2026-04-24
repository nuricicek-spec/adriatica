import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Shield, AlertTriangle } from "lucide-react";
import { EexiCalculator } from "@/components/tools/EexiCalculator";
import { CiiCalculator } from "@/components/tools/CiiCalculator";
import { BwtsCalculator } from "@/components/tools/BwtsCalculator";

const TABS = [
  { id: "eexi", label: "EEXI Calculator", component: EexiCalculator },
  { id: "cii", label: "CII Predictor", component: CiiCalculator },
  { id: "bwts", label: "BWTS Sizing", component: BwtsCalculator },
];

export default function Tools() {
  const [activeTab, setActiveTab] = useState("eexi");
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;

  return (
    <>
      <SEO
        title="Marine Engineering Calculators"
        description="Free preliminary EEXI, CII, and BWTS sizing calculators based on IMO regulations. Download branded PDF reports."
        canonical="https://www.adriaticadoo.com/tools"
      />
      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />
        
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto fade-in">
            {/* Üst Başlık Alanı */}
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
                Marine Engineering Calculators
              </h1>
              <p className="text-lg text-foreground/75 max-w-3xl mx-auto">
                Preliminary compliance assessments based on IMO regulations. 
                Evaluate your vessel's status before dry-dock or survey.
              </p>
            </div>

            {/* Hızlı Bilgi Kartları (Consultation sayfasındaki gibi) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary shrink-0" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">
                    IMO Aligned
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Calculations based on MEPC.338(76) and MARPOL Annex VI guidelines.
                </p>
              </div>
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-6 w-6 text-primary shrink-0" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">
                    Instant Baseline
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Identify compliance gaps and EPL requirements in seconds.
                </p>
              </div>
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary shrink-0" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">
                    No Obligation
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use freely to assess your fleet before contacting engineering support.
                </p>
              </div>
            </div>

            {/* Ana İçerik Grid'i (Consultation sayfasıyla aynı oran: 7/5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              
              {/* Sol Taraf: Hesaplama Araçları */}
              <div className="lg:col-span-7">
                {/* Sekmeler */}
                <div className="flex gap-2 mb-6 border-b border-border/20 pb-4">
                  {TABS.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                        activeTab === tab.id 
                          ? "bg-primary text-white" 
                          : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Aktif Hesaplayıcı Component'i */}
                {ActiveComponent && <ActiveComponent />}
              </div>

              {/* Sağ Taraf: Sabit Yan Panel (Consultation sayfasındaki yapı) */}
              <div className="lg:col-span-5">
                <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 shadow-sm sticky top-24">
                  <p className="text-sm text-muted-foreground mb-4 pb-2 border-b border-border/20">
                    These tools provide preliminary estimations based on general inputs — not a substitute for official class approval.
                  </p>

                  <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                    Why Use These Tools?
                  </h2>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                    Facing a PSC inspection or preparing for dry-dock?
                  </p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    Whether you're a superyacht captain, a commercial fleet technical manager, or an owner — use these calculators to quickly understand your vessel's regulatory standing before investing in official engineering studies.
                  </p>

                  <h3 className="font-display font-bold text-[#0B3B5C] mb-3 mt-6">
                    What Happens Next
                  </h3>
                  <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside mb-6">
                    <li>Run your preliminary calculation above.</li>
                    <li>If non-compliant, contact us with your vessel details.</li>
                    <li>We review and provide official technical feedback & options.</li>
                  </ol>

                  <div className="mt-6 pt-6 border-t border-border/30">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#0B3B5C] text-sm">
                          Disclaimer: Preliminary Data Only
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          Results are based on user-provided estimations, not as-built or sea trial data. They do not replace official EEXI verification, EPL calculation, or Class Society approval packages.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/request-consultation"
                    className="mt-6 w-full inline-flex items-center justify-center bg-[#D4AF37] text-black font-medium px-6 py-3 rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm text-center"
                  >
                    Request Official Study
                  </a>
                </div>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
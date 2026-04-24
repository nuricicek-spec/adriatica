import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { EexiCalculator } from "@/components/tools/EexiCalculator";
import { CiiCalculator } from "@/components/tools/CiiCalculator";
import { BwtsCalculator } from "@/components/tools/BwtsCalculator";
import { Helmet } from "react-helmet-async";

const TABS = [
  { id: "eexi", label: "EEXI Calculator", component: EexiCalculator },
  { id: "cii", label: "CII Predictor", component: CiiCalculator },
  { id: "bwts", label: "BWTS Sizing", component: BwtsCalculator },
];

// Orijinal, detaylı Schema kodun (hiçbir şey eksilmedi)
const toolsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.adriaticadoo.com/#website",
      "url": "https://www.adriaticadoo.com/",
      "name": "Adriatica D.O.O.",
      "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
      "inLanguage": "en",
      "publisher": { "@id": "https://www.adriaticadoo.com/#organization" }
    },
    {
      "@type": "WebPage",
      "@id": "https://www.adriaticadoo.com/tools/#webpage",
      "url": "https://www.adriaticadoo.com/tools",
      "name": "Marine Engineering Compliance Calculators",
      "description": "Interactive tools for preliminary EEXI calculation, CII rating prediction, and BWTS capacity sizing.",
      "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
      "about": {
        "@type": "ItemList",
        "name": "Engineering Compliance Tools",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "SoftwareApplication",
              "name": "EEXI Calculator",
              "applicationCategory": "EngineeringApplication",
              "operatingSystem": "Web Browser",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "SoftwareApplication",
              "name": "CII Operational Predictor",
              "applicationCategory": "EngineeringApplication",
              "operatingSystem": "Web Browser",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "SoftwareApplication",
              "name": "BWTS Capacity Sizing",
              "applicationCategory": "EngineeringApplication",
              "operatingSystem": "Web Browser",
              "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" }
            }
          }
        ]
      },
      "inLanguage": "en"
    },
    {
      "@type": "Organization",
      "@id": "https://www.adriaticadoo.com/#organization",
      "name": "Adriatica D.O.O.",
      "url": "https://www.adriaticadoo.com/",
      "logo": { "@type": "ImageObject", "url": "https://www.adriaticadoo.com/logo.png" }
    }
  ]
};

export default function Tools() {
  const [activeTab, setActiveTab] = useState("eexi");
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;
  
  // Dinamik CTA State
  const [complianceStatus, setComplianceStatus] = useState<string>("idle");

  // Calculator'lardan gelen sinyalleri dinle
  useEffect(() => {
    const handleStatusUpdate = (e: any) => {
      setComplianceStatus(e.detail.status);
    };

    window.addEventListener("tool_compliance_update", handleStatusUpdate);
    return () => window.removeEventListener("tool_compliance_update", handleStatusUpdate);
  }, []);

  // Sekme değiştiğinde statüyü sıfırla
  useEffect(() => {
    setComplianceStatus("idle");
  }, [activeTab]);

  return (
    <>
      <SEO
        title="Marine Engineering Calculators"
        description="Calculate preliminary EEXI attained values, predict CII operational ratings, and size BWTS systems based on IMO MEPC regulations. Free maritime compliance tools."
        canonical="https://www.adriaticadoo.com/tools"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(toolsPageSchema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

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

            {/* Hızlı Bilgi Kartları */}
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

            {/* Ana İçerik Grid'i */}
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

              {/* Sağ Taraf: Sabit Yan Panel */}
              <div className="lg:col-span-5">
                <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 shadow-sm sticky top-24">
                  
                  {/* EĞER UYUŞMUZSA: KIRMIZI ALARM CTA (ALTIN BUTON YOK) */}
                  {complianceStatus === "non-compliant" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm animate-in fade-in duration-300">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-red-800 text-sm mb-1">Compliance Gap Detected</h4>
                          <p className="text-xs text-red-700 leading-relaxed mb-3">
                            Based on your inputs, the vessel does not meet current IMO thresholds. Avoid dry-dock delays or PSC detentions.
                          </p>
                          <a
                            href="/request-consultation"
                            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white font-medium px-4 py-2.5 rounded-sm shadow-lg hover:bg-red-700 transition-all uppercase tracking-wide text-xs text-center"
                          >
                            Get Technical Solution <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* EĞER UYUMLU İSE VEYA HENÜZ HESAP YAPILMADIYSA: STANDART BİLGİ METNİ */}
                  {complianceStatus !== "non-compliant" && (
                    <p className="text-sm text-muted-foreground mb-4 pb-2 border-b border-border/20">
                      These tools provide preliminary estimations — not a substitute for official class approval.
                    </p>
                  )}

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
                    <li>Download the report for your records.</li>
                    <li>If non-compliant, contact us with your vessel details.</li>
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

                  {/* EĞER UYUŞMUZSA ALTIN BUTONU TAMAMEN GİZLE */}
                  {complianceStatus !== "non-compliant" && (
                    <a
                      href="/request-consultation"
                      className="mt-6 w-full inline-flex items-center justify-center bg-[#D4AF37] text-black font-medium px-6 py-3 rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm text-center"
                    >
                      Request Official Study
                    </a>
                  )}
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
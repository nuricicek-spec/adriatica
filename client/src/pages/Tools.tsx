import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Shield, AlertTriangle, ArrowRight } from "lucide-react";
import { EexiCalculator } from "@/components/tools/quick/EexiCalculator";
import { CiiCalculator } from "@/components/tools/quick/CiiCalculator";
import { BwtsCalculator } from "@/components/tools/quick/BwtsCalculator";
import { EtsCalculator } from "@/components/tools/quick/EtsCalculator";
import { FueleuCalculator } from "@/components/tools/quick/FueleuCalculator";
import { ShapoliCalculator } from "@/components/tools/quick/ShapoliCalculator";
import { FuelChangeoverCalculator } from "@/components/tools/quick/FuelChangeoverCalculator";
import { FuelEuProCalculator } from "@/components/tools/deep/FuelEuProCalculator";
import { EtsFleetCalculator } from "@/components/tools/deep/EtsFleetCalculator";
import { CiiOptimizeCalculator } from "@/components/tools/deep/CiiOptimizeCalculator";
import { Biofouling2026Calculator } from "@/components/tools/deep/Biofouling2026Calculator";
import { ScenarioEngine } from "@/components/tools/strategic/ScenarioEngine";
import { DryDockPlanner } from "@/components/tools/strategic/DryDockPlanner";
import { VesselHealthScore } from "@/components/tools/strategic/VesselHealthScore";
import { Helmet } from "react-helmet-async";

type CategoryId = "quick" | "deep" | "strategic";
type TabId = string;
type ComplianceStatus = "idle" | "compliant" | "non-compliant";

interface ToolTab {
  id: TabId;
  label: string;
  shortLabel: string;
  component: React.ComponentType;
}

interface ToolCategory {
  id: CategoryId;
  label: string;
  description: string;
  tabs: ToolTab[];
}

const CATEGORIES: ToolCategory[] = [
  {
    id: "quick",
    label: "Quick Check",
    description: "Rapid compliance screening — key parameters only",
    tabs: [
      { id: "eexi",       label: "EEXI Calculator",      shortLabel: "EEXI",       component: EexiCalculator },
      { id: "cii",        label: "CII Predictor",        shortLabel: "CII",        component: CiiCalculator },
      { id: "bwts",       label: "BWTS Sizing",          shortLabel: "BWTS",       component: BwtsCalculator },
      { id: "ets",        label: "EU ETS Cost",          shortLabel: "EU ETS",     component: EtsCalculator },
      { id: "fueleu",     label: "FuelEU Penalty",       shortLabel: "FuelEU",     component: FueleuCalculator },
      { id: "shapoli",    label: "ShaPoLi Assessment",   shortLabel: "ShaPoLi",    component: ShapoliCalculator },
      { id: "changeover", label: "Fuel Changeover",      shortLabel: "Changeover", component: FuelChangeoverCalculator },
    ],
  },
  {
    id: "deep",
    label: "Deep Analysis",
    description: "Strategic optimization — multi-parameter, what-if scenarios",
    tabs: [
      { id: "fueleu-pro", label: "FuelEU Pro Multi-Fuel", shortLabel: "FuelEU Pro",   component: FuelEuProCalculator },
      { id: "ets-fleet",  label: "ETS Fleet Exposure",    shortLabel: "ETS Fleet",    component: EtsFleetCalculator },
      { id: "cii-opt",    label: "CII Optimize",          shortLabel: "CII Optimize", component: CiiOptimizeCalculator },
      { id: "biofouling", label: "Biofouling 2026",       shortLabel: "Biofouling",   component: Biofouling2026Calculator },
    ],
  },
  {
    id: "strategic",
    label: "Strategic Planning",
    description: "Fleet-level decision support and project planning",
    tabs: [
      { id: "scenario", label: "Scenario Engine",     shortLabel: "Scenario",     component: ScenarioEngine },
      { id: "drydock",  label: "Dry-Dock Planner",    shortLabel: "Dry-Dock",     component: DryDockPlanner },
      { id: "health",   label: "Vessel Health Score", shortLabel: "Health Score", component: VesselHealthScore },
    ],
  },
];

const ALL_TABS = CATEGORIES.flatMap((c) => c.tabs);
const ALL_TAB_IDS = ALL_TABS.map((t) => t.id);

const toolsPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.adriaticadoo.com/#website",
      url: "https://www.adriaticadoo.com/",
      name: "Adriatica D.O.O.",
      description: "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
      inLanguage: "en",
      publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.adriaticadoo.com/tools/#webpage",
      url: "https://www.adriaticadoo.com/tools",
      name: "Marine Engineering Compliance Calculators",
      description:
        "Interactive tools for preliminary EEXI, CII, BWTS, EU ETS, FuelEU, and strategic fleet planning.",
      isPartOf: { "@id": "https://www.adriaticadoo.com/#website" },
      about: {
        "@type": "ItemList",
        name: "Engineering Compliance Tools",
        itemListElement: ALL_TABS.map((tab, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "SoftwareApplication",
            name: tab.label,
            applicationCategory: "EngineeringApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          },
        })),
      },
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": "https://www.adriaticadoo.com/#organization",
      name: "Adriatica D.O.O.",
      url: "https://www.adriaticadoo.com/",
      logo: { "@type": "ImageObject", url: "https://www.adriaticadoo.com/logo.svg" },
    },
  ],
};

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("quick");
  const [activeTab, setActiveTab] = useState<TabId>("eexi");
  const [complianceStatus, setComplianceStatus] = useState<ComplianceStatus>("idle");

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory)!;
  const ActiveComponent = currentCategory.tabs.find((t) => t.id === activeTab)?.component;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tool = params.get("tool");
    if (tool && ALL_TAB_IDS.includes(tool)) {
      for (const cat of CATEGORIES) {
        if (cat.tabs.some((t) => t.id === tool)) {
          setActiveCategory(cat.id);
          setActiveTab(tool);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleStatusUpdate = (e: CustomEvent<{ status: ComplianceStatus }>) => {
      setComplianceStatus(e.detail.status);
    };
    window.addEventListener("tool_compliance_update", handleStatusUpdate as EventListener);
    return () => window.removeEventListener("tool_compliance_update", handleStatusUpdate as EventListener);
  }, []);

  useEffect(() => {
    setComplianceStatus("idle");
  }, [activeTab]);

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    const cat = CATEGORIES.find((c) => c.id === catId)!;
    setActiveTab(cat.tabs[0].id);
  };

  return (
    <>
      <SEO
        title="Marine Engineering Calculators"
        description="Free EEXI, CII, BWTS, EU ETS and FuelEU calculators for preliminary vessel compliance. Identify regulatory gaps before dry-dock or PSC inspection."
        canonical="https://www.adriaticadoo.com/tools"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(toolsPageSchema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <div className="min-h-[100dvh] bg-background font-body selection:bg-primary/20">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto fade-in">
            <div className="text-center mb-8">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
                Marine Engineering Calculators
              </h1>
              <p className="text-lg text-foreground/75 max-w-3xl mx-auto">
                Preliminary compliance assessments based on IMO and EU regulations.
                Evaluate your vessel's status before dry-dock or survey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">IMO & EU Aligned</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  MEPC.338(76), MARPOL Annex VI, EU ETS Directive, and FuelEU Maritime.
                </p>
              </div>
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">Instant Baseline</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Identify compliance gaps and cost exposure in seconds.
                </p>
              </div>
              <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
                  <h2 className="font-display font-bold text-[#0B3B5C] text-base">No Obligation</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use freely to assess your fleet before contacting engineering support.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
              <div className="lg:col-span-7">
                {/* Category Selector */}
                <div className="flex gap-2 mb-4 border-b border-border/20 pb-4">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                        activeCategory === cat.id
                          ? "bg-[#0B3B5C] text-white"
                          : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Tab Selector — Mobile */}
                <div className="block md:hidden mb-6">
                  <label htmlFor="tool-select" className="block text-xs font-medium text-muted-foreground mb-1">
                    Select Tool
                  </label>
                  <select
                    id="tool-select"
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-sm bg-white text-sm font-medium text-[#0B3B5C] focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  >
                    {currentCategory.tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tab Selector — Desktop */}
                <div
                  className="hidden md:flex gap-2 mb-6 border-b border-border/20 pb-4 flex-wrap"
                  role="tablist"
                  aria-label={`${currentCategory.label} tools`}
                >
                  {currentCategory.tabs.map((tab) => (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      aria-controls={`tabpanel-${tab.id}`}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors whitespace-nowrap ${
                        activeTab === tab.id
                          ? "bg-primary text-white"
                          : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"
                      }`}
                    >
                      {tab.shortLabel}
                    </button>
                  ))}
                </div>

                {/* Active Tool */}
                <div
                  id={`tabpanel-${activeTab}`}
                  role="tabpanel"
                  aria-label={currentCategory.tabs.find((t) => t.id === activeTab)?.label}
                >
                  {ActiveComponent && <ActiveComponent />}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 shadow-sm sticky top-24">
                  {complianceStatus === "non-compliant" && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-sm animate-in fade-in duration-300">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <h4 className="font-bold text-red-800 text-sm mb-1">Compliance Gap Detected</h4>
                          <p className="text-xs text-red-700 leading-relaxed mb-3">
                            Based on your inputs, the vessel does not meet current IMO thresholds.
                            Avoid dry-dock delays or PSC detentions.
                          </p>
                          <a
                            href="/request-consultation"
                            className="w-full inline-flex items-center justify-center gap-2 bg-red-600 text-white font-medium px-4 py-2.5 rounded-sm shadow-lg hover:bg-red-700 transition-all uppercase tracking-wide text-xs text-center"
                          >
                            Get Technical Solution <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

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
                        <AlertTriangle className="h-5 w-5 text-primary" aria-hidden="true" />
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

                  {complianceStatus !== "non-compliant" && (
                    <a
                      href="/request-consultation"
                      className="mt-6 w-full inline-flex items-center justify-center bg-[#D4AF37] text-black font-medium px-6 py-3 rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#B8952A] transition-all duration-300 uppercase tracking-wide text-sm text-center"
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
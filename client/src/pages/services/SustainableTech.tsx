import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function SustainableTech() {
  const service = services.find(s => s.slug === "sustainable-technologies");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.me/services/sustainable-technologies/#webpage",
        "url": "https://www.adriaticadoo.me/services/sustainable-technologies",
        "name": "Sustainable Technologies & Compliance | Adriatica D.O.O.",
        "description": "Biofouling management plans (IMO MEPC.378(80)), eco‑friendly coating advisory, energy audits, MRV monitoring plans – helping vessels meet environmental regulations.",
        "isPartOf": { "@id": "https://www.adriaticadoo.me/#website" },
        "about": { "@id": "https://www.adriaticadoo.me/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-15"
      },
      {
        "@type": "Service",
        "@id": "https://www.adriaticadoo.me/services/sustainable-technologies/#service",
        "name": "Sustainable Technologies & Compliance",
        "description": "Biofouling management plans (IMO MEPC.378(80)), eco‑friendly coating advisory, energy audits, MRV monitoring plans – helping vessels meet environmental regulations.",
        "url": "https://www.adriaticadoo.me/services/sustainable-technologies",
        "provider": { "@id": "https://www.adriaticadoo.me/#organization" },
        "areaServed": [
          { "@type": "Place", "name": "Montenegro" },
          { "@type": "Place", "name": "Adriatic Sea" },
          { "@type": "Place", "name": "Mediterranean Sea" },
          { "@type": "Place", "name": "Europe" }
        ],
        "serviceType": "Sustainable Technologies & Compliance",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Sustainable Technologies Deliverables",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Biofouling Management Plan (IMO MEPC.378(80))",
                "description": "Vessel‑specific biofouling assessment, cleaning execution plan, certified diver coordination, compliance verification, and Biofouling Record Book support."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Eco‑friendly Coating Advisory",
                "description": "Selection of anti‑fouling coatings based on operational profile, trading area, and environmental regulations."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Energy Audit & Efficiency Surveys",
                "description": "Comprehensive assessment of energy consumption, identification of inefficiencies, and cost‑benefit analysis of retrofits."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "MRV Monitoring Plan (EU MRV Regulation)",
                "description": "Plan for Monitoring, Reporting, and Verification in full compliance with EU Regulation 2015/757."
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.me/#website",
        "url": "https://www.adriaticadoo.me/",
        "name": "Adriatica D.O.O.",
        "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.me/#organization" }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Sustainable Technologies & Compliance"
        description="Biofouling management plans (IMO MEPC.378(80)), eco‑friendly coating advisory, energy audits, MRV monitoring plans – helping vessels meet environmental regulations."
        canonical="https://www.adriaticadoo.me/services/sustainable-technologies"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema).replace(/</g, '\\u003c')}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Sustainable Technologies &amp; Compliance
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Your vessel gets advisory and planning services that help meet environmental regulations while improving efficiency. We work with you to implement practical, cost‑effective solutions that reduce emissions and biosecurity risks.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Biofouling Management Plan (IMO MEPC.378(80))</li>
              <li>Eco‑friendly Coating Advisory</li>
              <li>Energy Audit &amp; Efficiency Surveys</li>
              <li>MRV Monitoring Plan (EU MRV Regulation)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You receive IMO‑compliant plans, reduced fuel consumption, and lower environmental risk.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IMO, EU MRV, Paris MoU</p>

            <div className="flex justify-center my-6">
              <img
                src="/images/services/sustainable-tech-schema.svg"
                alt="Biofouling management cycle – risk assessment, cleaning execution, documentation, PSC ready"
                className="w-full max-w-2xl mx-auto"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>

            <div className="mt-8 space-y-6">
              {/* Biofouling Management – detailed block */}
              <div className="bg-neutral-50 border-l-2 border-primary/20 p-6 rounded-sm">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="font-display text-xl font-bold text-[#0B3B5C]">Biofouling Management Plan (IMO MEPC.378(80))</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    IMO 2026 Priority
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">
                  Adriatica does not perform physical cleaning operations. We provide independent engineering management, coordination, and compliance oversight.
                </p>
                <p className="text-muted-foreground mb-3">
                  Without proper management, in-water cleaning can lead to non‑compliance with port regulations, environmental penalties, and coating damage. We ensure your operations are controlled, compliant, and fully documented.
                </p>
                <p className="text-muted-foreground mb-3">
                  When you work with us on biofouling management, you receive a complete compliance package:
                </p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Vessel‑specific biofouling assessment (coating condition, niche areas)</li>
                  <li>Cleaning execution plan with method selection (non‑abrasive, vacuum‑supported)</li>
                  <li>Certified diver coordination &amp; operation management</li>
                  <li>Environmental compliance verification (debris containment, local regulations)</li>
                  <li>Before/after photographic evidence and inspection records</li>
                  <li>Biofouling Record Book (BFRB) entry support</li>
                  <li>Post‑operation technical summary with compliance status</li>
                </ul>
                <p className="mt-4 text-primary font-medium">
                  Typical outcome: A structured, compliance‑ready documentation package and a fully managed in‑water cleaning operation with verifiable records – ready for PSC inspection.
                </p>
              </div>

              {/* Eco‑friendly Coating Advisory */}
              <div className="bg-neutral-50 border-l-2 border-primary/20 p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Eco‑friendly Coating Advisory</h3>
                <p className="text-muted-foreground mb-2">
                  We help you select the most suitable anti‑fouling coating based on your vessel’s operational profile, trading area, and environmental regulations. Our advisory includes:
                </p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Review of coating specifications and performance data</li>
                  <li>Compatibility assessment with existing coatings and hull material</li>
                  <li>Application procedure guidance to ensure warranty validity</li>
                  <li>Life‑cycle cost analysis (including potential fuel savings)</li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  We also assist with coating condition inspections and recommend recoating schedules to maintain optimal performance and compliance.
                </p>
              </div>

              {/* Energy Audit & Efficiency Surveys */}
              <div className="bg-neutral-50 border-l-2 border-primary/20 p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Energy Audit &amp; Efficiency Surveys</h3>
                <p className="text-muted-foreground mb-2">
                  Our energy audits provide a comprehensive assessment of your vessel’s energy consumption and identify opportunities for improvement. The service includes:
                </p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>On‑board data collection (engine performance, auxiliary systems, fuel consumption)</li>
                  <li>Analysis of operational patterns and load profiles</li>
                  <li>Identification of inefficiencies (e.g., fouling, sub‑optimal trim, machinery degradation)</li>
                  <li>Cost‑benefit analysis of retrofit measures (e.g., LED lighting, variable speed drives, hull cleaning)</li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  The final report includes a prioritized list of recommendations with estimated savings and payback periods, supporting your Ship Energy Efficiency Management Plan (SEEMP) and CII rating.
                </p>
              </div>

              {/* MRV Monitoring Plan (EU MRV Regulation) */}
              <div className="bg-neutral-50 border-l-2 border-primary/20 p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">MRV Monitoring Plan (EU MRV Regulation)</h3>
                <p className="text-muted-foreground mb-2">
                  We prepare Monitoring, Reporting, and Verification (MRV) plans in full compliance with EU Regulation 2015/757. Our plans include:
                </p>
                <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                  <li>Definition of monitoring methodologies (fuel consumption, CO₂ emissions)</li>
                  <li>Description of data collection procedures and equipment</li>
                  <li>Risk assessment and quality assurance measures</li>
                  <li>Documentation of emission factors and calculation methods</li>
                </ul>
                <p className="mt-3 text-muted-foreground">
                  We also support you during the reporting period, ensuring that the collected data meets THETIS‑MRV requirements and that your annual emission report is submitted on time.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to reduce your vessel’s environmental footprint? Let’s get started.
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </HashLink>
            </div>
          </div>

          {service && (
            <RelatedContent
              serviceSlugs={service.relatedServices}
              caseStudySlugs={service.relatedCaseStudies}
              insightSlugs={service.relatedInsights}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
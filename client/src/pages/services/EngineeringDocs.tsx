import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function EngineeringDocs() {
  const service = services.find(s => s.slug === "engineering-documentation");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.me/services/engineering-documentation/#webpage",
        "url": "https://www.adriaticadoo.me/services/engineering-documentation",
        "name": "Engineering Documentation | Adriatica D.O.O.",
        "description": "Vessel‑specific technical manuals and analyses: as‑built P&IDs, electrical load analysis, fuel management booklets, IHM – ensuring crew training and port state control readiness.",
        "isPartOf": { "@id": "https://www.adriaticadoo.me/#website" },
        "about": { "@id": "https://www.adriaticadoo.me/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-15"
      },
      {
        "@type": "Service",
        "@id": "https://www.adriaticadoo.me/services/engineering-documentation/#service",
        "name": "Engineering Documentation",
        "description": "Vessel‑specific technical manuals and analyses including as‑built P&IDs, electrical load analysis, fuel management booklets, and IHM – fully aligned with IMO conventions, EU MRV, and class requirements.",
        "url": "https://www.adriaticadoo.me/services/engineering-documentation",
        "provider": { "@id": "https://www.adriaticadoo.me/#organization" },
        "areaServed": [
          { "@type": "Place", "name": "Montenegro" },
          { "@type": "Place", "name": "Adriatic Sea" },
          { "@type": "Place", "name": "Mediterranean Sea" },
          { "@type": "Place", "name": "Europe" }
        ],
        "serviceType": "Marine Engineering Documentation",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Engineering Documentation Deliverables",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "As‑Built P&ID / System Manuals",
                "description": "Complete piping and instrumentation diagrams reflecting final installed systems, compiled into operational system manuals."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Electrical Load Analysis (EAB)",
                "description": "Detailed assessment of vessel electrical power balance, generator sizing, and distribution system capacity submitted to class for approval."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fuel Management & Quality Booklet",
                "description": "Structured guide to fuel handling, storage, consumption, and MARPOL Annex VI compliance procedures."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Inventory of Hazardous Materials (IHM)",
                "description": "Comprehensive hazardous materials inventory prepared per Hong Kong Convention and EU Ship Recycling Regulation."
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
        title="Engineering Documentation"
        description="Vessel‑specific technical manuals and analyses: as‑built P&IDs, electrical load analysis, fuel management booklets, IHM – ensuring crew training and port state control readiness."
        canonical="https://www.adriaticadoo.me/services/engineering-documentation"
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
            Engineering Documentation
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              You get vessel‑specific technical manuals and analyses, fully aligned with IMO conventions, EU MRV, and class requirements. These documents facilitate crew training, maintenance planning, and port state control inspections – keeping you audit‑ready.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>As‑Built P&amp;ID / System Manuals</li>
              <li>Electrical Load Analysis (EAB)</li>
              <li>Fuel Management &amp; Quality Booklet</li>
              <li>Inventory of Hazardous Materials (IHM)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You receive audit‑ready documentation, improved crew familiarity, and smoother port state control inspections.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IMO, EU MRV, MARPOL</p>

            <div className="my-6 flex justify-center">
              <img
                src="/images/services/engineering-docs-schema.svg"
                alt="Engineering documentation flow: vessel data to P&ID, EAB, Fuel booklet, then IHM and Class submission"
                className="w-full max-w-2xl"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>

            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">As‑Built P&amp;ID / System Manuals</h3>
                <p className="text-muted-foreground">
                  You receive complete piping and instrumentation diagrams (P&amp;IDs) that reflect the final installed systems, including all valves, pumps, sensors, and control loops. These are compiled into system manuals that also include operational descriptions, troubleshooting guides, and maintenance schedules – delivered in both printed and digital formats for easy access.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A comprehensive reference that supports crew training, reduces downtime, and simplifies future modifications.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Electrical Load Analysis (EAB)</h3>
                <p className="text-muted-foreground">
                  A detailed assessment of your vessel's electrical power balance, identifying peak loads, generator sizing, and distribution system capacity. We use advanced calculation tools and consider all operational modes (navigation, manoeuvring, harbour, emergency). The analysis is submitted to class for approval – essential for generator scheduling and future electrical upgrades.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Class‑approved load analysis, optimised generator operation, and a solid basis for any electrical system changes.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Fuel Management &amp; Quality Booklet</h3>
                <p className="text-muted-foreground">
                  A structured guide to fuel handling, storage, and consumption. It includes procedures for bunkering, sampling, and reporting, as well as guidance on maintaining fuel quality to avoid engine damage and ensure compliance with MARPOL Annex VI. We also incorporate fuel‑oil changeover procedures and sulphur content recording requirements.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Clear, enforceable procedures that help maintain fuel quality, reduce operational costs, and pass PSC inspections.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Inventory of Hazardous Materials (IHM)</h3>
                <p className="text-muted-foreground">
                  A comprehensive list of hazardous materials on board, prepared in accordance with the Hong Kong Convention and EU Ship Recycling Regulation. We conduct a thorough review of vessel documentation and, if necessary, on‑board sampling to identify materials such as asbestos, PCBs, and ozone‑depleting substances. The IHM is essential for end‑of‑life planning and demonstrates your environmental responsibility.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A complete, compliant IHM that facilitates recycling, protects crew health, and meets regulatory requirements.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to get your vessel's technical manuals in order?
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
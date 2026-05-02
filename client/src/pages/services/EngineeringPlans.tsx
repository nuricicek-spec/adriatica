import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";
import { Link, Redirect } from "wouter";
import { allContent } from "@/lib/contentIndex";

export default function EngineeringPlans() {
  const service = services.find((s) => s.slug === "engineering-plans");
  if (!service) return <Redirect to="/404" />;

  const currentItem = allContent.find(
    (item) => item.slug === service.slug && item.type === "service",
  );
  if (!currentItem) return <Redirect to="/404" />;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.adriaticadoo.com/#organization",
        name: "Adriatica D.O.O.",
        url: "https://www.adriaticadoo.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.adriaticadoo.com/logo.svg", // FIX: .png → .svg
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        url: "https://www.adriaticadoo.com/",
        name: "Adriatica D.O.O.",
        description:
          "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        inLanguage: "en",
        publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/services/engineering-plans/#webpage",
        url: "https://www.adriaticadoo.com/services/engineering-plans",
        name: "Engineering Plans | Adriatica D.O.O.",
        description:
          "Engineering drawings for new constructions, conversions and refits: structural drawings, as-built sets, arrangement plans and fire safety plans.",
        isPartOf: { "@id": "https://www.adriaticadoo.com/#website" },
        about: { "@id": "https://www.adriaticadoo.com/#organization" },
        inLanguage: "en",
        datePublished: "2025-01-01",
        dateModified: "2025-03-15",
      },
      {
        "@type": "Service",
        "@id": "https://www.adriaticadoo.com/services/engineering-plans/#service",
        name: "Engineering Plans",
        description:
          "Production of classification-ready engineering drawings including structural plans per class rules, as-built verification, arrangement layouts (GA, machinery, piping), and SOLAS-compliant fire & safety plans for new builds, conversions, and refits.",
        url: "https://www.adriaticadoo.com/services/engineering-plans",
        provider: { "@id": "https://www.adriaticadoo.com/#organization" },
        isPartOf: {
          "@id": "https://www.adriaticadoo.com/services/engineering-plans/#webpage",
        },
        areaServed: [
          { "@type": "Place", name: "Montenegro" },
          { "@type": "Place", name: "Adriatic Sea" },
          { "@type": "Place", name: "Mediterranean Sea" },
          { "@type": "Place", name: "Europe" },
        ],
        serviceType: "Marine Engineering Plans",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Engineering Plans Deliverables",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Structural Drawings",
                description:
                  "Complete structural drawings covering primary and secondary steelwork, framing, plating, and connections per classification society rules.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "As-Built Drawing Sets",
                description:
                  "Updated drawings reflecting the actual condition of the vessel after construction or major modifications, verified on-site.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Arrangement Plans",
                description:
                  "General arrangement, machinery arrangement, piping isometrics, and accommodation layouts in 2D and 3D formats.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Fire & Safety Plans",
                description:
                  "Fire control plans, emergency escape routes, and safety equipment location drawings compliant with SOLAS and flag state requirements.",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <>
      {/* Description: 144 karakter — limit içinde */}
      <SEO
        title="Engineering Plans"
        description="Engineering drawings for new constructions, conversions and refits: structural drawings, as-built sets, arrangement plans and fire safety plans."
        canonical="https://www.adriaticadoo.com/services/engineering-plans"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center text-sm text-primary hover:underline mb-4"
          >
            ← Back to all services
          </Link>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            {service.title}
          </h1>
          <div className="max-w-none text-muted-foreground">
            <p className="text-lg font-medium text-primary italic border-l-4 border-primary pl-6 mb-6">
              Incomplete or inaccurate engineering drawings are a primary source
              of construction delays, budget overruns, and class approval
              bottlenecks. We produce precise, classification-ready drawing sets
              that eliminate ambiguity and keep your project on schedule.
            </p>
            <p className="text-lg mb-6">{service.description}</p>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              Deliverables
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              Outcome
            </h2>
            <p>{service.outcome}</p>
            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">
              References
            </h2>
            <p>{service.references}</p>
            <div className="flex justify-center my-6">
              <img
                src="/images/services/engineering-plans-schema.svg"
                alt="Engineering plans development workflow diagram"
                className="w-full max-w-2xl h-auto"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Structural Drawings
                </h3>
                <p className="text-muted-foreground">
                  You receive complete structural drawings covering your
                  vessel's primary and secondary steelwork, including framing,
                  plating, and connections. All drawings are prepared in
                  accordance with the applicable classification society rules
                  (RINA, BV, DNV) and include fabrication details, material
                  specifications, and welding procedures. We also provide 3D
                  models and finite element analysis (FEA) results when required
                  for complex structures.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Approval‑ready documentation that minimises back‑and‑forth
                  with class and ensures a smooth construction process.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  As‑Built Drawing Sets
                </h3>
                <p className="text-muted-foreground">
                  After construction or major modifications, we update the
                  original drawings to reflect the actual condition of your
                  vessel. This includes verifying measurements on‑site and
                  incorporating any field changes. The final as‑built set is
                  essential for future maintenance, modifications, and
                  compliance documentation.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Process:</span> On‑site physical
                  verification ensures the accuracy of the as‑built
                  documentation.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A reliable record that supports safe operation, simplifies
                  future engineering work, and meets flag state requirements for
                  vessel documentation.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Arrangement Plans
                </h3>
                <p className="text-muted-foreground">
                  General arrangement (GA), machinery arrangement, piping
                  isometrics, and accommodation layouts. We ensure that all
                  spaces and systems are clearly documented, with proper
                  labelling of equipment, access points, and emergency exits.
                  Drawings are produced in both 2D and 3D formats as needed.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Clear, user‑friendly plans that facilitate crew training,
                  maintenance planning, and regulatory surveys.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Fire &amp; Safety Plans
                </h3>
                <p className="text-muted-foreground">
                  Fire control plans, emergency escape routes, and safety
                  equipment location drawings, compliant with SOLAS and flag
                  state requirements. These plans are designed to be easily
                  understood by crew and port state control officers. We provide
                  both shipboard copies and the required electronic version for
                  the fire control plan folder.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  PSC‑ready documentation that enhances onboard safety and
                  demonstrates your regulatory compliance.
                </p>
              </div>
            </div>
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to get your engineering plans in place?
              </p>
              <Link
                href="/request-consultation"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </Link>
            </div>
          </div>
          <RelatedContent currentItem={currentItem} />
        </main>
        <Footer />
      </div>
    </>
  );
}
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { useRoute } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function EngineeringPlans() {
  const [match] = useRoute("/services/engineering-plans");
  const service = services.find(s => s.slug === "engineering-plans");

  return (
    <>
      <SEO
        title="Engineering Plans"
        description="Detailed engineering drawings and plan sets for new constructions, conversions, and refits – structural drawings, as‑built sets, arrangement plans, fire & safety plans."
        canonical="https://www.adriaticadoo.me/services/engineering-plans"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Engineering Plans
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              You get detailed engineering drawings and plan sets for new constructions, conversions, and refits. All documentation is produced in accordance with classification society rules and flag state requirements – supporting your regulatory approval and operational safety. Our deliverables suit yachts, commercial vessels, and fishing boats.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Structural Drawings</li>
              <li>As‑Built Drawing Sets</li>
              <li>Arrangement Plans</li>
              <li>Fire & Safety Plans</li>
              <li>General Arrangement (optional)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You receive class‑approved plan sets, reduced approval delays, and a clear basis for construction or modification.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>Class society rules (RINA, BV, DNV), flag state regulations</p>

            {/* Detailed sections for each deliverable – enhanced depth */}
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Structural Drawings</h3>
                <p className="text-muted-foreground">
                  You receive complete structural drawings covering your vessel’s primary and secondary steelwork, including framing, plating, and connections. All drawings are prepared in accordance with the applicable classification society rules (RINA, BV, DNV) and include fabrication details, material specifications, and welding procedures. We also provide 3D models and finite element analysis (FEA) results when required for complex structures.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Approval‑ready documentation that minimises back‑and‑forth with class and ensures a smooth construction process.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">As‑Built Drawing Sets</h3>
                <p className="text-muted-foreground">
                  After construction or major modifications, we update the original drawings to reflect the actual condition of your vessel. This includes verifying measurements on‑site and incorporating any field changes. The final as‑built set is essential for future maintenance, modifications, and compliance documentation.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A reliable record that supports safe operation, simplifies future engineering work, and meets flag state requirements for vessel documentation.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Arrangement Plans</h3>
                <p className="text-muted-foreground">
                  General arrangement (GA), machinery arrangement, piping isometrics, and accommodation layouts. We ensure that all spaces and systems are clearly documented, with proper labelling of equipment, access points, and emergency exits. Drawings are produced in both 2D and 3D formats as needed.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Clear, user‑friendly plans that facilitate crew training, maintenance planning, and regulatory surveys.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Fire & Safety Plans</h3>
                <p className="text-muted-foreground">
                  Fire control plans, emergency escape routes, and safety equipment location drawings, compliant with SOLAS and flag state requirements. These plans are designed to be easily understood by crew and port state control officers. We provide both shipboard copies and the required electronic version for the fire control plan folder.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> PSC‑ready documentation that enhances onboard safety and demonstrates your regulatory compliance.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to get your engineering plans in place?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </HashLink>
            </div>
          </div>

          {/* İçerik bağlantıları */}
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
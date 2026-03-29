import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { useRoute } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function RegulatoryCompliance() {
  const [match] = useRoute("/services/regulatory-compliance");
  const service = services.find(s => s.slug === "regulatory-compliance");

  return (
    <>
      <SEO
        title="Regulatory Compliance"
        description="Preparation and updating of mandatory shipboard plans and manuals: BWMP, SoPEP, SEEMP, Garbage Management Plan, Emergency Response Manuals – tailored to your vessel’s configuration."
        canonical="https://www.adriaticadoo.me/services/regulatory-compliance"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Regulatory Compliance
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              You receive preparation and periodic updating of mandatory shipboard plans and manuals, tailored to your vessel's configuration and operational profile. All documents meet the latest IMO, MARPOL, and flag state requirements – so you stay ahead of inspections.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ballast Water Management Plan (BWMP)</li>
              <li>Shipboard Oil Pollution Emergency Plan (SoPEP)</li>
              <li>Ship Energy Efficiency Management Plan (SEEMP)</li>
              <li>Garbage Management Plan</li>
              <li>Emergency Response Manuals</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You get PSC‑ready documentation, reduced inspection risk, and full compliance with current regulations.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IMO, MARPOL, flag state administrations</p>

            {/* Detailed sections – enhanced depth */}
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Ballast Water Management Plan (BWMP)</h3>
                <p className="text-muted-foreground">
                  A comprehensive plan that describes your vessel’s ballast water management system, operational procedures, and record‑keeping. It is prepared in accordance with the Ballast Water Management Convention and your specific ballast water treatment system (BWTS) or exchange method. We include detailed instructions for crew, maintenance schedules, and contingency measures.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A ready‑to‑use plan that passes PSC inspections and ensures compliance with ballast water discharge standards.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Shipboard Oil Pollution Emergency Plan (SoPEP)</h3>
                <p className="text-muted-foreground">
                  An IMO‑compliant plan that outlines the actions to be taken in the event of an oil spill. It includes contact lists, reporting procedures, and spill response strategies tailored to your vessel’s specific equipment and operational area. We also provide a simplified flow chart for quick reference by the crew.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A clear, actionable plan that minimises response time and demonstrates your preparedness to flag state and port authorities.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Ship Energy Efficiency Management Plan (SEEMP)</h3>
                <p className="text-muted-foreground">
                  A structured plan to improve your vessel’s energy efficiency, covering technical and operational measures. We assist with the required data collection for the IMO Data Collection System (DCS) and EU MRV, and help you develop a company‑specific improvement plan. The SEEMP is an essential tool for managing CII ratings and reducing fuel costs.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A practical plan that not only meets regulatory requirements but also drives tangible fuel savings.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Garbage Management Plan</h3>
                <p className="text-muted-foreground">
                  A plan that details garbage handling, segregation, storage, and disposal procedures in accordance with MARPOL Annex V. It includes a Garbage Record Book template and instructions for crew training. We also address specific requirements for special areas such as the Mediterranean.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Clear procedures that help you avoid fines and demonstrate responsible waste management.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Emergency Response Manuals</h3>
                <p className="text-muted-foreground">
                  Customised manuals covering emergency scenarios such as fire, flooding, man overboard, and cargo spills. They are written in clear, actionable language and include checklists, muster lists, and communication protocols. We also provide quick reference cards for each type of emergency.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A comprehensive set of response tools that empower your crew to act swiftly and effectively in critical situations.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Concerned about Port State Control readiness? Let’s fix that.
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
              serviceSlugs={[]}
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
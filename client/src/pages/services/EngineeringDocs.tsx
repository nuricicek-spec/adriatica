import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function EngineeringDocs() {
  return (
    <>
      <SEO
        title="Engineering Documentation"
        description="Vessel‑specific technical manuals and analyses: as‑built P&IDs, electrical load analysis, fuel management booklets, IHM – ensuring crew training and port state control readiness."
        canonical="https://www.adriaticadoo.me/services/engineering-documentation"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Engineering Documentation
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Development of vessel‑specific technical manuals and analyses, ensuring completeness and alignment with IMO conventions, EU MRV, and class requirements. We prepare documents to facilitate crew training, maintenance planning, and port state control inspections.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>As‑Built P&ID / System Manuals</li>
              <li>Electrical Load Analysis (EAB)</li>
              <li>Fuel Management & Quality Booklet</li>
              <li>Inventory of Hazardous Materials (IHM)</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>Audit‑ready documentation, improved crew familiarity, and smoother port state control inspections.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IMO, EU MRV, MARPOL</p>

            {/* Detailed sections for each deliverable */}
            <div className="mt-8 space-y-6">
              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">As‑Built P&ID / System Manuals</h3>
                <p className="text-muted-foreground">
                  Piping and instrumentation diagrams (P&IDs) that reflect the final installed systems. These are essential for troubleshooting, training, and modification planning. We also compile complete system manuals that integrate all relevant diagrams and operational instructions.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Electrical Load Analysis (EAB)</h3>
                <p className="text-muted-foreground">
                  A detailed assessment of the vessel’s electrical power balance, identifying peak loads, generator sizing, and distribution system capacity. This analysis supports classification society approval and helps plan future electrical upgrades.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Fuel Management & Quality Booklet</h3>
                <p className="text-muted-foreground">
                  A structured guide to fuel handling, storage, and consumption. It includes procedures for bunkering, sampling, and reporting, helping operators maintain fuel quality and comply with MARPOL Annex VI requirements.
                </p>
              </div>

              <div className="bg-neutral-50 border-l-4 border-primary p-6 rounded-sm">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Inventory of Hazardous Materials (IHM)</h3>
                <p className="text-muted-foreground">
                  A comprehensive list of hazardous materials on board, prepared in accordance with the Hong Kong Convention and EU Ship Recycling Regulation. This document is essential for end‑of‑life planning and demonstrates environmental responsibility.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Need support with your vessel’s technical manuals?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request Technical Assessment
              </HashLink>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
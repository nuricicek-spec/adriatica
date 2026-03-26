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
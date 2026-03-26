import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function EngineeringPlans() {
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
              Detailed engineering drawings and plan sets for new constructions, conversions, and refits. We produce documentation in accordance with classification society rules and flag state requirements, supporting both regulatory approval and operational safety. Our deliverables are suitable for yachts, commercial vessels, and fishing boats.
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
            <p>Class‑approved plan sets, reduced approval delays, and a clear basis for construction or modification.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>Class society rules (RINA, BV, DNV), flag state regulations</p>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Ready to start your next project?
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
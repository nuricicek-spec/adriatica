import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

export default function StructuralIntegrity() {
  return (
    <>
      <SEO
        title="Structural Integrity"
        description="Hull condition assessments, life extension studies, modification consultancy, vibration/noise diagnostics – IACS‑aligned evaluations for vessel safety and longevity."
        canonical="https://www.adriaticadoo.me/services/structural-integrity"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Structural Integrity
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              Comprehensive hull condition assessments, life extension studies, modification consultancy, and vibration/noise diagnostics. Using advanced engineering methods and IACS unified requirements, we evaluate structural performance and recommend targeted repairs or reinforcements.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Structural Integrity & Life Extension Studies</li>
              <li>Hull Condition Analysis</li>
              <li>Modification Consultancy</li>
              <li>Vibration & Noise Diagnostic</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>Clear repair priorities, extended operational life, and classification society acceptance.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IACS UR Z10, classification societies</p>

            <div className="mt-12 p-8 bg-neutral-50 border-l-4 border-primary text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Concerned about your vessel’s structural condition?
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
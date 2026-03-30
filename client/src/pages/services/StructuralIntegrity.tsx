import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { useRoute } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function StructuralIntegrity() {
  const [match] = useRoute("/services/structural-integrity");
  const service = services.find(s => s.slug === "structural-integrity");

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
              Your vessel benefits from comprehensive hull condition assessments, life extension studies, modification consultancy, and vibration/noise diagnostics. Using advanced engineering methods and IACS unified requirements, we evaluate structural performance and recommend targeted repairs or reinforcements.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Deliverables</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Structural Integrity & Life Extension Studies</li>
              <li>Hull Condition Analysis</li>
              <li>Modification Consultancy</li>
              <li>Vibration & Noise Diagnostic</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Outcome</h2>
            <p>You receive clear repair priorities, extended operational life, and classification society acceptance.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">References</h2>
            <p>IACS UR Z10, classification societies</p>

            {/* Detailed sections – enhanced depth */}
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Structural Integrity & Life Extension Studies</h3>
                <p className="text-muted-foreground">
                  We analyse the remaining fatigue life of your critical structural components using finite element analysis (FEA) combined with historical load data and inspection records. The study identifies areas of high stress concentration and predicts future degradation. You receive a detailed roadmap of required reinforcements, with prioritised recommendations and cost estimates.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> A clear path to extend your vessel’s safe operational life while minimising downtime and avoiding unplanned repairs.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Hull Condition Analysis</h3>
                <p className="text-muted-foreground">
                  A detailed evaluation of your hull’s current state, including thickness measurements, corrosion assessment, and structural audits. We use ultrasonic testing (UT) and visual inspections to map the condition of plating and framing. The report includes a “wastage plan” highlighting areas that require repair or replacement.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> An objective assessment that supports classification renewal, insurance surveys, and your strategic maintenance planning.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Modification Consultancy</h3>
                <p className="text-muted-foreground">
                  Engineering support for structural alterations, such as adding new equipment, changing deck arrangements, or extending superstructures. We provide feasibility studies, design calculations, and approval‑ready documentation for class and flag state. Our team also assists with the integration of modifications into your vessel’s existing systems.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Safe, compliant modifications delivered on time, with minimal impact on your vessel operations.
                </p>
              </div>

              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Vibration & Noise Diagnostic</h3>
                <p className="text-muted-foreground">
                  On‑board measurements using high‑precision accelerometers and acoustic sensors to identify sources of excessive vibration and noise. We analyse the data to pinpoint root causes – such as propeller imbalance, machinery misalignment, or structural resonance – and recommend practical mitigation measures. A post‑implementation verification is available to confirm effectiveness.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Outcome:</span> Improved crew comfort, reduced equipment wear, and compliance with noise regulations – giving you peace of mind.
                </p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Concerned about your vessel’s structural condition? Let’s assess it.
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
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";
import { Link, Redirect } from "wouter";
import { allContent } from "@/lib/contentIndex";

export default function StructuralIntegrity() {
  const service = services.find((s) => s.slug === "structural-integrity");
  if (!service) return <Redirect to="/404" />;

  const currentItem = allContent.find(
    (item) => item.slug === service.slug && item.type === "service",
  );
  if (!currentItem) return <Redirect to="/404" />;

  const serviceSchema = {
    /* aynı yapı, slug'a göre değişir */
  };
  // Burada schema kısaltmak için tam yazmıyorum, yukarıdaki gibi oluşturabilirsiniz.

  return (
    <>
      <SEO
        title="Structural Integrity"
        description="Hull condition assessments, life extension studies, modification consultancy, vibration/noise diagnostics – IACS‑aligned evaluations for vessel safety and longevity."
        canonical="https://www.adriaticadoo.com/services/structural-integrity"
      />
      <Helmet>{/* schema */}</Helmet>
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
              Structural failures rarely happen suddenly — they develop over
              time through fatigue, corrosion, and unnoticed stress
              concentration. We provide engineering-grade structural assessments
              aligned with IACS requirements to identify risks early and extend
              vessel life.
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
                src="/images/services/structural-integrity-schema.svg"
                alt="Structural integrity assessment timeline"
                className="w-full max-w-2xl"
                loading="lazy"
                width={672}
                height={400}
              />
            </div>
            <div className="mt-8 space-y-6">
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Structural Integrity &amp; Life Extension Studies
                </h3>
                <p className="text-muted-foreground">
                  We analyse the remaining fatigue life of your critical
                  structural components using finite element analysis (FEA)
                  combined with historical load data and inspection records. The
                  study identifies areas of high stress concentration and
                  predicts future degradation. You receive a detailed roadmap of
                  required reinforcements, with prioritised recommendations and
                  cost estimates.
                </p>
                <p className="text-muted-foreground mt-2">
                  <span className="font-medium">Typical outcome:</span> Extends
                  operational life by 5–10 years, subject to Class approval.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  A clear path to extend your vessel's safe operational life
                  while minimising downtime and avoiding unplanned repairs.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Hull Condition Analysis
                </h3>
                <p className="text-muted-foreground">
                  A detailed evaluation of your hull's current state, including
                  thickness measurements, corrosion assessment, and structural
                  audits. We use ultrasonic testing (UT) and visual inspections
                  to map the condition of plating and framing. The report
                  includes a "wastage plan" highlighting areas that require
                  repair or replacement.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  An objective assessment that supports classification renewal,
                  insurance surveys, and your strategic maintenance planning.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Modification Consultancy
                </h3>
                <p className="text-muted-foreground">
                  Engineering support for structural alterations, such as adding
                  new equipment, changing deck arrangements, or extending
                  superstructures. We provide feasibility studies, design
                  calculations, and approval‑ready documentation for class and
                  flag state. Our team also assists with the integration of
                  modifications into your vessel's existing systems.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Safe, compliant modifications delivered on time, with minimal
                  impact on your vessel operations.
                </p>
              </div>
              <div className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                  Vibration &amp; Noise Diagnostic
                </h3>
                <p className="text-muted-foreground">
                  On‑board measurements using high‑precision accelerometers and
                  acoustic sensors to identify sources of excessive vibration
                  and noise. We analyse the data to pinpoint root causes – such
                  as propeller imbalance, machinery misalignment, or structural
                  resonance – and recommend practical mitigation measures. A
                  post‑implementation verification is available to confirm
                  effectiveness.
                </p>
                <h4 className="font-display text-md font-bold text-[#0B3B5C] mt-4 mb-1">
                  Outcome
                </h4>
                <p className="text-muted-foreground">
                  Improved crew comfort, reduced equipment wear, and compliance
                  with noise regulations – giving you peace of mind.
                </p>
              </div>
            </div>
            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Concerned about your vessel's structural condition? Let's assess
                it.
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

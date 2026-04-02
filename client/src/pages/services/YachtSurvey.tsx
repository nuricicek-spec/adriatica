import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";
import { useRoute } from "wouter";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";

export default function YachtSurvey() {
  const [match] = useRoute("/services/yacht-survey");
  const service = services.find(s => s.slug === "yacht-survey");

  return (
    <>
      <SEO
        title="Yacht Survey & Inspection"
        description="Independent technical surveys for yachts: pre-purchase, damage assessment, insurance valuation, charter inspection, and off-hire surveys. IACS‑aligned, class‑recognized reports."
        canonical="https://www.adriaticadoo.me/services/yacht-survey"
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Yacht Survey & Inspection
          </h1>

          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p>
              You get independent, unbiased technical surveys for yachts of all sizes. Our inspections follow IACS unified requirements and class society rules, providing you with actionable reports for purchase, insurance, charter, or damage assessment.
            </p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Survey Types</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Pre‑purchase Survey:</strong> Full condition assessment before buying a used yacht – structural, machinery, electrical, and documentation.</li>
              <li><strong>Damage Survey:</strong> After an incident (grounding, collision, fire) – detailed damage mapping, repair cost estimation, and insurance report.</li>
              <li><strong>Insurance Valuation Survey:</strong> Market value assessment for insurance coverage, including equipment and refit history.</li>
              <li><strong>Charter (On‑hire / Off‑hire) Survey:</strong> Condition inspection before and after a charter period to determine responsibility for damages.</li>
              <li><strong>Technical Condition Report:</strong> General health check for owners or potential buyers, focusing on maintenance needs and safety compliance.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">What You Receive</h2>
            <p>Each survey includes a detailed report with photographs, measurements, non‑destructive test results (where applicable), and clear conclusions. All reports are delivered in both digital and printed formats, ready for class submission, insurance review, or legal use.</p>

            <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-8 mb-4">Why Choose Adriatica for Your Yacht Survey?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Independent – no conflict of interest with shipyards or brokers.</li>
              <li>IACS‑aligned methodology – reports accepted by classification societies and insurers.</li>
              <li>Fast turnaround – typically 3‑5 days from inspection to final report.</li>
              <li>Regional presence – we survey yachts in Montenegro, Croatia, Italy, and Greece.</li>
            </ul>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Need an independent yacht survey?
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request a Survey Quote
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
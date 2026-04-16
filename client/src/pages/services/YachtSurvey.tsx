import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { services } from "@/data/services";
import { RelatedContent } from "@/components/RelatedContent";
import { Link, Redirect } from "wouter";

export default function YachtSurvey() {
  const service = services.find(s => s.slug === "yacht-survey");
  
  if (!service) return <Redirect to="/404" />;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.adriaticadoo.com/#organization",
        "name": "Adriatica D.O.O.",
        "url": "https://www.adriaticadoo.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.adriaticadoo.com/logo.png"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        "url": "https://www.adriaticadoo.com/",
        "name": "Adriatica D.O.O.",
        "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.com/#organization" }
      },
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/services/yacht-survey/#webpage",
        "url": "https://www.adriaticadoo.com/services/yacht-survey",
        "name": "Yacht Survey & Inspection | Adriatica D.O.O.",
        "description": "Independent technical surveys for yachts: pre-purchase, damage assessment, insurance valuation, charter inspection, and off-hire surveys. IACS‑aligned, class‑recognized reports.",
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-15"
      },
      {
        "@type": "Service",
        "@id": "https://www.adriaticadoo.com/services/yacht-survey/#service",
        "name": "Yacht Survey & Inspection",
        "description": "Independent IACS‑aligned technical surveys for yachts: pre-purchase condition assessment, damage inspection and repair cost estimation, insurance valuation, and charter on‑hire/off‑hire surveys with fast 3‑5 day report turnaround.",
        "url": "https://www.adriaticadoo.com/services/yacht-survey",
        "provider": { "@id": "https://www.adriaticadoo.com/#organization" },
        "isPartOf": { "@id": "https://www.adriaticadoo.com/services/yacht-survey/#webpage" },
        "areaServed": [
          { "@type": "Place", "name": "Montenegro" },
          { "@type": "Place", "name": "Adriatic Sea" },
          { "@type": "Place", "name": "Mediterranean Sea" },
          { "@type": "Place", "name": "Europe" }
        ],
        "serviceType": "Yacht Survey & Inspection",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Yacht Survey Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Pre‑purchase Survey",
                "description": "Full condition assessment before buying a used yacht – structural, machinery, electrical, and documentation review."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Damage Survey",
                "description": "After an incident – detailed damage mapping, repair cost estimation, and insurance report."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Insurance Valuation Survey",
                "description": "Market value assessment for insurance coverage, including equipment and refit history."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Charter (On‑hire / Off‑hire) Survey",
                "description": "Condition inspection before and after a charter period to determine responsibility for damages."
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Technical Condition Report",
                "description": "General health check for owners or potential buyers, focusing on maintenance needs and safety compliance."
              }
            }
          ]
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Yacht Survey & Inspection"
        description="Independent technical surveys for yachts: pre-purchase, damage assessment, insurance valuation, charter inspection, and off-hire surveys. IACS‑aligned, class‑recognized reports."
        canonical="https://www.adriaticadoo.com/services/yacht-survey"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema).replace(/</g, '\\u003c')}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <Link
              href="/services"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              ← Back to all services
            </Link>
            <Link
              href="/services/project-management"
              className="inline-flex items-center text-sm text-primary hover:underline"
            >
              ← Back to Project Management
            </Link>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Yacht Survey &amp; Inspection
          </h1>

          <div className="max-w-none text-muted-foreground">
            <p className="text-lg font-medium text-primary italic border-l-4 border-primary pl-6 mb-6">
              A missed structural defect or undocumented pre‑charter damage can cost hundreds of thousands in disputes and unexpected repairs. Our independent, IACS‑aligned surveys provide the technical evidence you need — whether buying, insuring, or operating a yacht.
            </p>

            <p className="text-lg mb-6">
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
              <li><strong>Independent</strong> – no conflict of interest with shipyards or brokers.</li>
              <li><strong>IACS‑aligned methodology</strong> – reports accepted by classification societies and insurers.</li>
              <li><strong>Fast turnaround</strong> – typically 3‑5 days from inspection to final report.</li>
              <li><strong>Regional presence</strong> – we survey yachts in Montenegro, Croatia, Italy, and Greece.</li>
            </ul>

            <div className="mt-12 p-8 bg-neutral-50 border-l-2 border-primary/20 rounded-sm text-center">
              <p className="text-lg font-medium text-[#0B3B5C] mb-2">
                Need an independent yacht survey?
              </p>
              <Link
                href="/request-consultation"
                className="inline-block mt-2 bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors"
              >
                Request a Survey Quote
              </Link>
            </div>
          </div>

          <RelatedContent
            serviceSlugs={service.relatedServices || []}
            caseStudySlugs={service.relatedCaseStudies || []}
            insightSlugs={service.relatedInsights || []}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";

export default function CaseStudies() {
  const caseStudiesSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.adriaticadoo.com/case-studies/#webpage",
        "url": "https://www.adriaticadoo.com/case-studies",
        "name": "Case Studies | Adriatica D.O.O.",
        "description": "Real-world marine engineering results: biofouling compliance, cost savings with in-water cleaning, and on-time refit supervision.",
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-15"
      },
      {
        "@type": "ItemList",
        "@id": "https://www.adriaticadoo.com/case-studies/#itemlist",
        "name": "Marine Engineering Case Studies",
        "description": "Operational case studies demonstrating Adriatica D.O.O. engineering outcomes.",
        "numberOfItems": caseStudies.length,
        "itemListElement": caseStudies.map((study, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "url": `https://www.adriaticadoo.com/case-studies/${study.slug}`,
          "name": study.title
        }))
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        "url": "https://www.adriaticadoo.com/",
        "name": "Adriatica D.O.O.",
        "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.com/#organization" }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Case Studies"
        description="Real-world marine engineering results: biofouling compliance, 80% cost savings with in‑water cleaning, and on‑time refit supervision. See how Adriatica delivers measurable outcomes for superyachts."
        canonical="https://www.adriaticadoo.com/case-studies"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(caseStudiesSchema).replace(/</g, '\\u003c')}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <SectionHeading
            title="Operational Case Studies"
            subtitle="Engineering in Action"
          />
          <div className="mt-12">
            {caseStudies.map((study, index) => (
              <div key={study.slug}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="block border-l-2 border-primary/20 pl-6 hover:border-primary transition-colors group"
                >
                  <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3 group-hover:text-primary transition-colors">
                    {study.title}
                  </h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>
                      <span className="font-semibold text-[#0B3B5C]">Challenge:</span>{" "}
                      {study.challenge}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0B3B5C]">Solution:</span>{" "}
                      {study.solution}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0B3B5C]">Result:</span>{" "}
                      {study.result}
                    </p>
                  </div>
                </Link>
                {index < caseStudies.length - 1 && (
                  <hr className="border-t border-border/30 my-10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 p-6 bg-neutral-50 border border-border/10 text-center rounded-sm">
            <p className="text-lg text-muted-foreground mb-4">
              Have a specific technical challenge? We're ready to solve it.
            </p>
            <Link
              href="/request-consultation"
              className="inline-block px-6 py-3 bg-[#0B3B5C] text-white font-medium rounded-sm hover:bg-[#1A4B7A] transition-colors"
            >
              Request Technical Consultation – Avoid Delays
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
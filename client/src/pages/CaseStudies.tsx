import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { caseStudies } from "@/data/caseStudies";

// Organisation-level structured data (same as homepage)
const organizationData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Adriatica D.O.O.",
  "image": "https://www.adriaticadoo.me/og-image-default.png",
  "url": "https://www.adriaticadoo.me",
  "taxID": "03612807",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Budva",
    "addressCountry": "ME"
  },
  "serviceType": [
    "Marine Engineering",
    "Regulatory Compliance",
    "MRV Reporting",
    "Biofouling Management",
    "Structural Integrity"
  ],
  "description": "Marine engineering consultancy specializing in EU MRV, IMO DCS, and Biofouling compliance.",
  "areaServed": [
    "Bar",
    "Budva",
    "Kotor",
    "Tivat",
    "Montenegro",
    "Adriatic Coast",
    "Europe"
  ]
};

export default function CaseStudies() {
  return (
    <>
      <SEO
        title="Case Studies | Marine Engineering Success Stories | Adriatica"
        description="Real-world marine engineering results: biofouling compliance, 80% cost savings with in‑water cleaning, and on‑time refit supervision. See how Adriatica delivers measurable outcomes for superyachts."
        canonical="https://www.adriaticadoo.me/case-studies"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
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
                <Link href={`/case-studies/${study.slug}`}>
                  <a className="block border-l-2 border-primary/20 pl-6 hover:border-primary transition-colors group">
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
                  </a>
                </Link>
                {/* Her karttan sonra ayırıcı çizgi (son kart hariç) */}
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
            <Link href="/#begin-voyage">
              <a className="inline-block px-6 py-3 bg-[#0B3B5C] text-white font-medium rounded-sm hover:bg-[#1A4B7A] transition-colors">
                Request Technical Consultation – Avoid Delays
              </a>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
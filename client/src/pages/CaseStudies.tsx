import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";

// Define type for case study items
interface CaseStudy {
  title: string;
  challenge: string;
  solution: string;
  result: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "Biofouling Management for Mediterranean Entry",
    challenge:
      "A 50‑meter superyacht relocated from high‑fouling zones (Dubai, Maldives) to the Mediterranean. The vessel faced potential Port State Control delays due to uncertain biofouling history and lack of documented niche‑area inspections.",
    solution:
      "Adriatica conducted a quantified risk assessment, developed a vessel‑specific Biofouling Management Plan (BFMP), and integrated a Biofouling Record Book (BFRB) with photographic evidence. The framework was implemented prior to departure.",
    result:
      "The yacht transited to Montenegro with full documentation, enabling seamless Port State Control clearance, avoiding emergency cleaning fees, and maintaining charter continuity.",
  },
  {
    title: "Managed In‑Water Cleaning vs. Unscheduled Dry‑Docking",
    challenge:
      "A 35‑meter motor yacht in the Mediterranean required urgent biofouling removal during peak charter season. Unscheduled dry‑docking would have caused 4 days of downtime and high costs.",
    solution:
      "Adriatica managed an in‑water cleaning operation using certified divers with debris capture systems. The cleaning was completed within one day during guest turnaround.",
    result:
      "Cost savings of 80% compared to dry‑docking (€6,000 vs. €30,000) and zero charter disruption. Full photographic documentation was logged in the vessel’s Biofouling Record Book.",
  },
  {
    title: "Refit Supervision at Shipyard",
    challenge:
      "A 55‑meter motor yacht scheduled a 6‑week refit in Bijela. The owner needed technical oversight to ensure coating specifications, shaft alignment, and niche‑area documentation were properly executed.",
    solution:
      "Adriatica provided full‑time on‑site engineering supervision, coordinating with the shipyard and acting as Owner’s Technical Representative.",
    result:
      "The project was completed two days ahead of schedule, with all technical records accepted by the classification society and local Port Authority.",
  },
];

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
        title="Case Studies"
        description="Real-world examples of Adriatica D.O.O. technical services: biofouling compliance, in-water cleaning management, and refit supervision for superyachts."
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
          <div className="space-y-12 mt-12">
            {caseStudies.map((study, idx) => (
              <div key={idx} className="border-l-2 border-primary/20 pl-6">
                <h3 className="font-display text-2xl font-bold text-[#0B3B5C] mb-3">
                  {study.title}
                </h3>
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
              </div>
            ))}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
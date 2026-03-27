import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

const insightItems = [
  {
    date: "26 March 2026",
    title: "The Case for a 'Zero-Emission Zone': Why is Boka Kotorska Not Protected Yet?",
    excerpt: "A strategic policy paper comparing Boka Kotorska with UNESCO‑protected sites that have implemented Zero‑Emission Zones (ZEZ). The paper analyses global benchmarks, outlines the bay's structural sensitivity, and proposes a phased roadmap for Montenegro to protect this World Heritage site through an EU‑backed innovation ecosystem.",
    pdf: "/pdfs/ADRI-TIS-004.pdf",
    category: "Strategic Outlook",
  },
  {
    date: "20 January 2026",
    title: "Biofouling Compliance: Preparing for the IMO 2026 Transition",
    excerpt: "A real-world superyacht case study on proactive biofouling management, featuring quantified risk assessment, Biofouling Management Plan (BFMP) development, and Biofouling Record Book (BFRB) integration to ensure seamless Mediterranean entry and regulatory readiness.",
    pdf: "/pdfs/ADRI-TIS-001.pdf",
    category: "Regulation",
  },
  {
    date: "20 February 2026",
    title: "Sustainable In-Water Cleaning: Engineering Management for European Coastal Yacht Compliance",
    excerpt: "A technical guidance document on managing in-water cleaning operations for vessels 25m+ and 50m+. Covers regulatory alignment, environmental control, and a direct cost comparison between unscheduled dry-docking and managed in-water cleaning.",
    pdf: "/pdfs/ADRI-TIS-002.pdf",
    category: "Technical Guidance",
  },
  {
    date: "20 March 2026",
    title: "Technical Operations in Montenegro: Navigating Local Regulations and Shipyard Excellence",
    excerpt: "An examination of Montenegro's maritime landscape, focusing on the synergy between UPSUL regulations and local shipyard capabilities. Demonstrates how direct technical presence delivers timeline optimisation, cost containment, and regulatory shielding.",
    pdf: "/pdfs/ADRI-TIS-003.pdf",
    category: "Case Insight",
  },
];

// Helper to style category badges
const categoryColor = (cat: string) => {
  switch (cat) {
    case "Regulation":
      return "bg-blue-100 text-blue-800";
    case "Technical Guidance":
      return "bg-green-100 text-green-800";
    case "Case Insight":
      return "bg-purple-100 text-purple-800";
    case "Strategic Outlook":
      return "bg-amber-100 text-amber-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function Insights() {
  // Structured data for the collection of articles
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Adriatica Technical Insights",
    "description": "Technical maritime engineering documents and compliance studies.",
    "mainEntity": insightItems.map(item => ({
      "@type": "Article",
      "headline": item.title,
      "datePublished": new Date(item.date).toISOString().split('T')[0],
      "description": item.excerpt,
      "author": { "@type": "Organization", "name": "Adriatica D.O.O." }
    }))
  };

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

  return (
    <>
      <SEO
        title="Insights"
        description="Technical articles and updates from Adriatica D.O.O. – biofouling compliance, European coastal yacht compliance, and marine engineering insights."
        canonical="https://www.adriaticadoo.me/insights"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(organizationData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
              Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Technical articles and updates from Adriatica D.O.O.
            </p>

            <div className="space-y-12">
              {insightItems.map((item, index) => (
                <article key={index} className="border-l-2 border-primary/20 pl-6">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <time className="text-sm text-primary uppercase tracking-widest font-medium">
                      {item.date}
                    </time>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-2 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <a 
                      href={item.pdf} 
                      className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      📄 View Technical Insight (PDF)
                    </a>
                    <HashLink
                      href="/#begin-voyage"
                      className="text-sm text-primary/80 hover:text-primary transition-colors"
                    >
                      Need support? → Request consultation
                    </HashLink>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm text-center">
              <p className="text-muted-foreground mb-4">
                Have a specific technical challenge? Our team is ready to assist.
              </p>
              <HashLink
                href="/#begin-voyage"
                className="inline-block bg-[#0B3B5C] text-white px-6 py-3 rounded-sm font-medium hover:bg-[#1A4B7A] transition-colors shadow-md"
              >
                Request Technical Consultation →
              </HashLink>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
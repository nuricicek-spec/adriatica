import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";

const insightItems = [
  {
    date: "28 February 2026",
    title: "Technical Case Study: Biofouling Compliance – Preparing for the IMO 2026 Transition",
    excerpt: "Discover how Adriatica D.O.O. applies a structured compliance framework to meet the upcoming IMO 2026 biofouling regulations. Through a real-world superyacht case study, we demonstrate proactive documentation, niche area risk management, and operational efficiency for seamless Mediterranean cruising.",
    pdf: "/pdfs/Adriatica_Technical_Insight_001_Biofouling_Compliance.pdf"
  },
  {
    date: "10 January 2026",
    title: "Engineering Management for European Coastal Yacht Compliance",
    excerpt: "Detailed technical insights into managing in-water cleaning operations for vessels 25m+ and 50m+, ensuring compliance with Paris MoU expectations. This article covers the strategic shift from voluntary guidelines to mandatory oversight, including a comparative economic analysis between managed cleaning and unscheduled dry-docking.",
    pdf: "/pdfs/Adriatica_Technical_Insight_002_European_Coastal_Compliance.pdf"
  }
];

export default function Insights() {
  // --- Yapılandırılmış veri (görünmez) ---
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Adriatica D.O.O. Technical Insights",
    "description": "Technical maritime engineering documents and compliance studies.",
    "mainEntity": insightItems.map(item => ({
      "@type": "Article",
      "headline": item.title,
      "datePublished": new Date(item.date).toISOString().split('T')[0],
      "description": item.excerpt,
      "author": { "@type": "Organization", "name": "Adriatica D.O.O." }
    }))
  };

  return (
    <>
      <SEO
        title="Insights"
        description="Technical articles and updates from Adriatica D.O.O. – biofouling compliance, European coastal yacht compliance, and marine engineering insights."
        canonical="https://www.adriaticadoo.me/insights"
      />

      {/* Yapılandırılmış veri (JSON-LD) – Görünmez, sadece botlar için */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
                  <time className="text-sm text-primary uppercase tracking-widest font-medium">
                    {item.date}
                  </time>
                  <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-2 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  <a 
                    href={item.pdf} 
                    className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    📄 View Technical Insight (PDF)
                  </a>
                </article>
              ))}
            </div>

            <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm">
              <p className="text-center text-muted-foreground">
                For technical inquiries or consultation, please contact us at <span className="text-[#0B3B5C] font-medium">info@adriaticadoo.me </span>
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
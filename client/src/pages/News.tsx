import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { HashLink } from "@/components/HashLink";

const newsItems = [
  {
    date: "25 March 2026",
    dateIso: "2026-03-25",
    title: "Adriatica Launches IMO‑Aligned Biofouling Management Plans",
    excerpt:
      "With Port State Control regimes intensifying scrutiny on biofouling documentation, Adriatica D.O.O. now provides vessel‑specific Biofouling Management Plans (BFMP) fully aligned with IMO MEPC.378(80) guidelines. You get quantified risk assessments, niche‑area identification, and a structured Biofouling Record Book (BFRB) – PSC‑ready documentation and a clear path to compliance. As the 2026 enforcement deadline approaches, we're here to help vessel operators in the Adriatic and Mediterranean stay ahead of regulatory requirements.",
    showCta: true,
  },
  {
    date: "30 June 2025",
    dateIso: "2025-06-30",
    title: "Adriatica Joins the Montenegrin Marine Industry Association",
    excerpt:
      "We're proud to become a member of the local marine industry network, strengthening our commitment to the Adriatic maritime community.",
    showCta: true,
  },
];

export default function News() {
  const newsSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.adriaticadoo.com/news/#webpage",
        url: "https://www.adriaticadoo.com/news",
        name: "News | Adriatica D.O.O.",
        description:
          "Latest news and updates from Adriatica D.O.O. – marine engineering insights, industry developments, and company announcements.",
        isPartOf: { "@id": "https://www.adriaticadoo.com/#website" },
        about: { "@id": "https://www.adriaticadoo.com/#organization" },
        inLanguage: "en",
        datePublished: "2025-01-01",
        dateModified: newsItems[0].dateIso,
      },
      {
        "@type": "ItemList",
        "@id": "https://www.adriaticadoo.com/news/#itemlist",
        name: "Adriatica D.O.O. News",
        numberOfItems: newsItems.length,
        itemListElement: newsItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "NewsArticle",
            headline: item.title,
            description: item.excerpt,
            datePublished: item.dateIso,
            author: { "@id": "https://www.adriaticadoo.com/#organization" },
            publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
          },
        })),
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        url: "https://www.adriaticadoo.com/",
        name: "Adriatica D.O.O.",
        description:
          "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        inLanguage: "en",
        publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
      },
    ],
  };

  return (
    <>
      <SEO
        title="News"
        description="Latest news and updates from Adriatica D.O.O. – marine engineering insights, industry developments, and company announcements."
        canonical="https://www.adriaticadoo.com/news"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(newsSchema).replace(/</g, "\\u003c")}
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
              Latest News
            </h1>
            <p className="text-xl text-muted-foreground mb-12">
              Updates from Adriatica D.O.O. – stay tuned for our latest projects
              and announcements.
            </p>

            <div className="space-y-12">
              {newsItems.map((item) => (
                <article
                  key={item.dateIso}
                  className="border-l-2 border-primary/20 pl-6"
                >
                  <time
                    dateTime={item.dateIso}
                    className="text-sm text-primary uppercase tracking-widest font-medium"
                  >
                    {item.date}
                  </time>
                  <h2 className="font-display text-2xl font-bold text-[#0B3B5C] mt-2 mb-4">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.excerpt}
                  </p>
                  {item.showCta && (
                    <HashLink
                      href="/request-consultation"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                    >
                      Need support? Request a consultation →
                    </HashLink>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm">
              <p className="text-center text-muted-foreground">
                For media inquiries or interview requests, please contact us at{" "}
                <a
                  href="mailto:info@adriaticadoo.com"
                  className="text-[#0B3B5C] font-medium hover:underline"
                >
                  info@adriaticadoo.com
                </a>
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}

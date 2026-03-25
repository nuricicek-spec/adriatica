import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { HashLink } from "@/components/HashLink";

const newsItems = [
  {
    date: "26 March 2026",
    title: "The Case for a 'Zero-Emission Zone': Why is Boka Kotorska Not Protected Yet?",
    excerpt: "Adriatica releases a strategic policy paper comparing Boka Kotorska with UNESCO‑protected sites that have implemented Zero‑Emission Zones (ZEZ). The paper analyses global benchmarks, outlines the bay's structural sensitivity, and proposes a phased roadmap for Montenegro to protect this World Heritage site through an EU‑backed innovation ecosystem.",
    showCta: true,
    pdf: "/pdfs/ADRI-TIS-004.pdf",
  },
  {
    date: "25 March 2026",
    title: "Adriatica Launches IMO‑Aligned Biofouling Management Plans",
    excerpt: "As Port State Control regimes intensify scrutiny on biofouling documentation, Adriatica D.O.O. now offers vessel‑specific Biofouling Management Plans (BFMP) fully aligned with IMO MEPC.378(80) guidelines. These plans include quantified risk assessments, niche‑area identification, and a structured Biofouling Record Book (BFRB) – providing operators with PSC‑ready documentation and a clear pathway to compliance. With the 2026 enforcement convergence approaching, Adriatica stands ready to assist vessel operators in the Adriatic and Mediterranean to stay ahead of regulatory requirements.",
    showCta: true,
  },
  {
    date: "30 June 2025",
    title: "Adriatica joins the Montenegrin Marine Industry Association",
    excerpt: "We are proud to become a member of the local marine industry network, strengthening our commitment to the Adriatic maritime community.",
    showCta: true,
  },
];

export default function News() {
  return (
    <>
      <SEO
        title="News"
        description="Latest news and updates from Adriatica D.O.O. – marine engineering insights, industry developments, and company announcements."
        canonical="https://www.adriaticadoo.me/news"
      />
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
              Updates from Adriatica D.O.O. – stay tuned for our latest projects and announcements.
            </p>

            <div className="space-y-12">
              {newsItems.map((item, index) => (
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
                  <div className="flex flex-wrap items-center gap-4">
                    {item.showCta && (
                      <HashLink
                        href="/#begin-voyage"
                        className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                      >
                        Need support? → Request consultation
                      </HashLink>
                    )}
                    {item.pdf && (
                      <a
                        href={item.pdf}
                        className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium"
                      >
                        📄 Read the full paper →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm">
              <p className="text-center text-muted-foreground">
                For media inquiries or interview requests, please contact us at{' '}
                <a href="mailto:info@adriaticadoo.me" className="text-[#0B3B5C] font-medium hover:underline">
                  info@adriaticadoo.me
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
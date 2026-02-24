import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const insightItems = [
  {
    date: "28 February 2026",
    title: "Technical Case Study: Biofouling Compliance – Preparing for the IMO 2026 Transition",
    excerpt: "Discover how Adriatica D.O.O. applies a structured compliance framework to meet the upcoming IMO 2026 biofouling regulations. Through a real-world superyacht case study, we demonstrate proactive documentation, niche area risk management, and operational efficiency for seamless Mediterranean cruising."
  },
  {
    date: "10 January 2026",
    title: "The Role of Independent Owner's Representation in Refit Projects",
    excerpt: "How having an independent technical advisor during dry-docking can reduce costs, avoid delays, and ensure quality."
  }
];

export default function Insights() {
  return (
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
                <p className="text-muted-foreground leading-relaxed">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/50">
            <a 
              href="/files/technical-bulletin-01.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[#0B3B5C] font-medium hover:text-[#3A74A0] transition-colors"
            >
              <span className="mr-2">📄</span> Download Technical Bulletin (PDF)
            </a>
          </div>

          <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm">
            <p className="text-center text-muted-foreground">
              For technical inquiries or consultation, please contact us at <span className="text-[#0B3B5C] font-medium">info@adriatica.me (mock)</span>
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

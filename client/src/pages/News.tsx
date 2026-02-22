import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const newsItems = [
  {
    date: "15 March 2025",
    title: "Adriatica D.O.O. opens new office in Porto Montenegro",
    excerpt: "We are excited to announce the opening of our new technical consultancy office in Tivat, bringing expert marine engineering services closer to superyacht owners in the Adriatic."
  },
  {
    date: "10 February 2025",
    title: "Successfully completed IHM certification for 50m motor yacht",
    excerpt: "Our team conducted a full Inventory of Hazardous Materials (IHM) for a luxury yacht, ensuring full compliance with EU Ship Recycling Regulation."
  },
  {
    date: "5 January 2025",
    title: "Adriatica joins the Montenegrin Marine Industry Association",
    excerpt: "We are proud to become a member of the local marine industry network, strengthening our commitment to the Adriatic maritime community."
  }
];

export default function News() {
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
                <p className="text-muted-foreground leading-relaxed">
                  {item.excerpt}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-16 p-8 bg-neutral-50 border border-border/50 rounded-sm">
            <p className="text-center text-muted-foreground">
              For media inquiries or interview requests, please contact us at <span className="text-[#0B3B5C] font-medium">press@adriatica.me (mock)</span>
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

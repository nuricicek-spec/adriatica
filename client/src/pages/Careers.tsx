import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function Careers() {
  return (
    <div className="min-h-screen bg-background font-body">
      <Navigation />
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-8">
            Join Our Team
          </h1>
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              We are always looking for passionate marine engineers, naval architects, and technical consultants to join our growing team in Montenegro.
            </p>
            <p>
              If you share our values of independence, practicality, and technical excellence, please send your CV and cover letter to:
            </p>
            <p className="font-bold text-[#0B3B5C]">
              careers@adriaticadoo.me (mock)
            </p>
            <p className="text-sm italic">
              (We will respond to suitable candidates within two weeks.)
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

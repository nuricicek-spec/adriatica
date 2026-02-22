import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              This Cookie Policy explains how Adriatica D.O.O. uses cookies and similar technologies to recognize you when you visit our website.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. They are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">How we use cookies</h2>
            <p>
              We use cookies for a variety of reasons, including to understand how our website is used, to remember your preferences, and to improve your overall experience.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Managing cookies</h2>
            <p>
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

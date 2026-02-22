import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              At Adriatica D.O.O., we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Information Collection</h2>
            <p>
              We collect information that you provide directly to us, such as when you request a consultation or sign up for our newsletter. This may include your name, email address, and any other information you choose to provide.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Use of Information</h2>
            <p>
              We use the information we collect to provide and improve our services, communicate with you, and comply with legal obligations. We do not sell your personal information to third parties.
            </p>
            <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Data Security</h2>
            <p>
              We implement reasonable security measures to protect your information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

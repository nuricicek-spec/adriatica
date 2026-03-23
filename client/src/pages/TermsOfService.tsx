import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of service for Adriatica D.O.O. – by accessing our website, you agree to these terms."
        canonical="https://www.adriaticadoo.me/terms-of-service"
        noindex={true}
      />
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-8">
              Terms of Service
            </h1>

            {/* Company Information */}
            <div className="bg-neutral-50 border-l-4 border-primary p-6 mb-8 rounded-sm">
              <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Company Information</h2>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>Adriatica D.O.O.</strong></p>
                <p>Podgorica, Montenegro</p>
                <p>Tax ID (PIB): 03612807</p>
                <p>Email: info@adriaticadoo.me</p>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                By accessing or using the Adriatica D.O.O. website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, and images, is the property of Adriatica D.O.O. or its content suppliers and is protected by international copyright laws.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Disclaimer of Warranties</h2>
              <p>
                The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of the information.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Limitation of Liability</h2>
              <p>
                In no event shall Adriatica D.O.O. be liable for any direct, indirect, incidental, or consequential damages arising out of or in connection with your use of this website.
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
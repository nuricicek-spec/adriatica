import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  const privacyPolicySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/privacy-policy/#webpage",
        "url": "https://www.adriaticadoo.com/privacy-policy",
        "name": "Privacy Policy | Adriatica D.O.O.",
        "description": "Privacy policy of Adriatica D.O.O. – how we collect, use, and protect your personal information.",
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-15"
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        "url": "https://www.adriaticadoo.com/",
        "name": "Adriatica D.O.O.",
        "description": "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.com/#organization" }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy policy of Adriatica D.O.O. – how we collect, use, and protect your personal information."
        canonical="https://www.adriaticadoo.com/privacy-policy"
        noindex={true}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(privacyPolicySchema).replace(/</g, '\\u003c')}
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
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-8">
              Privacy Policy
            </h1>

            {/* Company Information */}
            <div className="bg-neutral-50 border-l-4 border-primary p-6 mb-8 rounded-sm">
              <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Company Information</h2>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>Adriatica D.O.O.</strong></p>
                <p>Tax Office: Podgorica, Montenegro</p>
                <p>Tax ID (PIB): 03612807</p>
                <p>
                  Email:{" "}
                  <a href="mailto:info@adriaticadoo.com" className="text-primary hover:underline transition-colors">
                    info@adriaticadoo.com
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                At Adriatica D.O.O., we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">What information we collect</h2>
              <p>
                We collect information you provide directly to us – for example, when you request a consultation or sign up for our newsletter. This may include your name, email address, and any other details you choose to share.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">How we use your information</h2>
              <p>
                We use your information to provide and improve our services, communicate with you, and comply with legal obligations. We never sell your personal information to third parties.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Data security</h2>
              <p>
                We implement reasonable security measures to protect your information from unauthorised access, disclosure, or alteration. However, no internet transmission is 100% secure.
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
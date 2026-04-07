import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";

export default function TermsOfService() {
  const termsOfServiceSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.adriaticadoo.com/terms-of-service/#webpage",
        "url": "https://www.adriaticadoo.com/terms-of-service",
        "name": "Terms of Service | Adriatica D.O.O.",
        "description": "Terms of service for Adriatica D.O.O. – by accessing our website, you agree to these terms.",
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
        title="Terms of Service"
        description="Terms of service for Adriatica D.O.O. – by accessing our website, you agree to these terms."
        canonical="https://www.adriaticadoo.com/terms-of-service"
        noindex={true}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(termsOfServiceSchema).replace(/</g, '\\u003c')}
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
              Terms of Service
            </h1>

            {/* Company Information */}
            <div className="bg-neutral-50 border-l-4 border-primary p-6 mb-8 rounded-sm">
              <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">Company Information</h2>
              <div className="space-y-1 text-muted-foreground">
                <p><strong>Adriatica D.O.O.</strong></p>
                <p>Podgorica, Montenegro</p>
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
                By accessing or using the Adriatica D.O.O. website, you agree to follow these Terms of Service. If not, please do not use our website.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Intellectual Property</h2>
              <p>
                All content on this website – including text, graphics, logos, and images – is owned by Adriatica D.O.O. or its content suppliers and is protected by international copyright laws.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Disclaimer of Warranties</h2>
              <p>
                The information on this website is for general informational purposes only. We provide no guarantees, express or implied, about its completeness, accuracy, or reliability.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">Limitation of Liability</h2>
              <p>
                We will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
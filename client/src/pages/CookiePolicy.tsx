import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";

export default function CookiePolicy() {
  /*
    noindex sayfası — Helmet ve schema kaldırıldı.
    TermsOfService ve PrivacyPolicy ile aynı yaklaşım.
    SEO component yalnızca noindex sinyali için bırakıldı.
  */
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Cookie policy of Adriatica D.O.O. – how we use cookies and similar technologies on our website."
        canonical="https://www.adriaticadoo.com/cookie-policy"
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
              Cookie Policy
            </h1>

            {/* Company Information */}
            <div className="bg-neutral-50 border-l-4 border-primary p-6 mb-8 rounded-sm">
              <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                Company Information
              </h2>
              <div className="space-y-1 text-muted-foreground">
                <p>
                  <strong>Adriatica D.O.O.</strong>
                </p>
                <p>Tax Office: Podgorica, Montenegro</p>
                <p>Tax ID (PIB): 03612807</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@adriaticadoo.com"
                    className="text-primary hover:underline transition-colors"
                  >
                    info@adriaticadoo.com
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                We use cookies and similar technologies to recognise you when
                you visit our website. This Cookie Policy explains what cookies
                are, how we use them, and how you can control them.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">
                What are cookies?
              </h2>
              <p>
                Cookies are small data files placed on your computer or mobile
                device when you visit a website. Website owners use them to make
                their sites work more efficiently and to provide reporting
                information.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">
                How we use cookies
              </h2>
              <p>
                We use cookies to understand how our website is used, remember
                your preferences, and improve your overall experience.
              </p>
              <h2 className="text-xl font-bold text-[#0B3B5C] mt-8 mb-4">
                Managing cookies
              </h2>
              <p>
                You can control cookies through your browser settings. Most
                browsers allow you to refuse or accept cookies. If you choose to
                reject cookies, you may still use our website, though some
                functionality may be limited.
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
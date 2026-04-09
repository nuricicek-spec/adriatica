import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Ship, FileText, Clock, Shield } from "lucide-react";

// Sayfa sabit metinleri
const PAGE_TITLE = "Request Technical Consultation";
const PAGE_DESCRIPTION =
  "Request a personalised consultation with Adriatica D.O.O. marine engineering experts. We'll respond within one business day to discuss your project requirements.";

export default function RequestConsultation() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // İsteğe bağlı: _subject alanını dinamik olarak ekleyelim
    const fullName = formData.get("fullName") as string;
    if (fullName) {
      formData.append("_subject", `New Consultation Request: ${fullName}`);
    }

    try {
      const response = await fetch("https://formspree.io/f/myknqjbz", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  // Schema.org yapısı (ContactPage)
  const consultationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://www.adriaticadoo.com/request-consultation/#webpage",
        "url": "https://www.adriaticadoo.com/request-consultation",
        "name": PAGE_TITLE,
        "description": PAGE_DESCRIPTION,
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en",
        "datePublished": "2025-01-01",
        "dateModified": "2025-03-20"
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
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical="https://www.adriaticadoo.com/request-consultation"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(consultationSchema).replace(/</g, '\\u003c')}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Sayfa Başlığı */}
              <div className="text-center mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
                  {PAGE_TITLE}
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Tell us about your vessel and technical needs. Our principal engineers will respond within one business day.
                </p>
              </div>

              {/* İki Sütunlu İçerik: Form + Bilgi Paneli */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* SOL: Form */}
                <div className="lg:col-span-2">
                  {formStatus === "success" ? (
                    <div className="bg-green-50 border border-green-200 rounded-sm p-8 text-center">
                      <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-display font-bold text-[#0B3B5C] mb-2">
                        Request Received
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Thank you for reaching out. A member of our team will contact you shortly to discuss your requirements.
                      </p>
                      <button
                        onClick={() => setFormStatus("idle")}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Submit another request →
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white border border-border/20 rounded-sm p-6 md:p-8 shadow-sm"
                    >
                      <div className="space-y-5">
                        {/* Tam İsim */}
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="Captain / Owner / Manager"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="you@example.com"
                          />
                        </div>

                        {/* Telefon (Opsiyonel) */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Phone Number <span className="text-muted-foreground text-xs">(optional)</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="+382 68 591 757"
                          />
                        </div>

                        {/* Şirket / Gemi Adı */}
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Company / Vessel Name <span className="text-muted-foreground text-xs">(optional)</span>
                          </label>
                          <input
                            type="text"
                            name="company"
                            id="company"
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="e.g., M/Y Serenity"
                          />
                        </div>

                        {/* Ülke */}
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Country <span className="text-muted-foreground text-xs">(optional)</span>
                          </label>
                          <input
                            type="text"
                            name="country"
                            id="country"
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="Montenegro"
                          />
                        </div>

                        {/* Hizmet İlgi Alanı */}
                        <div>
                          <label htmlFor="serviceInterest" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Area of Interest <span className="text-muted-foreground text-xs">(optional)</span>
                          </label>
                          <select
                            name="serviceInterest"
                            id="serviceInterest"
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                          >
                            <option value="">-- Please select --</option>
                            <option value="Engineering Plans">Engineering Plans</option>
                            <option value="Engineering Documentation">Engineering Documentation</option>
                            <option value="Structural Integrity">Structural Integrity</option>
                            <option value="Sustainable Technologies">Sustainable Technologies</option>
                            <option value="Regulatory Compliance">Regulatory Compliance</option>
                            <option value="Project Management">Project Management</option>
                            <option value="Other / Not Sure">Other / Not Sure</option>
                          </select>
                        </div>

                        {/* Mesaj */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-[#0B3B5C] mb-1">
                            Message <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            name="message"
                            id="message"
                            rows={5}
                            required
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y disabled:opacity-50"
                            placeholder="Please describe your technical requirements, vessel type, timeline, or any specific challenge you're facing."
                          />
                        </div>

                        {/* GDPR Onay */}
                        <div className="flex items-start gap-3 pt-2">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            id="gdprConsent"
                            required
                            disabled={formStatus === "submitting"}
                            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <label htmlFor="gdprConsent" className="text-sm text-muted-foreground leading-relaxed">
                            I agree that Adriatica D.O.O. may process my personal data to respond to this inquiry in accordance with the{" "}
                            <a href="/privacy-policy" className="text-primary hover:underline">
                              Privacy Policy
                            </a>
                            . <span className="text-red-500">*</span>
                          </label>
                        </div>

                        {/* Hata Mesajı */}
                        {formStatus === "error" && (
                          <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-700 text-sm">
                            Something went wrong. Please try again or contact us directly at{" "}
                            <a href="mailto:info@adriaticadoo.com" className="underline font-medium">
                              info@adriaticadoo.com
                            </a>
                            .
                          </div>
                        )}

                        {/* Submit Butonu */}
                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full py-4 bg-[#D4AF37] text-black font-medium rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formStatus === "submitting" ? "Sending Request..." : "Submit Consultation Request"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* SAĞ: Bilgi Paneli (Değer Önerisi) */}
                <div className="lg:col-span-1">
                  <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 sticky top-24">
                    <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-6 flex items-center gap-2">
                      <Ship className="h-5 w-5 text-primary" />
                      Why Request a Consultation?
                    </h2>
                    <ul className="space-y-4 text-sm text-muted-foreground">
                      <li className="flex gap-3">
                        <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Receive a tailored technical assessment for your specific vessel.</span>
                      </li>
                      <li className="flex gap-3">
                        <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Response within one business day from our principal engineers.</span>
                      </li>
                      <li className="flex gap-3">
                        <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>No obligation – we'll discuss your needs and propose a clear scope of work.</span>
                      </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-border/30">
                      <h3 className="font-display font-bold text-[#0B3B5C] mb-2">What happens next?</h3>
                      <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                        <li>We'll review your request and contact you within 24 hours.</li>
                        <li>Brief initial discussion to clarify your requirements.</li>
                        <li>If needed, we'll propose a detailed scope and timeline.</li>
                      </ol>
                    </div>

                    <div className="mt-6 text-xs text-muted-foreground italic">
                      Your information is handled according to our{" "}
                      <a href="/privacy-policy" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                      . We never share your data with third parties.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
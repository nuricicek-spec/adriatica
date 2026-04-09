import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  CheckCircle2,
  FileCheck,
  Anchor,
  ClipboardCheck,
  Clock,
  Shield,
} from "lucide-react";

// Sayfa sabit metinleri
const PAGE_TITLE =
  "Request Technical Consultation | Compliance & Engineering Management";
const PAGE_DESCRIPTION =
  "Request a technical consultation to address your vessel's specific compliance, structural, or documentation challenges. PSC readiness, dry-dock planning, and technical audits.";

export default function RequestConsultation() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Dinamik email konusu
    const fullName = formData.get("fullName") as string;
    if (fullName) {
      formData.append("_subject", `New Technical Consultation: ${fullName}`);
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

  // Schema.org (ContactPage)
  const consultationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://www.adriaticadoo.com/request-consultation/#webpage",
        url: "https://www.adriaticadoo.com/request-consultation",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: { "@id": "https://www.adriaticadoo.com/#website" },
        about: { "@id": "https://www.adriaticadoo.com/#organization" },
        inLanguage: "en",
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        url: "https://www.adriaticadoo.com/",
        name: "Adriatica D.O.O.",
        description:
          "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
        inLanguage: "en",
        publisher: { "@id": "https://www.adriaticadoo.com/#organization" },
      },
    ],
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
          {JSON.stringify(consultationSchema).replace(/</g, "\\u003c")}
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
              {/* Sayfa Başlığı - YENİ, SİTEYLE UYUMLU */}
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
                  Turn Technical Complexity into Operational Clarity
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Request a technical consultation to address your vessel's
                  specific compliance, structural, or documentation challenges.
                </p>
              </div>

              {/* 3 Maddelik Değer Önerisi - FORM ÜSTÜNDE */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="h-6 w-6 text-primary" />
                    <h3 className="font-display font-bold text-[#0B3B5C]">
                      PSC & Regulatory Readiness
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Identify gaps in your current documentation and compliance
                    status before inspections.
                  </p>
                </div>
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Anchor className="h-6 w-6 text-primary" />
                    <h3 className="font-display font-bold text-[#0B3B5C]">
                      Dry‑Dock & Refit Planning
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimize your yard period with clear technical
                    specifications and owner's representation.
                  </p>
                </div>
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardCheck className="h-6 w-6 text-primary" />
                    <h3 className="font-display font-bold text-[#0B3B5C]">
                      Technical Documentation Audit
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ensure your as-built drawings, manuals, and plans are
                    survey‑ready.
                  </p>
                </div>
              </div>

              {/* İki Sütun: Form + Bilgi Paneli */}
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
                        Thank you for reaching out. A member of our technical
                        team will respond within one business day to discuss
                        your requirements.
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
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            id="fullName"
                            required
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                            placeholder="Captain / Owner / Technical Manager"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
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

                        {/* Telefon */}
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Phone Number{" "}
                            <span className="text-muted-foreground text-xs">
                              (optional)
                            </span>
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

                        {/* Şirket / Gemi */}
                        <div>
                          <label
                            htmlFor="company"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Company / Vessel Name{" "}
                            <span className="text-muted-foreground text-xs">
                              (optional)
                            </span>
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
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Country{" "}
                            <span className="text-muted-foreground text-xs">
                              (optional)
                            </span>
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

                        {/* Hizmet Alanı */}
                        <div>
                          <label
                            htmlFor="serviceInterest"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Area of Interest{" "}
                            <span className="text-muted-foreground text-xs">
                              (optional)
                            </span>
                          </label>
                          <select
                            name="serviceInterest"
                            id="serviceInterest"
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50"
                          >
                            <option value="">-- Please select --</option>
                            <option value="Engineering Plans">
                              Engineering Plans
                            </option>
                            <option value="Engineering Documentation">
                              Engineering Documentation
                            </option>
                            <option value="Structural Integrity">
                              Structural Integrity
                            </option>
                            <option value="Sustainable Technologies">
                              Sustainable Technologies
                            </option>
                            <option value="Regulatory Compliance">
                              Regulatory Compliance
                            </option>
                            <option value="Project Management">
                              Project Management
                            </option>
                            <option value="Other / Not Sure">
                              Other / Not Sure
                            </option>
                          </select>
                        </div>

                        {/* Mesaj */}
                        <div>
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
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

                        {/* GDPR */}
                        <div className="flex items-start gap-3 pt-2">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            id="gdprConsent"
                            required
                            disabled={formStatus === "submitting"}
                            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <label
                            htmlFor="gdprConsent"
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            I agree that Adriatica D.O.O. may process my personal
                            data to respond to this inquiry in accordance with the{" "}
                            <a
                              href="/privacy-policy"
                              className="text-primary hover:underline"
                            >
                              Privacy Policy
                            </a>
                            . <span className="text-red-500">*</span>
                          </label>
                        </div>

                        {/* Hata Mesajı */}
                        {formStatus === "error" && (
                          <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-700 text-sm">
                            Something went wrong. Please try again or contact us
                            directly at{" "}
                            <a
                              href="mailto:info@adriaticadoo.com"
                              className="underline font-medium"
                            >
                              info@adriaticadoo.com
                            </a>
                            .
                          </div>
                        )}

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full py-4 bg-[#D4AF37] text-black font-medium rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formStatus === "submitting"
                            ? "Sending Request..."
                            : "Submit Consultation Request"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* SAĞ: Bilgi Paneli (Güncellendi) */}
                <div className="lg:col-span-1">
                  <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 sticky top-24">
                    <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-4">
                      Who This Is For
                    </h2>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-8 list-disc list-inside">
                      <li>Superyacht captains & chief engineers</li>
                      <li>Commercial fleet technical managers</li>
                      <li>Owners preparing for surveys or refits</li>
                    </ul>

                    <h3 className="font-display font-bold text-[#0B3B5C] mb-2">
                      What Happens Next
                    </h3>
                    <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                      <li>We'll review your request and contact you within 24h.</li>
                      <li>Brief initial discussion to clarify requirements.</li>
                      <li>If needed, we'll propose a clear scope and timeline.</li>
                    </ol>

                    <div className="mt-8 pt-6 border-t border-border/30 flex items-start gap-2 text-xs text-muted-foreground italic">
                      <Shield className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        Confidential and no obligation. Your data is handled per
                        our{" "}
                        <a
                          href="/privacy-policy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
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
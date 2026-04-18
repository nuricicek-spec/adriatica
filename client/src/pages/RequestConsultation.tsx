import { useState, lazy, Suspense } from "react";
import type { FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import {
  CheckCircle2,
  FileCheck,
  Anchor,
  ClipboardCheck,
  Shield,
  Lock,
  Clock,
} from "lucide-react";

// ✅ Lazy load – named export'ları default'a sarmala (Navigation ve Footer named export)
const Navigation = lazy(() =>
  import("@/components/Navigation").then((m) => ({ default: m.Navigation }))
);
const Footer = lazy(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer }))
);

const PAGE_TITLE =
  "Request Technical Consultation | Compliance & Engineering Management";
const PAGE_DESCRIPTION =
  "Request a technical consultation to address your vessel's specific compliance, structural, or documentation challenges. PSC readiness, dry-dock planning, and technical audits.";

// Schema – Organization tanımı eklendi, referans tamamlandı
const consultationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.adriaticadoo.com/#organization",
      name: "Adriatica D.O.O.",
      url: "https://www.adriaticadoo.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.adriaticadoo.com/logo.png",
      },
      description:
        "Marine engineering consultancy for yachts, commercial vessels, and fishing boats.",
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@adriaticadoo.com",
        contactType: "customer service",
      },
    },
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

export default function RequestConsultation() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorType, setErrorType] = useState<"generic" | "rate-limit" | null>(
    null
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorType(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Güvenli tip kontrolü + trim()
    const fullNameValue = formData.get("fullName");
    const fullName =
      typeof fullNameValue === "string" ? fullNameValue.trim() : "";
    if (fullName) {
      formData.set("_subject", `New Technical Consultation: ${fullName}`);
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
        if (response.status === 429) {
          setErrorType("rate-limit");
        } else {
          setErrorType("generic");
        }
      }
    } catch {
      setFormStatus("error");
      setErrorType("generic");
    }
  };

  return (
    <>
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        canonical="https://www.adriaticadoo.com/request-consultation"
      />
      <Helmet>
        {/* Google Analytics – idle callback + onerror */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var ric = window.requestIdleCallback || function(cb) {
                  var start = Date.now();
                  return setTimeout(function() {
                    cb({ didTimeout: false, timeRemaining: function() { return Math.max(0, 50 - (Date.now() - start)); } });
                  }, 1);
                };
                ric(function() {
                  var script = document.createElement('script');
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-WPWD3K7JHR';
                  script.async = true;
                  script.onload = function() {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){ window.dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', 'G-WPWD3K7JHR', { send_page_view: true });
                  };
                  script.onerror = function() {
                    console.warn('Google Analytics script failed to load');
                  };
                  document.head.appendChild(script);
                });
              })();
            `,
          }}
        />

        {/* Schema.org yapılandırılmış veri */}
        <script type="application/ld+json">
          {JSON.stringify(consultationSchema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Suspense fallback={<div className="h-16 bg-background border-b" />}>
          <Navigation />
        </Suspense>

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="fade-in">
              <div className="text-center mb-8">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-4">
                  Stay Compliant. Reduce Downtime. Operate with Confidence.
                </h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Request a technical consultation to address your vessel's
                  specific compliance, structural, or documentation challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <FileCheck className="h-6 w-6 text-primary shrink-0" />
                    <h3 className="font-display font-bold text-[#0B3B5C] text-base">
                      Stay PSC‑Ready
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Identify compliance gaps before inspections.
                  </p>
                </div>
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Anchor className="h-6 w-6 text-primary shrink-0" />
                    <h3 className="font-display font-bold text-[#0B3B5C] text-base">
                      Reduce Yard Time
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Optimize dry‑dock with clear technical specs.
                  </p>
                </div>
                <div className="bg-neutral-50 border-l-2 border-primary p-5 rounded-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardCheck className="h-6 w-6 text-primary shrink-0" />
                    <h3 className="font-display font-bold text-[#0B3B5C] text-base">
                      Survey‑Ready Docs
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ensure drawings and plans meet all requirements.
                  </p>
                </div>
              </div>

              <div className="lg:hidden mb-4 flex items-center justify-center gap-4 text-xs text-muted-foreground bg-neutral-50/80 py-3 px-4 rounded-sm border border-border/20">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> Response within 24h
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" /> Confidential
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="h-3.5 w-3.5" /> No obligation
                </span>
              </div>

              <p className="text-sm text-center text-muted-foreground mb-6 lg:hidden">
                This is a focused technical consultation — not a generic contact
                request.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                <div className="lg:col-span-7">
                  {formStatus === "success" ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="bg-green-50 border border-green-200 rounded-sm p-8 text-center"
                    >
                      <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h2 className="text-2xl font-display font-bold text-[#0B3B5C] mb-2">
                        Request Received
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        Thank you. A member of our technical team will respond
                        within one business day.
                      </p>
                      <button
                        onClick={() => setFormStatus("idle")}
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        Submit another request <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit}
                      className="bg-white border border-border/20 rounded-sm p-6 md:p-8 shadow-sm"
                    >
                      {/* Honeypot – bot koruması */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          name="_gotcha"
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div className="space-y-5">
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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Captain / Owner / Technical Manager"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-[#0B3B5C] mb-1"
                          >
                            Email Address{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            disabled={formStatus === "submitting"}
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="you@example.com"
                          />
                        </div>

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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="+382 68 591 757"
                          />
                        </div>

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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="e.g., M/Y Serenity"
                          />
                        </div>

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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Montenegro"
                          />
                        </div>

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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <option value="Yacht Survey & Inspection">
                              Yacht Survey & Inspection
                            </option>
                            <option value="Other / Not Sure">
                              Other / Not Sure
                            </option>
                          </select>
                        </div>

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
                            className="w-full px-4 py-3 bg-neutral-50 border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Please describe your technical requirements, vessel type, timeline, or any specific challenge."
                          />
                        </div>

                        <div className="flex items-start gap-3 pt-2">
                          <input
                            type="checkbox"
                            name="gdprConsent"
                            id="gdprConsent"
                            required
                            disabled={formStatus === "submitting"}
                            className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <label
                            htmlFor="gdprConsent"
                            className="text-sm text-muted-foreground leading-relaxed"
                          >
                            I agree that Adriatica D.O.O. may process my
                            personal data in accordance with the{" "}
                            <a
                              href="/privacy-policy"
                              className="text-primary font-medium hover:underline"
                            >
                              Privacy Policy
                            </a>
                            . <span className="text-red-500">*</span>
                          </label>
                        </div>

                        {formStatus === "error" && (
                          <div
                            role="alert"
                            aria-live="assertive"
                            className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-700 text-sm"
                          >
                            {errorType === "rate-limit" ? (
                              <span>
                                Too many requests. Please wait a moment and try
                                again.
                              </span>
                            ) : (
                              <>
                                Something went wrong. Please try again or
                                contact us directly at{" "}
                                <a
                                  href="mailto:info@adriaticadoo.com"
                                  className="underline font-medium"
                                >
                                  info@adriaticadoo.com
                                </a>
                                .
                              </>
                            )}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full py-4 bg-[#D4AF37] text-black font-medium rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {formStatus === "submitting"
                            ? "Sending Request..."
                            : "Submit Consultation Request"}
                        </button>

                        <p className="text-xs text-center text-muted-foreground mt-3">
                          We recommend addressing compliance gaps at least 4–6
                          weeks before your next survey.
                        </p>
                      </div>
                    </form>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="bg-neutral-50 border border-border/20 rounded-sm p-6 md:p-8 shadow-sm sticky top-24">
                    <p className="text-sm text-muted-foreground mb-4 pb-2 border-b border-border/20">
                      This is a focused technical consultation — not a generic
                      contact request.
                    </p>

                    <h2 className="font-display text-xl font-bold text-[#0B3B5C] mb-3">
                      Who This Is For
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
                      Facing a PSC inspection? Preparing for dry‑dock?
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      Whether you're a superyacht captain, a commercial fleet
                      technical manager, or an owner preparing for a survey — if
                      you value operational clarity and technical precision,
                      you're in the right place.
                    </p>

                    <h3 className="font-display font-bold text-[#0B3B5C] mb-3 mt-6">
                      What Happens Next
                    </h3>
                    <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside mb-6">
                      <li>We review your request within 24 hours.</li>
                      <li>Brief discussion to clarify your requirements.</li>
                      <li>
                        You receive initial technical feedback and options.
                      </li>
                    </ol>

                    <div className="mt-6 pt-6 border-t border-border/30">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Lock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#0B3B5C] text-sm">
                            Confidential & No Obligation
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                            Your information is handled with strict
                            confidentiality according to our{" "}
                            <a
                              href="/privacy-policy"
                              className="text-primary font-medium hover:underline"
                            >
                              Privacy Policy
                            </a>
                            . Submitting this form does not create any
                            obligation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Suspense fallback={<div className="h-16 bg-background border-t" />}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
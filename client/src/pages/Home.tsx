import { useState, useCallback } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { InsightCard } from "@/components/InsightCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import {
  ArrowDown,
  ShieldCheck,
  Gauge,
  Handshake,
  Clipboard,
  Search,
  Wrench,
  FileText,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import { insights } from "@/data/insights";
import { TRUST_METRICS } from "@/config/trustMetrics";

// En son 3 makale
const recentInsights = [...insights]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

export default function Home() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
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

  const scrollToServices = useCallback(() => {
    document
      .getElementById("core-competencies")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Adriatica D.O.O. - Marine engineering consultancy specializing in structural integrity, regulatory compliance, and sustainable technologies. Serving Montenegro, Adriatic Coast, and European maritime industry."
        canonical="https://www.adriaticadoo.com/"
        ogImage="/og-image-default.png"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": "https://www.adriaticadoo.com/#organization",
            name: "Adriatica D.O.O.",
            url: "https://www.adriaticadoo.com/",
            logo: {
              "@type": "ImageObject",
              url: "https://www.adriaticadoo.com/logo.svg",
              width: 400,
              height: 400,
            },
            image: {
              "@type": "ImageObject",
              url: "https://www.adriaticadoo.com/og-image-default.png",
              width: 1200,
              height: 630,
            },
            description:
              "Marine engineering consultancy specialising in structural integrity, regulatory compliance, and sustainable technologies for yachts, commercial vessels, and fishing boats in the Adriatic and Mediterranean.",
            taxID: "03612807",
            telephone: "+382 68 591 757",
            email: "info@adriaticadoo.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Budva",
              addressRegion: "Budva Municipality",
              addressCountry: "ME",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 42.2864,
              longitude: 18.84,
            },
            hasMap: "https://www.google.com/maps/place/Budva,+Montenegro/",
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
            ],
            knowsLanguage: ["en", "hr", "sr", "tr", "ru"],
            currenciesAccepted: "EUR, USD, GBP",
            paymentAccepted: "Bank transfer, PayPal, Wise",
            priceSpecification: {
              "@type": "PriceSpecification",
              priceCurrency: "EUR",
              valueAddedTaxIncluded: true,
              description: "Project-based pricing – contact for quote",
            },
            areaServed: [
              { "@type": "Place", name: "Montenegro" },
              { "@type": "Place", name: "Adriatic Sea" },
              { "@type": "Place", name: "Mediterranean Sea" },
              { "@type": "Place", name: "Europe" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Marine Engineering Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Engineering Plans",
                    url: "https://www.adriaticadoo.com/services/engineering-plans",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Engineering Documentation",
                    url: "https://www.adriaticadoo.com/services/engineering-documentation",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Structural Integrity",
                    url: "https://www.adriaticadoo.com/services/structural-integrity",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Sustainable Technologies",
                    url: "https://www.adriaticadoo.com/services/sustainable-technologies",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Regulatory Compliance",
                    url: "https://www.adriaticadoo.com/services/regulatory-compliance",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Project Management",
                    url: "https://www.adriaticadoo.com/services/project-management",
                  },
                },
              ],
            },
            sameAs: ["https://www.linkedin.com/company/adriatica-d-o-o"],
            foundingDate: "2025",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              minValue: 1,
              maxValue: 10,
            },
          }).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />

        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex overflow-hidden pt-32 pb-16 md:pt-24 md:pb-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/5 -skew-x-12 transform origin-top" />
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#0B3B5C]/5 skew-x-12 transform origin-bottom" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center lg:text-left mb-10 lg:mb-0"
              >
                <p className="text-primary font-medium tracking-[0.2em] uppercase mb-4">
                  Est. 2025
                </p>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#0B3B5C] leading-[1.1] mb-6 uppercase">
                  WISDOM IN <br />
                  <span className="text-[#3A74A0]">ENGINEERING</span>
                </h1>

                <p className="text-sm uppercase tracking-wide text-muted-foreground mt-2">
                  For Superyacht Owners & Commercial Fleet Operators in the
                  Adriatic and Mediterranean
                </p>

                <p className="text-xl md:text-2xl font-bold text-[#0B3B5C] mt-4 mb-4 max-w-2xl">
                  Engineering-grade outputs for compliance, documentation, and
                  vessel performance.
                </p>

                <p className="text-base text-muted-foreground mb-6 max-w-xl">
                  We deliver technical plans, documentation, and assessments —
                  enabling informed decisions, regulatory readiness, and
                  operational clarity.
                </p>

                <div className="border-l-2 border-primary pl-6 mb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      IMO 2026 Priority
                    </span>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                    <a
                      href="/news"
                      className="hover:underline hover:text-primary transition-colors"
                    >
                      With increasing PSC scrutiny across Europe, unmanaged
                      biofouling is becoming an operational and regulatory risk.
                      The 2026 IMO enforcement timeline accelerates the need for
                      action.
                    </a>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    href="/request-consultation"
                    className="px-8 py-4 bg-[#D4AF37] text-black font-medium rounded-sm shadow-lg shadow-[#D4AF37]/20 hover:bg-[#C9A961] transition-all duration-300 uppercase tracking-wide text-sm text-center"
                  >
                    Request Technical Assessment
                  </Link>
                  <button
                    onClick={scrollToServices}
                    className="px-8 py-4 bg-transparent border border-[#0B3B5C] text-[#0B3B5C] font-medium rounded-sm hover:bg-[#0B3B5C]/5 transition-all duration-300 uppercase tracking-wide text-sm"
                  >
                    Explore Services
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="relative flex justify-center items-center mt-8 lg:mt-0"
              >
                <div className="relative w-full max-w-[200px] sm:max-w-[280px] lg:max-w-md aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3B5C]/10 to-transparent rounded-full blur-3xl" />
                  <img
                    src="/logo.svg"
                    alt="Adriatica D.O.O. Symbol"
                    width={400}
                    height={400}
                    className="w-full h-auto drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/70"
          >
            <span className="text-xs uppercase tracking-widest mb-2">
              Scroll
            </span>
            <ArrowDown className="animate-bounce w-5 h-5" />
          </motion.div>
        </section>

        {/* ── TRUST STRIP ─────────────────────────────────────────────────────── */}
        <section className="py-4 bg-[#0B3B5C] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-white/85">
              <span className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">
                  {TRUST_METRICS.yearsExperience}+
                </span>
                Years {TRUST_METRICS.field}
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">
                  {TRUST_METRICS.vesselsSupported}+
                </span>
                Vessels Supported
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <span className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">
                  {TRUST_METRICS.pscDetentions}
                </span>
                PSC Detentions
              </span>
              <span className="text-white/20 hidden sm:inline">·</span>
              <Link
                href="/philosophy"
                className="text-white/85 hover:text-[#D4AF37] transition-colors uppercase tracking-wider text-xs font-medium"
              >
                Our Philosophy →
              </Link>
            </div>
          </div>
        </section>

        {/* ── VALUE PROPOSITION ───────────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B3B5C] mb-3">
                Why Choose Adriatica
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                Engineering management that delivers compliance, efficiency, and
                peace of mind.
              </p>
              <p className="text-primary text-sm font-medium uppercase tracking-wider">
                The Adriatica Integrity Cycle – Align · Execute · Verify
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border-l-2 border-primary/20">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  Technical Excellence & Compliance
                </h3>
                <p className="text-muted-foreground">
                  Your projects are managed in full alignment with IMO, MARPOL,
                  and IACS standards – so you get zero PSC risk.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Gauge className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  Operational Efficiency
                </h3>
                <p className="text-muted-foreground">
                  Smart planning and digital documentation cut dry‑dock time and
                  improve fuel performance – saving you time and money.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  Owner's Trusted Representative
                </h3>
                <p className="text-muted-foreground">
                  We act as your technical eyes and ears in shipyards, ensuring
                  quality control and budget adherence – so you can focus on
                  operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW WE WORK ─────────────────────────────────────────────────────── */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B3B5C] mb-3">
                How We Work
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                A structured approach to deliver clarity, compliance, and
                results.
              </p>
              <p className="text-primary text-sm font-medium uppercase tracking-wider">
                Following the Adriatica Integrity Cycle – Align · Execute ·
                Verify
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Clipboard className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  1. Brief & Information
                </h3>
                <p className="text-muted-foreground">
                  You share vessel details, operational profile, and specific
                  concerns.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  2. Analysis & Planning
                </h3>
                <p className="text-muted-foreground">
                  We perform technical assessment, risk identification, and
                  scope definition.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  3. Execution & Supervision
                </h3>
                <p className="text-muted-foreground">
                  We handle engineering oversight, contractor coordination, and
                  quality control.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">
                  4. Documentation & Handover
                </h3>
                <p className="text-muted-foreground">
                  You receive complete records, audit‑ready reports, and
                  as‑built documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CORE COMPETENCIES ───────────────────────────────────────────────── */}

        <section
          id="core-competencies"
          className="py-24 md:py-32 bg-white relative"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title="Marine Engineering"
              subtitle="Core Competencies"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                number="01"
                title="Engineering Plans"
                items={[
                  "Structural Drawings",
                  "As-Built Drawing Sets",
                  "Arrangement Plans",
                  "Fire & Safety Plans",
                ]}
                delay={0.1}
                linkTo="engineering-plans"
                linkText="Learn more about Engineering Plans"
                isDeliverable={true}
              />
              <FeatureCard
                number="02"
                title="Engineering Documentation"
                items={[
                  "As-Built P&ID / System Manuals",
                  "Electrical Load Analysis (EAB)",
                  "Fuel Management & Quality Booklet",
                  "IHM (Inventory of Hazardous Materials)",
                ]}
                delay={0.2}
                linkTo="engineering-documentation"
                linkText="Learn more about Engineering Documentation"
                isDeliverable={true}
              />
              <FeatureCard
                number="03"
                title="Structural Integrity"
                items={[
                  "Structural Integrity & Life Extension Studies",
                  "Hull Condition Analysis",
                  "Modification Consultancy",
                  "Vibration & Noise Diagnostic",
                ]}
                delay={0.3}
                linkTo="structural-integrity"
                linkText="Learn more about Structural Integrity"
                isDeliverable={true}
              />
              <FeatureCard
                number="04"
                title="Sustainable Tech"
                items={[
                  "Biofouling Management Plan (IMO MEPC.378(80))",
                  "Eco-friendly Coating Advisory",
                  "Energy Audit & Efficiency Surveys",
                  "MRV Monitoring Plan (EU MRV Regulation)",
                ]}
                delay={0.4}
                linkTo="sustainable-technologies"
                linkText="Learn more about Sustainable Technologies"
                isDeliverable={false}
              />
              <FeatureCard
                number="05"
                title="Regulatory Compliance"
                items={[
                  "Ballast Water Management Plan (BWMP)",
                  "Shipboard Oil Pollution Emergency Plan (SoPEP)",
                  "Ship Energy Efficiency Management Plan (SEEMP)",
                  "Garbage Management Plan",
                  "Emergency Response Manuals",
                ]}
                delay={0.5}
                linkTo="regulatory-compliance"
                linkText="Learn more about Regulatory Compliance"
                isDeliverable={false}
              />
              <FeatureCard
                number="06"
                title="Project Management"
                items={[
                  "Owner's Rep & Refit Supervision",
                  "Dry-Docking Specification & Management",
                  "On-site Technical Troubleshooting",
                  "Yacht Survey & Inspection",
                ]}
                delay={0.6}
                linkTo="project-management"
                linkText="Learn more about Project Management"
                isDeliverable={false}
              />
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA ────────────────────────────────────────────────────── */}
        <section className="relative py-20 bg-[#0B3B5C] overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/20 -skew-x-12 transform origin-top" />
            <div className="absolute inset-0 opacity-10">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 100 L100 0 L100 100 Z" fill="white" />
              </svg>
            </div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs uppercase tracking-[0.25em] text-white/85 mb-4">
              Ready to solve it?
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Have a specific technical challenge?
            </h2>
            <p className="text-white/85 mb-8 max-w-xl mx-auto">
              From PSC preparation to structural life extension — we assess,
              plan, and deliver. Tell us about your vessel.
            </p>
            <Link
              href="/request-consultation"
              className="inline-block bg-[#D4AF37] text-black font-medium px-8 py-4 rounded-sm text-sm uppercase tracking-wide shadow-lg hover:bg-[#C9A961] transition-all duration-300"
            >
              Submit Project Inquiry
            </Link>
          </div>
        </section>

        {/* ── OPERATIONAL REGION ──────────────────────────────────────────────── */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B3B5C] mb-4">
                  Operational Region
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  You benefit from our engineering management and technical
                  advisory services across a wide range of vessels –
                  superyachts, commercial vessels, and fishing boats – operating
                  in the <strong>Adriatic Sea</strong>,{" "}
                  <strong>Mediterranean Basin</strong>, and{" "}
                  <strong>European coastal waters</strong>.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/map.svg"
                  alt="Adriatic and Mediterranean region outline"
                  className="w-full max-w-[300px] h-auto"
                  width={300}
                  height={215}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── RECENT INSIGHTS ─────────────────────────────────────────────────── */}
        <section className="py-24 bg-[#0B3B5C] relative overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-[#1A4B7A]/10 skew-x-12 transform origin-top" />
            <div className="absolute inset-0 opacity-5">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path d="M0 0 L100 100 L0 100 Z" fill="white" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/85 mb-2">
                  From the knowledge base
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
                  Recent Insights
                </h2>
              </div>
              <Link
                href="/insights"
                className="text-sm text-[#D4AF37] hover:text-white transition-colors uppercase tracking-wider font-medium shrink-0"
              >
                All Insights →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentInsights.map((insight) => (
                <InsightCard
                  key={insight.slug}
                  insight={insight}
                  variant="dark"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── BEGIN YOUR VOYAGE ────────────────────────────────────────────────── */}
        <section
          id="begin-voyage"
          className="py-24 bg-neutral-50 border-t border-border/10"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
              Begin Your Voyage
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Share your vessel’s technical challenge. Our principal engineers
              will review and respond within 24 hours. Accepting commissions for
              Q2 2026.
            </p>

            {formStatus === "success" ? (
              <div className="max-w-md mx-auto p-8 bg-white border border-green-200 rounded-sm shadow-sm">
                <p className="text-green-800 text-lg font-medium mb-2">
                  Thank you!
                </p>
                <p className="text-muted-foreground">
                  Your consultation request has been received. We'll be in touch
                  shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 text-primary hover:underline text-sm"
                >
                  Send another request →
                </button>
              </div>
            ) : (
              <form
                action="https://formspree.io/f/myknqjbz"
                method="POST"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-4 text-left"
              >
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="w-full py-4 bg-[#0B3B5C] text-white font-medium hover:bg-[#1A4B7A] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "submitting"
                    ? "Sending..."
                    : "Request Consultation"}
                </button>
                {formStatus === "error" && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    Something went wrong. Please try again or contact us
                    directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

import { useState, useCallback, useId, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import {
  ArrowDown, ShieldCheck, Gauge, Handshake,
  Clipboard, Search, Wrench, FileText,
} from "lucide-react";
import { SEO } from "@/components/SEO";
import styles from "@/style/pinecone.module.css";

const COMMISSIONS_TEXT = "We are currently accepting commissions for Q2 2026.";

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const gradientId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = () => setPrefersReducedMotion(mediaQuery.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formStatus === "submitting") return;

    setFormStatus("submitting");

    const form = e.currentTarget;
    const action = form.getAttribute("action");
    if (!action) {
      setFormStatus("error");
      return;
    }

    const formData = new FormData(form);
    formData.append("ts", Date.now().toString());

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        if (response.status === 429) throw new Error("Too many requests. Please try later.");
        if (response.status >= 500) throw new Error("Server error. Please try again.");
        throw new Error("Submission failed");
      }

      setFormStatus("success");
      form.reset();
      setTimeout(() => successRef.current?.focus(), 50);
    } catch (error) {
      if (import.meta.env.MODE !== "production") {
        console.error("Form submission error:", error);
      }
      setFormStatus("error");
    }
  };

  const scrollToContact = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("begin-voyage");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      setTimeout(() => el.removeAttribute("tabindex"), 1000);
    }
  }, []);

  const scrollToServices = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("core-competencies");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
      setTimeout(() => el.removeAttribute("tabindex"), 1000);
    }
  }, []);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.8, ease: "easeOut" },
      };

  const heroImageMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
      };

  const scrollMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 1.5, duration: 0.8 },
      };

  return (
    <>
      <SEO
        title="Home"
        description="Adriatica D.O.O. - Marine engineering consultancy specializing in structural integrity, regulatory compliance, and sustainable technologies. Serving Montenegro, Adriatic Coast, and European maritime industry."
        canonical="https://www.adriaticadoo.me/"
        ogImage="/og-image-default.png"
      />

      <Helmet>
        <link rel="preload" as="image" href="/logo.svg" fetchPriority="high" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "ProfessionalService"],
            "@id": "https://www.adriaticadoo.me/#organization",
            "name": "Adriatica D.O.O.",
            "url": "https://www.adriaticadoo.me/",
            "logo": "https://www.adriaticadoo.me/logo.svg",
            "image": "https://www.adriaticadoo.me/og-image-default.png",
            "description": "Marine engineering consultancy specializing in structural integrity, regulatory compliance, and sustainable technologies.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Budva",
              "addressCountry": "ME"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "42.2864",
              "longitude": "18.8400"
            },
            "taxID": "03612807",
            "telephone": "+382 68 591 757",
            "email": "info@adriaticadoo.me",
            "openingHoursSpecification": [{
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "09:00",
              "closes": "18:00"
            }],
            "hasMap": "https://www.google.com/maps/place/Budva,+Montenegro/",
            "sameAs": [
              "https://www.linkedin.com/company/adriatica-d-o-o"
            ],
            "areaServed": ["Montenegro", "Adriatic Coast", "Europe"],
            "serviceType": [
              "Marine Engineering",
              "Regulatory Compliance",
              "MRV Reporting",
              "Biofouling Management",
              "Structural Integrity"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />

        {/* Hero Section */}
        <section className="relative min-h-screen flex overflow-hidden pt-32 pb-16 md:pt-24 md:pb-24">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/5 -skew-x-12 transform origin-top" />
            <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#0B3B5C]/5 skew-x-12 transform origin-bottom" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center">
              <motion.div {...motionProps} className="text-center lg:text-left mb-10 lg:mb-0">
                <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-4">
                  Est. 2025
                </h2>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-6 uppercase">
                  WISDOM IN <br />
                  <span className="text-secondary">ENGINEERING</span>
                </h1>

                <p className="text-lg md:text-xl font-semibold text-primary mb-2">
                  For Superyacht Owners & Commercial Fleet Operators in the Adriatic and Mediterranean
                </p>
                <p className="text-base md:text-lg lg:text-xl text-primary font-semibold mb-4">
                  Engineering Management & Compliance Solutions
                </p>
                <p className="text-base md:text-lg lg:text-xl font-medium text-primary leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6">
                  Reduce dry‑dock delays, stay PSC‑ready, and protect your charter schedule.
                </p>

                <div className="border-l-2 border-primary pl-6 mb-10">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      IMO 2026 Priority
                    </span>
                  </div>
                  <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                    <a href="/news" className="hover:underline hover:text-primary transition-colors">
                      With increasing PSC scrutiny across Europe, unmanaged biofouling is becoming an operational and regulatory risk. The 2026 IMO enforcement timeline accelerates the need for action.
                    </a>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a
                    href="#begin-voyage"
                    onClick={scrollToContact}
                    className="inline-block px-8 py-4 bg-gold text-white font-medium rounded-sm shadow-lg shadow-gold/20 hover:bg-gold/90 transition-all duration-300 uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Request Technical Assessment
                  </a>
                  <a
                    href="#core-competencies"
                    onClick={scrollToServices}
                    className="inline-block px-8 py-4 bg-transparent border border-primary text-primary font-medium rounded-sm hover:bg-primary/5 transition-all duration-300 uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Explore Services
                  </a>
                </div>
              </motion.div>

              <motion.div {...heroImageMotion} className="relative flex justify-center items-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-[200px] sm:max-w-[280px] lg:max-w-md aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
                  <img
                    src="/logo.svg"
                    alt="Adriatica D.O.O. Symbol"
                    width={300}
                    height={300}
                    sizes="(max-width: 768px) 200px, (max-width: 1024px) 280px, 400px"
                    className="w-full h-auto drop-shadow-2xl"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div {...scrollMotion} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40">
            <span className="text-xs uppercase tracking-widest mb-2" aria-hidden="true">Scroll</span>
            <ArrowDown className="animate-bounce w-5 h-5" aria-hidden="true" />
          </motion.div>
        </section>

        {/* Operational Region */}
        <section className="py-20 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                  Operational Region
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  You benefit from our engineering management and technical advisory services across a wide range of vessels – superyachts, commercial vessels, and fishing boats – operating in the <strong>Adriatic Sea</strong>, <strong>Mediterranean Basin</strong>, and <strong>European coastal waters</strong>.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/map.svg"
                  alt="Operational region map covering Adriatic Sea and Mediterranean maritime routes"
                  width={300}
                  height={215}
                  className="w-full max-w-[300px] h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-20 bg-white" aria-labelledby="why-choose-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="why-choose-title" className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
                Why Choose Adriatica
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                Engineering management that delivers compliance, efficiency, and peace of mind.
              </p>
              <p className="text-primary text-sm font-medium uppercase tracking-wider">
                The Adriatica Integrity Cycle – Align · Execute · Verify
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 border-l-2 border-primary/20">
                <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  Technical Excellence & Compliance
                </h3>
                <p className="text-muted-foreground">
                  Your projects are managed in full alignment with IMO, MARPOL, and IACS standards – so you get zero PSC risk.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Gauge className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  Operational Efficiency
                </h3>
                <p className="text-muted-foreground">
                  Smart planning and digital documentation cut dry‑dock time and improve fuel performance – saving you time and money.
                </p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Handshake className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">
                  Owner's Trusted Representative
                </h3>
                <p className="text-muted-foreground">
                  We act as your technical eyes and ears in shipyards, ensuring quality control and budget adherence – so you can focus on operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-neutral-50" aria-labelledby="how-we-work-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 id="how-we-work-title" className="font-display text-3xl md:text-4xl font-bold text-primary mb-3">
                How We Work
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
                A structured approach to deliver clarity, compliance, and results.
              </p>
              <p className="text-primary text-sm font-medium uppercase tracking-wider">
                Following the Adriatica Integrity Cycle – Align · Execute · Verify
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Clipboard className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">1. Brief & Information</h3>
                <p className="text-muted-foreground">You share vessel details, operational profile, and specific concerns.</p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Search className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">2. Analysis & Planning</h3>
                <p className="text-muted-foreground">We perform technical assessment, risk identification, and scope definition.</p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">3. Execution & Supervision</h3>
                <p className="text-muted-foreground">We handle engineering oversight, contractor coordination, and quality control.</p>
              </div>
              <div className="text-center p-6 border-l-2 border-primary/20">
                <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-xl font-bold text-primary mb-2">4. Documentation & Handover</h3>
                <p className="text-muted-foreground">You receive complete records, audit‑ready reports, and as‑built documentation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Competencies */}
        <section id="core-competencies" className="py-24 md:py-32 bg-white relative" aria-labelledby="core-competencies-title">
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
                linkTo="/services/engineering-plans"
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
                linkTo="/services/engineering-documentation"
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
                linkTo="/services/structural-integrity"
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
                linkTo="/services/sustainable-technologies"
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
                linkTo="/services/regulatory-compliance"
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
                linkTo="/services/project-management"
              />
            </div>
          </div>
        </section>

        {/* Mid‑page CTA */}
        <section className="py-16 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Have a specific technical challenge? We're ready to solve it.
            </p>
            <a
              href="#begin-voyage"
              onClick={scrollToContact}
              className="inline-block px-8 py-4 bg-primary text-white font-medium rounded-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:bg-primary/90 transition-all duration-300 uppercase tracking-wide text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Submit Project Inquiry
            </a>
          </div>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="py-24 bg-primary text-white overflow-hidden relative" aria-labelledby="philosophy-title">
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0 L100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  title="ADRIATICA D.O.O. STANDARD"
                  subtitle="Philosophy"
                  light={true}
                  className="mb-8"
                />
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  Our logo, the Sumerian pinecone, symbolizes wisdom and resilience. We approach every engineering challenge as an opportunity to create lasting value.
                </p>
                <p className="text-lg text-white/80 leading-relaxed mb-8">
                  Our approach is reductive: we remove the unnecessary to reveal the essential structure. This discipline results in engineering that is not only functional but resilient and timeless.
                </p>
                <p className="text-lg text-white/80 leading-relaxed mb-6">
                  Precision is not just a method—it is our philosophy. Every project is executed with uncompromising attention to detail, ensuring safety and compliance beyond standards.
                </p>

                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <div className="text-4xl font-display font-bold text-secondary mb-2">20+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-secondary mb-2">25+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Clients Worldwide</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-secondary mb-2">8+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-secondary mb-2">0</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Compromises</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] mx-auto">
                  <div className={styles.containerVisual}>
                    <div className={styles.logoSvgCustom}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" width="100%" height="100%">
                        <defs>
                          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D4AF37" stopOpacity="1" />
                            <stop offset="50%" stopColor="#C9A961" stopOpacity="1" />
                            <stop offset="100%" stopColor="#B8964F" stopOpacity="1" />
                          </linearGradient>
                        </defs>
                        <polygon points="40,1 49,14 40,27 31,14" />
                        <polygon points="60,1 69,14 60,27 51,14" />
                        <polygon points="30,15 39,28 30,41 21,28" />
                        <polygon points="50,15 59,28 50,41 41,28" />
                        <polygon points="70,15 79,28 70,41 61,28" />
                        <polygon points="20,29 29,42 20,55 11,42" />
                        <polygon points="40,29 49,42 40,55 31,42" />
                        <polygon points="60,29 69,42 60,55 51,42" />
                        <polygon points="80,29 89,42 80,55 71,42" />
                        <polygon points="30,43 39,56 30,69 21,56" />
                        <polygon points="50,43 59,56 50,69 41,56" />
                        <polygon points="70,43 79,56 70,69 61,56" />
                        <polygon points="20,57 29,70 20,83 11,70" />
                        <polygon points="40,57 49,70 40,83 31,70" />
                        <polygon points="60,57 69,70 60,83 51,70" />
                        <polygon points="80,57 89,70 80,83 71,70" />
                        <polygon points="30,71 39,84 30,97 21,84" />
                        <polygon points="50,71 59,84 50,97 41,84" />
                        <polygon points="70,71 79,84 70,97 61,84" />
                        <polygon points="20,85 29,98 20,111 11,98" />
                        <polygon points="40,85 49,98 40,111 31,98" />
                        <polygon points="60,85 69,98 60,111 51,98" />
                        <polygon points="80,85 89,98 80,111 71,98" />
                        <polygon points="30,99 39,112 30,125 21,112" />
                        <polygon points="50,99 59,112 50,125 41,112" />
                        <polygon points="70,99 79,112 70,125 61,112" />
                        <polygon points="40,113 49,126 40,139 31,126" />
                        <polygon points="60,113 69,126 60,139 51,126" />
                        <polygon points="50,127 59,140 50,153 41,140" />
                      </svg>
                    </div>
                    <div className={`${styles.labelCustom} ${styles.topLeft}`}>Wisdom</div>
                    <div className={`${styles.labelCustom} ${styles.topRight}`}>Resilience</div>
                    <div className={`${styles.labelCustom} ${styles.bottomLeft}`}>Renewal</div>
                    <div className={`${styles.labelCustom} ${styles.bottomRight}`}>Seed of Life</div>
                    <div className={`${styles.diamond} ${styles.diamondWisdom}`}>
                      <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="#0B3B5C" /></svg>
                    </div>
                    <div className={`${styles.diamond} ${styles.diamondResilience}`}>
                      <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill={`url(#${gradientId})`} /></svg>
                    </div>
                    <div className={`${styles.diamond} ${styles.diamondRenewal}`}>
                      <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill={`url(#${gradientId})`} /></svg>
                    </div>
                    <div className={`${styles.diamond} ${styles.diamondSeed}`}>
                      <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="#1A4B7A" /></svg>
                    </div>
                    <div className={styles.bottomText}>SUMERIAN PINECONE</div>
                    <div className={styles.borderOverlay} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="begin-voyage" className="py-24 bg-neutral-50 border-t border-border/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
              Begin Your Voyage
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Tell us your marine engineering requirements, and our principal architects will respond. {COMMISSIONS_TEXT}
            </p>

            {formStatus === "success" ? (
              <div
                ref={successRef}
                className="max-w-md mx-auto p-8 bg-white border border-green-200 rounded-sm shadow-sm"
                tabIndex={-1}
                role="status"
                aria-live="polite"
              >
                <p className="text-green-800 text-lg font-medium mb-2">Thank you!</p>
                <p className="text-muted-foreground">Your consultation request has been received. We'll be in touch shortly.</p>
                <button
                  type="button"
                  onClick={() => setFormStatus("idle")}
                  className="mt-6 text-primary hover:underline text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="w-full px-6 py-4 bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    required
                    disabled={formStatus === "submitting"}
                  />
                </div>
                <input type="text" name="_gotcha" style={{ display: "none" }} />
                <input type="hidden" name="_subject" value="New Consultation Request" />
                <input type="hidden" name="_template" value="table" />
                <button
                  type="submit"
                  disabled={formStatus === "submitting"}
                  aria-busy={formStatus === "submitting"}
                  className="w-full py-4 bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {formStatus === "submitting" ? "Sending..." : "Request Consultation"}
                </button>
                {formStatus === "error" && (
                  <div className="text-center mt-2" role="alert">
                    <p className="text-red-600 text-sm">
                      Submission failed. Please try again or email us directly at info@adriaticadoo.me
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus("idle")}
                      className="mt-2 text-primary hover:underline text-sm"
                    >
                      Try again
                    </button>
                  </div>
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
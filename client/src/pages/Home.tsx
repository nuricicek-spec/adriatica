import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { ArrowDown } from "lucide-react";
import { SEO } from "@/components/SEO";

const COMMISSIONS_TEXT = "We are currently accepting commissions for Q2 2026.";

export default function Home() {
  // Form durumu: 'idle', 'submitting', 'success', 'error'
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset(); // Formu temizle
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Adriatica D.O.O.",
            "image": "https://www.adriaticadoo.me/og-image-default.png",
            "url": "https://www.adriaticadoo.me",
            "taxID": "03612807",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Budva",
              "addressCountry": "ME"
            },
            "serviceType": [
              "Marine Engineering",
              "Regulatory Compliance",
              "MRV Reporting",
              "Biofouling Management",
              "Structural Integrity"
            ],
            "description": "Marine engineering consultancy specializing in EU MRV, IMO DCS, and Biofouling compliance.",
            "areaServed": [
              "Bar",
              "Budva",
              "Kotor",
              "Tivat",
              "Montenegro",
              "Adriatic Coast",
              "Europe"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />

        {/* Hero Section - fully responsive */}
        <section className="relative min-h-screen flex overflow-hidden pt-32 pb-16 md:pt-24 md:pb-24">
          {/* Abstract Background Elements */}
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
                <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-4">
                  Est. 2025
                </h2>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#0B3B5C] leading-[1.1] mb-6 uppercase">
                  WISDOM IN <br />
                  <span className="text-[#3A74A0]">ENGINEERING</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 border-l-2 border-primary/20 pl-6">
                  Engineered for the deepest challenges. We combine timeless principles with cutting-edge marine technology to create engineering that endures.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={() => document.getElementById('begin-voyage')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-[#0B3B5C] text-white font-medium rounded-sm shadow-lg shadow-[#0B3B5C]/20 hover:shadow-xl hover:bg-[#1A4B7A] transition-all duration-300 uppercase tracking-wide text-sm"
                  >
                    Request a Quote
                  </button>
                  <button 
                    onClick={() => document.getElementById('core-competencies')?.scrollIntoView({ behavior: 'smooth' })}
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <ArrowDown className="animate-bounce w-5 h-5" />
          </motion.div>
        </section>

        {/* Expertise Grid */}
        <section id="core-competencies" className="py-24 md:py-32 bg-white relative">
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
                  "Fire & Safety Plans"
                ]}
                delay={0.1}
              />
              <p className="hidden">Specializing in Adriatic shipyard projects and new building designs.</p>
              <FeatureCard 
                number="02" 
                title="Engineering Documentation" 
                items={[
                  "As-Built P&ID / System Manuals",
                  "Electrical Load Analysis (EAB)",
                  "Fuel Management & Quality Booklet",
                  "IHM (Inventory of Hazardous Materials)"
                ]}
                delay={0.2}
              />
              <FeatureCard 
                number="03" 
                title="Structural Integrity" 
                items={[
                  "Structural Integrity & Life Extension Studies",
                  "Hull Condition Analysis",
                  "Modification Consultancy",
                  "Vibration & Noise Diagnostic"
                ]}
                delay={0.3}
              />
              <p className="hidden">For yachts, commercial vessels, and European fleet operators.</p>
              <FeatureCard 
                number="04" 
                title="Sustainable Tech" 
                items={[
                  "Biofouling Management Plan (IMO MEPC.378(80))",
                  "Eco-friendly Coating Advisory",
                  "Energy Audit & Efficiency Surveys",
                  "MRV Monitoring Plan (EU MRV Regulation)"
                ]}
                delay={0.4}
              />
              <FeatureCard 
                number="05" 
                title="Regulatory Compliance" 
                items={[
                  "Ballast Water Management Plan (BWMP)",
                  "Shipboard Oil Pollution Emergency Plan (SoPEP)",
                  "Ship Energy Efficiency Management Plan (SEEMP)",
                  "Garbage Management Plan",
                  "Emergency Response Manuals"
                ]}
                delay={0.5}
              />
              <p className="hidden">IMO standards for Montenegro and Adriatic Coast operators.</p>
              <FeatureCard 
                number="06" 
                title="Project Management" 
                items={[
                  "Owner's Rep & Refit Supervision",
                  "Dry-Docking Specification & Management",
                  "On-site Technical Troubleshooting"
                ]}
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Image / Vision Section */}
        <section id="philosophy" className="py-24 bg-[#0B3B5C] text-white overflow-hidden relative">
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
                    <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">20+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">25+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Clients Worldwide</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">8+</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Countries</div>
                  </div>
                  <div>
                    <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">0</div>
                    <div className="text-sm uppercase tracking-wider text-white/60">Compromises</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <style>{`
                  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Montserrat:wght@300;400&display=swap');

                  .container-visual {
                      width: 100%;
                      height: 100%;
                      background: linear-gradient(135deg, rgba(15, 25, 45, 0.95) 0%, rgba(10, 17, 40, 0.98) 100%);
                      border-radius: 0;
                      position: relative;
                      overflow: hidden;
                      box-shadow: 
                          0 30px 60px rgba(0, 0, 0, 0.6),
                          0 0 1px 1px rgba(212, 175, 55, 0.2),
                          inset 0 1px 0 rgba(255, 255, 255, 0.1);
                      backdrop-filter: blur(10px);
                  }

                  .container-visual::before {
                      content: '';
                      position: absolute;
                      inset: 0;
                      border-radius: 0;
                      padding: 2px;
                      background: linear-gradient(135deg, 
                          rgba(212, 175, 55, 0.4) 0%,
                          rgba(201, 169, 97, 0.2) 25%,
                          rgba(27, 58, 107, 0.3) 50%,
                          rgba(212, 175, 55, 0.4) 100%);
                      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                      -webkit-mask-composite: xor;
                      mask-composite: exclude;
                      pointer-events: none;
                      opacity: 0.6;
                      transition: opacity 0.6s;
                  }

                  .container-visual:hover::before {
                      opacity: 1;
                  }

                  .logo-svg-custom {
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%) scale(0.88);
                      width: 96%;
                      height: 96%;
                      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                      filter: drop-shadow(0 0 20px rgba(42, 95, 138, 0.4));
                  }

                  .container-visual:hover .logo-svg-custom {
                      transform: translate(-50%, -50%) scale(0.92);
                      filter: 
                          drop-shadow(0 0 30px rgba(42, 95, 138, 0.6))
                          drop-shadow(0 0 10px rgba(212, 175, 55, 0.2));
                  }

                  .logo-svg-custom polygon:nth-child(2) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(3) { fill: #3A74A0; }
                  .logo-svg-custom polygon:nth-child(4) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(5) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(6) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(7) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(8) { fill: #3A74A0; }
                  .logo-svg-custom polygon:nth-child(9) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(10) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(11) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(12) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(13) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(14) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(15) { fill: #3A74A0; }
                  .logo-svg-custom polygon:nth-child(16) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(17) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(18) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(19) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(20) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(21) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(22) { fill: #3A74A0; }
                  .logo-svg-custom polygon:nth-child(23) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(24) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(25) { fill: #2A5F8A; }
                  .logo-svg-custom polygon:nth-child(26) { fill: #1A4B7A; }
                  .logo-svg-custom polygon:nth-child(27) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(28) { fill: #0B3B5C; }
                  .logo-svg-custom polygon:nth-child(29) { fill: #3A74A0; }
                  .logo-svg-custom polygon:nth-child(30) { fill: #2A5F8A; }

                  .logo-svg-custom polygon {
                      transition: all 0.4s ease;
                  }

                  .container-visual:hover .logo-svg-custom polygon:nth-child(6),
                  .container-visual:hover .logo-svg-custom polygon:nth-child(14),
                  .container-visual:hover .logo-svg-custom polygon:nth-child(22) {
                      fill: #c9a961;
                      filter: drop-shadow(0 0 8px rgba(212, 175, 55, 0.6));
                  }

                  .label-custom {
                      position: absolute;
                      background: linear-gradient(135deg, rgba(10, 17, 40, 0.85), rgba(15, 25, 45, 0.9));
                      backdrop-filter: blur(12px);
                      border: none;
                      color: #e8e4d9;
                      padding: 8px 14px;
                      border-radius: 0;
                      font-size: 11px;
                      font-weight: 400;
                      letter-spacing: 2px;
                      text-transform: uppercase;
                      opacity: 0.75;
                      z-index: 10;
                      transition: all 0.4s ease;
                      font-family: 'Cinzel', serif;
                      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                  }

                  .container-visual:hover .label-custom {
                      opacity: 1;
                      box-shadow: 
                          0 6px 16px rgba(0, 0, 0, 0.4),
                          0 0 20px rgba(212, 175, 55, 0.15);
                  }

                  .label-custom::before {
                      content: '';
                      position: absolute;
                      inset: -1px;
                      background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent);
                      border-radius: 0;
                      opacity: 0;
                      transition: opacity 0.4s;
                      z-index: -1;
                  }

                  .container-visual:hover .label-custom::before {
                      opacity: 1;
                  }

                  .top-left { top: 24px; left: 24px; }
                  .top-right { top: 24px; right: 24px; }
                  .bottom-left { bottom: 90px; left: 24px; }
                  .bottom-right { bottom: 90px; right: 24px; }

                  .diamond {
                      position: absolute;
                      width: 42px;
                      height: 60px;
                      opacity: 0.8;
                      z-index: 5;
                      transition: all 0.5s ease;
                      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
                  }

                  .container-visual:hover .diamond {
                      opacity: 1;
                      transform: scale(1.05);
                  }

                  .diamond svg {
                      width: 100%;
                      height: 100%;
                  }

                  .diamond-wisdom { top: 54px; left: 28px; }
                  .diamond-resilience { top: 54px; right: 28px; }
                  .diamond-renewal { bottom: 118px; left: 28px; }
                  .diamond-seed { bottom: 118px; right: 28px; }

                  .diamond-resilience polygon {
                      fill: url(#goldGradientCustom);
                  }

                  .diamond-renewal polygon {
                      fill: url(#goldGradientCustom);
                  }

                  .container-visual:hover .diamond-resilience,
                  .container-visual:hover .diamond-renewal {
                      filter: 
                          drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4))
                          drop-shadow(0 0 16px rgba(212, 175, 55, 0.4));
                  }

                  .bottom-text {
                      position: absolute;
                      bottom: 24px;
                      width: 100%;
                      text-align: center;
                      color: #e8e4d9;
                      font-size: 13px;
                      letter-spacing: 4px;
                      opacity: 0.85;
                      z-index: 20;
                      font-family: 'Cinzel', serif;
                      font-weight: 600;
                      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
                      transition: all 0.4s;
                  }

                  .container-visual:hover .bottom-text {
                      opacity: 1;
                      letter-spacing: 5px;
                      text-shadow: 
                          0 2px 12px rgba(0, 0, 0, 0.6),
                          0 0 20px rgba(212, 175, 55, 0.3);
                  }

                  .border-overlay {
                      position: absolute;
                      inset: 20px;
                      border: 1px solid rgba(232, 228, 217, 0.15);
                      border-radius: 0;
                      pointer-events: none;
                      z-index: 25;
                      transition: border-color 0.6s;
                  }

                  .container-visual:hover .border-overlay {
                      border-color: rgba(232, 228, 217, 0.25);
                      box-shadow: 
                          inset 0 0 20px rgba(232, 228, 217, 0.05),
                          0 0 30px rgba(42, 95, 138, 0.2);
                  }

                  .container-visual::after {
                      content: '';
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      width: 300px;
                      height: 300px;
                      background: radial-gradient(circle, rgba(42, 95, 138, 0.15) 0%, transparent 70%);
                      transform: translate(-50%, -50%);
                      pointer-events: none;
                      opacity: 0.5;
                      transition: opacity 0.8s;
                  }

                  .container-visual:hover::after {
                      opacity: 1;
                      animation: pulseCustom 3s ease-in-out infinite;
                  }

                  @keyframes pulseCustom {
                      0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
                      50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
                  }

                  @media (max-width: 500px) {
                      .container-visual {
                          width: 90vw;
                          height: 110vw;
                      }
                  }
                `}</style>
                <div className="aspect-[4/5] mx-auto">
                  <div className="container-visual">
                    <div className="logo-svg-custom">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" width="100%" height="100%">
                        <defs>
                          <linearGradient id="goldGradientCustom" x1="0%" y1="0%" x2="100%" y2="100%">
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

                    <div className="label-custom top-left">Wisdom</div>
                    <div className="label-custom top-right">Resilience</div>
                    <div className="label-custom bottom-left">Renewal</div>
                    <div className="label-custom bottom-right">Seed of Life</div>

                    <div className="diamond diamond-wisdom">
                      <svg viewBox="0 0 18 26">
                        <polygon points="9,0 18,13 9,26 0,13" fill="#0B3B5C" />
                      </svg>
                    </div>
                    <div className="diamond diamond-resilience">
                      <svg viewBox="0 0 18 26">
                        <polygon points="9,0 18,13 9,26 0,13" fill="url(#goldGradientCustom)" />
                      </svg>
                    </div>
                    <div className="diamond diamond-renewal">
                      <svg viewBox="0 0 18 26">
                        <polygon points="9,0 18,13 9,26 0,13" fill="url(#goldGradientCustom)" />
                      </svg>
                    </div>
                    <div className="diamond diamond-seed">
                      <svg viewBox="0 0 18 26">
                        <polygon points="9,0 18,13 9,26 0,13" fill="#1A4B7A" />
                      </svg>
                    </div>

                    <div className="bottom-text">SUMERIAN PINECONE</div>
                    <div className="border-overlay"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="begin-voyage" className="py-24 bg-neutral-50 border-t border-border/10">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
              Begin Your Voyage
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discuss your marine engineering requirements with our principal architects. {COMMISSIONS_TEXT}
            </p>

            {formStatus === 'success' ? (
              <div className="max-w-md mx-auto p-8 bg-white border border-green-200 rounded-sm shadow-sm">
                <p className="text-green-800 text-lg font-medium mb-2">Thank you!</p>
                <p className="text-muted-foreground">Your consultation request has been received. We'll be in touch shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
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
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    required
                    disabled={formStatus === 'submitting'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-[#0B3B5C] text-white font-medium hover:bg-[#1A4B7A] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Request Consultation'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-red-600 text-sm text-center mt-2">
                    Something went wrong. Please try again or contact us directly.
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
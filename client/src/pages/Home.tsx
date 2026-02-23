import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { ArrowDown } from "lucide-react";

const COMMISSIONS_TEXT = "We are currently accepting commissions for Q3 2025.";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden pt-24 md:pt-20">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/5 -skew-x-12 transform origin-top" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#0B3B5C]/5 skew-x-12 transform origin-bottom" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-4">
                Est. 2025
              </h2>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-[#0B3B5C] leading-[1.1] mb-8 uppercase">
                WISDOM IN <br />
                <span className="text-[#3A74A0]">ENGINEERING</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 border-l-2 border-primary/20 pl-6">
                Engineered for the deepest challenges. We combine timeless principles with cutting-edge marine technology to create engineering that endures.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0B3B5C] text-white font-medium rounded-sm shadow-lg shadow-[#0B3B5C]/20 hover:shadow-xl hover:bg-[#1A4B7A] transition-all duration-300 uppercase tracking-wide text-sm">
                  Request a Quote
                </button>
                <button className="px-8 py-4 bg-transparent border border-[#0B3B5C] text-[#0B3B5C] font-medium rounded-sm hover:bg-[#0B3B5C]/5 transition-all duration-300 uppercase tracking-wide text-sm">
                  Explore Services
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              {/* Logo centered as hero graphic */}
              <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B3B5C]/10 to-transparent rounded-full blur-3xl" />
                <img 
                  src="/logo.svg" 
                  alt="AdriaticA Doo Symbol" 
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
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-primary/40"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <ArrowDown className="animate-bounce w-5 h-5" />
        </motion.div>
      </section>

      {/* Expertise Grid */}
      <section id="expertise" className="py-24 md:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Marine Engineering" 
            subtitle="Core Competencies"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard 
              number="01" 
              title="Engineering Plans" 
              description="Comprehensive as-built drawing sets, general arrangement plans, and structural drawings – your vessel's complete technical memory."
              delay={0.1}
            />
            <FeatureCard 
              number="02" 
              title="Engineering Documentation" 
              description="P&ID diagrams, electrical load analysis (EAB), fuel management booklets, and system manuals for technical reference."
              delay={0.2}
            />
            <FeatureCard 
              number="03" 
              title="Structural Integrity" 
              description="Hull condition analysis, life extension studies, and modification consultancy for superyachts and commercial vessels."
              delay={0.3}
            />
            <FeatureCard 
              number="04" 
              title="Sustainable Tech" 
              description="Biofouling Management Plans (IMO MEPC.378(80)), IHM, and eco-friendly coating advisory for environmental compliance."
              delay={0.4}
            />
            <FeatureCard 
              number="05" 
              title="Regulatory Compliance" 
              description="Fire & Safety Plans, BWMP, SoPEP, SEEMP, and Garbage Management Plans – fully compliant with IMO and Flag State requirements."
              delay={0.5}
            />
            <FeatureCard 
              number="06" 
              title="Project Management" 
              description="Owner's representation, dry-docking supervision, and refit management – your independent advocate at the shipyard."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Image / Vision Section */}
      <section className="py-24 bg-[#0B3B5C] text-white overflow-hidden relative">
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
                Just as the Sumerian pinecone symbolized wisdom and resilience, we approach every engineering challenge as an opportunity to create lasting value.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Our approach is reductive: we remove the unnecessary to reveal the essential structure. This discipline results in engineering that is not only functional but resilient and timeless.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">20+</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">50+</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Clients Worldwide</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">15+</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Countries</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">0</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Compromises</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Custom Geometry Visual */}
              <div className="w-[450px] h-[580px] bg-gradient-to-br from-[#0f192d]/95 to-[#0a1128]/98 relative overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_1px_1px_rgba(212,175,55,0.2),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-[10px] group mx-auto">
                {/* Gold pyrite border effect */}
                <div className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 before:absolute before:inset-0 before:p-[2px] before:bg-gradient-to-br before:from-[#d4af37]/40 before:via-[#c9a961]/20 before:via-[#1b3a6b]/30 before:to-[#d4af37]/40 before:[mask-image:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor]" />
                
                {/* Labels */}
                <div className="absolute top-6 left-6 px-[14px] py-2 bg-gradient-to-br from-[#0a1128]/85 to-[#0f192d]/90 backdrop-blur-[12px] text-[#e8e4d9] text-[11px] font-['Cinzel'] tracking-[2px] uppercase opacity-75 group-hover:opacity-100 transition-all duration-400 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-10">
                  WISDOM
                </div>
                <div className="absolute top-6 right-6 px-[14px] py-2 bg-gradient-to-br from-[#0a1128]/85 to-[#0f192d]/90 backdrop-blur-[12px] text-[#e8e4d9] text-[11px] font-['Cinzel'] tracking-[2px] uppercase opacity-75 group-hover:opacity-100 transition-all duration-400 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-10">
                  STRUCTURE
                </div>
                <div className="absolute bottom-[90px] left-6 px-[14px] py-2 bg-gradient-to-br from-[#0a1128]/85 to-[#0f192d]/90 backdrop-blur-[12px] text-[#e8e4d9] text-[11px] font-['Cinzel'] tracking-[2px] uppercase opacity-75 group-hover:opacity-100 transition-all duration-400 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-10">
                  RESILIENCE
                </div>
                <div className="absolute bottom-[90px] right-6 px-[14px] py-2 bg-gradient-to-br from-[#0a1128]/85 to-[#0f192d]/90 backdrop-blur-[12px] text-[#e8e4d9] text-[11px] font-['Cinzel'] tracking-[2px] uppercase opacity-75 group-hover:opacity-100 transition-all duration-400 shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-10">
                  PURITY
                </div>

                {/* Main Pinecone Logo Integration */}
                <div className="absolute inset-0 flex items-center justify-center p-[2%] transition-all duration-700 group-hover:scale-[1.04]">
                  <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(42,95,138,0.4)] group-hover:drop-shadow-[0_0_30px_rgba(42,95,138,0.6)]" viewBox="0 0 400 500">
                    <polygon points="200,50 250,100 200,150 150,100" fill="#0B3B5C" />
                    <polygon points="250,100 300,150 250,200 200,150" fill="#3A74A0" />
                    <polygon points="200,150 250,200 200,250 150,200" fill="#2A5F8A" />
                    <polygon points="150,100 200,150 150,200 100,150" fill="#1A4B7A" />
                  </svg>
                </div>
              </div>
              
              {/* Floating detail card */}
              <div className="absolute bottom-20 -left-8 bg-white text-[#0B3B5C] p-6 shadow-xl max-w-xs hidden md:block z-20">
                <p className="font-display font-bold text-lg mb-2">Precision Engineering</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Every project is executed with uncompromising attention to detail, ensuring safety and compliance beyond standards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-24 bg-neutral-50 border-t border-border/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#0B3B5C] mb-6">
            Begin Your Voyage
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discuss your marine engineering requirements with our principal architects. {COMMISSIONS_TEXT}
          </p>
          
          <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                type="email" 
                id="email"
                placeholder="Enter your email address" 
                className="w-full px-6 py-4 bg-white border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <button className="w-full py-4 bg-[#0B3B5C] text-white font-medium hover:bg-[#1A4B7A] transition-colors shadow-lg">
              Request Consultation
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

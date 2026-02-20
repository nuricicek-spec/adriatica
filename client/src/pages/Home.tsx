import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Footer } from "@/components/Footer";
import { ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-body selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
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
                Est. 1984
              </h2>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-[#0B3B5C] leading-[1.1] mb-8">
                Wisdom in <br />
                <span className="text-[#3A74A0]">Structure</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mb-10 border-l-2 border-primary/20 pl-6">
                Engineered for the deepest challenges. We combine ancient structural principles with cutting-edge marine technology to build vessels that endure.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-[#0B3B5C] text-white font-medium rounded-sm shadow-lg shadow-[#0B3B5C]/20 hover:shadow-xl hover:bg-[#1A4B7A] transition-all duration-300 uppercase tracking-wide text-sm">
                  Discover Our Fleet
                </button>
                <button className="px-8 py-4 bg-transparent border border-[#0B3B5C] text-[#0B3B5C] font-medium rounded-sm hover:bg-[#0B3B5C]/5 transition-all duration-300 uppercase tracking-wide text-sm">
                  View Projects
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
              title="Naval Architecture" 
              description="Designing hull forms that optimize hydrodynamic efficiency while maximizing stability in extreme sea states."
              delay={0.1}
            />
            <FeatureCard 
              number="02" 
              title="Structural Integrity" 
              description="Advanced material analysis ensures our vessels withstand the rigorous demands of deep-sea operations."
              delay={0.2}
            />
            <FeatureCard 
              number="03" 
              title="Propulsion Systems" 
              description="Integrating next-generation hybrid propulsion for reduced emissions without compromising power."
              delay={0.3}
            />
            <FeatureCard 
              number="04" 
              title="Offshore Logistics" 
              description="Comprehensive supply chain solutions for complex offshore installations and maintenance projects."
              delay={0.4}
            />
            <FeatureCard 
              number="05" 
              title="Sustainable Tech" 
              description="Pioneering the use of biodegradable lubricants and non-toxic hull coatings for ecosystem preservation."
              delay={0.5}
            />
            <FeatureCard 
              number="06" 
              title="Project Management" 
              description="End-to-end oversight from initial concept and dry-dock construction to final sea trials."
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
                title="The AdriaticA Standard" 
                subtitle="Philosophy"
                light={true}
                className="mb-8"
              />
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Just as the Sumerian pinecone symbolized the seed of life and wisdom, we view every engineering challenge as an opportunity to cultivate lasting value.
              </p>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                Our approach is reductive: we remove the unnecessary to reveal the essential structure. This architectural discipline results in marine vessels that are not only functional but resilient and timeless.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">40+</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Years Experience</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">120</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Vessels Delivered</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">$2B</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Project Value</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-[#3A74A0] mb-2">0</div>
                  <div className="text-sm uppercase tracking-wider text-white/60">Compromises</div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Unsplash image of ocean/structure */}
              {/* dark ocean waves abstract */}
              <div className="aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden relative shadow-2xl">
                 <img 
                   src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=1200&auto=format&fit=crop" 
                   alt="Ocean texture" 
                   className="object-cover w-full h-full opacity-60 mix-blend-overlay hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 border border-white/10 m-4 pointer-events-none" />
              </div>
              
              {/* Floating detail card */}
              <div className="absolute -bottom-8 -left-8 bg-white text-[#0B3B5C] p-6 shadow-xl max-w-xs hidden md:block">
                <p className="font-display font-bold text-lg mb-2">Precision Engineering</p>
                <p className="text-sm leading-relaxed text-muted-foreground">Every component is tested to withstand pressures 3x greater than operational maximums.</p>
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
            Discuss your marine engineering requirements with our principal architects. We are currently accepting commissions for Q3 2025.
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

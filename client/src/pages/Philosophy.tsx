import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";

// ─── Pinecone styles — component dışında sabit ───────────────────────────────
const PINECONE_STYLES = `
  .pc-wrap {
    width: 100%; height: 100%;
    background: linear-gradient(135deg, rgba(15,25,45,0.95) 0%, rgba(10,17,40,0.98) 100%);
    position: relative; overflow: hidden;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6),
                0 0 1px 1px rgba(212,175,55,0.2),
                inset 0 1px 0 rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
  }
  .pc-wrap::before {
    content: ''; position: absolute; inset: 0; padding: 2px;
    background: linear-gradient(135deg,
      rgba(212,175,55,0.4) 0%, rgba(201,169,97,0.2) 25%,
      rgba(27,58,107,0.3) 50%, rgba(212,175,55,0.4) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none; opacity: 0.6; transition: opacity 0.6s;
  }
  .pc-wrap:hover::before { opacity: 1; }
  .pc-svg {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0.88);
    width: 96%; height: 96%;
    transition: all 0.8s cubic-bezier(0.4,0,0.2,1);
    filter: drop-shadow(0 0 20px rgba(42,95,138,0.4));
  }
  .pc-wrap:hover .pc-svg {
    transform: translate(-50%, -50%) scale(0.92);
    filter: drop-shadow(0 0 30px rgba(42,95,138,0.6))
            drop-shadow(0 0 10px rgba(212,175,55,0.2));
  }
  .pc-svg polygon:nth-child(2)  { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(3)  { fill: #3A74A0; }
  .pc-svg polygon:nth-child(4)  { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(5)  { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(6)  { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(7)  { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(8)  { fill: #3A74A0; }
  .pc-svg polygon:nth-child(9)  { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(10) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(11) { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(12) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(13) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(14) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(15) { fill: #3A74A0; }
  .pc-svg polygon:nth-child(16) { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(17) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(18) { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(19) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(20) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(21) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(22) { fill: #3A74A0; }
  .pc-svg polygon:nth-child(23) { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(24) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(25) { fill: #2A5F8A; }
  .pc-svg polygon:nth-child(26) { fill: #1A4B7A; }
  .pc-svg polygon:nth-child(27) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(28) { fill: #0B3B5C; }
  .pc-svg polygon:nth-child(29) { fill: #3A74A0; }
  .pc-svg polygon:nth-child(30) { fill: #2A5F8A; }
  .pc-svg polygon { transition: fill 0.4s ease; }
  .pc-wrap:hover .pc-svg polygon:nth-child(6),
  .pc-wrap:hover .pc-svg polygon:nth-child(14),
  .pc-wrap:hover .pc-svg polygon:nth-child(22) {
    fill: #c9a961;
    filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));
  }
  .pc-label {
    position: absolute;
    background: linear-gradient(135deg, rgba(10,17,40,0.85), rgba(15,25,45,0.9));
    backdrop-filter: blur(12px); color: #e8e4d9;
    padding: 8px 14px; font-size: 11px; font-weight: 400;
    letter-spacing: 2px; text-transform: uppercase; opacity: 0.75;
    z-index: 10; transition: all 0.4s ease; font-family: 'Cinzel', serif;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  }
  .pc-wrap:hover .pc-label { opacity: 1; }
  .pc-label.tl { top: 24px; left: 24px; }
  .pc-label.tr { top: 24px; right: 24px; }
  .pc-label.bl { bottom: 90px; left: 24px; }
  .pc-label.br { bottom: 90px; right: 24px; }
  .pc-diamond {
    position: absolute; width: 42px; height: 60px;
    opacity: 0.8; z-index: 5; transition: all 0.5s ease;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  }
  .pc-wrap:hover .pc-diamond { opacity: 1; transform: scale(1.05); }
  .pc-diamond svg { width: 100%; height: 100%; }
  .pc-diamond.d1 { top: 54px; left: 28px; }
  .pc-diamond.d2 { top: 54px; right: 28px; }
  .pc-diamond.d3 { bottom: 118px; left: 28px; }
  .pc-diamond.d4 { bottom: 118px; right: 28px; }
  .pc-wrap:hover .pc-diamond.d2,
  .pc-wrap:hover .pc-diamond.d3 {
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4))
            drop-shadow(0 0 16px rgba(212,175,55,0.4));
  }
  .pc-bottom {
    position: absolute; bottom: 24px; width: 100%; text-align: center;
    color: #e8e4d9; font-size: 13px; letter-spacing: 4px; opacity: 0.85;
    z-index: 20; font-family: 'Cinzel', serif; font-weight: 600;
    text-shadow: 0 2px 8px rgba(0,0,0,0.5); transition: all 0.4s;
  }
  .pc-wrap:hover .pc-bottom {
    opacity: 1; letter-spacing: 5px;
    text-shadow: 0 2px 12px rgba(0,0,0,0.6), 0 0 20px rgba(212,175,55,0.3);
  }
  .pc-border {
    position: absolute; inset: 20px;
    border: 1px solid rgba(232,228,217,0.15);
    pointer-events: none; z-index: 25; transition: border-color 0.6s;
  }
  .pc-wrap:hover .pc-border {
    border-color: rgba(232,228,217,0.25);
    box-shadow: inset 0 0 20px rgba(232,228,217,0.05),
                0 0 30px rgba(42,95,138,0.2);
  }
  .pc-wrap::after {
    content: ''; position: absolute; top: 50%; left: 50%;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(42,95,138,0.15) 0%, transparent 70%);
    transform: translate(-50%, -50%); pointer-events: none;
    opacity: 0.5; transition: opacity 0.8s;
  }
  .pc-wrap:hover::after {
    opacity: 1; animation: pcPulse 3s ease-in-out infinite;
  }
  @keyframes pcPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.5; }
    50%       { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
  }
`;

// ─── Pinecone visual ──────────────────────────────────────────────────────────
function PineconeVisual() {
  return (
    <div className="aspect-[4/5] mx-auto max-w-sm lg:max-w-full">
      <style>{PINECONE_STYLES}</style>
      <div className="pc-wrap h-full">
        <div className="pc-svg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160" width="100%" height="100%">
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#D4AF37" stopOpacity="1" />
                <stop offset="50%"  stopColor="#C9A961" stopOpacity="1" />
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
        <div className="pc-label tl">Wisdom</div>
        <div className="pc-label tr">Resilience</div>
        <div className="pc-label bl">Renewal</div>
        <div className="pc-label br">Seed of Life</div>
        <div className="pc-diamond d1">
          <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="#0B3B5C" /></svg>
        </div>
        <div className="pc-diamond d2">
          <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="url(#goldGrad)" /></svg>
        </div>
        <div className="pc-diamond d3">
          <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="url(#goldGrad)" /></svg>
        </div>
        <div className="pc-diamond d4">
          <svg viewBox="0 0 18 26"><polygon points="9,0 18,13 9,26 0,13" fill="#1A4B7A" /></svg>
        </div>
        <div className="pc-bottom">SUMERIAN PINECONE</div>
        <div className="pc-border" />
      </div>
    </div>
  );
}

// ─── Stat item ────────────────────────────────────────────────────────────────
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-[#3A74A0]/40 pl-5">
      <div className="font-display text-4xl font-bold text-[#3A74A0] mb-1">{value}</div>
      <div className="text-xs uppercase tracking-widest text-white/50">{label}</div>
    </div>
  );
}

// ─── Principle item ───────────────────────────────────────────────────────────
function Principle({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative pl-8 border-l-2 border-primary/20"
    >
      <span className="absolute -left-px top-0 w-0.5 h-8 bg-primary/60" />
      <p className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-1 font-medium">
        {number}
      </p>
      <h3 className="font-display text-xl font-bold text-[#0B3B5C] mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Philosophy() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.adriaticadoo.com/#organization",
        "name": "Adriatica D.O.O.",
        "url": "https://www.adriaticadoo.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.adriaticadoo.com/logo.png",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.adriaticadoo.com/#website",
        "url": "https://www.adriaticadoo.com/",
        "name": "Adriatica D.O.O.",
        "inLanguage": "en",
        "publisher": { "@id": "https://www.adriaticadoo.com/#organization" },
      },
      {
        "@type": "AboutPage",
        "@id": "https://www.adriaticadoo.com/philosophy/#webpage",
        "url": "https://www.adriaticadoo.com/philosophy",
        "name": "Our Philosophy | Adriatica D.O.O.",
        "description":
          "The Adriatica D.O.O. standard: Wisdom, resilience, and precision in marine engineering. Discover the Sumerian pinecone symbolism and our reductive approach to structural integrity.",
        "isPartOf": { "@id": "https://www.adriaticadoo.com/#website" },
        "about": { "@id": "https://www.adriaticadoo.com/#organization" },
        "inLanguage": "en",
      },
    ],
  };

  return (
    <>
      <SEO
        title="Our Philosophy"
        description="The Adriatica D.O.O. standard: Wisdom, resilience, and precision in marine engineering. Discover the Sumerian pinecone symbolism and our reductive approach to structural integrity."
        canonical="https://www.adriaticadoo.com/philosophy"
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&display=swap"
        />
        <script type="application/ld+json">
          {JSON.stringify(schema).replace(/</g, "\\u003c")}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body selection:bg-primary/20">
        <Navigation />

        <main>

          {/* ── HERO ────────────────────────────────────────────────────────── */}
          <section className="relative pt-40 pb-24 overflow-hidden bg-background">
            {/* Arka plan kırılma efekti — Home'daki hero ile aynı dil */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/5 -skew-x-12 transform origin-top" />
              <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#0B3B5C]/5 skew-x-12 transform origin-bottom" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-3xl"
              >
                <p className="text-primary font-medium tracking-[0.2em] uppercase text-sm mb-4">
                  Adriatica D.O.O. Standard
                </p>
                <h1 className="font-display text-5xl md:text-7xl font-bold text-[#0B3B5C] leading-[1.05] mb-6 uppercase">
                  WISDOM IN<br />
                  <span className="text-[#3A74A0]">ENGINEERING</span>
                </h1>
                <div className="w-16 h-0.5 bg-primary/30 mb-6" />
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Our philosophy is not a statement — it is a method. Every project is shaped by the same principles that have governed enduring structures for millennia: remove the unnecessary, strengthen the essential, and build for what outlasts you.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── SYMBOL + PRINCIPLES ─────────────────────────────────────────── */}
          <section className="py-24 bg-neutral-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                {/* Sol: Pinecone */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <PineconeVisual />
                  <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mt-4">
                    The Sumerian Pinecone — Symbol of Wisdom & Renewal
                  </p>
                </motion.div>

                {/* Sağ: Prenspler */}
                <div className="flex flex-col gap-10 lg:pt-4">
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-primary/60 mb-3 font-medium">
                      The Symbol
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      The Sumerian pinecone is one of the oldest symbols of human civilisation — representing wisdom accumulated over generations, the resilience of natural structures, and the seed of future growth. We chose it deliberately: engineering, at its best, carries the same qualities.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 gap-8">
                    <Principle
                      number="01"
                      title="Reductive Clarity"
                      body="We remove the unnecessary to reveal the essential structure. Complexity is not a sign of expertise — the ability to simplify without loss is."
                      delay={0.1}
                    />
                    <Principle
                      number="02"
                      title="Uncompromising Precision"
                      body="Every drawing, every plan, every calculation carries our name. We do not approximate where exactness is achievable."
                      delay={0.2}
                    />
                    <Principle
                      number="03"
                      title="Integrity Over Convenience"
                      body="We do not recommend what is easiest to deliver. We recommend what is right for the vessel, the owner, and the sea."
                      delay={0.3}
                    />
                    <Principle
                      number="04"
                      title="Engineering for Longevity"
                      body="Ships are not disposable. Neither is the work we put into them. Every solution is designed to outlast the project that requires it."
                      delay={0.4}
                    />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── DARK BANNER — The Standard ──────────────────────────────────── */}
          <section className="relative py-24 bg-[#0B3B5C] text-white overflow-hidden">
            {/* Arka plan geometrisi */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-2/3 h-full bg-[#1A4B7A]/10 -skew-x-12 transform origin-top" />
              <div className="absolute inset-0 opacity-10">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 100 L100 0 L100 100 Z" fill="white" />
                </svg>
              </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Sol: Metin */}
                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-white/50 mb-4">
                    The Adriatica Standard
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    Align.<br />
                    Execute.<br />
                    Verify.
                  </h2>
                  <p className="text-white/75 leading-relaxed mb-4 text-lg">
                    Our Integrity Cycle is not a marketing phrase. It is the operational sequence we follow on every engagement — from the first technical brief to the final handover document.
                  </p>
                  <p className="text-white/75 leading-relaxed">
                    Precision is not just a method — it is our philosophy. Every project is executed with uncompromising attention to detail, ensuring safety and compliance beyond what standards require.
                  </p>
                </motion.div>

                {/* Sağ: İstatistikler */}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="grid grid-cols-2 gap-10"
                >
                  <Stat value="20+" label="Years Experience" />
                  <Stat value="25+" label="Clients Worldwide" />
                  <Stat value="8+"  label="Countries" />
                  <Stat value="0"   label="Compromises" />
                </motion.div>

              </div>
            </div>
          </section>

          {/* ── CLOSING CTA ─────────────────────────────────────────────────── */}
          <section className="py-20 bg-background border-t border-border/10">
            <div className="max-w-3xl mx-auto px-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs uppercase tracking-[0.25em] text-primary/60 mb-4">
                  Ready to work together?
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0B3B5C] mb-6">
                  Engineering clarity for the Adriatic.
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  If our standard matches what you expect from a technical partner, we would be glad to hear about your vessel and your challenge.
                </p>
                <a
                  href="/request-consultation"
                  className="inline-block bg-[#0B3B5C] text-white px-8 py-4 rounded-sm font-medium text-sm uppercase tracking-wide hover:bg-[#1A4B7A] transition-all duration-300 shadow-lg"
                >
                  Request Consultatio
                </a>
              </motion.div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
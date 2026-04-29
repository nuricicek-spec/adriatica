import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOOLS_DATA = [
  {
    href: "/tools?tool=eexi",
    title: "EEXI Calculator",
    desc: "Evaluate vessel's Energy Efficiency Existing Ship Index compliance.",
  },
  {
    href: "/tools?tool=cii",
    title: "CII Rating Tool",
    desc: "Estimate Carbon Intensity Indicator rating and operational impact.",
  },
  {
    href: "/tools?tool=bwts",
    title: "BWTS Compliance",
    desc: "Check ballast water treatment system compliance and retrofit needs.",
  },
  {
    href: "/tools?tool=ets",
    title: "EU ETS Cost",
    desc: "Forecast vessel's carbon allowance costs under EU ETS.",
  },
  {
    href: "/tools?tool=fueleu",
    title: "FuelEU Penalty",
    desc: "Assess potential penalties under FuelEU Maritime regulation.",
  },
];

export default function ToolsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const itemsPerPage = isMobile ? 1 : 3;
  const maxIndex = Math.max(0, TOOLS_DATA.length - itemsPerPage);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slidePercentage = currentIndex * (100 / itemsPerPage);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        next();
      } else {
        prev();
      }
    }
  };

  return (
    <section className="py-20 bg-neutral-50 border-b border-border/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-primary/70 mb-3">
            Free Compliance Tools
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
            Identify Compliance Risks Before Inspection
          </h2>
          <p className="text-foreground/75 max-w-2xl mx-auto">
            Most risks are silent — find them before the inspector does.
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            onClick={prev}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Previous tool"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-border rounded-full shadow-lg items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200"
            aria-label="Next tool"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            className="overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${slidePercentage}%)` }}
            >
              {TOOLS_DATA.map((tool) => (
                <div
                  key={tool.href}
                  className={`flex-shrink-0 ${isMobile ? "w-full" : "w-1/3"}`}
                >
                  <Link
                    href={tool.href}
                    className="group flex flex-col h-full p-6 md:p-8 mx-1 md:mx-2 border border-border hover:border-primary transition-all duration-300 bg-white rounded-sm"
                  >
                    <h3 className="text-lg font-bold text-primary mb-2 group-hover:underline decoration-2 underline-offset-4">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-foreground/70 leading-relaxed flex-1">
                      {tool.desc}
                    </p>
                    <span className="inline-flex items-center self-start px-3 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200 mt-6">
                      Run Assessment →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === i
                    ? "bg-primary w-6" 
                    : "bg-neutral-300 hover:bg-neutral-400 w-2.5" 
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { Link } from "wouter";
import type { Insight } from "@/data/insights";

interface InsightCardProps {
  insight: Insight;
  /** dark: lacivert arka planda (Home), light: beyaz arka planda (Insights listesi) */
  variant?: "dark" | "light";
}

export function InsightCard({ insight, variant = "light" }: InsightCardProps) {
  const isDark = variant === "dark";

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className={`
        block group rounded-sm border transition-all duration-300 hover:-translate-y-1
        ${isDark
          ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:shadow-xl"
          : "bg-white border-border/40 hover:shadow-lg hover:border-primary/20"
        }
      `}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Kategori etiketi */}
        <div className="mb-3">
          <span
            className={`
              text-xs font-medium uppercase tracking-widest px-2.5 py-1 rounded-sm
              ${isDark
                ? "bg-[#3A74A0]/30 text-[#C8D6E5]"
                : "bg-primary/10 text-primary"
              }
            `}
          >
            {insight.category}
          </span>
        </div>

        {/* Başlık */}
        <h3
          className={`
            font-display text-lg font-bold leading-snug mb-3 transition-colors
            ${isDark
              ? "text-white group-hover:text-[#D4AF37]"
              : "text-[#0B3B5C] group-hover:text-primary"
            }
          `}
        >
          {insight.title}
        </h3>

        {/* Açıklama */}
        <p
          className={`
            text-sm leading-relaxed mb-4 flex-1 line-clamp-3
            ${isDark ? "text-white/60" : "text-muted-foreground"}
          `}
        >
          {insight.description}
        </p>

        {/* Alt bilgi: tarih + okuma süresi + link */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-opacity-10"
          style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)" }}
        >
          <div
            className={`flex items-center gap-2 text-xs ${isDark ? "text-white/40" : "text-muted-foreground"}`}
          >
            <span>{new Date(insight.date).toLocaleDateString("en-GB")}</span>
            <span>·</span>
            <span>{insight.readTime} min read</span>
          </div>
          <span
            className={`
              text-xs font-medium uppercase tracking-wider transition-colors
              ${isDark
                ? "text-[#D4AF37] group-hover:text-white"
                : "text-primary group-hover:text-primary/70"
              }
            `}
          >
            Read →
          </span>
        </div>
      </div>
    </Link>
  );
}
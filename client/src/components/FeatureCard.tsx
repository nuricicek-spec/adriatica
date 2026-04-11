import { motion } from "framer-motion";
import { HashLink } from "@/components/HashLink";
import { ArrowRight, ExternalLink } from "lucide-react";

interface FeatureCardProps {
  number: string;
  title: string;
  items?: string[];
  delay?: number;
  linkTo?: string;
  linkText?: string;
  isDeliverable?: boolean; // true = somut çıktı, false = danışmanlık
}

export function FeatureCard({
  number,
  title,
  items,
  delay = 0,
  linkTo,
  linkText,
  isDeliverable = true,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-8 bg-white border border-border/40 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 h-full"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 font-display text-6xl font-bold text-primary select-none group-hover:opacity-20 transition-opacity">
        {number}
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Başlık satırı – ikon + başlık yan yana */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {isDeliverable ? (
            <span title="Includes structured technical outputs (plans, documents, reports)">
              <ArrowRight className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
            </span>
          ) : (
            <span title="Advisory and technical guidance (compliance, strategy, project management)">
              <ExternalLink className="w-5 h-5 text-primary/60 group-hover:text-primary transition-colors" />
            </span>
          )}
        </div>

        {items && items.length > 0 && (
          <ul className="space-y-2 mb-4">
            {items.map((item, idx) => (
              <li key={idx} className="flex items-start text-sm text-muted-foreground/80">
                <span className="mr-2 text-primary/40 mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {linkTo && (
          <div className="mt-auto pt-4">
            <HashLink
              href={`/services/${linkTo}`}
              className="inline-flex items-center gap-1 text-primary hover:underline text-sm font-medium transition-colors"
            >
              {linkText || "Learn more"} <ArrowRight className="w-4 h-4" />
            </HashLink>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}
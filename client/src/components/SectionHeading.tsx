import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export function SectionHeading({ title, subtitle, className, light = false }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-20", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={cn(
          "font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4",
          light ? "text-white" : "text-primary"
        )}>
          {title}
        </h2>
        {subtitle && (
          <div className="flex items-center gap-4">
            <div className={cn("h-px w-12", light ? "bg-white/30" : "bg-primary/30")}></div>
            <p className={cn(
              "text-lg font-light tracking-wide uppercase",
              light ? "text-white/80" : "text-muted-foreground"
            )}>
              {subtitle}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

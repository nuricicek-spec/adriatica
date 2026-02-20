import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({ number, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-8 bg-white border border-border/40 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 font-display text-6xl font-bold text-primary select-none group-hover:opacity-20 transition-opacity">
        {number}
      </div>
      
      <div className="relative z-10 h-full flex flex-col">
        <div className="h-12 w-12 mb-6 bg-primary/5 flex items-center justify-center rounded-sm text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
           {/* Icon placeholder or dynamic icon could go here */}
           <div className="w-1.5 h-1.5 bg-current rounded-full" />
        </div>

        <h3 className="text-xl font-display font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
          {description}
        </p>

        <div className="flex items-center text-sm font-medium text-primary uppercase tracking-wider group-hover:translate-x-2 transition-transform duration-300">
          Explore <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
}

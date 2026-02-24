import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Expertise", href: "/#expertise" },
    { name: "Insights", href: "/insights" },
    { name: "About Us", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-4 shadow-sm border-border/10"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-105" 
            />
            <span className="font-display font-bold text-xl tracking-widest text-primary uppercase">
              ADRIATICA D.O.O.
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium tracking-wide hover:text-primary/70 transition-colors uppercase"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Inquire
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/10 shadow-xl py-4 px-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium py-2 border-b border-border/5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium mt-4">
            Inquire Now
          </button>
        </div>
      )}
    </nav>
  );
}

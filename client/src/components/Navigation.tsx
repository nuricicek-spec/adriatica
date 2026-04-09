import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { HashLink } from "@/components/HashLink";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled]         = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobil menü açıkken body scroll'u engelle
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Services",     href: "/services"      },
    { name: "Deliverables", href: "/deliverables"   },
    { name: "Insights",     href: "/insights"       },
    { name: "Case Studies", href: "/case-studies"   },
    { name: "About",        href: "/about"          },
    { name: "Contact",      href: "/#begin-voyage"  },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleInquireClick = () => {
    setLocation("/request-consultation");
    closeMenu();
  };

  return (
    <>
      {/* Overlay — nav dışında, kendi stacking context'inde */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

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

            {/* Logo */}
            <HashLink href="/" className="flex items-center space-x-3 group">
              <img
                src="/logo.svg"
                alt="Adriatica D.O.O. Logo"
                className="h-10 w-auto transition-transform duration-500 group-hover:scale-105"
                width="40"
                height="40"
              />
              <span className="font-display font-bold text-xl tracking-widest text-primary uppercase">
                ADRIATICA D.O.O.
              </span>
            </HashLink>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(link => (
                <HashLink
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium tracking-wide hover:text-primary/70 transition-colors uppercase"
                >
                  {link.name}
                </HashLink>
              ))}
              <button
                onClick={handleInquireClick}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-sm font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Request Consultation
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
                className="text-primary p-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={cn(
            "md:hidden absolute top-full left-0 w-full z-50 bg-background border-b border-border/10 shadow-xl py-4 px-4 flex flex-col space-y-4 transition-all duration-200",
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          )}
        >
          {navLinks.map(link => (
            <HashLink
              key={link.name}
              href={link.href}
              className="text-lg font-medium py-2 border-b border-border/5"
              onClick={closeMenu}
            >
              {link.name}
            </HashLink>
          ))}
          <button
            onClick={handleInquireClick}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-sm font-medium mt-4"
          >
            Request Consultation
          </button>
        </div>
      </nav>
    </>
  );
}
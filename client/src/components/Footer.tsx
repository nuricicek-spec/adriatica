import { HashLink } from "@/components/HashLink";
import { Instagram, Facebook, Linkedin, ExternalLink } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleClientAccess = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  return (
    <footer id="footer" className="bg-[#0B3B5C] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Bölüm: 3 Sütun */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b border-white/10 pb-16">
          {/* Sol Sütun: Logo + Slogan + Adres + İletişim + Sosyal */}
          <div className="md:col-span-5">
            <HashLink href="/" className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.svg"
                alt="Adriatica D.O.O. Logo"
                width="32"
                height="32"
                className="brightness-0 invert"
              />
              <span className="font-display font-bold text-lg tracking-widest uppercase">
                ADRIATICA D.O.O.
              </span>
            </HashLink>
            <p className="text-[#C8D6E5] text-sm italic mb-4">
              Engineering clarity for the Adriatic.
            </p>
            <div className="text-[#C8D6E5] text-sm space-y-3 mb-5">
              <p className="flex items-start gap-2">
                <span className="shrink-0">📍</span>
                <span>Adriatic Coast & Montenegro</span>
              </p>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 mb-0.5">
                  Address
                </p>
                <p>Budva, Montenegro</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-white/50 mb-0.5">
                  Contact
                </p>
                <p>
                  <a
                    href="mailto:info@adriaticadoo.com"
                    className="hover:text-white transition-colors"
                  >
                    info@adriaticadoo.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <a
                href="#"
                aria-label="Adriatica D.O.O. on Facebook"
                className="text-[#e8e4d9] hover:text-[#1877F2] transition-all duration-300 hover:-translate-y-1"
              >
                <Facebook size={18} aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Adriatica D.O.O. on Instagram"
                className="text-[#e8e4d9] hover:text-[#E1306C] transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/company/adriatica-d-o-o"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Adriatica D.O.O. on LinkedIn"
                className="text-[#e8e4d9] hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1"
              >
                <Linkedin size={18} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Explore Sütunu */}
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-lg mb-5">Explore</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Deliverables", href: "/deliverables" },
                { name: "Insights", href: "/insights" },
                { name: "Case Studies", href: "/case-studies" },
              ].map((item) => (
                <li key={item.name}>
                  <HashLink
                    href={item.href}
                    className="text-[#C8D6E5] hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Butonlar Sütunu */}
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-5">Company</h3>
                <ul className="space-y-3">
                  {[
                    { name: "About", href: "/about" },
                    { name: "Careers", href: "/careers" },
                    { name: "News", href: "/news" },
                  ].map((item) => (
                    <li key={item.name}>
                      <HashLink
                        href={item.href}
                        className="text-[#C8D6E5] hover:text-white transition-colors text-sm"
                      >
                        {item.name}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-3">
                <HashLink
                  href="/request-consultation"
                  className="inline-block bg-[#D4AF37] text-black font-medium px-5 py-2.5 rounded-sm text-sm uppercase tracking-wide shadow-lg hover:bg-[#C9A961] transition-all duration-300 text-center"
                >
                  Request Consultation
                </HashLink>
                <button
                  onClick={handleClientAccess}
                  className="inline-flex items-center justify-center gap-1 border border-white/30 text-white font-medium px-5 py-2.5 rounded-sm text-sm uppercase tracking-wide hover:bg-white/10 transition-all duration-300"
                >
                  Client Access <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Şerit */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-center gap-5 text-sm text-[#C8D6E5]">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <p>© 2026 ADRIATICA D.O.O. All rights reserved.</p>
          </div>

          <div className="order-1 lg:order-2 flex flex-wrap justify-center items-center gap-5">
            <a
              href="https://www.imo.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IMO"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/imo_logo.png"
                alt="IMO"
                width="93"
                height="40"
                className="h-10 w-auto bg-white/10 rounded-sm p-0.5"
              />
            </a>
            <a
              href="https://www.parismou.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paris MoU"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/parismou-logo.png"
                alt="Paris MoU"
                width="182"
                height="40"
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://helcom.fi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HELCOM"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/helcom_logo.png"
                alt="HELCOM"
                width="41"
                height="40"
                className="h-10 w-auto"
              />
            </a>
            <a
              href="https://www.gov.me/uprava-pomorske-sigurnosti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Montenegro MSA"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/me-flag-round-circle-icon.svg"
                alt="Montenegro MSA"
                width="40"
                height="40"
                className="h-10 w-10"
              />
            </a>
            <a
              href="https://www.emsa.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMSA"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/eu-union-flag-round-circle-icon.svg"
                alt="EMSA"
                width="40"
                height="40"
                className="h-10 w-10"
              />
            </a>
          </div>

          <div className="order-3 flex flex-wrap justify-center gap-x-5 gap-y-1">
            <HashLink
              href="/privacy-policy"
              className="hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </HashLink>
            <span className="text-white/30">·</span>
            <HashLink
              href="/terms-of-service"
              className="hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </HashLink>
            <span className="text-white/30">·</span>
            <HashLink
              href="/cookie-policy"
              className="hover:text-white transition-colors text-sm"
            >
              Cookie Policy
            </HashLink>
          </div>
        </div>
      </div>

      {showComingSoon && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A4B7A] text-white px-6 py-3 rounded-sm shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          Client Portal — Coming Soon
        </div>
      )}
    </footer>
  );
}
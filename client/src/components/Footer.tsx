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
    <footer id="footer" className="bg-[#0B3B5C] text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Üst Bölüm: 4 Sütun */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b border-white/10 pb-16">
          
          {/* Sol Sütun: Logo + İletişim + Sosyal + Buton */}
          <div className="md:col-span-5">
            <HashLink href="/" className="flex items-center space-x-3 mb-5">
              <img
                src="/logo.svg"
                alt="Adriatica D.O.O. Logo"
                width="36"
                height="36"
                className="brightness-0 invert"
              />
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                ADRIATICA D.O.O.
              </span>
            </HashLink>
            <p className="text-[#C8D6E5] leading-relaxed mb-5 max-w-md">
              Supporting yacht and commercial vessel operations across engineering,
              compliance, and technical project management.
            </p>
            <div className="text-[#C8D6E5] text-sm space-y-1 mb-6">
              <p>📍 Serving the Montenegro Bay & Adriatic Coast</p>
              <p>
                <a
                  href="mailto:info@adriaticadoo.com"
                  className="hover:text-white transition-colors"
                >
                  info@adriaticadoo.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+38268591757"
                  className="hover:text-white transition-colors"
                >
                  +382 68 591 757
                </a>
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {/* Sosyal Medya */}
              <div className="flex gap-3 items-center">
                <a
                  href="#"
                  aria-label="Adriatica D.O.O. on Facebook"
                  className="text-[#e8e4d9] hover:text-[#1877F2] transition-all duration-300 hover:-translate-y-1"
                >
                  <Facebook size={20} aria-hidden="true" />
                </a>
                <a
                  href="#"
                  aria-label="Adriatica D.O.O. on Instagram"
                  className="text-[#e8e4d9] hover:text-[#E1306C] transition-all duration-300 hover:-translate-y-1"
                >
                  <Instagram size={20} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/adriatica-d-o-o"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Adriatica D.O.O. on LinkedIn"
                  className="text-[#e8e4d9] hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1"
                >
                  <Linkedin size={20} aria-hidden="true" />
                </a>
              </div>
              {/* Request Consultation Butonu */}
              <HashLink
                href="/request-consultation"
                className="inline-block bg-[#D4AF37] text-black font-medium px-5 py-2.5 rounded-sm text-sm uppercase tracking-wide shadow-lg hover:bg-[#C9A961] transition-all duration-300"
              >
                Request Consultation
              </HashLink>
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

          {/* Company Sütunu */}
          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-lg mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { name: "About", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "News", href: "/news" },
                { name: "Client Access", href: "#", isButton: true },
              ].map((item) => (
                <li key={item.name}>
                  {item.isButton ? (
                    <button
                      onClick={handleClientAccess}
                      className="text-[#C8D6E5] hover:text-white transition-colors text-sm flex items-center gap-1"
                    >
                      {item.name} <ExternalLink size={12} />
                    </button>
                  ) : (
                    <HashLink
                      href={item.href}
                      className="text-[#C8D6E5] hover:text-white transition-colors text-sm"
                    >
                      {item.name}
                    </HashLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Sütunu */}
          <div className="md:col-span-3">
            <h3 className="font-display font-bold text-lg mb-5">Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms-of-service" },
                { name: "Cookie Policy", href: "/cookie-policy" },
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
        </div>

        {/* Alt Şerit: Copyright + Logolar + Legal Linkler */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-center gap-5 text-sm text-[#C8D6E5]">
          {/* Sol: Copyright */}
          <div className="order-2 lg:order-1">
            <p>© 2026 ADRIATICA D.O.O. All rights reserved.</p>
          </div>

          {/* Orta: Logolar */}
          <div className="order-1 lg:order-2 flex flex-wrap justify-center items-center gap-4">
            <a
              href="https://www.imo.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IMO – International Maritime Organization"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/imo_logo.png"
                alt="IMO"
                width={70}
                height={30}
                className="h-7 w-auto bg-white/10 rounded-sm p-0.5"
              />
            </a>
            <a
              href="https://www.parismou.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Paris MoU on Port State Control"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/parismou-logo.png"
                alt="Paris MoU"
                width={130}
                height={30}
                className="h-7 w-auto"
              />
            </a>
            <a
              href="https://helcom.fi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HELCOM – Baltic Marine Environment Protection Commission"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/helcom_logo.png"
                alt="HELCOM"
                width={30}
                height={30}
                className="h-7 w-auto"
              />
            </a>
            <a
              href="https://www.gov.me/uprava-pomorske-sigurnosti"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Montenegro Maritime Safety Administration"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/me-flag-round-circle-icon.svg"
                alt="Montenegro MSA"
                width={30}
                height={30}
                className="h-7 w-7"
              />
            </a>
            <a
              href="https://www.emsa.europa.eu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="EMSA – European Maritime Safety Agency"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/eu-union-flag-round-circle-icon.svg"
                alt="EMSA"
                width={30}
                height={30}
                className="h-7 w-7"
              />
            </a>
          </div>

          {/* Sağ: Legal Linkler (tekrarlı, alt şeritte) */}
          <div className="order-3 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
            <HashLink
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </HashLink>
            <span className="text-white/30">·</span>
            <HashLink
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </HashLink>
            <span className="text-white/30">·</span>
            <HashLink
              href="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </HashLink>
          </div>
        </div>
      </div>

      {/* Coming Soon Popup */}
      {showComingSoon && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A4B7A] text-white px-6 py-3 rounded-sm shadow-xl text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          Client Portal — Coming Soon
        </div>
      )}
    </footer>
  );
}
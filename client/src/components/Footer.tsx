import { HashLink } from "@/components/HashLink";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0B3B5C] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main grid - unchanged */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-4">
            <HashLink href="/" className="flex items-center space-x-3 mb-6">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                ADRIATICA D.O.O.
              </span>
            </HashLink>
            <p className="text-white/60 leading-relaxed mb-4 max-w-sm">
              Pioneering marine engineering solutions inspired by ancient wisdom and driven by modern innovation.
            </p>
            <div className="text-white/60 text-sm space-y-1 mb-6">
              <p>📍 Serving the Montenegro Bay & Adriatic Coast</p>
              <p>info@adriaticadoo.me</p>
              <p>+382 68 591 757</p>
            </div>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-[#e8e4d9] hover:text-[#1877F2] transition-all duration-300 hover:-translate-y-1">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#e8e4d9] hover:text-[#E1306C] transition-all duration-300 hover:-translate-y-1">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#e8e4d9] hover:text-[#0077b5] transition-all duration-300 hover:-translate-y-1">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-display font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'Insights', href: '/insights' },
                { name: 'Case Studies', href: '/case-studies' }
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About', href: '/#philosophy' },
                { name: 'Careers', href: '/careers' },
                { name: 'News', href: '/news' },
                { name: 'Contact', href: '/#begin-voyage' }
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
                { name: 'Cookie Policy', href: '/cookie-policy' }
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row: copyright | logos with label | location */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <div>
            <p>© 2026 ADRIATICA D.O.O. All rights reserved.</p>
          </div>

          <div className="text-center">
            <p className="text-white/40 text-xs mb-2">Regulatory framework</p>
            <div className="flex flex-wrap justify-center items-center gap-6">
              <a
                href="https://www.imo.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/logos/imo_logo.png"
                  alt="IMO"
                  className="h-8 w-auto bg-white/10 rounded-sm p-0.5"
                />
              </a>
              <a
                href="https://www.parismou.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/logos/parismou-logo.png"
                  alt="Paris MoU"
                  className="h-8 w-auto"
                />
              </a>
              <a
                href="https://www.gov.me/uprava-pomorske-sigurnosti"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/logos/me-flag-round-circle-icon.svg"
                  alt="Montenegro Maritime Authority"
                  className="h-8 w-8"
                />
              </a>
              <a
                href="https://www.emsa.europa.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/logos/eu-union-flag-round-circle-icon.svg"
                  alt="European Union"
                  className="h-8 w-8"
                />
              </a>
            </div>
          </div>

          <div>
            <span>Podgorica, Montenegro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
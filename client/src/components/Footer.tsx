import { HashLink } from "@/components/HashLink";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer id="footer" className="bg-[#0B3B5C] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          <div className="md:col-span-4">
            <HashLink href="/" className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.svg" 
                alt="Adriatica D.O.O. Logo" 
                width="30" 
                height="48" 
                className="brightness-0 invert" 
              />
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                ADRIATICA D.O.O.
              </span>
            </HashLink>
            <p className="text-[#C8D6E5] leading-relaxed mb-4 max-w-sm">
              Supporting yacht and commercial vessel operations across engineering, compliance, and technical project management.
            </p>
            <div className="text-[#C8D6E5] text-sm space-y-1 mb-6">
              <p>📍 Serving the Montenegro Bay &amp; Adriatic Coast</p>
              <p>
                <a href="mailto:info@adriaticadoo.com" className="hover:text-white transition-colors">
                  info@adriaticadoo.com
                </a>
              </p>
              <p>
                <a href="tel:+38268591757" className="hover:text-white transition-colors">
                  +382 68 591 757
                </a>
              </p>
            </div>
            <div className="flex gap-4 items-center">
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
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h3 className="font-display font-bold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'Deliverables', href: '/deliverables' },
                { name: 'Insights', href: '/insights' },
                { name: 'Case Studies', href: '/case-studies' },
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-[#C8D6E5] hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              {[
                { name: 'About', href: '/about' },
                { name: 'Careers', href: '/careers' },
                { name: 'News', href: '/news' },
                { name: 'Contact', href: '/#begin-voyage' },
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-[#C8D6E5] hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-display font-bold text-lg mb-6">Legal</h3>
            <ul className="space-y-4">
              {[
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
                { name: 'Cookie Policy', href: '/cookie-policy' },
              ].map(item => (
                <li key={item.name}>
                  <HashLink href={item.href} className="text-[#C8D6E5] hover:text-white transition-colors text-sm">
                    {item.name}
                  </HashLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[#C8D6E5]">
          <p>© 2026 ADRIATICA D.O.O. All rights reserved.</p>

          <div className="flex flex-wrap justify-center items-center gap-6">
            <a
              href="https://www.imo.org"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="IMO – International Maritime Organization"
              className="hover:opacity-80 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/logos/imo_logo.png"
                alt="IMO – International Maritime Organization"
                width={93}
                height={40}
                className="h-10 w-auto bg-white/10 rounded-sm p-0.5"
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
                alt="Paris MoU on Port State Control"
                width={182}
                height={40}
                className="h-10 w-auto"
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
                alt="HELCOM – Baltic Marine Environment Protection Commission"
                width={41}
                height={40}
                className="h-10 w-auto"
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
                alt="Montenegro Maritime Safety Administration"
                width={40}
                height={40}
                className="h-10 w-10"
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
                alt="EMSA – European Maritime Safety Agency"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </a>
          </div>

          <span>Podgorica, Montenegro</span>
        </div>
      </div>
    </footer>
  );
}
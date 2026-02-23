import { Link } from "wouter";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0B3B5C] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                ADRIATICA D.O.O.
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed mb-4 max-w-sm">
              Pioneering marine engineering solutions inspired by ancient wisdom and driven by modern innovation.
            </p>
            <div className="text-white/60 text-sm space-y-1 mb-6">
              <p>📍 Serving the Montenegro Bay & Adriatic Coast</p>
              <p>info@adriatica.me (mock)</p>
              <p>+382 59 123 456 (mock)</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-[#E4405F] hover:opacity-80 transition-opacity">
                <div className="bg-white rounded-md p-0.5">
                  <Instagram size={20} />
                </div>
              </a>
              <a href="#" className="text-[#1877F2] hover:opacity-80 transition-opacity">
                <Facebook size={20} fill="#1877F2" />
              </a>
              <a href="#" className="text-[#0A66C2] hover:opacity-80 transition-opacity">
                <Linkedin size={20} fill="#0A66C2" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-display font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Expertise', href: '/#expertise' },
                { name: 'Sustainability', href: '#sustainability' }
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Us', href: '/#about' },
                { name: 'Careers', href: '/careers' },
                { name: 'News', href: '/news' },
                { name: 'Contact', href: '/#contact' }
              ].map(item => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
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
                  <Link href={item.href} className="text-white/60 hover:text-white transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2026 ADRIATICA D.O.O. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span>Podgorica, Montenegro</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

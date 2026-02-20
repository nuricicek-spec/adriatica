import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-[#0B3B5C] text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <img src="/logo.svg" alt="Logo" className="h-12 w-auto brightness-0 invert" />
              <span className="font-display font-bold text-2xl tracking-widest uppercase">
                AdriaticA Doo
              </span>
            </Link>
            <p className="text-white/60 leading-relaxed mb-8 max-w-sm">
              Pioneering marine engineering solutions inspired by ancient wisdom and driven by modern innovation.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-display font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Expertise', 'Projects', 'Fleet', 'Sustainability'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'News', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-display font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2024 AdriaticA Doo Marine Engineering. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
             <span>London</span>
             <span>Singapore</span>
             <span>Rotterdam</span>
             <span>Houston</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

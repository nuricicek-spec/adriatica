import { useState, useEffect } from 'react';
import { HashLink } from './HashLink';

export function CookieConsent() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);

  useEffect(() => {
    // Başlangıçta localStorage kontrolü
    const saved = localStorage.getItem('cookie-consent');
    if (saved === 'accepted' || saved === 'rejected') {
      setConsentGiven(saved === 'accepted');
      if (saved === 'accepted') loadGA4();
    } else {
      setConsentGiven(false);
    }
  }, []);

  const loadGA4 = () => {
    // Eğer zaten yüklenmişse tekrar yükleme
    if (document.querySelector('script[src*="googletagmanager.com/gtag/js?id=G-WPWD3K7JHR"]')) return;
    // GA4 script'ini dinamik olarak yükle
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-WPWD3K7JHR';
    script.async = true;
    document.head.appendChild(script);
    // gtag fonksiyonunu tanımla
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-WPWD3K7JHR');
  };

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setConsentGiven(true);
    loadGA4();
  };

  const reject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setConsentGiven(true);
  };

  // Eğer kullanıcı zaten karar verdiyse banner'ı gösterme
  if (consentGiven !== false) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0B3B5C]/95 backdrop-blur-sm text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-center sm:text-left">
          We use cookies to improve your experience. By using our site, you accept our{' '}
          <HashLink href="/cookie-policy" className="underline hover:text-[#D4AF37] transition">
            Cookie Policy
          </HashLink>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={accept}
            className="px-4 py-2 bg-[#D4AF37] text-[#0B3B5C] rounded-sm font-medium hover:bg-[#C9A961] transition"
          >
            Accept
          </button>
          <button
            onClick={reject}
            className="px-4 py-2 bg-white/10 border border-white/30 rounded-sm hover:bg-white/20 transition"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
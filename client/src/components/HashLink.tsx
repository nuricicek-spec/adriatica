import { useLocation } from "wouter";

interface HashLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function HashLink({ href, children, className, onClick }: HashLinkProps) {
  const [location, setLocation] = useLocation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const [path, hash] = href.split('#');
    const targetPath = path || '/';
    const currentPath = location || '/';

    if (targetPath === currentPath) {
      if (hash) {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (href === '/') {
        // Logo tıklandığında ve ana sayfadaysak en tepeye kaydır
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setLocation(targetPath + (hash ? `#${hash}` : ''));
      setTimeout(() => {
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }

    onClick?.();
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
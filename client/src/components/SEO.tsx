import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

const defaultTitle = "Adriatica D.O.O. - Marine Engineering & Consultancy";
const defaultDescription = "Adriatica D.O.O. - Marine engineering consultancy specializing in structural integrity, regulatory compliance, and sustainable technologies. Serving Montenegro, Adriatic Coast, and European maritime industry.";
const defaultKeywords = "marine engineering, naval architecture, ship design, structural analysis, yacht design, yacht refit, new building, shipyard, Montenegro, Adriatic Coast, European Coast, marine industry, regulatory compliance, IHM, BWMP, SEEMP, P&ID, electrical load analysis, vibration diagnostics, Montenegro shipyard, Adriatic shipbuilding";
const defaultOgImage = "og-image-default.png"; // Varsayılan Open Graph görseli (public klasöründe olmalı)
const siteUrl = "https://www.adriaticadoo.me";

export function SEO({ 
  title, 
  description, 
  keywords, 
  canonical, 
  ogImage,
  noindex = false 
}: SEOProps) {
  const pageTitle = title ? `${title} | Adriatica D.O.O.` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaOgImage = ogImage || defaultOgImage;
  const canonicalUrl = canonical || siteUrl;

  return (
    <Helmet>
      {/* Temel etiketler */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content="Adriatica D.O.O." />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      {/* Twitter site hesabınız varsa: <meta name="twitter:site" content="@adriaticadoo" /> */}

      {/* Ek meta etiketler */}
      <meta name="author" content="Adriatica D.O.O." />
      <meta name="geo.region" content="ME" />
      <meta name="geo.placename" content="Montenegro" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
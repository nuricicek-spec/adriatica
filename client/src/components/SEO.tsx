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
const defaultKeywords = "marine engineering, naval architecture, ship design, structural analysis, yacht design, yacht refit, new building, shipyard, Montenegro, Adriatic Coast, European Coast, marine industry, regulatory compliance, IHM, BWMP, SEEMP, P&ID, electrical load analysis, vibration diagnostics, Montenegro shipyard, Adriatic shipbuilding, EU MRV monitoring plan, IMO DCS reporting, Biofouling Management Plan, THETIS-MRV compliance, FuelEU Maritime, carbon emissions reporting, vessel performance monitoring";
const defaultOgImage = "/og-image-default.png";
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

  // Dinamik canonical: prop yoksa tarayıcıdaki URL'yi kullan, yoksa siteUrl
  const currentUrl = typeof window !== 'undefined' 
    ? window.location.origin + window.location.pathname 
    : siteUrl;
  const canonicalUrl = canonical || currentUrl;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content="Adriatica D.O.O." />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />

      <meta name="author" content="Adriatica D.O.O." />
      <meta name="geo.region" content="ME" />
      <meta name="geo.placename" content="Montenegro" />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}
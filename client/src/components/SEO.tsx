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
const defaultDescription = "Adriatica D.O.O. provides independent marine engineering consultancy, technical project management, and regulatory compliance services for yachts, commercial vessels, and fishing boats. Expertise includes engineering plans, structural integrity, sustainable technologies, in-water cleaning management, and owner's representation.";
const defaultKeywords = "marine engineering, naval architecture, structural integrity, yacht refit, shipyard, Montenegro, Adriatic Coast, Mediterranean, regulatory compliance, technical project management, owner's representation, dry-docking, in-water cleaning, sustainable technologies, hull performance, CII advisory, vessel performance, marine consultancy, engineering plans";
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

  const currentUrl = typeof window !== 'undefined' 
    ? window.location.origin + window.location.pathname 
    : siteUrl;
  const canonicalUrl = canonical || currentUrl;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:site_name" content="Adriatica D.O.O." />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="author" content="Adriatica D.O.O." />
      <meta name="geo.region" content="ME" />
      <meta name="geo.placename" content="Montenegro" />
    </Helmet>
  );
}
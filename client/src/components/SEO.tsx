import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  tags?: string[];
}

const defaultTitle = "Adriatica D.O.O. - Marine Engineering & Consultancy";

// 149 karakter — Bing/Google önerilen limit 150–160, güvenli taraf için 149
const defaultDescription =
  "Marine engineering consultancy for yachts, commercial vessels and fishing boats. Structural integrity, regulatory compliance and sustainable technologies.";

const defaultOgImage = "/og-image-default.png";
const defaultOgImageAlt = "Adriatica D.O.O. - Marine Engineering & Consultancy";
const siteUrl = "https://www.adriaticadoo.com";

function normalizeUrl(url: string): string {
  const stripped = url.replace(/\/$/, "");
  return stripped === "" ? siteUrl : stripped;
}

function resolveImageUrl(image: string): string {
  if (/^(https?:)?\/\//.test(image)) return image;
  return `${siteUrl}${image.startsWith("/") ? "" : "/"}${image}`;
}

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogImageAlt,
  ogType = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
  tags,
}: SEOProps) {
  const pageTitle = title ? `${title} | Adriatica D.O.O.` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaOgImage = resolveImageUrl(ogImage ?? defaultOgImage);
  const metaOgImageAlt = ogImageAlt || defaultOgImageAlt;
  const canonicalUrl = normalizeUrl(canonical);

  const isArticle = ogType === "article";

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />
      <meta name="author" content="Adriatica D.O.O." />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaOgImage} />
      <meta property="og:image:alt" content={metaOgImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content="Adriatica D.O.O." />
      <meta property="og:locale" content="en_GB" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaOgImage} />
      <meta name="twitter:image:alt" content={metaOgImageAlt} />

      {/* Article specific */}
      {isArticle && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {isArticle && publishedTime && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {isArticle && (
        <meta property="article:author" content="Adriatica D.O.O." />
      )}
      {isArticle && tags && tags.length > 0 && tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}
    </Helmet>
  );
}
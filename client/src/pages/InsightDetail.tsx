import { useRoute } from "wouter";
import { insights } from "@/data/insights/index";
import { Helmet } from "react-helmet-async";
import { Share2, Download, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useMemo, useCallback, lazy, Suspense } from "react";
import { allContent } from "@/lib/contentIndex";
import DOMPurify from "dompurify";

// ============================================================
// Build-time constants (optimization)
// ============================================================
const SORTED_INSIGHTS = [...insights].sort((a, b) => {
  const da = Date.parse(a.date) || 0;
  const db = Date.parse(b.date) || 0;
  return db - da;
});

// Lazy load RelatedContent (below the fold)
const RelatedContent = lazy(() =>
  import("@/components/RelatedContent").then((module) => ({
    default: module.RelatedContent,
  }))
);

// ============================================================
// SSR-safe utilities
// ============================================================
const isBrowser = typeof window !== "undefined";
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://adriatica.pages.dev";

let purifyInstance: any = null;
const getPurify = () => {
  if (!isBrowser) return null;
  if (!purifyInstance) {
    purifyInstance = DOMPurify(window);
  }
  return purifyInstance;
};

const sanitizeHtml = (html: string) => {
  const purify = getPurify();
  if (!purify) return html;
  return purify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "strong", "em",
      "a", "div", "span", "table", "thead", "tbody", "tr", "th", "td", "figure",
      "figcaption", "img", "blockquote", "code", "pre", "br", "hr", "section",
    ],
    ALLOWED_ATTR: [
      "href", "src", "alt", "title", "class", "width", "height", "loading",
      "fetchpriority", "target", "rel",
    ],
    FORBID_ATTR: ["onerror", "onclick", "onload"],
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|tel:|\/)/i,
  });
};

const contentMap = new Map<string, (typeof allContent)[number]>(
  allContent.map((item) => [item.slug, item])
);

const normalizeUrl = (url: string) => url.replace(/\/$/, "");

// ============================================================
// Component
// ============================================================
export default function InsightDetail() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug;

  if (!slug) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid article</h1>
            <Link href="/insights" className="text-primary underline">
              ← All insights
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const insight = insights.find((item) => item.slug === slug);
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isBrowser) return;
    const hasVoted = localStorage.getItem(`rated_${slug}`);
    if (hasVoted === "true") setSubmitted(true);
    const savedRating = localStorage.getItem(`rating_${slug}`);
    if (savedRating) setRating(Number(savedRating));
  }, [slug]);

  if (!insight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Article not found</h1>
            <Link href="/insights" className="text-primary underline">
              ← All insights
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentItem = useMemo(() => {
    return contentMap.get(insight.slug);
  }, [insight.slug]);

  const safeDate = useMemo(() => {
    const ts = Date.parse(insight.date);
    return isNaN(ts) ? null : new Date(ts);
  }, [insight.date]);

  // Optimized: use pre-sorted insights
  const latestInsights = useMemo(() => {
    return SORTED_INSIGHTS.filter((i) => i.slug !== slug).slice(0, 3);
  }, [slug]);

  const canonicalUrl = normalizeUrl(`${BASE_URL}/insights/${insight.slug}`);

  const shareOnLinkedIn = useCallback(() => {
    if (!isBrowser) return;
    const url = encodeURIComponent(canonicalUrl);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  }, [canonicalUrl]);

  const handleRating = useCallback(
    (value: number) => {
      if (submitted) return;
      setRating(value);
      setSubmitted(true);
      if (isBrowser && slug) {
        localStorage.setItem(`rated_${slug}`, "true");
        localStorage.setItem(`rating_${slug}`, String(value));
      }
      if (isBrowser && typeof (window as any).gtag === "function") {
        try {
          (window as any).gtag("event", "article_rating", {
            event_category: "engagement",
            event_label: insight.slug,
            value,
          });
        } catch (e) {
          console.warn("GTAG error:", e);
        }
      }
    },
    [submitted, slug, insight.slug]
  );

  const impl = insight.operationalImplications;
  const tagsKeywords = useMemo(
    () => currentItem?.tags?.map((tag) => tag.name).join(", ") || "",
    [currentItem]
  );
  const safeHtml = useMemo(() => sanitizeHtml(insight.contentHtml), [insight.contentHtml]);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.date,
    dateModified: insight.date,
    author: { "@type": "Organization", name: "Adriatica D.O.O." },
    publisher: {
      "@type": "Organization",
      name: "Adriatica D.O.O.",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: tagsKeywords,
  };

  const lcpImage = `${BASE_URL}/og-image.png`;

  return (
    <>
      <Helmet>
        <title>{insight.title} | Adriatica D.O.O.</title>
        <meta name="description" content={insight.description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
        <meta property="og:title" content={insight.title} />
        <meta property="og:description" content={insight.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Adriatica D.O.O." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:image" content={lcpImage} />
        <meta property="article:published_time" content={insight.date} />
        <meta property="article:modified_time" content={insight.date} />
        {tagsKeywords && <meta name="keywords" content={tagsKeywords} />}
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="mb-4">
                <Link
                  href="/insights"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span aria-hidden="true">←</span> Back to all insights
                </Link>
              </div>
              <div className="text-sm text-primary font-medium mb-2">{insight.category}</div>
              <h1 className="text-4xl font-display font-bold mb-4">{insight.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8">
                <span>{safeDate ? safeDate.toLocaleDateString("en-GB") : "—"}</span>
                <span>{insight.readTime} min read</span>
              </div>
              <div className="flex gap-4 mb-8">
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition"
                  aria-label="Share on LinkedIn"
                >
                  <Share2 className="w-4 h-4" /> Share on LinkedIn
                </button>
                {insight.pdfUrl && (
                  <a
                    href={insight.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition"
                    aria-label="Download PDF (opens new tab)"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                )}
              </div>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
              {impl && (
                <div className="mt-12 border border-primary/20 rounded-sm overflow-hidden">
                  <div className="bg-[#0B3B5C] px-6 py-4">
                    <h2 className="font-display text-xl font-bold text-white">
                      {impl.heading ?? "Operational Implications"}
                    </h2>
                    {impl.summary && (
                      <p className="text-white/70 text-sm mt-1">{impl.summary}</p>
                    )}
                  </div>
                  <div className="bg-neutral-50 px-6 py-5">
                    <ul className="space-y-4">
                      {impl.points.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-[#0B3B5C] leading-relaxed">
                            {item.point}
                            {item.href && (
                              <Link
                                href={item.href}
                                className="ml-2 inline-flex items-center gap-0.5 text-primary font-medium hover:underline text-xs"
                              >
                                Learn more <ArrowRight size={11} />
                              </Link>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {impl.cta && (
                      <div className="mt-6 pt-5 border-t border-border/20">
                        <Link
                          href={impl.cta.href}
                          className="inline-flex items-center gap-2 bg-[#0B3B5C] text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-[#1A4B7A] transition-colors"
                        >
                          {impl.cta.label} <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {currentItem ? (
                <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded mt-12" />}>
                  <RelatedContent currentItem={currentItem} />
                </Suspense>
              ) : (
                <FallbackLatestInsights currentSlug={insight.slug} />
              )}
            </article>
            <aside className="space-y-8">
              <div className="p-6 bg-neutral-50 rounded">
                <h3 className="font-display text-lg font-bold mb-4">Was this article useful?</h3>
                {!submitted ? (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => handleRating(v)}
                        className={`p-1 focus:outline-none ${
                          rating !== null && v <= rating
                            ? "text-yellow-500"
                            : "text-gray-300 hover:text-yellow-400"
                        }`}
                        aria-label={`Rate ${v} out of 5`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-700 text-sm">You rated: {rating}/5</p>
                )}
              </div>
              {latestInsights.length > 0 && (
                <div className="p-6 bg-white border border-border/40 rounded">
                  <h3 className="font-display text-lg font-bold mb-4">Latest Insights</h3>
                  <ul className="space-y-4">
                    {latestInsights.map((i) => (
                      <li key={i.slug}>
                        <Link href={`/insights/${i.slug}`} className="block hover:text-primary">
                          <h4 className="font-semibold">{i.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {i.description.substring(0, 80)}...
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="p-6 bg-primary/5 border border-primary/20 rounded text-center">
                <p className="text-muted-foreground mb-4 text-sm">
                  Have a specific technical challenge?
                </p>
                <Link
                  href="/request-consultation"
                  className="inline-block w-full px-4 py-2 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Request Assessment
                </Link>
              </div>
            </aside>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Fallback component (optimized with pre-sorted insights)
function FallbackLatestInsights({ currentSlug }: { currentSlug: string }) {
  const fallbackInsights = useMemo(() => {
    return SORTED_INSIGHTS.filter((i) => i.slug !== currentSlug).slice(0, 3);
  }, [currentSlug]);

  if (fallbackInsights.length === 0) return null;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="font-display text-xl font-bold mb-4">Latest Insights</h3>
      <ul className="space-y-2">
        {fallbackInsights.map((insight) => (
          <li key={insight.slug}>
            <Link href={`/insights/${insight.slug}`} className="text-primary hover:underline">
              {insight.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
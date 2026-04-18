import { useRoute } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/RelatedContent";
import { allContent } from "@/lib/contentIndex";
import { useMemo } from "react";

// ============================================================
// SSR-safe utilities
// ============================================================
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://adriatica.pages.dev";

// Normalize URL (remove trailing slash)
const normalizeUrl = (url: string) => url.replace(/\/$/, "");

// Build-time content map for O(1) lookup
const contentMap = new Map<string, (typeof allContent)[number]>(
  allContent.map((item) => [item.slug, item])
);

// ============================================================
// Component
// ============================================================
export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug;

  // Early return if no slug
  if (!slug) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Invalid case study</h1>
            <Link href="/case-studies" className="text-primary underline">
              ← All case studies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const caseStudy = caseStudies.find((c) => c.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Sorry, this case study could not be found.
            </h1>
            <Link href="/case-studies" className="text-primary underline">
              ← All case studies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // O(1) lookup for related content
  const currentItem = useMemo(() => {
    return contentMap.get(caseStudy.slug);
  }, [caseStudy.slug]);

  // Fallback if currentItem not found (should not happen)
  if (!currentItem) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              Unable to load related content
            </h1>
            <Link href="/case-studies" className="text-primary underline">
              ← All case studies
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // SEO / Schema helpers
  const canonicalUrl = normalizeUrl(`${BASE_URL}/case-studies/${caseStudy.slug}`);
  
  // Safe description from challenge field
  const description = caseStudy.challenge?.substring(0, 160) || "";
  
  const tagsKeywords = currentItem.tags?.map((tag) => tag.name).join(", ") || "";

  // Case Study Schema (Article variant)
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: description,
    datePublished: (caseStudy as any).date,      // Optional: add if exists
    dateModified: (caseStudy as any).date,       // Optional: add if exists
    author: { "@type": "Organization", name: "Adriatica D.O.O." },
    publisher: {
      "@type": "Organization",
      name: "Adriatica D.O.O.",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: tagsKeywords,
  };

  // Optional date for meta tags
  const publishedDate = (caseStudy as any).date;

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Adriatica D.O.O. Case Studies</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Adriatica D.O.O." />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Optional published/modified times */}
        {publishedDate && (
          <>
            <meta property="article:published_time" content={publishedDate} />
            <meta property="article:modified_time" content={publishedDate} />
          </>
        )}

        {/* Keywords */}
        {tagsKeywords && <meta name="keywords" content={tagsKeywords} />}

        {/* Schema.org */}
        <script type="application/ld+json">{JSON.stringify(caseStudySchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="mb-4">
                <Link
                  href="/case-studies"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span aria-hidden="true">←</span> Back to all case studies
                </Link>
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">
                {caseStudy.title}
              </h1>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">
                    Challenge
                  </h2>
                  <p>{caseStudy.challenge}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">
                    Solution
                  </h2>
                  <p>{caseStudy.solution}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">
                    Result
                  </h2>
                  <p>{caseStudy.result}</p>
                </div>
              </div>
              <RelatedContent currentItem={currentItem} />
            </article>
            <aside className="lg:col-span-1" />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
import { useRoute } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { allContent } from "@/lib/contentIndex";
import { useMemo, lazy, Suspense } from "react";

// Lazy load RelatedContent (below the fold) - named export wrapper
const RelatedContent = lazy(() =>
  import("@/components/RelatedContent").then((module) => ({
    default: module.RelatedContent,
  }))
);

// ============================================================
// SSR-safe utilities
// ============================================================

// FIX: Fallback URL production domain ile eşleştirildi
const BASE_URL = import.meta.env.VITE_SITE_URL || "https://www.adriaticadoo.com";

const normalizeUrl = (url: string) => url.replace(/\/$/, "");

const contentMap = new Map<string, (typeof allContent)[number]>(
  allContent.map((item) => [item.slug, item])
);

// ============================================================
// Component
// ============================================================
export default function CaseStudyDetail() {
  const [, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug ?? "";

  const caseStudy = caseStudies.find((c) => c.slug === slug);

  /*
    FIX: React Hooks kuralı — tüm hook'lar conditional return'lerden ÖNCE çağrılmalı.
    Önceki versiyonda useMemo, if (!slug) ve if (!caseStudy) return'lerinden
    SONRA çağrılıyordu — bu hooks sırası ihlaliydi.
    InsightDetail.tsx ile aynı düzeltme uygulandı.
  */
  const currentItem = useMemo(() => {
    if (!caseStudy) return undefined;
    return contentMap.get(caseStudy.slug);
  }, [caseStudy]);

  const canonicalUrl = useMemo(
    () => normalizeUrl(`${BASE_URL}/case-studies/${slug}`),
    [slug]
  );

  // FIX: (caseStudy as any).date → optional chaining ile güvenli erişim
  const publishedDate: string | undefined = (caseStudy as { date?: string } | undefined)?.date;

  // FIX: null safety — challenge undefined olabilir
  const description = caseStudy?.challenge?.substring(0, 149) ?? "";

  const tagsKeywords = currentItem?.tags?.map((tag) => tag.name).join(", ") ?? "";

  // ── Geçersiz slug ──
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

  // ── Case study bulunamadı ──
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

  // ── İlgili içerik yüklenemedi — currentItem olmadan da devam et ──
  // Not: Önceki versiyonda currentItem yoksa ayrı bir error state gösteriliyordu.
  // RelatedContent zaten currentItem kontrolü yapıyor; burada sadece Suspense
  // fallback'i yeterli — hata sayfası göstermeye gerek yok.

  // ── Normal render ──
  const lcpImage = `${BASE_URL}/og-image.png`;

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { "@type": "Organization", name: "Adriatica D.O.O." },
    publisher: {
      "@type": "Organization",
      name: "Adriatica D.O.O.",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`, // FIX: .png → .svg
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: tagsKeywords,
  };

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Adriatica D.O.O. Case Studies</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="preload" as="image" href={lcpImage} fetchPriority="high" />
        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Adriatica D.O.O." />
        <meta property="og:image" content={lcpImage} />
        <meta name="twitter:card" content="summary_large_image" />
        {publishedDate && (
          <>
            <meta property="article:published_time" content={publishedDate} />
            <meta property="article:modified_time" content={publishedDate} />
          </>
        )}
        {tagsKeywords && <meta name="keywords" content={tagsKeywords} />}
        {/* FIX: .replace(/</g, "\\u003c") eklendi — diğer sayfalarda mevcut, eksikti */}
        <script type="application/ld+json">
          {JSON.stringify(caseStudySchema).replace(/</g, "\\u003c")}
        </script>
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
              {currentItem && (
                <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded mt-12" />}>
                  <RelatedContent currentItem={currentItem} />
                </Suspense>
              )}
            </article>
            {/* FIX: boş aside kaldırıldı — gereksiz DOM node */}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
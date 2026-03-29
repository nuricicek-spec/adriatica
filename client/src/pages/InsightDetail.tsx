import { useRoute } from "wouter";
import { insights } from "@/data/insights";
import { recommendedSlugs } from "@/data/recommended";
import { Helmet } from "react-helmet-async";
import { Share2, Download, Star } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { RelatedContent } from "@/components/RelatedContent";

export default function InsightDetail() {
  const [match, params] = useRoute("/insights/:slug");
  const slug = params?.slug;
  const insight = insights.find(i => i.slug === slug);

  // Oylama durumu
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // localStorage kontrolü: sayfa yüklendiğinde bu makale için oy verilmiş mi?
  useEffect(() => {
    if (slug) {
      const hasVoted = localStorage.getItem(`rated_${slug}`);
      if (hasVoted === 'true') {
        setSubmitted(true);
      }
    }
  }, [slug]);

  // Most Popular (sidebar)
  const popular = recommendedSlugs
    .map(slug => insights.find(i => i.slug === slug))
    .filter((i): i is typeof insights[0] => i !== undefined && i.slug !== insight?.slug)
    .slice(0, 5);

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(insight?.title || '')}`, '_blank');
  };

  const handleRating = (value: number) => {
    if (submitted) return;
    setRating(value);
    setSubmitted(true);

    // localStorage'e kaydet
    if (slug) {
      localStorage.setItem(`rated_${slug}`, 'true');
    }

    // GA4 event
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'article_rating', {
        event_category: 'engagement',
        event_label: insight?.slug,
        value: value,
      });
    }
  };

  if (!insight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Article not found</h1>
          <Link href="/insights" className="text-primary underline">← All insights</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{insight.title} | Adriatica D.O.O.</title>
        <meta name="description" content={insight.description} />
        <meta property="og:title" content={insight.title} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={insight.date} />
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ana sütun */}
            <article className="lg:col-span-2">
              <div className="mb-4">
                <Link href="/insights" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  ← Back to all insights
                </Link>
              </div>
              <div className="text-sm text-primary font-medium mb-2">{insight.category}</div>
              <h1 className="text-4xl font-display font-bold mb-4">{insight.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8">
                <span>{new Date(insight.date).toLocaleDateString("en-GB")}</span>
                <span>{insight.readTime} min read</span>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition"
                >
                  <Share2 className="w-4 h-4" /> Share on LinkedIn
                </button>
                <a
                  href={insight.pdfUrl}
                  download
                  className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition"
                >
                  <Download className="w-4 h-4" /> Download PDF
                </a>
              </div>

              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: insight.contentHtml }}
              />

              {/* Related Content (Services, Case Studies, Insights) */}
              <RelatedContent
                serviceSlugs={insight.relatedServices}
                caseStudySlugs={insight.relatedCaseStudies}
                insightSlugs={insight.relatedSlugs}
              />
            </article>

            {/* Sağ sidebar */}
            <aside className="space-y-8">
              {/* Oylama bölümü */}
              <div className="p-6 bg-neutral-50 rounded">
                <h3 className="font-display text-lg font-bold mb-4">How useful was this article?</h3>
                {!submitted ? (
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(value => (
                      <button
                        key={value}
                        onClick={() => handleRating(value)}
                        className={`p-1 focus:outline-none ${rating === value ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                      >
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-700 text-sm">Thank you!</p>
                )}
              </div>

              {/* Most Popular – scroll */}
              {popular.length > 0 && (
                <div className="p-6 bg-white border border-border/40 rounded max-h-96 overflow-y-auto">
                  <h3 className="font-display text-lg font-bold mb-4 sticky top-0 bg-white pb-2">
                    Most Popular Insights
                  </h3>
                  <ul className="space-y-4">
                    {popular.map(pop => (
                      <li key={pop.slug}>
                        <Link href={`/insights/${pop.slug}`}>
                          <a className="block hover:text-primary hover:underline transition">
                            <h4 className="font-semibold text-base">{pop.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">{pop.description}</p>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
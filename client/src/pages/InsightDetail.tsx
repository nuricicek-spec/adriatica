import { useRoute } from "wouter";
import { insights } from "@/data/insights/index";
import { Helmet } from "react-helmet-async";
import { Share2, Download, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { RelatedContent } from "@/components/RelatedContent";
import { allContent } from "@/lib/contentIndex";

export default function InsightDetail() {
  const [, params] = useRoute("/insights/:slug");
  const slug = params?.slug;
  const insight = insights.find(item => item.slug === slug);
  const [rating, setRating] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      const hasVoted = localStorage.getItem(`rated_${slug}`);
      if (hasVoted === "true") setSubmitted(true);
    }
  }, [slug]);

  if (!insight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link href="/insights" className="text-primary underline">← All insights</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const currentItem = allContent.find(item => item.slug === insight.slug && item.type === 'insight');
  if (!currentItem) return <div>Error loading content</div>;

  const latestInsights = [...insights]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
    .filter(i => i.slug !== slug);

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(insight.title)}`, "_blank");
  };

  const handleRating = (value: number) => {
    if (submitted) return;
    setRating(value);
    setSubmitted(true);
    if (slug) localStorage.setItem(`rated_${slug}`, "true");
    window.gtag?.("event", "article_rating", { event_category: "engagement", event_label: insight.slug, value });
  };

  const impl = insight.operationalImplications;

  return (
    <>
      <Helmet>
        <title>{insight.title} | Adriatica D.O.O.</title>
        <meta name="description" content={insight.description} />
        <meta property="og:title" content={insight.title} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={insight.date} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: insight.title,
            description: insight.description,
            datePublished: insight.date,
            author: { "@type": "Organization", name: "Adriatica D.O.O." },
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="mb-4">
                <Link href="/insights" className="text-sm text-primary hover:underline inline-flex items-center gap-1">← Back to all insights</Link>
              </div>
              <div className="text-sm text-primary font-medium mb-2">{insight.category}</div>
              <h1 className="text-4xl font-display font-bold mb-4">{insight.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground text-sm mb-8">
                <span>{new Date(insight.date).toLocaleDateString("en-GB")}</span>
                <span>{insight.readTime} min read</span>
              </div>
              <div className="flex gap-4 mb-8">
                <button onClick={shareOnLinkedIn} className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition">
                  <Share2 className="w-4 h-4" /> Share on LinkedIn
                </button>
                {insight.pdfUrl && (
                  <a href={insight.pdfUrl} download className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                )}
              </div>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: insight.contentHtml }} />
              {impl && (
                <div className="mt-12 border border-primary/20 rounded-sm overflow-hidden">
                  <div className="bg-[#0B3B5C] px-6 py-4">
                    <h2 className="font-display text-xl font-bold text-white">{impl.heading ?? "Operational Implications"}</h2>
                    {impl.summary && <p className="text-white/70 text-sm mt-1">{impl.summary}</p>}
                  </div>
                  <div className="bg-neutral-50 px-6 py-5">
                    <ul className="space-y-4">
                      {impl.points.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{idx + 1}</span>
                          <span className="text-sm text-[#0B3B5C] leading-relaxed">
                            {item.point}
                            {item.href && <Link href={item.href} className="ml-2 inline-flex items-center gap-0.5 text-primary font-medium hover:underline text-xs">Learn more <ArrowRight size={11} /></Link>}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {impl.cta && (
                      <div className="mt-6 pt-5 border-t border-border/20">
                        <Link href={impl.cta.href} className="inline-flex items-center gap-2 bg-[#0B3B5C] text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-[#1A4B7A] transition-colors">
                          {impl.cta.label} <ArrowRight size={14} />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <RelatedContent currentItem={currentItem} />
            </article>
            <aside className="space-y-8">
              <div className="p-6 bg-neutral-50 rounded">
                <h3 className="font-display text-lg font-bold mb-4">Was this article useful?</h3>
                {!submitted ? (
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(v => (
                      <button key={v} onClick={() => handleRating(v)} className={`p-1 focus:outline-none ${rating === v ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"}`}>
                        <Star className="w-6 h-6 fill-current" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-700 text-sm">Thank you!</p>
                )}
              </div>
              {latestInsights.length > 0 && (
                <div className="p-6 bg-white border border-border/40 rounded">
                  <h3 className="font-display text-lg font-bold mb-4">Latest Insights</h3>
                  <ul className="space-y-4">
                    {latestInsights.map(i => (
                      <li key={i.slug}>
                        <Link href={`/insights/${i.slug}`} className="block hover:text-primary">
                          <h4 className="font-semibold">{i.title}</h4>
                          <p className="text-sm text-muted-foreground">{i.description.substring(0,80)}...</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="p-6 bg-primary/5 border border-primary/20 rounded text-center">
                <p className="text-muted-foreground mb-4 text-sm">Have a specific technical challenge?</p>
                <Link href="/request-consultation" className="inline-block w-full px-4 py-2 bg-primary text-white font-medium rounded-sm hover:bg-primary/90 transition-colors">
                  Request Assessment
                </Link>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
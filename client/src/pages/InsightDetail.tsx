import { useRoute } from "wouter";
import { insights } from "@/data/insights";
import { Helmet } from "react-helmet-async";
import { Share2, Download } from "lucide-react";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function InsightDetail() {
  const [match, params] = useRoute("/insights/:slug");
  const slug = params?.slug;

  const insight = insights.find(i => i.slug === slug);

  if (!insight) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Makale bulunamadı</h1>
          <Link href="/insights" className="text-primary underline">← Tüm Insights</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // İlgili makaleler: önce manuel ilişkiler, yoksa aynı kategorideki diğer makaleler (max 2)
  const related = insight.relatedSlugs && insight.relatedSlugs.length > 0
    ? insights.filter(i => insight.relatedSlugs!.includes(i.slug))
    : insights.filter(i => i.slug !== insight.slug && i.category === insight.category).slice(0, 2);

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(insight.title)}`, '_blank');
  };

  const sendFeedback = (useful: boolean) => {
    alert("Thanks for your feedback!");
  };

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

        <article className="max-w-4xl mx-auto px-4 pt-32 pb-12 md:pt-40">
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

          {related.length > 0 && (
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-display mb-4">Related Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map(rel => (
                  <Link key={rel.slug} href={`/insights/${rel.slug}`}>
                    <a className="block p-4 border rounded hover:shadow transition">
                      <h4 className="font-bold mb-1">{rel.title}</h4>
                      <p className="text-sm text-muted-foreground">{rel.description}</p>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 p-6 bg-neutral-50 text-center rounded">
            <p className="mb-3">How relevant and useful is this article for you?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => sendFeedback(true)}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
              >
                👍 Useful
              </button>
              <button
                onClick={() => sendFeedback(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                👎 Not useful
              </button>
            </div>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
}
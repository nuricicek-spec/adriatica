import { useRoute } from "wouter";
import { caseStudies } from "@/data/caseStudies";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { RelatedContent } from "@/components/RelatedContent";

export default function CaseStudyDetail() {
  const [match, params] = useRoute("/case-studies/:slug");
  const slug = params?.slug;
  const caseStudy = caseStudies.find(c => c.slug === slug);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Sorry, this case study could not be found.</h1>
          <Link href="/case-studies" className="text-primary underline">← All case studies</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{caseStudy.title} | Adriatica D.O.O. Case Studies</title>
        <meta name="description" content={caseStudy.challenge.substring(0, 160)} />
        <meta property="og:title" content={caseStudy.title} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 md:pt-40">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2">
              <div className="mb-4">
                <Link href="/case-studies" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  ← Back to all case studies
                </Link>
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">{caseStudy.title}</h1>

              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">Challenge</h2>
                  <p>{caseStudy.challenge}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">Solution</h2>
                  <p>{caseStudy.solution}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#0B3B5C] mb-2">Result</h2>
                  <p>{caseStudy.result}</p>
                </div>
              </div>

              <RelatedContent
                serviceSlugs={caseStudy.relatedServices}
                caseStudySlugs={[]}
                insightSlugs={caseStudy.relatedInsights}
              />
            </article>

            {/* Sağ sidebar – şimdilik boş, ileride eklenebilir */}
            <aside className="lg:col-span-1" />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
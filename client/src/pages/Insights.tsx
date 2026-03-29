import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { insights } from "@/data/insights";

export default function InsightsPage() {
  return (
    <>
      <SEO
        title="Insights"
        description="Technical articles, case studies, and regulatory updates from Adriatica D.O.O. Marine Engineering Consultancy."
        canonical="https://www.adriaticadoo.me/insights"
      />
      <Helmet>
        {/* Ekstra meta etiketleri istenirse eklenebilir */}
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeading
            title="Insights"
            subtitle="Technical articles and updates from Adriatica D.O.O."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {insights.map(insight => (
              <Link key={insight.slug} href={`/insights/${insight.slug}`}>
                <a className="block group p-6 bg-white border border-border/40 rounded-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="text-sm text-primary font-medium mb-2">{insight.category}</div>
                  <h2 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                    {insight.title}
                  </h2>
                  <p className="text-muted-foreground text-sm mb-3">{insight.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{new Date(insight.date).toLocaleDateString('en-GB')}</span>
                    <span className="mx-2">•</span>
                    <span>{insight.readTime} min read</span>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {/* CTA Bölümü – ok işareti kaldırıldı */}
          <div className="mt-16 p-6 bg-neutral-50 border border-border/10 text-center rounded-sm">
            <p className="text-lg text-muted-foreground mb-4">
              Have a specific technical challenge? We're ready to solve it.
            </p>
            <Link href="/#begin-voyage">
              <a className="inline-block px-6 py-3 bg-[#0B3B5C] text-white font-medium rounded-sm hover:bg-[#1A4B7A] transition-colors">
                Request Technical Consultation
              </a>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
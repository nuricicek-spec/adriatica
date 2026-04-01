import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Helmet } from "react-helmet-async";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { insights } from "@/data/insights";
import { Search, X } from "lucide-react";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  // Kategori listesini insights verisinden çıkar
  const categories = useMemo(() => {
    const cats = new Set(insights.map(i => i.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  // Filtreleme mantığı
  const filteredInsights = useMemo(() => {
    return insights.filter(insight => {
      if (category !== "All" && insight.category !== category) return false;
      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        return (
          insight.title.toLowerCase().includes(term) ||
          insight.description.toLowerCase().includes(term)
        );
      }
      return true;
    });
  }, [searchTerm, category]);

  const clearFilters = () => {
    setSearchTerm("");
    setCategory("All");
  };

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

          {/* Arama ve filtreleme bölümü */}
          <div className="mt-8 mb-12 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Arama kutusu */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 border border-border rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Kategori filtresi */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border border-border rounded-sm px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {(searchTerm || category !== "All") && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Sonuç sayısı */}
            <p className="text-sm text-muted-foreground">
              {filteredInsights.length} {filteredInsights.length === 1 ? "result" : "results"}
            </p>
          </div>

          {/* Grid */}
          {filteredInsights.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredInsights.map(insight => (
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
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No articles match your search.</p>
              <button
                onClick={clearFilters}
                className="mt-2 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* CTA Bölümü */}
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
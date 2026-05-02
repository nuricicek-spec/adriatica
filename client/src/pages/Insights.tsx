import { useState, useMemo, useCallback } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { insights } from "@/data/insights";
import { Search, X, ChevronDown } from "lucide-react";

type SortOption = "newest" | "oldest" | "alphabetical";

export default function InsightsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // insights sabit bir modül import'u — dependency array boş bırakıldı
  const categories = useMemo(() => {
    const cats = new Set(insights.map((insight) => insight.category));
    return ["All", ...Array.from(cats).sort()];
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredAndSorted = useMemo(() => {
    const filtered = insights.filter((insight) => {
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

    // FIX: [...filtered] ile spread — Array.sort() diziyi in-place değiştirir,
    // orijinal filtered dizisinin mutasyonunu önlemek için yeni dizi oluşturuldu
    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0);
      }
      if (sortBy === "oldest") {
        return (Date.parse(a.date) || 0) - (Date.parse(b.date) || 0);
      }
      // alphabetical
      return a.title.localeCompare(b.title);
    });
  }, [searchTerm, category, sortBy]);

  const clearSearch = useCallback(() => setSearchTerm(""), []);

  const clearFilters = useCallback(() => {
    setSearchTerm("");
    setCategory("All");
  }, []);

  return (
    <>
      {/* Description: 110 karakter — limit içinde */}
      <SEO
        title="Insights"
        description="Technical articles, case studies, and regulatory updates from Adriatica D.O.O. Marine Engineering Consultancy."
        canonical="https://www.adriaticadoo.com/insights"
      />

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/*
            SectionHeading component'inin h1 üretip üretmediği belirsiz.
            Bing "H1 missing" hatası vermemesi için sr-only h1 eklendi.
            SectionHeading zaten h1 üretiyorsa bu satırı kaldır.
          */}
          <h1 className="sr-only">Insights — Adriatica D.O.O. Marine Engineering</h1>
          <SectionHeading
            title="Insights"
            subtitle="Technical articles and updates from Adriatica D.O.O."
          />

          {/* Filtre ve arama */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-8 py-2 border border-border/40 rounded-sm bg-white focus:outline-none focus:border-primary"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border border-border/40 rounded-sm bg-white focus:outline-none focus:border-primary"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-3 py-2 pr-8 border border-border/40 rounded-sm bg-white focus:outline-none focus:border-primary"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Sonuç sayısı */}
          <p className="text-sm text-muted-foreground mt-4" aria-live="polite">
            {filteredAndSorted.length} article
            {filteredAndSorted.length !== 1 ? "s" : ""} found
          </p>

          {/* Grid */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredAndSorted.map((insight) => (
              <Link
                key={insight.slug}
                href={`/insights/${insight.slug}`}
                className="block group p-6 bg-white border border-border/40 rounded-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-sm text-primary font-medium mb-2">
                  {insight.category}
                </div>
                <h2 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {insight.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-3">
                  {insight.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>
                    {new Date(insight.date).toLocaleDateString("en-GB")}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{insight.readTime} min read</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Sonuç yok */}
          {filteredAndSorted.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No articles match your criteria.
              </p>
              <button
                onClick={clearFilters}
                className="mt-2 text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-6 bg-neutral-50 border border-border/10 text-center rounded-sm">
            <p className="text-lg text-muted-foreground mb-4">
              Have a specific technical challenge? We're ready to solve it.
            </p>
            <Link
              href="/request-consultation"
              className="inline-block px-6 py-3 bg-[#0B3B5C] text-white font-medium rounded-sm hover:bg-[#1A4B7A] transition-colors"
            >
              Request Technical Consultation
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
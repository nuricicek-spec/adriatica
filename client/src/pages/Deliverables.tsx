import { useState } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { HashLink } from "@/components/HashLink";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { deliverables } from '@/data/deliverables';

export default function Deliverables() {
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Engineering', 'Compliance', 'Operations'];

  const filtered = category === 'All'
    ? deliverables
    : deliverables.filter(d => d.category === category);

  return (
    <>
      <SEO
        title="Deliverables"
        description="Explore the complete list of engineering deliverables we provide: structural drawings, technical manuals, compliance plans, project documentation, and more – all tailored to marine projects."
        canonical="https://www.adriaticadoo.me/deliverables"
        ogType="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Adriatica D.O.O. Deliverables",
            "description": "Engineering and compliance deliverables for marine projects.",
            "numberOfItems": deliverables.length,
            "itemListElement": deliverables.map((item, idx) => ({
              "@type": "ListItem",
              "position": idx + 1,
              "item": {
                "@type": "Product",
                "name": item.title,
                "description": item.description,
                "category": item.category
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />
        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SectionHeading
            title="Our Deliverables"
            subtitle="What you receive when you work with us"
          />

          {/* Filtre butonları */}
          <div className="flex flex-wrap justify-center gap-4 my-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-neutral-100 text-muted-foreground hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div
                key={item.id}
                className="border border-border/40 rounded-sm p-5 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  {item.previewImage && (
                    <img
                      src={item.previewImage}
                      alt=""
                      className="h-8 w-auto opacity-70"
                    />
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>
                <div className="flex gap-4">
                  <HashLink
                    href={`/services/${item.serviceSlug}`}
                    className="text-primary text-sm hover:underline"
                  >
                    Learn more →
                  </HashLink>
                  <HashLink
                    href="/#begin-voyage"
                    className="text-primary text-sm hover:underline"
                  >
                    Request a quote →
                  </HashLink>
                </div>
              </div>
            ))}
          </div>

          {/* Alt CTA */}
          <div className="mt-16 text-center p-6 bg-neutral-50 border border-border/10 rounded-sm">
            <p className="text-muted-foreground mb-3">
              Don’t see what you need?
            </p>
            <HashLink
              href="/#begin-voyage"
              className="inline-block bg-primary text-white px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition"
            >
              Contact Our Team
            </HashLink>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
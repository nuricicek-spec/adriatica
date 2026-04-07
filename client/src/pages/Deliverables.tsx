import { useState, useCallback } from 'react';
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { HashLink } from "@/components/HashLink";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { deliverables } from '@/data/deliverables';
import { PDFViewer } from '@/components/PDFViewer';

// Deliverable tipi — typeof yerine açık tip
type Deliverable = typeof deliverables[number];

// Sabit — render döngüsü dışında
const CATEGORIES = ['All', 'Engineering', 'Compliance', 'Operations'] as const;
type Category = typeof CATEGORIES[number];

export default function Deliverables() {
  const [category, setCategory] = useState<Category>('All');
  const [previewItem, setPreviewItem] = useState<Deliverable | null>(null);

  const closeModal = useCallback(() => setPreviewItem(null), []);

  // Klavye ile modal kapatma (Escape)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    },
    [closeModal]
  );

  const filtered = (
    category === 'All'
      ? deliverables
      : deliverables.filter(d => d.category === category)
  ).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <SEO
        title="Deliverables"
        description="Explore the complete list of engineering deliverables we provide: structural drawings, technical manuals, compliance plans, project documentation, and more – all tailored to marine projects."
        canonical="https://www.adriaticadoo.com/deliverables"
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
                "@type": "Service",
                "name": item.title,
                "description": item.description,
                "serviceType": item.category,
                "provider": {
                  "@type": "Organization",
                  "name": "Adriatica D.O.O.",
                  "url": "https://www.adriaticadoo.com"
                },
              },
            })),
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
          <div className="flex flex-wrap justify-center gap-4 my-8" role="group" aria-label="Filter by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
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
                <div className="flex items-start justify-between gap-3 mb-3">
                  {item.previewImage && (
                    <img
                      src={item.previewImage}
                      alt={`${item.title} preview`}
                      className="h-12 w-12 object-contain"
                    />
                  )}
                  <span className="text-xs font-medium uppercase text-primary bg-primary/10 px-2 py-0.5 rounded whitespace-nowrap">
                    {item.category}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  <HashLink
                    href="/#begin-voyage"
                    className="text-primary text-sm hover:underline"
                  >
                    Request a quote →
                  </HashLink>
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="text-primary text-sm hover:underline"
                  >
                    Preview →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Alt CTA */}
          <div className="mt-16 text-center p-6 bg-neutral-50 border border-border/10 rounded-sm">
            <p className="text-muted-foreground mb-3">Don't see what you need?</p>
            <HashLink
              href="/#begin-voyage"
              className="inline-block bg-primary text-white px-6 py-3 rounded-sm font-medium hover:bg-primary/90 transition"
            >
              Request Custom Deliverable
            </HashLink>
          </div>
        </main>

        <Footer />

        {/* Preview Modal */}
        {previewItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${previewItem.title}`}
          >
            <div
              className="bg-white rounded-sm max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b flex items-start justify-between sticky top-0 bg-white z-10">
                <div className="flex items-center gap-3">
                  {previewItem.previewImage && (
                    <img
                      src={previewItem.previewImage}
                      alt=""
                      aria-hidden="true"
                      className="h-10 w-10 object-contain"
                    />
                  )}
                  <div>
                    <h3 className="font-display text-xl font-bold text-primary">
                      {previewItem.title}
                    </h3>
                    <span className="text-xs uppercase text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {previewItem.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-xl leading-none"
                  aria-label="Close preview"
                >
                  ✕
                </button>
              </div>

              {/* İçerik */}
              <div className="flex-1 overflow-auto p-4">
                <div className="bg-neutral-50 p-4 rounded-sm">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 text-sm text-yellow-800">
                    <p className="font-semibold">📄 Sample from a real project (redacted).</p>
                    <p>Your version will be custom‑prepared for your vessel after service agreement.</p>
                  </div>

                  {previewItem.previewPdf ? (
                    <PDFViewer url={previewItem.previewPdf} />
                  ) : (
                    <p className="text-center text-muted-foreground">Preview not available yet.</p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t flex justify-end gap-4 sticky bottom-0 bg-white z-10">
                <HashLink
                  href={`/services/${previewItem.serviceSlug}`}
                  className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition"
                >
                  Learn more about this deliverable
                </HashLink>
                <HashLink
                  href="/#begin-voyage"
                  className="border border-primary text-primary px-4 py-2 rounded-sm hover:bg-primary/10 transition"
                >
                  Request a quote
                </HashLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
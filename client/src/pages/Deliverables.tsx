import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { HashLink } from "@/components/HashLink";
import { SEO } from "@/components/SEO";
import { Helmet } from "react-helmet-async";
import { deliverables } from "@/data/deliverables";
import { PDFViewer } from "@/components/PDFViewer";
import { trackEvent } from "@/lib/analytics";

// Deliverable tipi — typeof yerine açık tip
type Deliverable = (typeof deliverables)[number];

// Sabit — render döngüsü dışında
const CATEGORIES = ["All", "Engineering", "Compliance", "Operations"] as const;
type Category = (typeof CATEGORIES)[number];

export default function Deliverables() {
  const [category, setCategory] = useState<Category>("All");
  const [previewItem, setPreviewItem] = useState<Deliverable | null>(null);

  // Modal container ref — focus yönetimi için
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => setPreviewItem(null), []);

  // Modal açıldığında focus al, kapandığında body'ye geri ver
  useEffect(() => {
    if (!previewItem) return;

    const previousFocus = document.activeElement as HTMLElement | null;

    // Sonraki frame'de focus ver — modal DOM'a mount olduktan sonra
    const raf = requestAnimationFrame(() => {
      modalRef.current?.focus();
    });

    return () => {
      cancelAnimationFrame(raf);
      previousFocus?.focus();
    };
  }, [previewItem]);

  // Escape ile modal kapatma — native event listener (en güvenilir yöntem)
  useEffect(() => {
    if (!previewItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [previewItem, closeModal]);

  // Scroll lock — modal açıkken body scroll'u engelle
  useEffect(() => {
    if (previewItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [previewItem]);

  // Preview tıklamasını izle — useCallback ile memolandı
  const handlePreview = useCallback((item: Deliverable) => {
    setPreviewItem(item);
    trackEvent("deliverable_preview", {
      title: item.title,
      category: item.category,
    });
  }, []);

  // FIX: [...].sort() — Array.sort() in-place değiştirir, spread ile kopya oluşturuldu
  const filtered = useMemo(
    () =>
      (category === "All"
        ? [...deliverables]
        : deliverables.filter((d) => d.category === category)
      ).sort((a, b) => a.title.localeCompare(b.title)),
    [category]
  );

  return (
    <>
      {/* Description: 140 karakter — limit içinde */}
      <SEO
        title="Deliverables"
        description="Marine engineering deliverables: structural drawings, technical manuals, compliance plans and project documentation tailored to your vessel."
        canonical="https://www.adriaticadoo.com/deliverables"
        ogType="website"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Adriatica D.O.O. Deliverables",
            description:
              "Engineering and compliance deliverables for marine projects.",
            numberOfItems: deliverables.length,
            itemListElement: deliverables.map((item, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              item: {
                "@type": "Service",
                name: item.title,
                description: item.description,
                serviceType: item.category,
                provider: {
                  "@type": "Organization",
                  name: "Adriatica D.O.O.",
                  url: "https://www.adriaticadoo.com",
                },
              },
            })),
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background font-body">
        <Navigation />

        <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/*
            SectionHeading component'inin h1 üretip üretmediği belirsiz.
            Bing "H1 missing" hatası vermemesi için sr-only h1 eklendi.
            SectionHeading zaten h1 üretiyorsa bu satırı kaldır.
          */}
          <h1 className="sr-only">Adriatica D.O.O. — Marine Engineering Deliverables</h1>
          <SectionHeading
            title="Our Deliverables"
            subtitle="What you receive when you work with us"
          />

          {/* Filtre butonları */}
          <div
            className="flex flex-wrap justify-center gap-4 my-8"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={`px-5 py-2 rounded-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-neutral-100 text-muted-foreground hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
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
                    href="/request-consultation"
                    className="text-primary text-sm hover:underline"
                  >
                    Request a quote →
                  </HashLink>
                  <button
                    onClick={() => handlePreview(item)}
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
              href="/request-consultation"
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
            role="dialog"
            aria-modal="true"
            aria-label={`Preview: ${previewItem.title}`}
          >
            <div
              ref={modalRef}
              className="bg-white rounded-sm max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative outline-none"
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}
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
                    <p>
                      Your version will be custom‑prepared for your vessel after service agreement.
                    </p>
                  </div>

                  {previewItem.previewPdf ? (
                    <PDFViewer url={previewItem.previewPdf} />
                  ) : (
                    <p className="text-center text-muted-foreground">
                      Preview not available yet.
                    </p>
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
                  href="/request-consultation"
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
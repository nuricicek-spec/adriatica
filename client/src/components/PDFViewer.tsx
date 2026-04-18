import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { Download, Share2, Minus, Plus, ExternalLink } from "lucide-react";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.js";

// Sabit — component dışında tanımlanması doğru, ama window/navigator
// SSR ortamında olmayabileceği için guard ekliyoruz.
const isIOS =
  typeof navigator !== "undefined" &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !(window as any).MSStream;

interface PDFViewerProps {
  url: string;
}

// ─── iOS fallback (ayrı küçük component) ────────────────────────────────────
function IOSFallback({ url }: { url: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-50 rounded-sm text-center">
      <p className="text-muted-foreground mb-4">
        This PDF is best viewed in full screen on your device.
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-sm hover:bg-primary/90 transition shadow-sm"
      >
        <ExternalLink className="w-4 h-4" />
        Open PDF in Full Screen
      </a>
    </div>
  );
}

// ─── Ana viewer (tüm hook'lar burada — koşulsuz çağrılıyor) ─────────────────
function PDFViewerDesktop({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null); // scroll wrapper
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // zoomLevel: 1 = "container genişliğine sığdır", >1 veya <1 kullanıcı zoom'u
  const [zoomLevel, setZoomLevel] = useState(1);

  // PDF yükle
  useEffect(() => {
    let cancelled = false;
    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await pdfjsLib.getDocument(url).promise;
        if (!cancelled) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setCurrentPage(1);
          setZoomLevel(1); // yeni PDF açılırken zoom sıfırla
        }
      } catch (err) {
        console.error("PDF yüklenemedi:", err);
        if (!cancelled) setError("Failed to load PDF. Please try again later.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadPdf();
    return () => {
      cancelled = true;
    };
  }, [url]);

  // Sayfa render et — scale, container genişliğine göre otomatik hesaplanır
  useEffect(() => {
    if (!pdfDoc || !wrapperRef.current) return;
    let cancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (cancelled) return;

        // PDF'in orijinal viewport'u (scale=1)
        const baseViewport = page.getViewport({ scale: 1 });

        // Container'ın kullanılabilir genişliği
        const containerWidth = wrapperRef.current!.clientWidth || 800;

        // "fit-width" scale: container'a tam sığdır, sonra kullanıcı zoom'unu uygula
        const fitScale = containerWidth / baseViewport.width;
        const finalScale = fitScale * zoomLevel;

        const viewport = page.getViewport({ scale: finalScale });

        // Canvas: bir kez oluştur, sonra yeniden kullan
        if (!canvasRef.current) {
          canvasRef.current = document.createElement("canvas");
          // ÖNEMLİ: CSS ile boyutu asla ezme — canvas kendi piksellerini yönetir
          canvasRef.current.style.display = "block";
          canvasRef.current.style.margin = "0 auto";
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        // Canvas piksel boyutunu viewport'a eşitle (aspect ratio korunur)
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, canvas, viewport }).promise;
        if (cancelled) return;

        if (!wrapperRef.current?.contains(canvas)) {
          wrapperRef.current?.replaceChildren(canvas);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Sayfa render edilemedi:", err);
          setError("Error rendering PDF page.");
        }
      }
    };

    renderPage();
    return () => {
      cancelled = true;
    };
  }, [pdfDoc, currentPage, zoomLevel]);

  const goToPrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goToNextPage = () => setCurrentPage((p) => Math.min(p + 1, numPages));

  // Zoom: %20 adım, 0.5x – 3x arası
  const zoomIn = () =>
    setZoomLevel((prev) => Math.min(+(prev + 0.2).toFixed(1), 3));
  const zoomOut = () =>
    setZoomLevel((prev) => Math.max(+(prev - 0.2).toFixed(1), 0.5));

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Document", url });
      } catch {
        // kullanıcı iptal etti — sessizce geç
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading PDF...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline mt-2 inline-block"
        >
          Try opening PDF directly
        </a>
      </div>
    );
  }

  if (!pdfDoc) {
    return (
      <div className="text-center py-8 text-red-600">
        PDF could not be loaded.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Araç çubuğu */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-md disabled:opacity-50 text-sm hover:bg-primary/90 transition"
          aria-label="Previous page"
        >
          ← Prev
        </button>

        <span className="text-sm text-muted-foreground" aria-live="polite">
          {currentPage} / {numPages}
        </span>

        <button
          onClick={goToNextPage}
          disabled={currentPage >= numPages}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-md disabled:opacity-50 text-sm hover:bg-primary/90 transition"
          aria-label="Next page"
        >
          Next →
        </button>

        <button
          onClick={zoomOut}
          className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          aria-label="Zoom out"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={zoomIn}
          className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition"
          aria-label="Zoom in"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm"
          aria-label="Download PDF"
          title="Download PDF"
        >
          <Download className="w-4 h-4" />
          Download
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition text-sm"
          aria-label="Share PDF"
          title="Share PDF"
        >
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>

      {/* Canvas alanı — dış div scroll sağlar, iç div (wrapperRef) canvas'ı ortalar */}
      <div
        className="w-full overflow-auto"
        style={{ maxHeight: "65vh", minHeight: "350px", background: "#f5f5f5" }}
        role="img"
        aria-label={`PDF page ${currentPage} of ${numPages}`}
      >
        <div
          ref={wrapperRef}
          className="flex justify-center items-start py-4"
          style={{ width: "100%" }}
        />
      </div>

      <div className="text-xs text-muted-foreground mt-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Open PDF in new tab
        </a>
      </div>
    </div>
  );
}

// ─── Export edilen wrapper — hook kurallarını ihlal etmeden iOS split'i yapar ─
export function PDFViewer({ url }: PDFViewerProps) {
  if (isIOS) return <IOSFallback url={url} />;
  return <PDFViewerDesktop url={url} />;
}

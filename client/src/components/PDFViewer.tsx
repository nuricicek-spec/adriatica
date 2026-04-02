import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Download, Share2, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/js/pdf.worker.min.js';

interface PDFViewerProps {
  url: string;
}

export function PDFViewer({ url }: PDFViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState(1.2);

  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);
      setError(null);
      try {
        const doc = await pdfjsLib.getDocument(url).promise;
        setPdfDoc(doc);
        setNumPages(doc.numPages);
        setCurrentPage(1);
      } catch (err: any) {
        console.error('PDF yüklenemedi:', err);
        setError('Failed to load PDF. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    loadPdf();
  }, [url]);

  useEffect(() => {
    if (!pdfDoc || !containerRef.current) return;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport: viewport,
        } as any).promise;

        while (containerRef.current?.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current?.appendChild(canvas);
      } catch (err) {
        console.error('Sayfa render edilemedi:', err);
        setError('Error rendering PDF page.');
      }
    };

    renderPage();
  }, [pdfDoc, currentPage, scale]);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < numPages) setCurrentPage(currentPage + 1);
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Document',
          url: url,
        });
      } catch (err) {
        console.log('Paylaşım iptal edildi:', err);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied!');
    }
  };

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading PDF...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline mt-2 inline-block">
          Try opening PDF directly
        </a>
      </div>
    );
  }

  if (!pdfDoc) {
    return <div className="text-center py-8 text-red-600">PDF could not be loaded.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* Kontrol çubuğu - responsive, ikon + metin */}
      <div className="flex flex-wrap justify-center items-center gap-2 mb-4 bg-gray-50 p-2 rounded-lg shadow-sm">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>
        <span className="text-sm text-gray-700 px-2">
          {currentPage} / {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= numPages}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />
        <button
          onClick={zoomOut}
          className="p-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button
          onClick={zoomIn}
          className="p-1.5 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1 hidden sm:block" />
        <button
          onClick={handleDownload}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          title="Download PDF"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Download</span>
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          title="Share PDF"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Canvas alanı */}
      <div
        ref={containerRef}
        className="border border-gray-300 rounded-lg shadow-sm overflow-auto max-w-full bg-white"
        style={{ maxHeight: '60vh', minHeight: '400px' }}
      />

      {/* Alt link */}
      <div className="text-xs text-muted-foreground mt-3">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Open PDF in new tab
        </a>
      </div>
    </div>
  );
}
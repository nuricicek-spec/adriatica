import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

// Worker'ı lokal dosyadan al
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
        if (err.message?.includes('Failed to fetch') || err.name === 'MissingPDFException') {
          setError('PDF file not found. The document may have been moved or deleted.');
        } else {
          setError('Failed to load PDF. Please try again later.');
        }
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

        // Eski canvas'ı temizle
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
    window.scrollTo({ top: containerRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < numPages) setCurrentPage(currentPage + 1);
    window.scrollTo({ top: containerRef.current?.offsetTop || 0, behavior: 'smooth' });
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

  if (loading) {
    return <div className="text-center py-8 text-muted-foreground">Loading PDF...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>{error}</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline mt-2 inline-block">
          Open PDF in new tab
        </a>
      </div>
    );
  }

  if (!pdfDoc) {
    return <div className="text-center py-8 text-red-600">PDF could not be loaded.</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1}
          className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50 transition"
        >
          Previous
        </button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {numPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= numPages}
          className="px-3 py-1 bg-primary text-white rounded disabled:opacity-50 transition"
        >
          Next
        </button>
        <button onClick={zoomOut} className="px-3 py-1 bg-gray-200 rounded transition hover:bg-gray-300">
          Zoom Out
        </button>
        <button onClick={zoomIn} className="px-3 py-1 bg-gray-200 rounded transition hover:bg-gray-300">
          Zoom In
        </button>
      </div>
      <div
        ref={containerRef}
        className="border border-gray-300 rounded shadow-sm overflow-auto max-w-full"
        style={{ maxHeight: '550px' }}
      />
      <div className="text-xs text-muted-foreground mt-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Open PDF in new tab
        </a>
      </div>
    </div>
  );
}
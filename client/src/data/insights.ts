export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: number;
  description: string;
  contentHtml: string;
  pdfUrl: string;
  relatedSlugs?: string[];
}

export const insights: Insight[] = [
  {
    slug: 'zero-emission-zone-boka-kotorska',
    title: 'The Case for a Zero-Emission Zone: Why is Boka Kotorska Not Protected Yet?',
    category: 'Strategic Outlook',
    date: '2025-02-15',
    readTime: 8,
    description: 'A strategic policy paper comparing Boka Kotorska with UNESCO‑protected sites that have implemented Zero‑Emission Zones (ZEZ).',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/zero-emission-zone.pdf',  // public/pdfs/ altında
    relatedSlugs: ['biofouling-compliance-imo-2026'],
  },
  {
    slug: 'biofouling-compliance-imo-2026',
    title: 'Biofouling Compliance: Preparing for the IMO 2026 Transition',
    category: 'Regulation',
    date: '2025-01-20',
    readTime: 6,
    description: 'A real-world superyacht case study on proactive biofouling management.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/biofouling-imo-2026.pdf',
    relatedSlugs: ['sustainable-in-water-cleaning-yacht'],
  },
  {
    slug: 'sustainable-in-water-cleaning-yacht',
    title: 'Sustainable In-Water Cleaning: Engineering Management for European Coastal Yacht Compliance',
    category: 'Technical Guidance',
    date: '2024-12-10',
    readTime: 7,
    description: 'Technical guidance on managing in-water cleaning operations for vessels 25m+ and 50m+.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/sustainable-in-water-cleaning.pdf',
    relatedSlugs: ['biofouling-compliance-imo-2026'],
  },
  {
    slug: 'technical-operations-montenegro',
    title: 'Technical Operations in Montenegro: Navigating Local Regulations and Shipyard Excellence',
    category: 'Case Insight',
    date: '2024-11-05',
    readTime: 5,
    description: 'Examination of Montenegro\'s maritime landscape, focusing on UPSUL regulations and shipyard capabilities.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/technical-operations-montenegro.pdf',
    relatedSlugs: [],
  },
];
export interface Insight {
  slug: string;
  title: string;
  category: string;
  date: string;       // ISO format YYYY-MM-DD
  readTime: number;
  description: string;
  contentHtml: string;
  pdfUrl: string;
  relatedSlugs?: string[];
  relatedServices?: string[];
  relatedCaseStudies?: string[];
}

export const insights: Insight[] = [
  {
    slug: 'zero-emission-zone-boka-kotorska',
    title: 'The Case for a "Zero-Emission Zone": Why is Boka Kotorska Not Protected Yet?',
    category: 'Strategic Outlook',
    date: '2026-03-25',
    readTime: 8,
    description: 'A strategic policy paper comparing Boka Kotorska with UNESCO‑protected sites that have implemented Zero‑Emission Zones (ZEZ).',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-004.pdf',
    relatedSlugs: ['biofouling-compliance-imo-2026'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: [],
  },
  {
    slug: 'technical-operations-montenegro',
    title: 'Technical Operations in Montenegro: Navigating Local Regulations and Shipyard Excellence',
    category: 'Case Insight',
    date: '2026-03-20',
    readTime: 5,
    description: 'Examination of Montenegro\'s maritime landscape, focusing on UPSUL regulations and shipyard capabilities.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-003.pdf',
    relatedSlugs: [],
    relatedServices: ['project-management'],
    relatedCaseStudies: ['refit-supervision-shipyard'],
  },
  {
    slug: 'sustainable-in-water-cleaning-yacht',
    title: 'Sustainable In-Water Cleaning: Engineering Management for European Coastal Yacht Compliance',
    category: 'Technical Guidance',
    date: '2026-02-20',
    readTime: 7,
    description: 'Technical guidance on managing in-water cleaning operations for vessels 25m+ and 50m+.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-002.pdf',
    relatedSlugs: ['biofouling-compliance-imo-2026'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: ['managed-in-water-cleaning'],
  },
  {
    slug: 'biofouling-compliance-imo-2026',
    title: 'Biofouling Compliance: Preparing for the IMO 2026 Transition',
    category: 'Regulation',
    date: '2026-01-20',
    readTime: 6,
    description: 'A real-world superyacht case study on proactive biofouling management.',
    contentHtml: '<p><strong>Mock content.</strong> Replace with actual HTML later.</p>',
    pdfUrl: '/pdfs/ADRI-TIS-001.pdf',
    relatedSlugs: ['sustainable-in-water-cleaning-yacht'],
    relatedServices: ['sustainable-technologies'],
    relatedCaseStudies: ['biofouling-management-mediterranean', 'managed-in-water-cleaning'],
  },
];
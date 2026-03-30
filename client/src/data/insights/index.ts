// Insight arayüzü (tip tanımı)
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
  relatedServices?: string[];
  relatedCaseStudies?: string[];
}

// Makale importları
import { zeroEmissionZone } from './zero-emission-zone';
import { technicalOperations } from './technical-operations';
import { sustainableCleaning } from './sustainable-cleaning';
import { biofoulingCompliance } from './biofouling-compliance';

export const insights = [
  zeroEmissionZone,
  technicalOperations,
  sustainableCleaning,
  biofoulingCompliance,
];
// ─── Insight interface ───────────────────────────────────────────────────────

export interface OperationalImplication {
  /** Short action-oriented statement — "What should I do?" */
  point: string;
  /** Optional internal link for this specific point */
  href?: string;
}

export interface OperationalImplications {
  /** Section heading — defaults to "Operational Implications" if omitted */
  heading?: string;
  /** Brief framing sentence shown above the list */
  summary?: string;
  /** Action items — max 5 for readability */
  points: OperationalImplication[];
  /** Primary CTA shown at the bottom of the block */
  cta?: {
    label: string;
    href: string;
  };
}

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
  /** Optional decision-support block rendered at the bottom of the article */
  operationalImplications?: OperationalImplications;
}

// ─── Article imports ──────────────────────────────────────────────────────────
import { zeroEmissionZone }    from './zero-emission-zone';
import { technicalOperations } from './technical-operations';
import { sustainableCleaning } from './sustainable-cleaning';
import { biofoulingCompliance } from './biofouling-compliance';

export const insights: Insight[] = [
  zeroEmissionZone,
  technicalOperations,
  sustainableCleaning,
  biofoulingCompliance,
];
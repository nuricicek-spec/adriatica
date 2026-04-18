import { zeroEmissionZone } from "./zero-emission-zone";
import { technicalOperations } from "./technical-operations";
import { sustainableCleaning } from "./sustainable-cleaning";
import { biofoulingCompliance } from "./biofouling-compliance";

export interface OperationalImplication {
  point: string;
  href?: string;
}

export interface OperationalImplications {
  heading?: string;
  summary?: string;
  points: OperationalImplication[];
  cta?: { label: string; href: string };
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
  operationalImplications?: OperationalImplications;
}

export const insights: Insight[] = [
  zeroEmissionZone,
  technicalOperations,
  sustainableCleaning,
  biofoulingCompliance,
];

export interface ContentItem {
  slug: string;
  type: 'service' | 'case-study' | 'insight';
  tags: string[];
  title: string;
  description?: string;
  [key: string]: unknown;
}
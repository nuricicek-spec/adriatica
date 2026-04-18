export interface Tag {
  name: string;
  weight: number;
  category: string;
  count: number;
  parent?: string;
}

export interface ContentItem {
  slug: string;
  type: 'service' | 'case-study' | 'insight';
  tags: Tag[];
  title: string;
  description?: string;
  date?: string;
  [key: string]: unknown;
}
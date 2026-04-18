import taxonomyData from '@/data/taxonomy.json';

export interface TaxonomyTag {
  name: string;
  weight: number;
  category: 'regulation' | 'technical' | 'operation' | 'geography' | 'vessel_type';
  parent?: string;
  synonyms: string[];
}

interface RawTaxonomy {
  [key: string]: {
    weight: number;
    category: string;
    parent?: string;
    synonyms: string[];
  };
}

const raw = taxonomyData as RawTaxonomy;

export const MARITIME_TAXONOMY: Record<string, TaxonomyTag> = {};

for (const [key, value] of Object.entries(raw)) {
  MARITIME_TAXONOMY[key] = {
    name: key,
    weight: value.weight,
    category: value.category as TaxonomyTag['category'],
    parent: value.parent,
    synonyms: value.synonyms,
  };
}
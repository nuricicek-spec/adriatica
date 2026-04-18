import { MARITIME_TAXONOMY } from './taxonomy';

export interface ExtractedTag {
  name: string;
  weight: number;
  category: string;
  count: number;
  parent?: string;
}

/** Regex için güvenli escape */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Maritime-specific stemming map */
const stemMap: Record<string, string> = {
  'biofoulings': 'biofouling',
  'bio-fouling': 'biofouling',
  'bio fouling': 'biofouling',
  'classifications': 'classification',
  'regulations': 'regulation',
  'inspections': 'inspection',
  'anti-fouling': 'antifouling',
  'antifouling': 'antifouling',
  'p&i': 'pi',
  'p and i': 'pi',
};

function stem(word: string): string {
  const lower = word.toLowerCase();
  return stemMap[lower] || lower;
}

/** Tokenization + stemming (hem extraction hem BM25 için ortak kullanılır) */
export function tokenize(text: string): string[] {
  let processed = text.toLowerCase();
  // MEPC.378(80) → MEPC378 gibi normalizasyon
  processed = processed.replace(/([A-Z]{2,})\.?\s*(\d+)/g, '$1$2');
  // Sadece alfanümerik, nokta, tire, parantez ve boşluk bırak
  processed = processed.replace(/[^a-z0-9.\-()\s]/g, ' ');
  const tokens = processed.split(/\s+/).filter(t => t.length > 1);
  return tokens.map(stem);
}

// Taxonomy compile (STEMMED synonyms ile)
const compiledTaxonomy = Object.entries(MARITIME_TAXONOMY).map(([name, def]) => {
  // JSON'dan gelebilecek undefined/null koruması
  const safeSynonyms = (def.synonyms || []).map(s => String(s ?? ''));

  return {
    name,
    weight: def.weight,
    category: def.category,
    parent: def.parent ? String(def.parent) : undefined,
    regexPatterns: safeSynonyms.map(syn => {
      const stemmedSyn = tokenize(syn).join(' ');
      const escaped = escapeRegex(stemmedSyn);

      if (stemmedSyn.length <= 3) {
        return new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'gi');
      }
      return new RegExp(`\\b${escaped}\\b`, 'gi');
    }),
  };
});

/** Stemmed text ile regex matching (overlap korumalı) */
function countMatches(text: string, patterns: RegExp[]): number {
  const stemmedTokens = tokenize(text);
  const processedText = stemmedTokens.join(' ');
  const lowerText = processedText.toLowerCase();

  const matchedIndices = new Set<number>();
  let total = 0;

  for (const pattern of patterns) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = regex.exec(lowerText)) !== null) {
      const idx = match.index;
      if (!matchedIndices.has(idx)) {
        matchedIndices.add(idx);
        total++;
      }
    }
  }
  return total;
}

/** Basit ve hızlı hash (crypto yerine – browser/edge uyumlu) */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getCacheKey(text: string): string {
  const sample = text.length > 500 ? text.slice(0, 500) : text;
  return simpleHash(sample);
}

const memoCache = new Map<string, ExtractedTag[]>();
const MAX_CACHE_SIZE = 500;

export function extractTags(text: string): ExtractedTag[] {
  if (!text) return [];

  const cacheKey = getCacheKey(text);

  if (memoCache.has(cacheKey)) {
    return memoCache.get(cacheKey)!;
  }

  const result: ExtractedTag[] = [];

  for (const tax of compiledTaxonomy) {
    const matchCount = countMatches(text, tax.regexPatterns);
    if (matchCount === 0) continue;

    const normalizedCount = Math.min(Math.log2(1 + matchCount), 5);

    result.push({
      name: tax.name,
      weight: tax.weight,
      category: tax.category,
      parent: tax.parent,
      count: normalizedCount,
    });
  }

  // LRU cache temizliği
  if (memoCache.size >= MAX_CACHE_SIZE) {
    const firstKey = memoCache.keys().next().value!; // TypeScript hatası burada giderildi
    memoCache.delete(firstKey);
  }

  memoCache.set(cacheKey, result);
  return result;
}
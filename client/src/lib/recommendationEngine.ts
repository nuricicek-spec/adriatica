import { allContent, bm25 } from './contentIndex';
import type { ContentItem, Tag } from '@/types/content';

let precomputedIndex: Record<string, string[]> | null = null;
try {
  precomputedIndex = require('@/generated/relatedIndex.json');
} catch {
  // Fallback to runtime computation (dev mode)
}

function calculateTagScore(currentTag: Tag, otherTag: Tag): number {
  let score = (currentTag.weight + otherTag.weight) / 2;
  const freqBonus = Math.log2(1 + currentTag.count + otherTag.count) * 0.8;
  score += freqBonus;
  if (currentTag.category === otherTag.category) score += 1;
  if (currentTag.parent && otherTag.parent && currentTag.parent === otherTag.parent) score += 1.5;
  return score;
}

function getRecencyBonus(item: ContentItem): number {
  if (item.type !== 'insight' || !item.date) return 0;
  const ts = Date.parse(item.date);
  if (isNaN(ts)) return 0;
  const daysSince = (Date.now() - ts) / (1000 * 60 * 60 * 24);
  return Math.max(0, 2 - daysSince / 30);
}

function jaccardSimilarity(a: ContentItem, b: ContentItem): number {
  const setA = new Set(a.tags.map(t => t.name));
  const setB = new Set(b.tags.map(t => t.name));
  if (setA.size < 2 || setB.size < 2) return 0;
  const intersection = new Set([...setA].filter(x => setB.has(x))).size;
  const union = setA.size + setB.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

function computeRelatedItems(currentItem: ContentItem, limit: number): ContentItem[] {
  const currentTagsMap = new Map(currentItem.tags.map(t => [t.name, t]));

  const taxonomyScores = new Map<string, number>();
  for (const item of allContent) {
    if (item.slug === currentItem.slug) continue;
    if (item.tags.length === 0) continue;
    let total = 0;
    for (const tag of item.tags) {
      const currentTag = currentTagsMap.get(tag.name);
      if (currentTag) {
        total += calculateTagScore(currentTag, tag);
      } else {
        const parentMatch = Array.from(currentTagsMap.values()).find(t => t.parent && t.parent === tag.parent);
        if (parentMatch) total += ((parentMatch.weight + tag.weight) / 2) * 0.25;
      }
    }
    taxonomyScores.set(item.slug, total);
  }

  const queryText = [currentItem.title, currentItem.description || '', ...currentItem.tags.map(t => t.name)].join(' ');
  const bm25Raw = bm25.score(queryText);
  const bm25Values = Array.from(bm25Raw.values()) as number[];
  const minBm = Math.min(...bm25Values);
  const maxBm = Math.max(...bm25Values);
  const bm25Normalized = new Map<string, number>();
  for (const [slug, score] of bm25Raw.entries()) {
    const norm = maxBm === minBm ? 0 : (score - minBm) / (maxBm - minBm);
    bm25Normalized.set(slug, norm);
  }

  const taxonomyValues = Array.from(taxonomyScores.values());
  const maxTax = Math.max(...taxonomyValues, 1);
  const taxonomyNormalized = new Map<string, number>();
  for (const [slug, score] of taxonomyScores.entries()) {
    taxonomyNormalized.set(slug, score / maxTax);
  }

  const hybridScores: { slug: string; score: number; item: ContentItem }[] = [];
  for (const item of allContent) {
    if (item.slug === currentItem.slug) continue;
    const taxNorm = taxonomyNormalized.get(item.slug) || 0;
    const bm25Norm = bm25Normalized.get(item.slug) || 0;
    const recencyBonus = getRecencyBonus(item);
    const sameTypeBonus = item.type === currentItem.type ? 0.5 : 0;
    const hybrid = (taxNorm * 0.5) + (bm25Norm * 0.4) + (recencyBonus * 0.1) + sameTypeBonus;
    hybridScores.push({ slug: item.slug, score: hybrid, item });
  }

  hybridScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.item.type !== b.item.type) return a.item.type.localeCompare(b.item.type);
    return a.item.slug.localeCompare(b.item.slug);
  });

  if (hybridScores.length === 0) return [];
  const maxScore = Math.max(...hybridScores.map(s => s.score));
  if (maxScore === 0) return [];
  const threshold = Math.max(maxScore * 0.3, 0.5);
  const filtered = hybridScores.filter(s => s.score >= threshold);

  const diversified: ContentItem[] = [];
  for (const { item } of filtered) {
    const isDiverse = diversified.every(existing => jaccardSimilarity(existing, item) < 0.35);
    if (isDiverse) {
      diversified.push(item);
      if (diversified.length === limit) break;
    }
  }

  if (diversified.length < limit) {
    for (const { item } of filtered) {
      if (!diversified.includes(item)) {
        diversified.push(item);
        if (diversified.length === limit) break;
      }
    }
  }

  return diversified;
}

export function getRelatedContent(currentItem: ContentItem, limit: number = 4): ContentItem[] {
  if (precomputedIndex && precomputedIndex[currentItem.slug]) {
    const relatedSlugs = precomputedIndex[currentItem.slug].slice(0, limit);
    return relatedSlugs
      .map(slug => allContent.find(c => c.slug === slug))
      .filter((c): c is ContentItem => c !== undefined);
  }
  return computeRelatedItems(currentItem, limit);
}
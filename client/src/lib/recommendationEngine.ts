import { allContent } from './contentIndex';
import type { ContentItem } from '@/types/content';

export function getRelatedContent(
  currentItem: ContentItem,
  limit: number = 4
): ContentItem[] {
  const scored = allContent
    .filter(item => item.slug !== currentItem.slug)
    .map(item => {
      const commonTags = item.tags.filter(tag => currentItem.tags.includes(tag));
      const tagMatchCount = commonTags.length;
      const sameTypeBonus = item.type === currentItem.type ? 1 : 0;
      const score = tagMatchCount * 4 + sameTypeBonus;
      return { item, score };
    })
    .filter(scored => scored.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(scored => scored.item);
  
  return scored;
}
import { MARITIME_TAXONOMY } from './taxonomy';

export function extractTags(text: string): string[] {
  const lowerText = text.toLowerCase();
  const matchedTags = new Set<string>();
  
  for (const [tag, patterns] of Object.entries(MARITIME_TAXONOMY)) {
    for (const pattern of patterns) {
      if (lowerText.includes(pattern)) {
        matchedTags.add(tag);
        break;
      }
    }
  }
  
  return Array.from(matchedTags);
}
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allContent } from '../client/src/lib/contentIndex';
import { getRelatedContent } from '../client/src/lib/recommendationEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const relatedIndex: Record<string, string[]> = {};

for (const item of allContent) {
  const related = getRelatedContent(item, 6);
  relatedIndex[item.slug] = related.map((r: { slug: string }) => r.slug);
}

const outDir = path.join(__dirname, '../client/src/generated');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(
  path.join(outDir, 'relatedIndex.json'),
  JSON.stringify(relatedIndex, null, 2)
);

console.log(`✅ Precomputed recommendations for ${allContent.length} items`);
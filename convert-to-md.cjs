const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ============================================================
// 1. KONFİGÜRASYON
// ============================================================
const CONFIG = {
  inputDirs: ["./client/src/data", "./client/src/pages"],
  outputRoot: "./knowledge-base",
  chunkMaxTokens: 800,
  chunkOverlap: 100,
  minContentLength: 50,
  skipPatterns: [/index\.tsx?$/, /_app\.tsx?$/, /_document\.tsx?$/],
};

// ============================================================
// 2. YARDIMCI FONKSİYONLAR
// ============================================================

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function smartTitle(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();
}

function generateId(filePath) {
  const relative = filePath.replace(/^.*client\/src\//, "");
  const withoutExt = relative.replace(/\.(ts|tsx|js|jsx|json|md)$/, "");
  return slugify(withoutExt);
}

function generateUrl(filePath) {
  let url =
    "/" +
    filePath
      .replace(/^.*client\/src\//, "")
      .replace(/\.(ts|tsx|js|jsx|json|md)$/, "")
      .replace(/index$/, "");
  if (url.endsWith("/index")) url = url.slice(0, -6);
  return url;
}

function detectType(filePath, content) {
  const lowerPath = filePath.toLowerCase();
  if (lowerPath.includes("insights")) return "insight";
  if (lowerPath.includes("casestudies")) return "case-study";
  if (lowerPath.includes("services")) return "service";
  if (lowerPath.includes("deliverables")) return "deliverable";
  if (lowerPath.includes("pages")) return "page";
  if (content.includes("IMO") || content.includes("MARPOL")) return "insight";
  if (content.includes("case study") || content.includes("project"))
    return "case-study";
  return "unknown";
}

function calculateConfidence(mode, priority) {
  if (mode === "CLEAN_DATA" || mode === "CLEAN_PAGE") return 0.95;
  if (mode === "SEMI_CLEAN") return 0.7;
  if (priority === "high") return 0.85;
  return 0.4;
}

function createMetadata({ id, title, type, url, mode, priority, content }) {
  const confidence = calculateConfidence(mode, priority);
  const hash = crypto.createHash("md5").update(content).digest("hex");
  let section = "general";
  if (/(regulation|compliance|imo|marpol|solas)/i.test(content))
    section = "regulation";
  else if (/(performance|efficiency|fuel|emission)/i.test(content))
    section = "performance";
  else if (/(design|structural|drawing|plan)/i.test(content))
    section = "design";

  return {
    id,
    title,
    type,
    url,
    intent: "informational",
    stage: "awareness",
    complexity: "basic",
    tags: [],
    related_pages: [],
    cta: "/request-consultation",
    cta_label: "Talk to our engineers",
    priority: priority === "high" ? "high" : "low",
    source: mode.startsWith("CLEAN") ? "clean" : "raw",
    confidence,
    content_hash: hash,
    section,
  };
}

function toFrontmatter(meta) {
  return `---\n${Object.entries(meta)
    .map(([k, v]) => {
      if (Array.isArray(v))
        return `${k}: [${v.map((i) => `"${i}"`).join(", ")}]`;
      if (typeof v === "string") return `${k}: "${v.replace(/"/g, '\\"')}"`;
      return `${k}: ${v}`;
    })
    .join("\n")}\n---\n\n`;
}

// ============================================================
// 3. İÇERİK TEMİZLEME (CLEANING PIPELINE)
// ============================================================

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeCodeNoise(content) {
  return content
    .replace(/import[\s\S]*?;?\n/g, "")
    .replace(/export[\s\S]*?;?\n/g, "")
    .replace(/\b(const|let|var|function|class|interface|type)\s+[^\n]+/g, "")
    .replace(/\{[^}]+\}/g, "")
    .replace(/className\s*=\s*["'][^"']*["']/g, "")
    .replace(/on\w+\s*=\s*\{[^}]+\}/g, "")
    .replace(/\/\/.*$/gm, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");
}

function extractTSContent(content) {
  const match = content.match(/content:\s*`([\s\S]*?)`/);
  if (match) return match[1];
  const altMatch = content.match(/content:\s*"([^"]+)"/);
  return altMatch ? altMatch[1] : null;
}

function extractPageText(content) {
  let mainContent = content;
  const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
  if (mainMatch) mainContent = mainMatch[0];
  else {
    const containerMatch = content.match(
      /<div[^>]*class="[^"]*max-w-7xl[^"]*"[\s\S]*?<\/div>/i,
    );
    if (containerMatch) mainContent = containerMatch[0];
  }
  const blocks = mainContent.match(/<(p|h1|h2|h3|li)[^>]*>([\s\S]*?)<\/\1>/gi);
  if (!blocks) return "";
  return blocks.map((block) => stripHtml(block)).join("\n\n");
}

// ============================================================
// 4. TOKEN HESABI VE CHUNKING
// ============================================================

function estimateTokens(text) {
  const words = text.split(/\s+/).length;
  return Math.ceil(words * 1.3);
}

function splitByHeadings(text) {
  const sections = text.split(/\n(?=##+ )/);
  const intro = sections[0].trim().startsWith("##") ? "" : sections.shift();
  const chunks = [];
  if (intro && intro.trim().length > 100) {
    chunks.push({ title: "intro", content: intro.trim() });
  }
  sections.forEach((section) => {
    const headingMatch = section.match(/^(##+)\s+(.*)$/m);
    if (headingMatch) {
      const title = headingMatch[2].trim();
      chunks.push({ title: slugify(title), content: section.trim() });
    } else if (section.trim().length > 100) {
      chunks.push({ title: "section", content: section.trim() });
    }
  });
  return chunks;
}

function applyOverlap(chunks, overlapChars = 100) {
  if (chunks.length <= 1) return chunks;
  return chunks.map((chunk, i) => {
    if (i === 0) return chunk;
    const prevContent = chunks[i - 1].content;
    const overlap = prevContent.slice(-overlapChars);
    return {
      ...chunk,
      content: overlap + "\n\n" + chunk.content,
    };
  });
}

// ============================================================
// 5. ANA İŞLEME (PROCESSING PIPELINE)
// ============================================================

function processFile(filePath, stats) {
  const raw = fs.readFileSync(filePath, "utf8");
  const relativePath = filePath.replace(/^.*client\/src\//, "");

  if (CONFIG.skipPatterns.some((pattern) => pattern.test(filePath))) {
    console.log(`⏭ Skipping (routing): ${relativePath}`);
    stats.skipped++;
    return;
  }

  let content = "";
  let mode = "RAW";
  let priority = "low";

  if (filePath.includes("/data/")) {
    const extracted = extractTSContent(raw);
    if (extracted) {
      content = stripHtml(extracted);
      content = removeCodeNoise(content);
      mode = "CLEAN_DATA";
      priority = "high";
    } else {
      content = stripHtml(removeCodeNoise(raw));
      mode = "SEMI_CLEAN_DATA";
      priority = "medium";
    }
  } else if (filePath.includes("/pages/")) {
    const extracted = extractPageText(raw);
    if (extracted && extracted.length > 100) {
      content = extracted;
      mode = "CLEAN_PAGE";
      priority = "high";
    } else {
      content = stripHtml(removeCodeNoise(raw));
      mode = "SEMI_CLEAN_PAGE";
      priority = "medium";
    }
  } else {
    content = stripHtml(removeCodeNoise(raw));
    mode = "RAW";
    priority = "low";
  }

  if (content.length < CONFIG.minContentLength) {
    console.log(`⏭ Skipping (too short): ${relativePath}`);
    stats.skipped++;
    return;
  }

  const idBase = generateId(filePath);
  const rawTitle = path.basename(filePath, path.extname(filePath));
  const title = smartTitle(rawTitle);
  const type = detectType(filePath, content);
  const url = generateUrl(filePath);
  const metadata = createMetadata({
    id: idBase,
    title,
    type,
    url,
    mode,
    priority,
    content,
  });

  const targetSub = priority === "high" ? "clean" : "raw";
  const outDir = path.join(
    CONFIG.outputRoot,
    targetSub,
    path.dirname(relativePath),
  );

  const approxTokens = estimateTokens(content);
  if (approxTokens > CONFIG.chunkMaxTokens) {
    console.log(`✂️ Chunking ${relativePath} (${approxTokens} tokens)`);
    let chunks = splitByHeadings(content);
    chunks = applyOverlap(chunks, CONFIG.chunkOverlap);

    chunks.forEach((chunk, _idx) => {
      // _idx kullanılmıyor -> uyarı yok
      const chunkId = chunks.length === 1 ? idBase : `${idBase}-${chunk.title}`;
      const chunkTitle =
        chunks.length === 1
          ? title
          : `${title}: ${chunk.title.replace(/-/g, " ")}`;
      const chunkMeta = { ...metadata, id: chunkId, title: chunkTitle };
      const final = toFrontmatter(chunkMeta) + chunk.content;
      const outPath = path.join(outDir, `${chunkId}.md`);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, final);
      stats.chunks++;
    });
    stats.processed++;
  } else {
    const final = toFrontmatter(metadata) + content;
    const outPath = path.join(outDir, `${idBase}.md`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, final);
    stats.processed++;
  }
}

// ============================================================
// 6. TARAMA (RECURSIVE WALK)
// ============================================================

function walkDir(dir, stats) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, stats);
    } else if (/\.(ts|tsx|js|jsx|json|md)$/.test(file)) {
      try {
        processFile(fullPath, stats);
      } catch (err) {
        console.error(`❌ Error processing ${fullPath}:`, err.message);
        stats.errors++;
      }
    }
  }
}

// ============================================================
// 7. ANA ÇALIŞTIRICI
// ============================================================

function main() {
  console.log("🚀 Starting hybrid ingestion (production-grade)...\n");

  if (!fs.existsSync(CONFIG.outputRoot))
    fs.mkdirSync(CONFIG.outputRoot, { recursive: true });
  ["clean", "raw"].forEach((sub) => {
    const subPath = path.join(CONFIG.outputRoot, sub);
    if (!fs.existsSync(subPath)) fs.mkdirSync(subPath, { recursive: true });
  });

  const stats = { processed: 0, skipped: 0, chunks: 0, errors: 0 };

  for (const dir of CONFIG.inputDirs) {
    if (fs.existsSync(dir)) {
      console.log(`📁 Scanning ${dir}`);
      walkDir(dir, stats);
    } else {
      console.log(`⚠️ Directory not found: ${dir}`);
    }
  }

  console.log(`\n✅ Done.`);
  console.log(`   Processed files: ${stats.processed}`);
  console.log(`   Skipped files: ${stats.skipped}`);
  console.log(`   Created chunks: ${stats.chunks}`);
  console.log(`   Errors: ${stats.errors}`);
  console.log(`   Output: ${CONFIG.outputRoot}/{clean,raw}`);
}

// ============================================================
// 8. ÇALIŞTIR
// ============================================================
if (require.main === module) {
  main();
}

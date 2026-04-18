export interface BM25Document {
  id: string;
  text: string;
}

export interface BM25Options {
  k1?: number;
  b?: number;
}

class BM25 {
  private docs: BM25Document[];
  private idf: Map<string, number>;
  private avgDocLength: number;
  private k1: number;
  private b: number;
  private termFreqs: Map<string, number>[];

  constructor(docs: BM25Document[], options: BM25Options = {}) {
    this.docs = docs;
    this.k1 = options.k1 ?? 1.2;
    this.b = options.b ?? 0.75;
    const N = docs.length;
    const docLengths: number[] = [];
    const termDocFreq = new Map<string, number>();
    const tokenizedDocs = docs.map(doc => {
      const tokens = this.tokenize(doc.text);
      docLengths.push(tokens.length);
      const uniqueTerms = new Set(tokens);
      for (const term of uniqueTerms) {
        termDocFreq.set(term, (termDocFreq.get(term) || 0) + 1);
      }
      return tokens;
    });

    const totalLength = docLengths.reduce((a, b) => a + b, 0);
    this.avgDocLength = totalLength / (N || 1);
    if (this.avgDocLength === 0) this.avgDocLength = 1;

    this.idf = new Map();
    for (const [term, df] of termDocFreq.entries()) {
      this.idf.set(term, Math.log((N - df + 0.5) / (df + 0.5) + 1));
    }

    this.termFreqs = tokenizedDocs.map(tokens => {
      const freq = new Map<string, number>();
      for (const t of tokens) {
        freq.set(t, (freq.get(t) || 0) + 1);
      }
      return freq;
    });
  }

  private tokenize(text: string): string[] {
    let processed = text.toLowerCase();
    processed = processed.replace(/([A-Z]{2,})\.?\s*(\d+)/g, '$1$2');
    processed = processed.replace(/[^a-z0-9.\-()\s]/g, ' ');
    return processed.split(/\s+/).filter(t => t.length > 1);
  }

  score(query: string): Map<string, number> {
    const queryTokens = this.tokenize(query);
    const queryFreq = new Map<string, number>();
    for (const t of queryTokens) {
      queryFreq.set(t, (queryFreq.get(t) || 0) + 1);
    }

    const scores = new Map<string, number>();
    for (let i = 0; i < this.docs.length; i++) {
      const doc = this.docs[i];
      const termFreq = this.termFreqs[i];
      const docLen = Array.from(termFreq.values()).reduce((a, b) => a + b, 0);
      let score = 0;

      for (const [token, qf] of queryFreq) {
        const idf = this.idf.get(token) || 0;
        const tf = termFreq.get(token) || 0;
        const numerator = tf * (this.k1 + 1);
        const denominator = tf + this.k1 * (1 - this.b + this.b * (docLen / this.avgDocLength));
        score += idf * (numerator / denominator) * qf;
      }
      scores.set(doc.id, score);
    }
    return scores;
  }
}

let bm25Instance: BM25 | null = null;

export function getBM25(docs?: BM25Document[], options?: BM25Options): BM25 {
  if (!bm25Instance) {
    if (!docs) throw new Error('BM25 not initialized');
    bm25Instance = new BM25(docs, options);
  }
  return bm25Instance;
}

export function initBM25(docs: BM25Document[], options?: BM25Options): BM25 {
  bm25Instance = new BM25(docs, options);
  return bm25Instance;
}
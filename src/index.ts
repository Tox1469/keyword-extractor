// keyword-extractor: RAKE-style keyword extraction
const DEFAULT_STOPWORDS = new Set([
  "a", "o", "as", "os", "um", "uma", "de", "do", "da", "dos", "das", "e",
  "é", "em", "no", "na", "nos", "nas", "para", "por", "com", "que", "se",
  "mas", "ou", "the", "a", "an", "and", "or", "of", "to", "in", "on", "is",
  "are", "was", "were", "be", "been", "for", "with",
]);

export interface Keyword {
  phrase: string;
  score: number;
}

export interface RakeOptions {
  stopwords?: Set<string>;
  maxKeywords?: number;
  minPhraseLength?: number;
}

export function extractKeywords(text: string, opts: RakeOptions = {}): Keyword[] {
  const stop = opts.stopwords ?? DEFAULT_STOPWORDS;
  const maxKeywords = opts.maxKeywords ?? 10;
  const minLen = opts.minPhraseLength ?? 1;

  const sentences = text.toLowerCase().split(/[.!?,;:\n]+/);
  const phrases: string[][] = [];
  for (const s of sentences) {
    const tokens = s.match(/[\p{L}\p{N}]+/gu) ?? [];
    let current: string[] = [];
    for (const t of tokens) {
      if (stop.has(t)) {
        if (current.length >= minLen) phrases.push(current);
        current = [];
      } else {
        current.push(t);
      }
    }
    if (current.length >= minLen) phrases.push(current);
  }

  const freq = new Map<string, number>();
  const degree = new Map<string, number>();
  for (const p of phrases) {
    const d = p.length - 1;
    for (const w of p) {
      freq.set(w, (freq.get(w) ?? 0) + 1);
      degree.set(w, (degree.get(w) ?? 0) + d);
    }
  }
  for (const w of freq.keys()) {
    degree.set(w, (degree.get(w) ?? 0) + (freq.get(w) ?? 0));
  }

  const wordScore = new Map<string, number>();
  for (const w of freq.keys()) {
    wordScore.set(w, (degree.get(w) ?? 0) / (freq.get(w) ?? 1));
  }

  const phraseScores = new Map<string, number>();
  for (const p of phrases) {
    const key = p.join(" ");
    const score = p.reduce((a, w) => a + (wordScore.get(w) ?? 0), 0);
    if (!phraseScores.has(key) || (phraseScores.get(key) ?? 0) < score) {
      phraseScores.set(key, score);
    }
  }

  return Array.from(phraseScores.entries())
    .map(([phrase, score]) => ({ phrase, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxKeywords);
}

export default extractKeywords;

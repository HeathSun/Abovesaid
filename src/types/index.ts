export type ImportanceLevel = 1 | 2 | 3 | 4 | 5;

export type HighlightType =
  | 'Main Claim'
  | 'Supporting Evidence'
  | 'Reasoning / Explanation'
  | 'Example / Illustration'
  | 'Counterpoint / Caveat'
  | 'Background / Context';

export interface SentenceAnalysis {
  sentence: string;
  importance: ImportanceLevel;
  type: HighlightType;
  startIndex: number;
  endIndex: number;
  confidence?: number; // 0-100, from Perplexity fact-check
  factChecked?: boolean;
  sources?: string[]; // Source URLs from Perplexity
}

export interface PageHighlights {
  url: string;
  highlights: SentenceAnalysis[];
  timestamp: number;
}

export interface GroqAnalysisResponse {
  sentences: Array<{
    text: string;
    importance: ImportanceLevel;
    type: HighlightType;
  }>;
}


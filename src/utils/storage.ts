import type { PageHighlights, SentenceAnalysis } from '../types';

const STORAGE_PREFIX = 'abovesaid_';

function getNormalizedUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    // Remove query params and hash for consistent storage key
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  } catch {
    return url;
  }
}

export async function saveHighlights(
  url: string,
  highlights: SentenceAnalysis[]
): Promise<void> {
  const normalizedUrl = getNormalizedUrl(url);
  const key = `${STORAGE_PREFIX}${normalizedUrl}`;

  const pageHighlights: PageHighlights = {
    url: normalizedUrl,
    highlights,
    timestamp: Date.now(),
  };

  await chrome.storage.local.set({ [key]: pageHighlights });
}

export async function loadHighlights(url: string): Promise<SentenceAnalysis[]> {
  const normalizedUrl = getNormalizedUrl(url);
  const key = `${STORAGE_PREFIX}${normalizedUrl}`;

  const result = await chrome.storage.local.get(key);
  const pageHighlights: PageHighlights | undefined = result[key];

  return pageHighlights?.highlights || [];
}

export async function removeHighlights(url: string): Promise<void> {
  const normalizedUrl = getNormalizedUrl(url);
  const key = `${STORAGE_PREFIX}${normalizedUrl}`;

  await chrome.storage.local.remove(key);
}

export async function hasHighlights(url: string): Promise<boolean> {
  const normalizedUrl = getNormalizedUrl(url);
  const key = `${STORAGE_PREFIX}${normalizedUrl}`;

  const result = await chrome.storage.local.get(key);
  return !!result[key];
}


import type { SentenceAnalysis } from '../types';

export function applyHighlights(
  container: HTMLElement,
  analyses: SentenceAnalysis[]
): void {
  // Get all text content from the container
  const textContent = container.textContent || '';

  // Create a document fragment to build the new content
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let node: Text | null;

  while ((node = walker.nextNode() as Text)) {
    if (node.textContent?.trim()) {
      textNodes.push(node);
    }
  }

  // Process each text node
  for (const textNode of textNodes) {
    const nodeText = textNode.textContent || '';
    const offset = textContent.indexOf(nodeText);

    if (offset === -1) continue;

    // Find which analyses overlap with this text node
    const relevantAnalyses = analyses.filter(
      (analysis) =>
        analysis.startIndex < offset + nodeText.length &&
        analysis.endIndex > offset
    );

    if (relevantAnalyses.length === 0) continue;

    // Build replacement nodes
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const analysis of relevantAnalyses) {
      const localStart = Math.max(0, analysis.startIndex - offset);
      const localEnd = Math.min(nodeText.length, analysis.endIndex - offset);

      if (localStart < 0 || localEnd > nodeText.length) continue;

      // Add text before highlight
      if (lastIndex < localStart) {
        fragment.appendChild(
          document.createTextNode(nodeText.substring(lastIndex, localStart))
        );
      }

      // Create highlight span
      const span = document.createElement('span');
      span.className = 'abovesaid-highlight';
      span.setAttribute('data-importance', analysis.importance.toString());
      span.setAttribute('data-type', analysis.type);
      span.textContent = nodeText.substring(localStart, localEnd);

      // Add tooltip
      const tooltip = document.createElement('span');
      tooltip.className = 'abovesaid-tooltip';
      tooltip.textContent = `${analysis.type} (Importance: ${analysis.importance}/5)`;
      span.appendChild(tooltip);

      fragment.appendChild(span);
      lastIndex = localEnd;
    }

    // Add remaining text
    if (lastIndex < nodeText.length) {
      fragment.appendChild(
        document.createTextNode(nodeText.substring(lastIndex))
      );
    }

    // Replace the text node
    textNode.parentNode?.replaceChild(fragment, textNode);
  }
}

export function removeHighlights(container: HTMLElement): void {
  const highlights = container.querySelectorAll('.abovesaid-highlight');
  highlights.forEach((highlight) => {
    const parent = highlight.parentNode;
    if (parent) {
      // Replace highlight with its text content
      const textNode = document.createTextNode(highlight.textContent || '');
      parent.replaceChild(textNode, highlight);

      // Normalize to merge adjacent text nodes
      parent.normalize();
    }
  });
}

export function getMainContent(): HTMLElement | null {
  // Try to find the main content area
  const selectors = [
    'article',
    'main',
    '[role="main"]',
    '.post-content',
    '.article-content',
    '.content',
    'body',
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element && element.textContent && element.textContent.length > 200) {
      return element as HTMLElement;
    }
  }

  return document.body;
}


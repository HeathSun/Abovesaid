import type { SentenceAnalysis } from '../types';

export function applyHighlights(
  container: HTMLElement,
  analyses: SentenceAnalysis[]
): void {
  // Sort analyses by start index to process in order
  const sortedAnalyses = [...analyses].sort((a, b) => a.startIndex - b.startIndex);

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

  // Calculate cumulative offset for each text node
  let cumulativeOffset = 0;
  const nodeOffsets = new Map<Text, number>();
  
  for (const textNode of textNodes) {
    const nodeText = textNode.textContent || '';
    nodeOffsets.set(textNode, cumulativeOffset);
    cumulativeOffset += nodeText.length;
  }

  // Process each text node
  for (const textNode of textNodes) {
    const nodeText = textNode.textContent || '';
    const nodeOffset = nodeOffsets.get(textNode) || 0;
    const nodeEnd = nodeOffset + nodeText.length;

    // Find analyses that completely fit within this text node
    const relevantAnalyses = sortedAnalyses.filter((analysis) => {
      const analysisStart = analysis.startIndex;
      const analysisEnd = analysis.endIndex;
      // Only include if the entire analysis fits within this node
      return analysisStart >= nodeOffset && analysisEnd <= nodeEnd;
    });

    if (relevantAnalyses.length === 0) continue;

    // Build replacement nodes
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    for (const analysis of relevantAnalyses) {
      const localStart = analysis.startIndex - nodeOffset;
      const localEnd = analysis.endIndex - nodeOffset;

      // Ensure we don't break words - extend to word boundaries if needed
      let adjustedStart = localStart;
      let adjustedEnd = localEnd;

      // Add text before highlight
      if (lastIndex < adjustedStart) {
        fragment.appendChild(
          document.createTextNode(nodeText.substring(lastIndex, adjustedStart))
        );
      }

      // Create highlight span for the complete clause/phrase
      const span = document.createElement('span');
      span.className = 'abovesaid-highlight';
      span.setAttribute('data-importance', analysis.importance.toString());
      span.setAttribute('data-type', analysis.type);
      
      const highlightText = nodeText.substring(adjustedStart, adjustedEnd);
      span.textContent = highlightText;

      // Add tooltip with confidence and sources if available
      const tooltip = document.createElement('div');
      tooltip.className = 'abovesaid-tooltip';
      
      let tooltipHTML = `<strong>${analysis.type}</strong><br/>Importance: ${analysis.importance}/5`;
      
      if (analysis.factChecked && analysis.confidence !== undefined) {
        tooltipHTML += `<br/>Confidence: ${analysis.confidence}%`;
        
        if (analysis.sources && analysis.sources.length > 0) {
          tooltipHTML += '<br/><br/><strong>Sources:</strong><br/>';
          analysis.sources.slice(0, 3).forEach(source => {
            const domain = new URL(source).hostname.replace('www.', '');
            tooltipHTML += `🔗 <a href="${source}" target="_blank" rel="noopener">${domain}</a><br/>`;
          });
        }
      }
      
      tooltip.innerHTML = tooltipHTML;
      span.appendChild(tooltip);

      fragment.appendChild(span);
      lastIndex = adjustedEnd;
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


import { createRoot } from 'react-dom/client';
import { ImportanceButton } from '../components/ImportanceButton';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { RemoveButton } from '../components/RemoveButton';
import { analyzeTextWithGroq } from '../utils/groqApi';
import { saveHighlights, loadHighlights, removeHighlights as removeStoredHighlights, hasHighlights } from '../utils/storage';
import { applyHighlights, removeHighlights, getMainContent } from './highlighter';
import './content.css';

class AbovesaidContent {
  private buttonContainers: Map<HTMLElement, HTMLElement> = new Map();
  private loadingContainer: HTMLElement | null = null;
  private removeButtonContainer: HTMLElement | null = null;
  private currentUrl: string = window.location.href;

  async init() {
    // Check if highlights already exist for this page
    const hasExisting = await hasHighlights(this.currentUrl);
    
    if (hasExisting) {
      await this.loadAndApplyHighlights();
    }

    this.injectButtons();
  }

  private async loadAndApplyHighlights() {
    const highlights = await loadHighlights(this.currentUrl);
    
    if (highlights.length > 0) {
      const mainContent = getMainContent();
      if (mainContent) {
        applyHighlights(mainContent, highlights);
        this.showRemoveButton();
      }
    }
  }

  private injectButtons() {
    // Find only paragraph elements to avoid large containers
    const elements = document.querySelectorAll('p');

    elements.forEach((element) => {
      const textContent = element.textContent?.trim() || '';
      
      // Only add button to elements with substantial text
      if (textContent.length < 100) return;

      // Skip if already has a button
      if (this.buttonContainers.has(element as HTMLElement)) return;

      // Wrap element if needed
      const parent = element.parentElement;
      if (!parent) return;

      // Check if element has position relative/absolute, if not, add a wrapper
      const computedStyle = window.getComputedStyle(element);
      const position = computedStyle.position;

      let container: HTMLElement;
      
      if (position === 'static') {
        // Create wrapper
        container = document.createElement('div');
        container.className = 'abovesaid-paragraph-container';
        parent.insertBefore(container, element);
        container.appendChild(element);
      } else {
        container = element as HTMLElement;
        container.classList.add('abovesaid-paragraph-container');
      }

      // Create button container
      const buttonContainer = document.createElement('div');
      container.appendChild(buttonContainer);

      const root = createRoot(buttonContainer);
      root.render(
        <ImportanceButton
          onClick={() => this.handleAnalyze(element as HTMLElement)}
        />
      );

      this.buttonContainers.set(element as HTMLElement, buttonContainer);
    });
  }

  private collectParagraphContext(clickedElement: HTMLElement): { elements: HTMLElement[], text: string } {
    const MAX_CHARS = 3000;
    const allParagraphs = Array.from(document.querySelectorAll('p')) as HTMLElement[];
    const clickedIndex = allParagraphs.indexOf(clickedElement);
    
    if (clickedIndex === -1) {
      return { elements: [clickedElement], text: clickedElement.textContent || '' };
    }

    // Start with clicked paragraph
    const selectedElements: HTMLElement[] = [clickedElement];
    let totalLength = clickedElement.textContent?.length || 0;

    // Expand upward
    let upIndex = clickedIndex - 1;
    while (upIndex >= 0 && totalLength < MAX_CHARS) {
      const para = allParagraphs[upIndex];
      const paraLength = para.textContent?.length || 0;
      if (totalLength + paraLength <= MAX_CHARS) {
        selectedElements.unshift(para);
        totalLength += paraLength;
        upIndex--;
      } else {
        break;
      }
    }

    // Expand downward
    let downIndex = clickedIndex + 1;
    while (downIndex < allParagraphs.length && totalLength < MAX_CHARS) {
      const para = allParagraphs[downIndex];
      const paraLength = para.textContent?.length || 0;
      if (totalLength + paraLength <= MAX_CHARS) {
        selectedElements.push(para);
        totalLength += paraLength;
        downIndex++;
      } else {
        break;
      }
    }

    const combinedText = selectedElements.map(el => el.textContent || '').join('\n\n');
    return { elements: selectedElements, text: combinedText };
  }

  private async handleAnalyze(element: HTMLElement) {
    // Collect context paragraphs (up to 3000 chars)
    const { elements, text } = this.collectParagraphContext(element);
    
    console.log('Analyzing context:', {
      paragraphCount: elements.length,
      textLength: text.length,
      preview: text.substring(0, 200) + '...'
    });
    
    if (text.length < 50) {
      alert('Not enough text to analyze');
      return;
    }

    // Show loading indicator
    this.showLoading();

    try {
      // Analyze with Groq
      const analyses = await analyzeTextWithGroq(text);

      // Apply highlights to all collected paragraphs
      for (const el of elements) {
        applyHighlights(el, analyses);
      }

      // Load existing highlights for this page
      const existingHighlights = await loadHighlights(this.currentUrl);
      
      // Merge with new highlights
      const allHighlights = [...existingHighlights, ...analyses];
      
      // Save to storage
      await saveHighlights(this.currentUrl, allHighlights);

      // Show remove button
      this.showRemoveButton();
    } catch (error) {
      console.error('Error analyzing text:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      if (errorMessage.includes('413')) {
        alert('Text is too long for analysis.');
      } else if (errorMessage.includes('429')) {
        alert('API rate limit reached. Please wait a moment and try again.');
      } else {
        alert('Error analyzing text. Please check your internet connection and try again.');
      }
    } finally {
      this.hideLoading();
    }
  }

  private showLoading() {
    if (!this.loadingContainer) {
      this.loadingContainer = document.createElement('div');
      document.body.appendChild(this.loadingContainer);

      const root = createRoot(this.loadingContainer);
      root.render(<LoadingIndicator />);
    }
  }

  private hideLoading() {
    if (this.loadingContainer) {
      this.loadingContainer.remove();
      this.loadingContainer = null;
    }
  }

  private showRemoveButton() {
    if (!this.removeButtonContainer) {
      this.removeButtonContainer = document.createElement('div');
      document.body.appendChild(this.removeButtonContainer);

      const root = createRoot(this.removeButtonContainer);
      root.render(<RemoveButton onClick={() => this.handleRemove()} />);
    }
  }

  private hideRemoveButton() {
    if (this.removeButtonContainer) {
      this.removeButtonContainer.remove();
      this.removeButtonContainer = null;
    }
  }

  private async handleRemove() {
    const mainContent = getMainContent();
    if (mainContent) {
      removeHighlights(mainContent);
    }

    await removeStoredHighlights(this.currentUrl);
    this.hideRemoveButton();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new AbovesaidContent();
    app.init();
  });
} else {
  const app = new AbovesaidContent();
  app.init();
}


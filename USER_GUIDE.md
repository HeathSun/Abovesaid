# Abovesaid User Guide

## What is Abovesaid?

Abovesaid is an AI-powered browser extension that helps you quickly identify and understand the most important information in any article or web page. It analyzes text and highlights sentences based on their importance and type, making it easier to absorb knowledge efficiently.

## How to Use

### Basic Usage

1. **Navigate to any article or web page** with substantial text content
2. **Hover over a paragraph** - a purple button will appear on the right side
3. **Click the button** to analyze the entire page
4. **Wait 5-10 seconds** while the AI processes the content
5. **View the highlights** - sentences will be highlighted with varying intensities

### Understanding Highlights

#### Importance Levels (1-5)

The intensity of the yellow highlight indicates importance:

- **Level 1** (Lightest) - Background information, less critical
- **Level 2** - Supporting details
- **Level 3** - Moderate importance
- **Level 4** - Important points
- **Level 5** (Brightest) - Most critical information, main claims

#### Highlight Types

Each highlight has a colored left border indicating its type:

| Color | Type | Description |
|-------|------|-------------|
| 🔴 Red | Main Claim | Core thesis or primary argument |
| 🔵 Blue | Supporting Evidence | Facts, data, research findings |
| 🟣 Purple | Reasoning / Explanation | Logical explanations and analysis |
| 🟢 Green | Example / Illustration | Examples that demonstrate points |
| 🟠 Orange | Counterpoint / Caveat | Opposing views or limitations |
| ⚫ Gray | Background / Context | Background information |

### Viewing Details

**Hover over any highlighted text** to see a tooltip with:
- The highlight type
- The importance level (1-5)

### Removing Highlights

When highlights are active, a **"Remove Highlights"** button appears at the bottom-right of the page. Click it to:
- Clear all highlights from the current page
- Remove the saved highlights from storage

### Persistence

- Highlights are **automatically saved** to your browser storage
- When you revisit a page, **highlights are automatically restored**
- Each URL has its own set of highlights
- You can remove highlights at any time

## Best Practices

### When to Use Abovesaid

✅ **Great for:**
- Long-form articles and blog posts
- Research papers and academic content
- News articles and opinion pieces
- Documentation and technical guides
- Any text-heavy content you need to understand quickly

❌ **Not ideal for:**
- Very short content (<500 words)
- Pages with mostly images/videos
- Interactive applications
- Social media feeds

### Reading Strategy

1. **First Pass**: Look at Level 4-5 highlights to grasp main ideas
2. **Second Pass**: Read Level 3 highlights for supporting details
3. **Deep Dive**: Review Levels 1-2 for complete understanding
4. **Focus on Types**: 
   - Start with Main Claims (red borders)
   - Check Supporting Evidence (blue borders)
   - Understand Reasoning (purple borders)

### Performance Tips

- **Analyze once per page** - avoid clicking multiple times
- **Wait for completion** - let the AI finish processing
- **Use on stable pages** - dynamically loaded content may not be analyzed
- **Refresh if needed** - reload the page if highlights seem incorrect

## Privacy & Security

- **All processing** happens via Groq API (zero-knowledge architecture planned)
- **Highlights are stored locally** in your browser only
- **No data is sent to Abovesaid servers** (we don't have any!)
- **Your reading history** is not tracked or shared
- **API key** is stored in the extension only

## Keyboard Shortcuts

Currently, there are no keyboard shortcuts, but they may be added in future versions.

## Limitations

- **Internet required** - AI analysis needs API access
- **Rate limits** - Groq API has usage limits
- **Language support** - Works best with English content
- **Page compatibility** - Some websites may not work perfectly due to complex layouts

## Troubleshooting

### Highlights appear incorrect
- Try removing and re-analyzing
- Some pages have complex layouts that may cause positioning issues
- Refresh the page and try again

### Button doesn't appear
- Make sure the paragraph has enough text (>100 characters)
- Some websites may have CSS conflicts
- Try zooming to 100% if you've changed the zoom level

### Analysis takes too long
- Large articles may take 10-15 seconds
- Check your internet connection
- Groq API may be experiencing high traffic

### Highlights disappear
- Make sure you didn't click "Remove Highlights"
- Storage may have been cleared
- Re-analyze the page to restore highlights

## Feedback & Support

This is an MVP (Minimum Viable Product) built for a hackathon. We'd love to hear your feedback!

- Found a bug? Check the browser console (F12)
- Have suggestions? We're actively developing new features
- Want to contribute? Check out the GitHub repository

## Future Features

Coming in next iterations:
- Backend proxy for API calls
- More language support
- Custom highlight colors
- Keyboard shortcuts
- Summary generation
- Export highlights to notes
- Browser sync across devices

---

**Version**: 1.0.0 (MVP)  
**Last Updated**: October 2025


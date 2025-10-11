# Abovesaid - AI Memory Enhancer & Trust Filter

A Chrome extension that uses AI to analyze and highlight text based on importance levels, helping you efficiently absorb knowledge from web content.

## Features

- **Smart Highlighting**: AI automatically analyzes web page content and highlights sentences based on importance (1-5 scale)
- **Type Classification**: Categorizes text into 6 types:
  - Main Claim
  - Supporting Evidence
  - Reasoning / Explanation
  - Example / Illustration
  - Counterpoint / Caveat
  - Background / Context
- **Persistent Storage**: Highlights are saved and restored across page reloads
- **Clean UI**: Minimalist button that appears on hover
- **Easy Removal**: One-click removal of all highlights

## Tech Stack

- React + TypeScript
- Vite + CRXJS
- Groq API (llama-3.1-70b-versatile)
- Chrome Extension Manifest V3

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up API key**:
   - Copy `.env.local.example` to `.env.local`
   - Add your Groq API key:
     ```
     VITE_GROQ_API_KEY=your_actual_api_key_here
     ```

3. **Build the extension**:
   ```bash
   npm run build
   ```

4. **Load in Chrome**:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

## Development

Run in development mode with hot reload:
```bash
npm run dev
```

Then load the `dist` folder as an unpacked extension in Chrome.

## Usage

1. Navigate to any article or web page with substantial text
2. Hover over a paragraph to see the Abovesaid button appear on the right
3. Click the button to analyze the page content
4. AI will highlight sentences with different intensities based on importance
5. Hover over highlights to see their type and importance level
6. Click "Remove Highlights" to clear all highlights from the page

## Color Scheme

- **Importance Levels**: Yellow highlights with 5 intensity levels (20% to 80% opacity)
- **Type Indicators**: Colored left borders
  - Red: Main Claim
  - Blue: Supporting Evidence
  - Purple: Reasoning / Explanation
  - Green: Example / Illustration
  - Orange: Counterpoint / Caveat
  - Gray: Background / Context

## Project Structure

```
/Abovesaid
├── src/
│   ├── content/          # Content script (injected into pages)
│   ├── background/       # Service worker
│   ├── components/       # React components
│   ├── utils/            # API and storage utilities
│   ├── types/            # TypeScript types
│   └── styles/           # CSS files
├── public/
│   └── icons/            # Extension icons
├── manifest.json         # Chrome extension manifest
└── vite.config.ts        # Vite configuration
```

## License

MIT

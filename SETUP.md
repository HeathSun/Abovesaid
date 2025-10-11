# Abovesaid - Quick Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- Chrome or Chromium-based browser
- Groq API key (get one at https://console.groq.com)

## Installation Steps

### 1. Clone and Install

```bash
cd /path/to/Abovesaid
npm install
```

### 2. Configure API Key

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.local.example .env.local
```

Edit `.env.local` and add your Groq API key:
```
VITE_GROQ_API_KEY=gsk_your_actual_groq_api_key_here
```

> **Important**: The `.env.local` file is already in `.gitignore` and will not be committed to version control.

### 3. Build the Extension

```bash
npm run build
```

This will create a `dist` folder with the compiled extension.

### 4. Load in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right corner)
3. Click "Load unpacked"
4. Select the `dist` folder from your Abovesaid project
5. The Abovesaid extension should now appear in your extensions list

### 5. Test the Extension

1. Navigate to any article or blog post (try Medium, Wikipedia, or any news site)
2. Hover over a paragraph - you should see the Abovesaid button appear on the right
3. Click the button to analyze the page
4. Wait a few seconds for the AI to process the content
5. The page will be highlighted with different colors based on importance

## Development Mode

For development with hot reload:

```bash
npm run dev
```

Then load the `dist` folder in Chrome. Changes will be automatically recompiled.

## Troubleshooting

### "Cannot find API key" error
- Make sure `.env.local` exists in the project root
- Verify the key starts with `VITE_GROQ_API_KEY=`
- Rebuild the extension after adding the key: `npm run build`

### Button doesn't appear
- Make sure you're on a page with substantial text (>100 characters per paragraph)
- Refresh the page after loading the extension
- Check the browser console for errors (F12)

### Highlights don't appear
- Check your internet connection (API call required)
- Verify your Groq API key is valid
- Check the browser console for API errors

### Extension doesn't load
- Make sure you selected the `dist` folder, not the project root
- Verify the build completed successfully
- Try removing and re-adding the extension

## API Rate Limits

The Groq API has rate limits on the free tier. If you encounter rate limit errors:
- Wait a few minutes before trying again
- Consider upgrading your Groq account for higher limits
- Use shorter articles for testing

## Support

For issues or questions, please check:
- Browser console (F12) for error messages
- Network tab for failed API requests
- Extension background page logs (`chrome://extensions/` > Details > "Inspect views: background page")


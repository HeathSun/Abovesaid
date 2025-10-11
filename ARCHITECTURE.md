# Abovesaid - Technical Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Web Page (Any Site)                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     │ Content Script Injected
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Abovesaid Content Script                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  1. Paragraph Detection                              │   │
│  │     - Scan page for text blocks                      │   │
│  │     - Filter paragraphs >100 chars                   │   │
│  │     - Inject hover buttons                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          │ User clicks button                │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  2. Content Extraction                               │   │
│  │     - Get main content area                          │   │
│  │     - Extract text content                           │   │
│  │     - Validate length                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          │ Send text to API                  │
│                          ▼                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTPS Request
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Groq API                                 │
│                                                              │
│  Model: llama-3.1-70b-versatile                             │
│  Input: Text content + structured prompt                    │
│  Output: JSON with sentence-level analysis                  │
│                                                              │
│  Analysis:                                                   │
│  ┌────────────────────────────────────────────────┐        │
│  │ For each sentence:                              │        │
│  │  - Importance: 1-5                              │        │
│  │  - Type: Main Claim | Evidence | Reasoning |   │        │
│  │          Example | Counterpoint | Background    │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ JSON Response
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Highlighting Engine                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  3. Parse Response                                   │   │
│  │     - Extract sentence analyses                      │   │
│  │     - Map importance levels                          │   │
│  │     - Map type classifications                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  4. DOM Manipulation                                 │   │
│  │     - Walk text nodes                                │   │
│  │     - Wrap sentences in <span>                       │   │
│  │     - Apply importance styles (opacity)              │   │
│  │     - Apply type styles (border color)               │   │
│  │     - Add tooltips                                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  5. Storage                                          │   │
│  │     - Normalize URL                                  │   │
│  │     - Save to Chrome Storage                         │   │
│  │     - Enable persistence                             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Chrome Storage API                          │
│                                                              │
│  Key: abovesaid_{normalized_url}                            │
│  Value: {                                                    │
│    url: string,                                              │
│    highlights: SentenceAnalysis[],                          │
│    timestamp: number                                         │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ On page reload
                           ▼
                    [Auto-restore highlights]
```

## Data Flow

### 1. User Interaction Flow

```
Hover on paragraph → Button appears → Click → Loading indicator
                                        ↓
                                   API request
                                        ↓
                                  Parse response
                                        ↓
                                 Apply highlights
                                        ↓
                                  Save to storage
                                        ↓
                              Show remove button
```

### 2. Highlight Persistence Flow

```
Page Load → Check storage → Highlights exist? 
                                   ↓
                                  Yes
                                   ↓
                          Load highlight data
                                   ↓
                          Apply to page DOM
                                   ↓
                        Show remove button
```

### 3. Removal Flow

```
Click Remove → Clear DOM highlights → Delete from storage → Hide button
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Extension Root                            │
└──────────────┬──────────────────────────────────────────────┘
               │
        ┌──────┴──────┬──────────────┬──────────────┐
        │             │              │              │
        ▼             ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Content  │  │Background│  │  Utils   │  │Components│
│  Script  │  │  Worker  │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
     │             │              │              │
     │             │              │              │
     ▼             ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ index.tsx│  │ index.ts │  │groqApi.ts│  │Importance│
│highlighter│  │          │  │storage.ts│  │  Button  │
│   .ts    │  │          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
                                                │
                                     ┌──────────┼──────────┐
                                     ▼          ▼          ▼
                               ┌─────────┐┌─────────┐┌─────────┐
                               │ Loading ││ Remove  ││ Types   │
                               │Indicator││ Button  ││         │
                               └─────────┘└─────────┘└─────────┘
```

## File Dependencies

```
manifest.json
    └── Content Script: src/content/index.tsx
            ├── Components
            │   ├── ImportanceButton.tsx
            │   ├── LoadingIndicator.tsx
            │   └── RemoveButton.tsx
            ├── Utils
            │   ├── groqApi.ts ──────────► Groq API
            │   └── storage.ts ──────────► Chrome Storage
            ├── Highlighter
            │   └── highlighter.ts
            ├── Types
            │   └── index.ts
            └── Styles
                └── content.css

manifest.json
    └── Background: src/background/index.ts
            └── Chrome Runtime API
```

## State Management

```
┌─────────────────────────────────────────────────────────────┐
│                  Extension State                             │
│                                                              │
│  class AbovesaidContent {                                    │
│    private buttonContainers: Map<Element, HTMLElement>      │
│    private loadingContainer: HTMLElement | null             │
│    private removeButtonContainer: HTMLElement | null        │
│    private currentUrl: string                                │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
        │
        ├──► Button tracking: Maps paragraphs to buttons
        ├──► UI state: Loading and remove button containers
        └──► Page tracking: Current URL for storage key
```

## Storage Schema

```typescript
// Storage Key Format
key: string = `abovesaid_${normalizedUrl}`

// Storage Value Format
value: {
  url: string;              // Normalized URL (no query params)
  highlights: Array<{       // Array of sentence analyses
    sentence: string;       // The sentence text
    importance: 1|2|3|4|5; // Importance level
    type: string;           // Highlight type
    startIndex: number;     // Position in text
    endIndex: number;       // Position in text
  }>;
  timestamp: number;        // When highlights were created
}
```

## API Integration

```
┌─────────────────────────────────────────────────────────────┐
│                  Groq API Request                            │
│                                                              │
│  POST https://api.groq.com/openai/v1/chat/completions      │
│                                                              │
│  Headers:                                                    │
│    Content-Type: application/json                           │
│    Authorization: Bearer ${GROQ_API_KEY}                    │
│                                                              │
│  Body:                                                       │
│  {                                                           │
│    model: "llama-3.1-70b-versatile",                        │
│    messages: [{                                              │
│      role: "user",                                           │
│      content: "[Structured Prompt + Text]"                  │
│    }],                                                       │
│    temperature: 0.3,                                         │
│    max_tokens: 4096                                          │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Groq API Response                           │
│                                                              │
│  {                                                           │
│    choices: [{                                               │
│      message: {                                              │
│        content: "{                                           │
│          \"sentences\": [                                    │
│            {                                                 │
│              \"text\": \"Sentence here.\",                   │
│              \"importance\": 5,                              │
│              \"type\": \"Main Claim\"                        │
│            },                                                │
│            ...                                               │
│          ]                                                   │
│        }"                                                    │
│      }                                                       │
│    }]                                                        │
│  }                                                           │
└─────────────────────────────────────────────────────────────┘
```

## Highlight Rendering

```
Original DOM:
<p>This is a sentence. Another sentence here.</p>

After Analysis:
<p>
  <span class="abovesaid-highlight" 
        data-importance="5" 
        data-type="Main Claim">
    This is a sentence.
    <span class="abovesaid-tooltip">
      Main Claim (Importance: 5/5)
    </span>
  </span>
  <span class="abovesaid-highlight" 
        data-importance="3" 
        data-type="Supporting Evidence">
    Another sentence here.
    <span class="abovesaid-tooltip">
      Supporting Evidence (Importance: 3/5)
    </span>
  </span>
</p>
```

## CSS Architecture

```
Highlight Styles
├── Base: .abovesaid-highlight
├── Importance: [data-importance="1-5"]
│   ├── Level 1: rgba(255, 235, 59, 0.2)
│   ├── Level 2: rgba(255, 235, 59, 0.35)
│   ├── Level 3: rgba(255, 235, 59, 0.5)
│   ├── Level 4: rgba(255, 235, 59, 0.65)
│   └── Level 5: rgba(255, 235, 59, 0.8)
└── Types: [data-type="..."]
    ├── Main Claim: border-left: 3px solid #d32f2f
    ├── Supporting Evidence: border-left: 3px solid #1976d2
    ├── Reasoning: border-left: 3px solid #7b1fa2
    ├── Example: border-left: 3px solid #388e3c
    ├── Counterpoint: border-left: 3px solid #f57c00
    └── Background: border-left: 3px solid #616161
```

## Performance Considerations

```
Optimization Strategy:
├── Build Time
│   ├── Tree-shaking unused code
│   ├── Code splitting
│   └── Minification
├── Runtime
│   ├── Lazy component loading
│   ├── Efficient DOM manipulation
│   ├── Debounced hover events (future)
│   └── Caching API responses (future)
└── Storage
    ├── Normalized URLs to reduce duplication
    ├── Compression (future)
    └── Cleanup old entries (future)
```

## Security Model

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                           │
│                                                              │
│  1. Chrome Extension Sandbox                                │
│     - Isolated execution context                            │
│     - Limited permissions (storage, activeTab)              │
│                                                              │
│  2. Content Security Policy                                 │
│     - No eval() or inline scripts                           │
│     - HTTPS-only API calls                                  │
│                                                              │
│  3. Storage Isolation                                       │
│     - Per-extension storage namespace                       │
│     - Local-only (no cloud sync in MVP)                     │
│                                                              │
│  4. API Security                                            │
│     - API key in .env.local (gitignored)                    │
│     - HTTPS-encrypted communication                         │
│     - Rate limiting (Groq-side)                             │
└─────────────────────────────────────────────────────────────┘
```

## Error Handling

```
Try-Catch Hierarchy:
├── API Level
│   ├── Network errors → Show user alert
│   ├── Rate limits → Retry with backoff (future)
│   └── Parse errors → Log and alert
├── Storage Level
│   ├── Quota exceeded → Clear old entries
│   └── Permission denied → Alert user
└── DOM Level
    ├── Element not found → Skip gracefully
    └── Mutation errors → Log and continue
```

## Extension Lifecycle

```
Installation
    └── onInstalled → Log to console

Page Load
    └── Content script injection
        └── DOMContentLoaded or immediate
            ├── Check for existing highlights
            │   └── If found, apply automatically
            └── Inject buttons on paragraphs

User Interaction
    ├── Click analyze → API call → Highlight → Save
    └── Click remove → Clear highlights → Delete storage

Uninstallation
    └── Chrome automatically clears storage
```

---

**Architecture Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Production-ready MVP


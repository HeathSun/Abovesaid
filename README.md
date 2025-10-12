# Abovesaid - Cognitive Intelligence Layer for the Web

**A next-generation AI browser extension that acts as both a Trust Filter and Personal AI Memory Amplifier**

Abovesaid transforms how you interface with online information by deploying intelligent semantic distillation and trust analytics directly into your browser. Our MVP currently focuses on multi-tier importance highlighting, with ambitious plans to evolve into a comprehensive cognitive co-processing system.

## Vision

The Abovesaid AI browser extension is a next-generation **cognitive intelligence layer** that acts simultaneously as a **Trust Filter** and a **Personal AI Memory Amplifier**, redefining how humans interface with the information ecosystem.

Designed to combat information chaos and source unreliability, it deploys a dual-engine AI workflow that merges contextual compression with trust analytics.

## Current Features (MVP)

### 🎯 Multi-Paragraph Context Analysis
- Intelligently collects up to 3000 characters of context
- Expands analysis above and below the clicked paragraph
- Ensures complete paragraph boundaries for coherent understanding

### 🎨 Power-Law Importance Highlighting
- **Level 5 (70% gray)**: Most critical information—deep, prominent highlighting
- **Level 4 (45% gray)**: Important content—strong visibility
- **Level 3 (25% gray)**: Moderate importance—readable balance
- **Level 2 (10% gray)**: Supporting details—subtle indication
- **Level 1 (0% transparent)**: No highlighting—maintains reading flow

Our power-law distribution ensures that truly important information stands out dramatically, while less critical content fades gracefully into the background.

### 📊 6-Type Semantic Classification
Each sentence is categorized with grayscale border indicators:
- **Main Claim** (darkest gray) - Core thesis and arguments
- **Supporting Evidence** (dark gray) - Data, facts, research
- **Reasoning / Explanation** (medium-dark gray) - Logical analysis
- **Example / Illustration** (medium gray) - Demonstrative cases
- **Counterpoint / Caveat** (light gray) - Opposing views, limitations
- **Background / Context** (lightest gray) - Contextual information

### 💾 Persistent Local Storage
- Highlights saved automatically to Chrome Storage
- Restored on page reload
- URL-normalized for consistent tracking
- One-click removal per page

### 🎭 Elegant Visual Design
- Minimalist grayscale highlighting (non-intrusive)
- Animated GIF button on paragraph hover
- Smooth transitions and hover effects
- Professional, distraction-free aesthetics

## Tech Stack

- **Frontend**: React 19 + TypeScript 5.9
- **Build**: Vite 7 + CRXJS (Chrome Extension plugin)
- **AI Engine**: Groq API (llama-3.1-8b-instant)
- **Platform**: Chrome Extension Manifest V3
- **Storage**: Chrome Storage API (local)

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

1. **Navigate** to any article or web page with substantial text content
2. **Hover** over a paragraph to see the Abovesaid animated button appear on the right
3. **Click** the button to trigger AI analysis (processes ~3000 chars of context)
4. **Wait** 2-5 seconds while the AI analyzes importance and classification
5. **View** intelligent grayscale highlights applied to sentences
6. **Hover** over any highlight to see its type and importance level tooltip
7. **Click** "Remove Highlights" button (bottom-right) to clear the page

## Visual Design Language

### Grayscale Highlighting (Power-Law Distribution)
We use a sophisticated grayscale palette that emphasizes truly important content while keeping noise minimal:

| Level | Opacity | Visual Impact | Use Case |
|-------|---------|---------------|----------|
| 5 | 70% | Deep gray, highly visible | Core claims, key insights |
| 4 | 45% | Strong gray, prominent | Important supporting points |
| 3 | 25% | Medium gray, balanced | Moderate significance |
| 2 | 10% | Very subtle gray | Minor details |
| 1 | 0% | Transparent, no highlight | Background information |

### Classification Borders (Grayscale Spectrum)
Left border colors range from dark to light gray:
- `#2a2a2a` → Main Claim
- `#4a4a4a` → Supporting Evidence
- `#6a6a6a` → Reasoning / Explanation
- `#8a8a8a` → Example / Illustration
- `#aaaaaa` → Counterpoint / Caveat
- `#cccccc` → Background / Context

## Roadmap: Future Features 🚀

### Stage 1: Enhanced Semantic Intelligence (In Development)

#### 🧠 Multi-Tier Semantic Distillation
- **Hierarchical summarization**: Paragraph → Section → Article → Multi-article synthesis
- **Adaptive compression ratios**: Dynamic detail levels based on content density
- **Cross-document insight mapping**: Link related concepts across different articles
- **Contextual memory retention**: Remember previously analyzed content for richer context

#### 🎯 Advanced Highlighting Modes
- **Reading mode optimization**: Adjust highlight intensity based on reading speed
- **Focus mode**: Temporarily dim everything except Level 4-5 highlights
- **Custom importance thresholds**: User-defined sensitivity controls
- **Topic-aware highlighting**: Different color schemes for different subject domains

### Stage 2: Deep Deep Search™ Provenance Engine

#### 🔍 Real-Time Epistemic Validation
- **Source credibility scoring**: AI-powered trust ratings for cited sources
- **Fact-checking integration**: Cross-reference claims against knowledge bases
- **Author authority analysis**: Expertise verification and bias detection
- **Publication reputation**: Journal/platform reliability assessment

#### 🌈 Dynamic Chromatic Grading
- **Truth density visualization**: Color-coded confidence levels for each claim
- **Source integrity indicators**: Visual badges for verified vs. unverified sources
- **Controversy detection**: Highlight disputed or contentious statements
- **Citation depth mapping**: Show strength of evidence backing claims

#### ⚖️ Trust Analytics Dashboard
- **Page-level trust score**: Aggregate reliability rating
- **Bias detection**: Political, commercial, or ideological lean indicators
- **Temporal freshness**: Highlight outdated information
- **Consensus tracking**: Show agreement/disagreement across sources

### Stage 3: Knowledge Vault & Memory Substrate

#### 💎 IndexedDB Knowledge Vault
- **Local vector embeddings**: All verified knowledge stored as semantic vectors
- **Encrypted storage**: Client-side encryption for privacy
- **Sovereign data ownership**: Your data never leaves your device (unless you choose)
- **Fast semantic search**: Instant retrieval across all saved content

#### 🔗 External LLM Integration
- **Cloud-scale reasoning**: Connect your Knowledge Vault to GPT-4, Claude, etc.
- **Personalized context injection**: Every LLM query enhanced with your saved knowledge
- **Bidirectional learning**: LLM insights can be saved back to your vault
- **Multi-modal memory**: Support for images, PDFs, videos in future

#### 🧬 Cognitive Co-Processing
- **Continuous learning**: Build a personal knowledge graph over time
- **Insight surfacing**: Proactive suggestions based on reading patterns
- **Contradiction detection**: Alert when new info conflicts with saved knowledge
- **Knowledge synthesis**: AI-generated connections between disparate topics

### Stage 4: Collaborative Intelligence

#### 👥 Decentralized Trust Network
- **Peer verification**: Crowdsourced validation of claims
- **Expert networks**: Connect with domain experts for specialized content
- **Reputation systems**: Build trust through quality contributions
- **Privacy-preserving sharing**: Share insights without revealing personal data

#### 🌐 Web of Verified Intelligence
- **Universal fact layer**: Contribute to a global, decentralized truth database
- **Interoperable standards**: Export/import knowledge across platforms
- **API ecosystem**: Third-party tools can build on Abovesaid's foundation
- **Open protocols**: Community-driven standards for verified information

## Philosophy

Abovesaid represents a paradigm shift from **passive browsing** to **cognitive co-processing**. We believe:

1. **Information overload is a design problem**, not a human failing
2. **Trust must be computable**, transparent, and user-verifiable
3. **Knowledge should compound**, not just accumulate
4. **Privacy and power** belong to the individual, not platforms
5. **Intelligence amplification** beats intelligence replacement

Our ultimate goal: transform the web into a **trusted, intelligent, and personal knowledge substrate** that augments human cognition rather than replacing it.

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

## Current Status

**Version**: 1.0.0 MVP  
**Status**: Functional prototype with core highlighting features  
**Next Milestone**: Deep Deep Search™ provenance engine (Stage 2)

This is an early-stage product built during a hackathon. We're actively developing the trust validation and knowledge vault features. If you're interested in contributing or collaborating, please reach out!

## Contributing

Abovesaid is evolving rapidly, and we welcome contributions:

- 🐛 **Bug reports**: Help us identify issues
- 💡 **Feature ideas**: Share your vision for cognitive intelligence
- 🔧 **Code contributions**: Submit PRs for improvements
- 📖 **Documentation**: Help make Abovesaid more accessible
- 🧪 **Testing**: Try it on different websites and report edge cases

## Privacy & Data

- ✅ **Local-first**: All highlights stored in your browser
- ✅ **No tracking**: We don't collect usage data
- ✅ **API calls only**: Your text is sent to Groq API for analysis only
- ✅ **Transparent**: Open-source codebase for full auditability

Future versions will add:
- 🔐 End-to-end encryption for Knowledge Vault
- 🚫 Zero-knowledge architecture with optional backend
- 🌐 Decentralized trust network for collaborative verification

## License

MIT License - see LICENSE file for details

---

**Built with 🧠 for a more intelligent web**

*Abovesaid: Where every word earns its weight in understanding.*

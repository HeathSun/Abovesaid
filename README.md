# Abovesaid - Agentic Personal Knowledge Layer

![Abovesaid Logo](public/Abovesaid.png)

**An AI-powered browser extension that transforms web content into trusted, structured intelligence**

Abovesaid is an **agentic personal knowledge layer** that sits between you and the internet, automatically distilling, validating, and structuring information as you read. It serves as both a real-time trust filter and an intelligent memory substrate that fuels AI-powered workflows.

## Vision

The Abovesaid platform represents a fundamental shift in how humans interact with digital information. Rather than passively consuming content, users build a **living, queryable knowledge base** that grows more valuable over time.

As an agentic system, Abovesaid doesn't just highlight text—it creates a **semantic memory layer** that can be leveraged by AI agents, large language models, and downstream cognitive tools. Every article you read becomes structured intelligence that powers better decision-making, research, and creative work.

## Current Capabilities

**Intelligent Content Distillation**
Abovesaid analyzes web content in real-time, applying multi-level importance scoring and semantic classification to every sentence. Information is graded from critical (deeply highlighted) to background (transparent), following a power-law distribution that mirrors human attention patterns.

**Semantic Type Recognition**
Content is automatically categorized into six types: Main Claims, Supporting Evidence, Reasoning, Examples, Counterpoints, and Background Context. Each type receives distinct visual treatment for rapid cognitive processing.

**Persistent Knowledge Capture**
Every analyzed page is stored locally in your browser, creating a personal knowledge graph that persists across sessions. This forms the foundation of your agentic memory layer.

**Context-Aware Analysis**
The system intelligently expands analysis to surrounding paragraphs (up to 3000 characters), ensuring coherent understanding of ideas that span multiple paragraphs.

## Technical Foundation

Built on modern web technologies with Minimax AI as the core intelligence engine. The system operates as a Chrome browser extension with local-first data storage and privacy-preserving architecture.

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

## Business Value & Market Applications

### Primary Use Cases

**Enterprise Knowledge Management**
Organizations can deploy Abovesaid to help employees build structured knowledge bases from research, competitive intelligence, and market analysis. Every team member develops a queryable memory layer that can be leveraged for reporting, strategy, and decision-making.

**AI-Powered Research & Analysis**
Researchers and analysts use Abovesaid to rapidly process large volumes of literature, automatically extracting key claims and evidence. The structured output becomes high-quality training data for domain-specific AI models.

**Content Creation & Journalism**
Writers and journalists use Abovesaid to manage source material, track claims across multiple articles, and maintain fact-checked knowledge bases. The trust validation features help combat misinformation.

**Educational Technology**
Students and educators build personalized learning paths with Abovesaid as the foundation. The system tracks what students read, highlights key concepts, and creates study materials from browsing history.

**Personal Productivity & Lifelong Learning**
Professionals across industries use Abovesaid as a "second brain" that automatically captures and structures everything they read online, making knowledge instantly retrievable and actionable.

### AI Context Fueling: The Agentic Advantage

Abovesaid's true power emerges when integrated with AI agents and large language models:

**Personalized LLM Context Injection**
Every conversation with ChatGPT, Claude, or other LLMs can be enriched with your verified knowledge base. Your AI assistant becomes truly personal, grounded in your reading history and domain expertise.

**RAG Pipeline Foundation**
Abovesaid provides pre-processed, semantically structured data perfect for Retrieval-Augmented Generation systems. Instead of raw text, your AI retrieves importance-scored, type-classified knowledge fragments.

**Agent Memory Substrate**
AI agents operating on your behalf can query your Abovesaid knowledge vault to make informed decisions. Your agent knows what you've read, what you found important, and how different sources relate.

**Training Data Generation**
The structured, validated content in your knowledge vault becomes high-quality training data for fine-tuning personal AI models or domain-specific assistants.

**Multi-Modal Intelligence Fusion**
As Abovesaid expands to support PDFs, videos, and images, it becomes a universal interface for feeding diverse information sources into AI workflows.

### Market Positioning

Abovesaid occupies a unique position at the intersection of:
- **Personal Knowledge Management** (Notion, Obsidian, Roam)
- **AI Infrastructure** (LangChain, LlamaIndex, vector databases)
- **Trust & Verification** (fact-checking tools, provenance platforms)
- **Browser Automation** (productivity extensions, reading tools)

Unlike traditional note-taking apps, Abovesaid operates **passively and automatically**. Unlike AI infrastructure tools, it's **consumer-friendly and visual**. Unlike fact-checkers, it provides **proactive, real-time intelligence**.

### Revenue Opportunities

**Freemium SaaS Model**
- Free tier: Basic highlighting and local storage
- Pro tier: Cloud sync, advanced analytics, unlimited AI queries
- Enterprise tier: Team knowledge bases, admin controls, API access

**API & Platform Business**
- Developer API for accessing user knowledge vaults (with permission)
- Integration marketplace for connecting to productivity tools
- White-label solutions for educational institutions and enterprises

**Data Network Effects**
- Aggregate anonymized trust scores across the user base
- Build a decentralized reputation system for sources
- Monetize high-quality, verified knowledge graphs (with consent)

**AI Infrastructure Play**
- Position as essential middleware for personalized AI
- Partner with LLM providers to offer "memory-enabled" AI assistants
- Become the standard for agentic memory layers

## Product Roadmap

**Stage 1: Enhanced Semantic Intelligence**
Hierarchical summarization across paragraphs, sections, and entire articles. Cross-document insight mapping that links related concepts across your reading history. Adaptive highlighting modes based on reading patterns and content density.

**Stage 2: Deep Deep Search Provenance Engine**
Real-time source credibility scoring and fact-checking integration. Dynamic trust visualization with color-coded confidence levels. Page-level trust scores, bias detection, and consensus tracking across multiple sources.

**Stage 3: Agentic Knowledge Vault**
Local vector embeddings with encrypted storage and sovereign data ownership. Direct integration with GPT-4, Claude, and other LLMs for personalized context injection. Semantic search across your entire knowledge base with sub-second retrieval.

**Stage 4: Collaborative Intelligence Network**
Decentralized trust network with peer verification and expert validation. Privacy-preserving knowledge sharing protocols. Contribution to a global, community-verified fact layer with open standards and APIs.

## Strategic Vision

Abovesaid is building the **cognitive infrastructure layer** for the AI age. As language models become ubiquitous, the bottleneck shifts from AI capability to AI context—what information can the AI access to reason on your behalf?

Traditional approaches require manual note-taking, explicit data entry, or broad permissions to scan your files. Abovesaid operates automatically and continuously, building a rich, structured knowledge base from your natural browsing behavior.

This positions Abovesaid as essential middleware in the emerging "agentic AI" stack:
- **Memory Layer**: Persistent knowledge across AI interactions
- **Trust Layer**: Verified, sourced information for reliable reasoning
- **Context Layer**: Personalized, domain-specific intelligence for every query

The end game: every person has a living, AI-queryable knowledge graph that represents their expertise, interests, and verified information—a true "second brain" that fuels increasingly autonomous AI agents.

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

Abovesaid is evolving rapidly. We welcome bug reports, feature suggestions, code contributions, documentation improvements, and testing across different websites.

## Privacy & Data

**Current Architecture**
All highlights are stored locally in your browser. No usage tracking or analytics. Text content is sent to Minimax AI API for analysis only. Open-source codebase for full auditability.

**Future Enhancements**
End-to-end encryption for knowledge vault. Zero-knowledge architecture with optional cloud backup. Decentralized trust network with privacy-preserving protocols.

## License

MIT License - see LICENSE file for details

---

**Abovesaid: Building the memory layer for agentic AI**

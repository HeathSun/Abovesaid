import type { SentenceAnalysis } from '../types';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const PERPLEXITY_API_KEY = import.meta.env.VITE_PERPLEXITY_API_KEY;

interface FactCheckResult {
  sentence: string;
  confidence: number; // 0-100
  explanation: string;
  sources?: string[]; // URLs from Perplexity
}

export async function factCheckSentences(
  sentences: SentenceAnalysis[]
): Promise<Map<string, FactCheckResult>> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('Perplexity API key not found');
  }

  // Filter sentences that contain factual claims (Main Claim, Supporting Evidence, specific numbers)
  const factualSentences = sentences.filter(s => {
    const isFactualType = s.type === 'Main Claim' || s.type === 'Supporting Evidence';
    const hasNumbers = /\d+/.test(s.sentence);
    const hasFactualIndicators = /\b(is|are|was|were|has|have|shows|proves|demonstrates|found|discovered|reported)\b/i.test(s.sentence);
    
    return isFactualType || hasNumbers || hasFactualIndicators;
  });

  if (factualSentences.length === 0) {
    return new Map();
  }

  // Prepare prompt for batch fact-checking
  const sentenceList = factualSentences
    .map((s, i) => `${i + 1}. "${s.sentence}"`)
    .join('\n');

  const prompt = `You are a fact-checking expert with access to real-time web search. Evaluate the factual accuracy of the following statements. For each statement, provide:

1. A confidence score (0-100) where:
   - 100 = Completely verified and accurate
   - 75-99 = Likely accurate with strong supporting evidence
   - 50-74 = Partially accurate or context-dependent
   - 25-49 = Questionable or lacks strong evidence
   - 0-24 = Likely false or misleading

2. A brief explanation citing your sources

3. Source URLs you used to verify (if any)

Return ONLY a JSON array with this structure:
[
  {
    "sentence": "statement text", 
    "confidence": 85, 
    "explanation": "Verified by multiple sources", 
    "sources": ["https://example.com/article1", "https://example.com/article2"]
  },
  ...
]

Statements to verify:
${sentenceList}`;

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error details (batch):', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Perplexity API full response:', data);
    
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in Perplexity response');
    }

    // Extract citations from Perplexity response
    const citations = data.citations || [];
    
    console.log('Perplexity response details:', {
      content,
      citations,
    });

    // Parse JSON response
    const results: FactCheckResult[] = JSON.parse(content);

    // Add citations to results if not already included
    if (citations.length > 0 && results.length > 0) {
      results.forEach(result => {
        if (!result.sources || result.sources.length === 0) {
          result.sources = citations;
        }
      });
    }

    // Create map for quick lookup
    const resultMap = new Map<string, FactCheckResult>();
    results.forEach(result => {
      resultMap.set(result.sentence, result);
    });

    return resultMap;
  } catch (error) {
    console.error('Error fact-checking with Perplexity:', error);
    throw error;
  }
}

export async function factCheckSingleSentence(sentence: string): Promise<FactCheckResult> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('Perplexity API key not found');
  }

  const prompt = `Fact-check this statement and provide a confidence score (0-100) with sources:
"${sentence}"

Return ONLY a JSON object: {
  "confidence": 85, 
  "explanation": "brief reason with source citations",
  "sources": ["url1", "url2"]
}`;

  try {
    const response = await fetch(PERPLEXITY_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error details (single):', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Perplexity API response (single):', data);
    
    const content = data.choices[0]?.message?.content;
    const citations = data.citations || [];

    if (!content) {
      throw new Error('No content in Perplexity response');
    }

    const result = JSON.parse(content);
    
    // Add citations if not in content
    if (!result.sources && citations.length > 0) {
      result.sources = citations;
    }
    
    return {
      sentence,
      confidence: result.confidence,
      explanation: result.explanation,
      sources: result.sources || citations,
    };
  } catch (error) {
    console.error('Error fact-checking sentence:', error);
    throw error;
  }
}


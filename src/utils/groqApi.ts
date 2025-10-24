import type { GroqAnalysisResponse, SentenceAnalysis } from '../types';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function analyzeTextWithGroq(
  text: string
): Promise<SentenceAnalysis[]> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not found');
  }

  const prompt = `You are an expert text analyzer. Analyze the following text and identify the importance and type of each clause or phrase.

CRITICAL: Split text ONLY at punctuation marks (periods, commas, semicolons, colons, question marks, exclamation marks). Each segment must be a complete clause between punctuation marks. NEVER split in the middle of a word or phrase.

For each text segment, provide:
1. importance: A number from 1-5 (1=least important, 5=most important)
2. type: One of these categories:
   - "Main Claim": Core thesis or main argument
   - "Supporting Evidence": Data, facts, or evidence
   - "Reasoning / Explanation": Logical explanations or reasoning
   - "Example / Illustration": Examples that illustrate points
   - "Counterpoint / Caveat": Opposing views or limitations
   - "Background / Context": Background information or context

Return ONLY a JSON object with this structure:
{
  "sentences": [
    {"text": "Complete clause or phrase between punctuation.", "importance": 5, "type": "Main Claim"},
    ...
  ]
}

IMPORTANT: Copy the text segments EXACTLY as they appear, including punctuation. Each text segment should end with its punctuation mark (., , ; : ? !).

Text to analyze:
${text}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content in Groq response');
    }

    // Parse the JSON response
    const parsed: GroqAnalysisResponse = JSON.parse(content);

    // Map to SentenceAnalysis with positions
    let currentIndex = 0;
    const analyses: SentenceAnalysis[] = [];

    for (const sentence of parsed.sentences) {
      const startIndex = text.indexOf(sentence.text, currentIndex);
      if (startIndex !== -1) {
        analyses.push({
          sentence: sentence.text,
          importance: sentence.importance,
          type: sentence.type,
          startIndex,
          endIndex: startIndex + sentence.text.length,
        });
        currentIndex = startIndex + sentence.text.length;
      }
    }

    return analyses;
  } catch (error) {
    console.error('Error analyzing text with Groq:', error);
    throw error;
  }
}


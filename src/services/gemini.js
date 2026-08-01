const API_KEY = import.meta.env.VITE_GEMINI_API_KEY?.trim();
const MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

function buildBusinessPrompt(payload) {
  return `
You are an expert growth strategist for a SaaS-style business consulting platform.
Analyze this business profile and produce a concise but practical report in JSON.
Return valid JSON only with the following shape:
{
  "businessName": string,
  "summary": string,
  "healthScore": number,
  "healthSummary": string,
  "swot": [{"title": string, "text": string}],
  "recommendations": [{"title": string, "text": string}],
  "timeline": [{"phase": string, "text": string}]
}

Business profile:
- Business name: ${payload.businessName || 'Unknown'}
- Owner: ${payload.ownerName || 'Unknown'}
- Category: ${payload.category || 'Unknown'}
- Description: ${payload.description || 'No description provided'}
- City: ${payload.city || 'Unknown'}
- Website: ${payload.website || 'Not provided'}
- Revenue: ${payload.revenue || 'Not provided'}
- Employees: ${payload.employees || 'Not provided'}
- Challenges: ${payload.challenges || 'None'}
- Goals: ${payload.goals || 'Not provided'}
- Target customers: ${payload.customers || 'Not provided'}
- Competitor: ${payload.competitor || 'Not provided'}
`;
}

function buildCompetitorPrompt(payload) {
  return `
You are an expert digital growth analyst.
Review the competitor profile and produce a concise benchmarking report in JSON.
Return valid JSON only with the following shape:
{
  "competitorName": string,
  "summary": string,
  "overall": string,
  "website": string,
  "seo": string,
  "mobile": string,
  "performance": string,
  "social": string,
  "gbp": string,
  "content": string,
  "strengths": string,
  "weaknesses": string,
  "opportunities": string,
  "threats": string,
  "websiteImprovement": string,
  "seoImprovement": string,
  "marketingRecommendation": string,
  "leadGenerationIdeas": string
}

Competitor profile:
- Name: ${payload.competitorName || 'Unknown'}
- Website: ${payload.website || 'Not provided'}
- Industry: ${payload.industry || 'Unknown'}
- City: ${payload.city || 'Unknown'}
`;
}

function normalizeGeminiResponse(response) {
  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  const cleanedText = text.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(cleanedText);
  } catch (error) {
    throw new Error('The AI response could not be parsed.');
  }
}

function createFriendlyError(message) {
  return new Error(message);
}

async function callGemini(prompt, mode) {
  if (!API_KEY) {
    throw createFriendlyError('Gemini is not configured yet. Add your API key to the .env file to enable AI analysis.');
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1200,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw createFriendlyError('The AI request did not go through. Please try again in a moment.');
    }

    const data = await response.json();
    const parsed = normalizeGeminiResponse(data);

    if (mode === 'business') {
      return {
        businessName: parsed.businessName || 'Your Business',
        summary: parsed.summary || 'A tailored growth plan is ready.',
        healthScore: parsed.healthScore || 0,
        healthSummary: parsed.healthSummary || 'The AI could not provide a detailed health summary.',
        swot: parsed.swot || [],
        recommendations: parsed.recommendations || [],
        timeline: parsed.timeline || [],
      };
    }

    return {
      competitorName: parsed.competitorName || 'Competitor',
      summary: parsed.summary || 'Competitor review generated.',
      overall: parsed.overall || '0/100',
      website: parsed.website || '0/10',
      seo: parsed.seo || '0/100',
      mobile: parsed.mobile || '0/10',
      performance: parsed.performance || '0/100',
      social: parsed.social || '0/10',
      gbp: parsed.gbp || '0/10',
      content: parsed.content || '0/10',
      strengths: parsed.strengths || 'No strengths identified.',
      weaknesses: parsed.weaknesses || 'No weaknesses identified.',
      opportunities: parsed.opportunities || 'No opportunities identified.',
      threats: parsed.threats || 'No threats identified.',
      websiteImprovement: parsed.websiteImprovement || 'No website improvement guidance available.',
      seoImprovement: parsed.seoImprovement || 'No SEO improvement guidance available.',
      marketingRecommendation: parsed.marketingRecommendation || 'No marketing recommendation available.',
      leadGenerationIdeas: parsed.leadGenerationIdeas || 'No lead generation ideas available.',
    };
  } catch (error) {
    if (error instanceof Error && error.message) {
      throw error;
    }
    throw createFriendlyError('The AI request did not go through. Please try again in a moment.');
  }
}

export async function analyzeBusiness(payload) {
  const prompt = buildBusinessPrompt(payload);
  return callGemini(prompt, 'business');
}

export async function analyzeCompetitor(payload) {
  const prompt = buildCompetitorPrompt(payload);
  return callGemini(prompt, 'competitor');
}

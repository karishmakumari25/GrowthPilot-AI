// Gemini AI service
// If VITE_GEMINI_API_KEY is not set, returns realistic mock data for demo purposes.

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL   = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';

const DEMO_MODE = !API_KEY || API_KEY.length < 10;

async function ask(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

/* ── Mock responses for demo ─────────────────────────────── */
function mockBusinessReport(form) {
  return {
    businessScore: 67,
    digitalPresenceScore: 42,
    summary: `${form.businessName} is a ${form.businessType} business in ${form.city} with strong local presence but limited digital visibility. With targeted improvements in SEO, social media, and paid advertising, significant revenue growth is achievable within 6 months.`,
    strengths: [
      'Strong local brand recognition and word-of-mouth referrals',
      'Clear understanding of target customer base',
      'Established business operations and service delivery',
    ],
    weaknesses: [
      'Limited digital presence and low website traffic',
      'No structured social media marketing strategy',
      'Missing online lead generation system',
    ],
    websiteRecommendations: [
      'Add a clear call-to-action (CTA) on every page to convert visitors',
      'Optimize page load speed — aim for under 3 seconds',
      'Add customer testimonials and case studies for social proof',
      'Create a mobile-first responsive design for better user experience',
    ],
    seoSuggestions: [
      `Target local keywords like "${form.businessType} in ${form.city}"`,
      'Claim and optimize Google Business Profile listing',
      'Build 10+ local citations on directories like JustDial, Sulekha',
      'Create a blog with 2 posts per week targeting buyer keywords',
    ],
    socialMediaStrategy: [
      'Post daily on Instagram with before/after content and client wins',
      'Run WhatsApp broadcast campaigns to existing customers weekly',
      'Create YouTube shorts showing your service/product in action',
    ],
    advertisingSuggestions: [
      'Start Google Ads with ₹5,000/month targeting high-intent keywords',
      'Run Facebook/Instagram retargeting ads to website visitors',
      'Use WhatsApp Business API for automated follow-up campaigns',
    ],
    growthOpportunities: [
      'Launch a referral program offering 10% discount for referrals',
      'Partner with complementary local businesses for cross-promotion',
      'Introduce subscription/retainer packages for recurring revenue',
      'Expand to nearby cities using digital marketing before physical presence',
    ],
    estimatedROI: '3x–5x in 6 months',
    priorityActions: [
      'Set up Google Business Profile this week (free, high impact)',
      'Create Instagram Business account and post 3x daily for 30 days',
      'Launch Google Ads campaign with ₹5,000 test budget',
    ],
    timelineMonths: 6,
  };
}

function mockCompetitorReport(form) {
  return {
    competitorSummary: `${form.competitorName} is an established player in the ${form.industry} space in ${form.location || 'your market'}. They have a moderate online presence with consistent social media activity but several exploitable weaknesses in customer service and pricing strategy.`,
    strengths: [
      'Established brand with 5+ years of market presence',
      'Active social media following with regular content',
      'Wide product/service range covering multiple customer segments',
    ],
    weaknesses: [
      'Poor customer reviews regarding response time and support',
      'Outdated website with poor mobile experience',
      'Higher pricing with no clear premium value justification',
    ],
    seoScore: 58,
    socialMediaPresence: {
      score: 62,
      platforms: ['Instagram', 'Facebook'],
      analysis: 'Active but low engagement rate. Content is mostly promotional with no educational value.',
    },
    websiteSuggestions: [
      'Your website should load 2x faster than theirs',
      'Add a live chat widget they are missing',
      'Create a comparison page showing your advantages',
    ],
    marketingSuggestions: [
      'Target their unhappy customers with testimonial-focused ads',
      'Undercut their pricing on entry-level services to capture leads',
      'Dominate the keywords they are ignoring — long-tail local terms',
    ],
    featureRecommendations: [
      'Offer free consultation they charge for',
      'Add WhatsApp booking which they lack',
      'Create loyalty program to retain customers they keep losing',
    ],
    growthOpportunities: [
      'Their customers complain about slow delivery — make speed your USP',
      'They have no referral program — launch yours immediately',
      'Capture their dissatisfied customers through targeted Google ads',
    ],
    competitiveAdvantage: `Focus on superior customer service, faster response times, and transparent pricing. ${form.competitorName} is losing customers due to poor after-sales support. Position ${form.myBusiness} as the customer-first alternative with verified reviews and guaranteed response times.`,
    threatLevel: 'Medium',
  };
}

/* ── Public API ──────────────────────────────────────────── */

export async function analyzeBusiness(formData) {
  if (DEMO_MODE) {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 2500));
    return mockBusinessReport(formData);
  }
  const prompt = `
You are a senior digital growth strategist and business consultant.
Analyze this business and return a detailed JSON report (no markdown, pure JSON).

Business Details:
- Business Name: ${formData.businessName}
- Owner: ${formData.ownerName}
- Type: ${formData.businessType}
- City: ${formData.city}
- Website: ${formData.website || 'None'}
- Monthly Sales: ${formData.monthlySales}
- Biggest Problems: ${formData.problems}
- Marketing Methods: ${formData.marketingMethods}
- Target Customers: ${formData.targetCustomers}
- Goals: ${formData.goals}

Return ONLY valid JSON with this exact structure:
{
  "businessScore": <number 0-100>,
  "digitalPresenceScore": <number 0-100>,
  "summary": "<2-3 sentence executive summary>",
  "strengths": ["<s1>","<s2>","<s3>"],
  "weaknesses": ["<w1>","<w2>","<w3>"],
  "websiteRecommendations": ["<r1>","<r2>","<r3>","<r4>"],
  "seoSuggestions": ["<s1>","<s2>","<s3>","<s4>"],
  "socialMediaStrategy": ["<s1>","<s2>","<s3>"],
  "advertisingSuggestions": ["<a1>","<a2>","<a3>"],
  "growthOpportunities": ["<g1>","<g2>","<g3>","<g4>"],
  "estimatedROI": "<e.g. 3x–5x within 6 months>",
  "priorityActions": ["<p1>","<p2>","<p3>"],
  "timelineMonths": <number>
}`;
  const text = await ask(prompt);
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

export async function analyzeCompetitor(formData) {
  if (DEMO_MODE) {
    await new Promise(r => setTimeout(r, 2500));
    return mockCompetitorReport(formData);
  }
  const prompt = `
You are a senior competitive intelligence analyst.
Analyze this competitive landscape and return a JSON report (no markdown, pure JSON).

My Business: ${formData.myBusiness}
Competitor Name: ${formData.competitorName}
Competitor Website: ${formData.competitorWebsite || 'Unknown'}
Location: ${formData.location}
Industry: ${formData.industry}

Return ONLY valid JSON:
{
  "competitorSummary": "<brief>",
  "strengths": ["<s1>","<s2>","<s3>"],
  "weaknesses": ["<w1>","<w2>","<w3>"],
  "seoScore": <0-100>,
  "socialMediaPresence": { "score": <0-100>, "platforms": ["<p>"], "analysis": "<brief>" },
  "websiteSuggestions": ["<ws1>","<ws2>","<ws3>"],
  "marketingSuggestions": ["<ms1>","<ms2>","<ms3>"],
  "featureRecommendations": ["<fr1>","<fr2>","<fr3>"],
  "growthOpportunities": ["<go1>","<go2>","<go3>"],
  "competitiveAdvantage": "<how to beat>",
  "threatLevel": "<Low|Medium|High|Critical>"
}`;
  const text = await ask(prompt);
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

export async function askReferralAssistant(question) {
  if (DEMO_MODE) {
    await new Promise(r => setTimeout(r, 1000));
    const answers = {
      'referral link': 'After registering as a partner, your unique referral link will be sent to your WhatsApp within 24 hours. You can share it anywhere — WhatsApp, social media, or in person.',
      'paid': 'Commission of ₹1000 is credited to your account within 48 hours of a successful conversion. Payment is made via bank transfer or UPI.',
      'qualify': 'No qualifications needed! Any person above 18 years can join the referral program — students, housewives, professionals, anyone.',
      'default': 'You earn ₹1000 for every business you refer that signs up for a paid GrowthPilot AI plan. There is no limit on how many referrals you can make, so your earning potential is unlimited!',
    };
    const q = question.toLowerCase();
    if (q.includes('link')) return answers['referral link'];
    if (q.includes('paid') || q.includes('payment') || q.includes('money')) return answers['paid'];
    if (q.includes('qualify') || q.includes('eligib') || q.includes('who can')) return answers['qualify'];
    return answers['default'];
  }
  const prompt = `
You are a friendly AI assistant for the GrowthPilot AI Referral Partner Program.
Answer this question concisely (2-3 sentences max).
Commission: ₹1000 per successful referral. No educational qualification required.
Question: ${question}`;
  return ask(prompt);
}

const generateAnalysis = async (formData) => {
  // Simulated AI integration using the Fetch API.
  // Replace this with a real AI endpoint when available.
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `Analysis for ${formData.businessName}`,
      body: JSON.stringify(formData),
    }),
  });

  if (!response.ok) {
    throw new Error('Unable to generate analysis right now.');
  }

  const payload = await response.json();

  const score = Math.max(70, Math.min(97, 78 + Number(formData.revenue) / 200000));

  return {
    businessScore: Math.round(score),
    swot: {
      strengths: [`Strong ${formData.industry} positioning`, 'High customer demand in digital channels'],
      weaknesses: ['Limited content consistency', 'Potential conversion bottlenecks on mobile'],
      opportunities: ['Expand into AI-led automation', 'Capture more local SEO traffic'],
      threats: ['Rising competitor ad spend', 'Market saturation in paid acquisition'],
    },
    websiteRecommendations: [
      'Improve homepage messaging for clarity and trust.',
      'Add social proof and customer case studies.',
      'Optimize mobile speed and conversion paths.',
    ],
    seoSuggestions: [
      'Target long-tail keywords around your offer.',
      'Create a monthly blog content roadmap.',
      'Improve internal linking and metadata.',
    ],
    marketingPlan: [
      'Launch an email nurture sequence.',
      'Build retargeting campaigns for top landing pages.',
      'Publish short-form video content weekly.',
    ],
    competitorInsights: [
      'Competitors are over-indexing on paid social.',
      'Gaps exist in customer education content.',
    ],
    growthOpportunities: [
      'Expand referral incentives and affiliate campaigns.',
      'Introduce a lead magnet and upsell funnel.',
    ],
    summary: payload.title || 'AI-generated growth plan prepared successfully.',
  };
};

export { generateAnalysis };

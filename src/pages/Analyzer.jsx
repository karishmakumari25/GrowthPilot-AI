import { useState } from 'react';
import { generateAnalysis } from '../services/analyzerService';
import Section from '../components/Section';

const initialForm = {
  businessName: '',
  industry: '',
  revenue: '',
  audience: '',
  goal: '',
};

function Analyzer() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.businessName.trim()) nextErrors.businessName = 'Business name is required.';
    if (!form.industry.trim()) nextErrors.industry = 'Industry is required.';
    if (!form.revenue.trim()) nextErrors.revenue = 'Revenue is required.';
    if (!form.audience.trim()) nextErrors.audience = 'Audience is required.';
    if (!form.goal.trim()) nextErrors.goal = 'Primary goal is required.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await generateAnalysis(form);
      setReport(data);
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section title="AI Business Analyzer" subtitle="Describe your business and receive a strategic growth report.">
        <div className="analyzer-layout">
          <form className="card form-card" onSubmit={handleSubmit} noValidate>
            <label>
              Business name
              <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Acme Studio" />
              {errors.businessName && <span className="error-text">{errors.businessName}</span>}
            </label>
            <label>
              Industry
              <input name="industry" value={form.industry} onChange={handleChange} placeholder="SaaS / Retail / Agency" />
              {errors.industry && <span className="error-text">{errors.industry}</span>}
            </label>
            <label>
              Annual revenue
              <input name="revenue" value={form.revenue} onChange={handleChange} placeholder="250000" />
              {errors.revenue && <span className="error-text">{errors.revenue}</span>}
            </label>
            <label>
              Target audience
              <input name="audience" value={form.audience} onChange={handleChange} placeholder="Small businesses in North America" />
              {errors.audience && <span className="error-text">{errors.audience}</span>}
            </label>
            <label>
              Primary goal
              <input name="goal" value={form.goal} onChange={handleChange} placeholder="Increase qualified leads" />
              {errors.goal && <span className="error-text">{errors.goal}</span>}
            </label>
            {errors.submit && <p className="error-text">{errors.submit}</p>}
            <button className="btn btn-primary" type="submit">Generate Analysis</button>
          </form>

          <div className="card report-card">
            {loading ? (
              <div className="spinner-wrap">
                <div className="spinner" />
                <p>Generating your AI-powered discovery report...</p>
              </div>
            ) : report ? (
              <>
                <div className="score-box">
                  <h3>Business Score</h3>
                  <div className="score-value">{report.businessScore}/100</div>
                </div>
                <p className="report-summary">{report.summary}</p>
                <div className="report-section">
                  <h4>SWOT Analysis</h4>
                  <ul>
                    <li><strong>Strengths:</strong> {report.swot.strengths.join(', ')}</li>
                    <li><strong>Weaknesses:</strong> {report.swot.weaknesses.join(', ')}</li>
                    <li><strong>Opportunities:</strong> {report.swot.opportunities.join(', ')}</li>
                    <li><strong>Threats:</strong> {report.swot.threats.join(', ')}</li>
                  </ul>
                </div>
                <div className="report-section">
                  <h4>Website Recommendations</h4>
                  <ul>{report.websiteRecommendations.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="report-section">
                  <h4>SEO Suggestions</h4>
                  <ul>{report.seoSuggestions.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="report-section">
                  <h4>Digital Marketing Plan</h4>
                  <ul>{report.marketingPlan.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="report-section">
                  <h4>Competitor Insights</h4>
                  <ul>{report.competitorInsights.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className="report-section">
                  <h4>Growth Opportunities</h4>
                  <ul>{report.growthOpportunities.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </>
            ) : (
              <div className="placeholder-card">
                <h3>Your report will appear here</h3>
                <p>Complete the form to receive a tailored AI-generated growth strategy.</p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

export default Analyzer;

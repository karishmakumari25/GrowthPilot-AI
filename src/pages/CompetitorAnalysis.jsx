import { useState } from 'react';
import Button from '../components/Button';
import CompetitorReport from '../components/CompetitorReport';
import { analyzeCompetitor } from '../services/gemini';

const initialForm = {
  competitorName: '',
  website: '',
  industry: '',
  city: '',
};

function CompetitorAnalysis() {
  const [form, setForm] = useState(initialForm);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitRequest = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    setLoading(true);
    setReport(null);
    setError('');

    try {
      const payload = await analyzeCompetitor({ ...form });
      setReport(payload);
    } catch (error) {
      setError(error.message || 'Unable to analyze the competitor right now. Please try again.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => submitRequest(event);
  const handleRetry = () => submitRequest();

  return (
    <section className="competitor-page">
      <div className="container">
        <div className="competitor-hero">
          <p className="eyebrow">Competitor intelligence</p>
          <h1>Understand the market before you move</h1>
          <p>Benchmark competitor digital presence, spot growth gaps, and uncover opportunities to strengthen your own positioning.</p>
        </div>

        <div className="competitor-grid">
          <div className="competitor-card">
            <h2>Analyze a Competitor</h2>
            <p className="hero__description">Evaluate a brand’s website quality, SEO health, and marketing strengths in just a few steps.</p>

            <form className="competitor-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="competitorName">Competitor Business Name</label>
                  <input id="competitorName" name="competitorName" value={form.competitorName} onChange={handleChange} required />
                </div>
                <div className="form-field">
                  <label htmlFor="website">Competitor Website URL</label>
                  <input id="website" name="website" type="url" value={form.website} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="industry">Industry</label>
                  <select id="industry" name="industry" value={form.industry} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input id="city" name="city" value={form.city} onChange={handleChange} required />
                </div>
              </div>

              {error && (
                <div className="form-error-block">
                  <p className="form-error">{error}</p>
                  <Button type="button" variant="secondary" onClick={handleRetry}>Try again</Button>
                </div>
              )}
              <Button type="submit" variant="primary">Analyze</Button>
            </form>
          </div>

          <CompetitorReport report={report} loading={loading} />
        </div>
      </div>
    </section>
  );
}

export default CompetitorAnalysis;

import { useMemo, useState } from 'react';
import Button from '../components/Button';
import AnalyzerReport from '../components/AnalyzerReport';
import { analyzeBusiness } from '../services/gemini';

const initialForm = {
  businessName: '',
  ownerName: '',
  category: '',
  description: '',
  city: '',
  website: '',
  revenue: '',
  employees: '',
  challenges: [],
  goals: '',
  customers: '',
  competitor: '',
};

const challengeOptions = [
  'Low Website Traffic',
  'Low Lead Conversion',
  'Weak Local Visibility',
  'Limited Marketing Budget',
  'Brand Awareness',
  'Team Capacity',
];

function AIAnalyzer() {
  const [form, setForm] = useState(initialForm);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = useMemo(() => {
    return Object.values(form).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return String(value).trim().length > 0;
    });
  }, [form]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setForm((current) => ({
      ...current,
      challenges: checked
        ? [...current.challenges, value]
        : current.challenges.filter((item) => item !== value),
    }));
  };

  const submitRequest = async (event) => {
    if (event?.preventDefault) {
      event.preventDefault();
    }

    setLoading(true);
    setReport(null);
    setError('');

    try {
      const payload = await analyzeBusiness({ ...form, challenges: form.challenges.join(', ') });
      setReport(payload);
    } catch (error) {
      setError(error.message || 'Unable to generate the AI report right now. Please try again.');
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => submitRequest(event);
  const handleRetry = () => submitRequest();

  return (
    <section className="analyzer-page">
      <div className="container analyzer-grid">
        <div className="analyzer-card">
          <p className="eyebrow">AI business analyzer</p>
          <h1>Analyze Your Business with AI</h1>
          <p className="hero__description">
            Build a tailored growth strategy with a professional business review, SEO direction, marketing priorities, and a clear action plan.
          </p>

          <form className="analyzer-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="businessName">Business Name</label>
                <input id="businessName" name="businessName" value={form.businessName} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="ownerName">Owner Name</label>
                <input id="ownerName" name="ownerName" value={form.ownerName} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="category">Business Category</label>
                <select id="category" name="category" value={form.category} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Service Business">Service Business</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Local Business">Local Business</option>
                  <option value="B2B SaaS">B2B SaaS</option>
                  <option value="Consulting">Consulting</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="city">City</label>
                <input id="city" name="city" value={form.city} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">Business Description</label>
              <textarea id="description" name="description" value={form.description} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="website">Business Website (optional)</label>
                <input id="website" name="website" value={form.website} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="competitor">Competitor Website (optional)</label>
                <input id="competitor" name="competitor" value={form.competitor} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="revenue">Monthly Revenue</label>
                <input id="revenue" name="revenue" value={form.revenue} onChange={handleChange} required />
              </div>
              <div className="form-field">
                <label htmlFor="employees">Number of Employees</label>
                <input id="employees" name="employees" value={form.employees} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-field">
              <label>Current Challenges</label>
              <div className="checkbox-group">
                {challengeOptions.map((option) => (
                  <label className="checkbox-chip" key={option}>
                    <input type="checkbox" value={option} checked={form.challenges.includes(option)} onChange={handleCheckboxChange} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="goals">Business Goals</label>
              <textarea id="goals" name="goals" value={form.goals} onChange={handleChange} required />
            </div>

            <div className="form-field">
              <label htmlFor="customers">Target Customers</label>
              <textarea id="customers" name="customers" value={form.customers} onChange={handleChange} required />
            </div>

            {error && (
              <div className="form-error-block">
                <p className="form-error">{error}</p>
                <Button type="button" variant="secondary" onClick={handleRetry}>
                  Try again
                </Button>
              </div>
            )}

            <div className="form-actions">
              <Button type="submit" variant="primary">Generate AI Report</Button>
              <Button type="button" variant="secondary" onClick={() => { setForm(initialForm); setError(''); setReport(null); }}>
                Reset
              </Button>
            </div>
          </form>
        </div>

        <AnalyzerReport report={report} loading={loading} />
      </div>
    </section>
  );
}

export default AIAnalyzer;

import PricingCard from '../components/PricingCard';
import PricingFAQ from '../components/PricingFAQ';

const plans = [
  {
    name: 'Starter',
    price: '$79',
    period: 'mo',
    description: 'Perfect for early-stage businesses that want clarity and quick momentum.',
    features: ['AI business insight', 'Basic website review', 'Email support'],
  },
  {
    name: 'Professional',
    price: '$199',
    period: 'mo',
    description: 'Ideal for growing teams that need strategy, execution, and faster support.',
    features: ['Everything in Starter', 'SEO recommendations', 'Growth roadmap', 'Priority support'],
  },
  {
    name: 'Business',
    price: '$349',
    period: 'mo',
    description: 'Built for companies that want deeper analysis and stronger visibility.',
    features: ['Everything in Professional', 'Competitor insights', 'Marketing strategy', 'Monthly reporting'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'quote',
    description: 'For larger organizations requiring tailored support and premium delivery.',
    features: ['Everything in Business', 'Dedicated strategist', 'Advanced analytics', 'Custom rollout'],
  },
];

const comparisonRows = [
  ['AI analysis', 'Included', 'Included', 'Included', 'Included'],
  ['Website review', 'Basic', 'Advanced', 'Advanced', 'Full'],
  ['SEO strategy', '—', 'Included', 'Included', 'Included'],
  ['Competitor insights', '—', '—', 'Included', 'Included'],
  ['Priority support', '—', 'Included', 'Included', 'Priority'],
  ['Custom roadmap', '—', '—', '—', 'Included'],
];

function Pricing() {
  return (
    <section className="pricing-page">
      <div className="container">
        <div className="pricing-hero">
          <p className="eyebrow">Flexible growth plans</p>
          <h1>Choose the plan that fits your next stage</h1>
          <p>Every package is designed to help businesses move from uncertainty to action with premium strategy, practical recommendations, and measurable execution.</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} featured={index === 1} />
          ))}
        </div>

        <div className="table-card">
          <div className="section-heading">
            <h2>Feature Comparison</h2>
            <p>Compare what each package includes so you can select the right fit.</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Starter</th>
                <th>Professional</th>
                <th>Business</th>
                <th>Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]}>
                  <td>{row[0]}</td>
                  <td>{row[1]}</td>
                  <td>{row[2]}</td>
                  <td>{row[3]}</td>
                  <td>{row[4]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PricingFAQ />

        <div className="cta-banner">
          <div>
            <p className="eyebrow">Ready to launch?</p>
            <h2>Need a custom growth plan for your brand?</h2>
            <p>Let’s discuss your goals and build a tailored roadmap for your next phase of growth.</p>
          </div>
          <a className="btn btn--primary" href="/contact">Book a Consultation</a>
        </div>
      </div>
    </section>
  );
}

export default Pricing;

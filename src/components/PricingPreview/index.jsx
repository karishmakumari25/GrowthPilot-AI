import { Link } from 'react-router-dom';
import Section from '../Section';
import RevealOnScroll from '../RevealOnScroll';

const plans = [
  {
    name: 'Starter',
    price: '$79',
    description: 'A focused launch package for smaller businesses ready to grow.',
    features: ['AI discovery report', 'Basic SEO review', 'Email support'],
    featured: false,
  },
  {
    name: 'Business',
    price: '$199',
    description: 'A premium option for brands that want more depth and execution.',
    features: ['Advanced AI analysis', 'Website growth plan', 'Priority support'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '$399',
    description: 'Complete strategy, reporting, and growth support for scaling organizations.',
    features: ['Full growth roadmap', 'Custom campaign direction', 'Dedicated guidance'],
    featured: false,
  },
];

function PricingPreview() {
  return (
    <Section
      title="Pricing Preview"
      subtitle="Choose the level of support that fits your growth stage."
    >
      <div className="pricing-grid">
        {plans.map((plan) => (
          <RevealOnScroll key={plan.name}>
            <article className={`pricing-card ${plan.featured ? 'pricing-card--featured' : ''}`}>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className="pricing-card__price">{plan.price}<span>/mo</span></div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </article>
          </RevealOnScroll>
        ))}
      </div>

      <div className="section-actions">
        <Link className="btn btn--primary" to="/pricing">View Full Pricing</Link>
      </div>
    </Section>
  );
}

export default PricingPreview;

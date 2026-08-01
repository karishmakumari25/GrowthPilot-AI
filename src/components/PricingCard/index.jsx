import Button from '../Button';

function PricingCard({ plan, featured = false }) {
  return (
    <article className={`pricing-card ${featured ? 'pricing-card--featured' : ''}`}>
      {featured && <span className="badge-popular">Most Popular</span>}
      <h3 className="pricing-card__name">{plan.name}</h3>
      <div className="pricing-card__price">{plan.price}<span>/{plan.period}</span></div>
      <p className="pricing-card__description">{plan.description}</p>
      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <Button variant={featured ? 'primary' : 'secondary'}>Get Started</Button>
    </article>
  );
}

export default PricingCard;

const benefits = [
  { title: 'Weekly payouts', icon: '⚡', text: 'Receive commissions quickly with transparent tracking.' },
  { title: 'Premium support', icon: '🤝', text: 'Get dedicated partner assistance whenever you need it.' },
  { title: 'Dedicated assets', icon: '🧰', text: 'Access swipe files, guides, and social content for outreach.' },
  { title: 'Recurring rewards', icon: '🌱', text: 'Earn more as your referrals expand their subscription.' },
];

function ReferralBenefits() {
  return (
    <section className="referral-benefits">
      <h3>Why partners love it</h3>
      <div className="benefits-grid">
        {benefits.map((benefit) => (
          <div className="benefit-card" key={benefit.title}>
            <div className="benefit-icon">{benefit.icon}</div>
            <h4>{benefit.title}</h4>
            <p>{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferralBenefits;

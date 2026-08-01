const faqs = [
  { question: 'How do I qualify for commissions?', answer: 'Once a referred business activates a paid plan, your commission is automatically credited.' },
  { question: 'Is there a minimum payout?', answer: 'No. You can withdraw earnings whenever your balance reaches ₹1,000.' },
  { question: 'Can I promote GrowthPilot AI on social media?', answer: 'Absolutely. We provide partner assets and approval guidance for campaigns.' },
];

function ReferralFAQ() {
  return (
    <section className="referral-faq">
      <h3>Frequently asked questions</h3>
      <div className="faq-list">
        {faqs.map((item) => (
          <div className="faq-item" key={item.question}>
            <h4>{item.question}</h4>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferralFAQ;

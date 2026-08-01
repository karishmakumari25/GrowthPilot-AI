const faqs = [
  {
    question: 'Do I need a long-term contract?',
    answer: 'No. All plans are flexible, and you can upgrade or adjust your package as your needs grow.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Yes. You can move between plans at any time to align with your stage and objectives.',
  },
  {
    question: 'Is support included?',
    answer: 'Support is available across all plans, with faster response times on higher-tier packages.',
  },
];

function PricingFAQ() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <h2>Pricing FAQ</h2>
          <p>Answers to the most common questions about plans, support, and onboarding.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingFAQ;

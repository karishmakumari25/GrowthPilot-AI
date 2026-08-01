import { useState } from 'react';

const faqs = [
  {
    q: 'How quickly can I get started?',
    a: 'Most teams launch their first growth plan within a few days using our guided workflow.',
  },
  {
    q: 'Can I use this for any business model?',
    a: 'Yes. The analyzer is tailored for startups, e-commerce brands, consultants, and service businesses.',
  },
  {
    q: 'Is the AI report customizable?',
    a: 'Absolutely. You can refine the report by adding your target audience, channels, and growth targets.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((item, index) => (
        <div className={`faq-card ${openIndex === index ? 'open' : ''}`} key={item.q}>
          <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
            <span>{item.q}</span>
            <span>{openIndex === index ? '−' : '+'}</span>
          </button>
          {openIndex === index && <p className="faq-answer">{item.a}</p>}
        </div>
      ))}
    </div>
  );
}

export default FAQ;

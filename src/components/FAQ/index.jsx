import { useState } from 'react';
import Section from '../Section';
import RevealOnScroll from '../RevealOnScroll';

const faqs = [
  {
    question: 'What does the AI analysis include?',
    answer: 'It covers business positioning, competitor context, website performance, growth opportunities, and next-step recommendations.',
  },
  {
    question: 'Do you offer flexible pricing?',
    answer: 'Yes. We provide starter, business, and premium options so teams can select the right level of service and support.',
  },
  {
    question: 'Can you build a website for my brand?',
    answer: 'Absolutely. We create modern websites using thoughtful design, strong messaging, and a conversion-focused structure.',
  },
  {
    question: 'Is there a referral program?',
    answer: 'Yes. We reward partners and clients for helping us grow through our referral program and collaborative opportunities.',
  },
  {
    question: 'What support is included?',
    answer: 'Support varies by plan, but all clients receive access to clear communication and practical guidance throughout their engagement.',
  },
  {
    question: 'How long does a typical engagement take?',
    answer: 'Timelines depend on scope, but most projects begin with a discovery phase followed by delivery and refinement.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      title="Frequently Asked Questions"
      subtitle="Everything you need to know before getting started."
      className="section--faq"
    >
      <div className="faq-list">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <RevealOnScroll key={item.question}>
              <article className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                <button className="faq-item__button" onClick={() => setOpenIndex(isOpen ? -1 : index)}>
                  <span>{item.question}</span>
                  <span className="faq-item__icon">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && <p className="faq-item__answer">{item.answer}</p>}
              </article>
            </RevealOnScroll>
          );
        })}
      </div>
    </Section>
  );
}

export default FAQ;

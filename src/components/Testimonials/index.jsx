import Section from '../Section';
import RevealOnScroll from '../RevealOnScroll';

const testimonials = [
  {
    name: 'Maya Chen',
    business: 'Northstar Studio',
    rating: '★★★★★',
    feedback: 'The AI analysis gave us clarity on positioning and the website redesign lifted our conversions immediately.',
  },
  {
    name: 'Daniel Brooks',
    business: 'BrightPath Accounting',
    rating: '★★★★★',
    feedback: 'Professional, thoughtful, and practical. The recommendations felt tailored to our real business needs.',
  },
  {
    name: 'Amira Patel',
    business: 'Luma Wellness',
    rating: '★★★★★',
    feedback: 'The growth strategy helped us focus on the right channels and improve our online visibility fast.',
  },
];

function Testimonials() {
  return (
    <Section
      title="Testimonials"
      subtitle="Trusted by founders and growing teams that want results, not fluff."
    >
      <div className="cards-grid">
        {testimonials.map((testimonial) => (
          <RevealOnScroll key={testimonial.name}>
            <article className="testimonial-card">
              <div className="testimonial-card__rating">{testimonial.rating}</div>
              <p>“{testimonial.feedback}”</p>
              <h3>{testimonial.name}</h3>
              <span>{testimonial.business}</span>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}

export default Testimonials;

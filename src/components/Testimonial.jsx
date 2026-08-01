const testimonials = [
  {
    name: 'Mina Chen',
    role: 'Founder, Northstar Studio',
    quote: 'The AI analyzer gave us clarity on messaging, SEO, and conversion gaps in one afternoon.',
  },
  {
    name: 'Daniel Ortiz',
    role: 'Growth Lead, BrightLabs',
    quote: 'The dashboards and competitor insights helped our team prioritize work with confidence.',
  },
  {
    name: 'Ava Patel',
    role: 'COO, Invoicely',
    quote: 'We saw more qualified leads and stronger retention after implementing the recommendations.',
  },
];

function Testimonial() {
  return (
    <div className="card-grid testimonials-grid">
      {testimonials.map((item) => (
        <article key={item.name} className="card">
          <p>“{item.quote}”</p>
          <h4>{item.name}</h4>
          <span>{item.role}</span>
        </article>
      ))}
    </div>
  );
}

export default Testimonial;

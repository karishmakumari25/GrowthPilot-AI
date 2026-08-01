import Section from '../Section';
import RevealOnScroll from '../RevealOnScroll';

const services = [
  { title: 'Website Development', description: 'Custom web experiences built for high trust and strong conversion.', badge: 'Launch Fast' },
  { title: 'WordPress Website', description: 'Flexible, scalable websites for service brands and modern businesses.', badge: 'CMS Ready' },
  { title: 'React Website', description: 'High-performance interfaces that feel premium and modern.', badge: 'Modern Stack' },
  { title: 'SEO Services', description: 'Technical and content SEO that improves visibility and qualified traffic.', badge: 'Rank Higher' },
  { title: 'Google Business Profile', description: 'Optimized local presence to win more nearby opportunities.', badge: 'Local Growth' },
  { title: 'Social Media Marketing', description: 'Creative campaigns that build attention, engagement, and demand.', badge: 'Social Reach' },
];

function Services() {
  return (
    <Section
      title="Services"
      subtitle="Flexible support for growth, visibility, and customer acquisition."
    >
      <div className="cards-grid cards-grid--services">
        {services.map((service) => (
          <RevealOnScroll key={service.title}>
            <article className="service-card">
              <span className="service-card__badge">{service.badge}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}

export default Services;

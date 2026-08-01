import Section from '../Section';
import Card from '../Card';
import RevealOnScroll from '../RevealOnScroll';

const features = [
  {
    title: 'AI Business Analysis',
    description: 'Understand your market, customer intent, and growth opportunities with actionable AI insights.',
    icon: '⚡',
  },
  {
    title: 'Website Development',
    description: 'Launch modern, conversion-oriented websites that look premium and perform beautifully.',
    icon: '🖥️',
  },
  {
    title: 'SEO Optimization',
    description: 'Improve visibility with on-page and technical SEO tailored to your industry and audience.',
    icon: '🔎',
  },
  {
    title: 'Digital Marketing',
    description: 'Build campaigns that increase reach, engagement, and qualified leads with clear direction.',
    icon: '📈',
  },
  {
    title: 'Competitor Analysis',
    description: 'Gain a sharper edge by understanding what your competitors are doing and where you can win.',
    icon: '🛡️',
  },
  {
    title: 'Business Growth Strategy',
    description: 'Align your team around a practical roadmap for revenue growth, retention, and scale.',
    icon: '🚀',
  },
];

function Features() {
  return (
    <Section
      title="Why Choose GrowthPilot AI"
      subtitle="A premium blend of strategy, technology, and execution for ambitious teams."
    >
      <div className="cards-grid">
        {features.map((feature) => (
          <RevealOnScroll key={feature.title}>
            <Card title={feature.title}>
              <div className="feature-icon">{feature.icon}</div>
              <p>{feature.description}</p>
            </Card>
          </RevealOnScroll>
        ))}
      </div>
    </Section>
  );
}

export default Features;

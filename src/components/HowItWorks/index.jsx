import Section from '../Section';
import Card from '../Card';

const steps = [
  {
    title: 'Fill Business Form',
    description: 'Share your business goals, audience, and growth priorities so the AI learns what matters most.',
  },
  {
    title: 'AI Analysis',
    description: 'We combine market insights, website performance, and competitor signals into a tailored action plan.',
  },
  {
    title: 'Receive Report',
    description: 'Get a polished report with priorities, opportunities, and the next best moves for your team.',
  },
  {
    title: 'Grow Your Business',
    description: 'Launch the recommended strategy with confidence and track measurable progress over time.',
  },
];

function HowItWorks() {
  return (
    <Section
      title="How It Works"
      subtitle="A clear path from insight to real growth, without the usual complexity."
      className="section--compact"
    >
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div className="step-card" key={step.title}>
            <div className="step-card__index">0{index + 1}</div>
            <Card title={step.title}>
              <p>{step.description}</p>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default HowItWorks;

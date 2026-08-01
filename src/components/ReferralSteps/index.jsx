const steps = [
  { title: 'Share your link', icon: '🔗', text: 'Send your personalized link to founders, agencies, and growth teams.' },
  { title: 'Qualify leads', icon: '🎯', text: 'Introduce GrowthPilot AI and help teams discover the right workflow.' },
  { title: 'Track conversions', icon: '📈', text: 'Monitor every signup and commission directly in your dashboard.' },
  { title: 'Get paid fast', icon: '💸', text: 'Withdraw earnings weekly once your referral becomes active.' },
];

function ReferralSteps() {
  return (
    <section className="referral-steps">
      <h3>How it works</h3>
      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.title}>
            <div className="step-icon">{step.icon}</div>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReferralSteps;

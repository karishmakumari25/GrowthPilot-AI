const insights = [
  { title: 'Growth tip', text: 'Focus on the mid-funnel retention gap this month to improve recurring revenue.' },
  { title: 'Next step', text: 'Schedule a competitor benchmark review before your next pricing decision.' },
  { title: 'Opportunity', text: 'Your audience response suggests stronger ROI messaging could lift conversions.' },
];

function AIInsightsPanel() {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__head">
        <h3>AI Insights</h3>
        <a href="/ai-analyzer">Refresh</a>
      </div>
      <div className="insights-list">
        {insights.map((item) => (
          <article className="insight-card" key={item.title}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AIInsightsPanel;

const activities = [
  { title: 'AI Growth Analysis', time: '10:20 AM', status: 'Completed', detail: 'Revenue model review completed for Northstar Labs' },
  { title: 'Competitor Scan', time: 'Yesterday', status: 'Reviewing', detail: 'Pricing benchmarks and positioning notes updated' },
  { title: 'Referral Payout', time: '2 days ago', status: 'Scheduled', detail: 'Commission distribution queued for this week' },
];

function ActivityTimeline() {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__head">
        <h3>Recent Activity</h3>
        <a href="/ai-analyzer">View all</a>
      </div>
      <div className="activity-list">
        {activities.map((item) => (
          <article className="activity-item" key={item.title}>
            <div className="activity-item__dot"></div>
            <div className="activity-item__content">
              <div className="activity-item__top">
                <h4>{item.title}</h4>
                <span className={`status-badge status-badge--${item.status.toLowerCase()}`}>{item.status}</span>
              </div>
              <p>{item.detail}</p>
              <small>{item.time}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ActivityTimeline;

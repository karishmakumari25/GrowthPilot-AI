const actions = [
  { title: 'Start New AI Analysis', icon: '✨', href: '/ai-analyzer' },
  { title: 'Competitor Analysis', icon: '📊', href: '/competitor-analysis' },
  { title: 'Download Reports', icon: '⬇️', href: '/dashboard' },
  { title: 'Contact Expert', icon: '💬', href: '/contact' },
];

function QuickActions() {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__head">
        <h3>Quick Actions</h3>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action) => (
          <a className="quick-action-card" href={action.href} key={action.title}>
            <div className="quick-action-card__icon">{action.icon}</div>
            <span>{action.title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;

function StatCard({ title, value, change, accent }) {
  return (
    <article className="stat-card dashboard-stat-card">
      <div className="dashboard-stat-card__top">
        <span>{title}</span>
        <span className="dashboard-stat-card__accent" style={{ background: accent }}></span>
      </div>
      <strong>{value}</strong>
      <p>{change}</p>
    </article>
  );
}

export default StatCard;

function ProfileCard() {
  return (
    <section className="dashboard-panel profile-card">
      <div className="profile-card__avatar">M</div>
      <h3>Maya Chen</h3>
      <p>Northstar Labs</p>
      <span className="status-badge status-badge--completed">Premium Member</span>
      <div className="profile-card__meta">
        <div>
          <strong>4</strong>
          <span>Active plans</span>
        </div>
        <div>
          <strong>24/7</strong>
          <span>Support</span>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;

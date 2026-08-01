function ReferralSummary() {
  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__head">
        <h3>Referral Summary</h3>
        <a href="/referral-program">View program</a>
      </div>
      <div className="summary-grid">
        <div>
          <strong>48</strong>
          <span>Total referrals</span>
        </div>
        <div>
          <strong>19</strong>
          <span>Successful referrals</span>
        </div>
        <div>
          <strong>₹2.4L</strong>
          <span>Total earnings</span>
        </div>
      </div>
    </section>
  );
}

export default ReferralSummary;

function ReferralEarnings() {
  return (
    <div className="referral-earnings">
      <div className="earnings-summary">
        <div>
          <p className="eyebrow">Earnings overview</p>
          <div className="earnings-value">₹1,000</div>
        </div>
        <span className="pill">Per successful referral</span>
      </div>
      <div className="progress-card">
        <p>Current monthly target</p>
        <strong>₹2.4L</strong>
        <div className="progress-bar">
          <span style={{ width: '70%' }}></span>
        </div>
        <small>70% of your goal achieved</small>
      </div>
    </div>
  );
}

export default ReferralEarnings;

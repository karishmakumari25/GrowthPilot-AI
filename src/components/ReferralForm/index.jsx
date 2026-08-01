import Button from '../Button';

function ReferralForm() {
  return (
    <div className="referral-card">
      <h3>Apply to become a partner</h3>
      <p className="section-copy">Tell us a little about you and we’ll activate your referral dashboard within 24 hours.</p>
      <form className="referral-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" type="text" placeholder="Alex Morgan" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Business email</label>
            <input id="email" type="email" placeholder="alex@company.com" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="company">Company / niche</label>
            <input id="company" type="text" placeholder="SaaS, agency, ecommerce" />
          </div>
          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
        </div>
        <Button variant="primary" className="w-full">Request access</Button>
      </form>
    </div>
  );
}

export default ReferralForm;

import Button from '../Button';

function ContactForm() {
  return (
    <section className="contact-card">
      <h3>Tell us about your goals</h3>
      <p className="section-copy">Share what you’re building and we’ll match you with the right growth strategy.</p>
      <form className="contact-form">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Your name" />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@company.com" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>
          <div className="form-field">
            <label htmlFor="business">Business name</label>
            <input id="business" type="text" placeholder="Your company" />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" rows="5" placeholder="Tell us about your priorities..."></textarea>
        </div>
        <Button variant="primary" className="w-full">Send message</Button>
      </form>
    </section>
  );
}

export default ContactForm;

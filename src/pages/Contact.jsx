import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactDetails from '../components/ContactDetails';
import ContactMap from '../components/ContactMap';
import Button from '../components/Button';

function Contact() {
  return (
    <main className="page contact-page">
      <div className="container">
        <ContactHero />

        <div className="contact-layout">
          <div>
            <ContactForm />
            <section className="contact-faq">
              <h3>Need a quick answer?</h3>
              <p>We can help with onboarding, audits, campaign planning, and strategic growth support.</p>
            </section>
          </div>

          <div>
            <ContactDetails />
            <div style={{ marginTop: '1rem' }}>
              <ContactMap />
            </div>
          </div>
        </div>

        <section className="contact-cta">
          <div>
            <p className="eyebrow">Start the conversation</p>
            <h3>Let’s turn your next opportunity into a measurable growth plan.</h3>
            <p>Reach out today and we’ll guide you from first conversation to launch-ready strategy.</p>
          </div>
          <Button variant="primary">Book a discovery call</Button>
        </section>
      </div>
    </main>
  );
}

export default Contact;

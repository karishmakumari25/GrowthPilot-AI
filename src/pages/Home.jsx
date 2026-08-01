import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import PricingPreview from '../components/PricingPreview';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

function Home() {
  return (
    <main>
      <Hero />
      <section className="stats-section">
        <div className="container stats-grid">
          <article className="stat-card reveal">
            <strong data-counter="500">0</strong>
            <span>Businesses Helped</span>
          </article>
          <article className="stat-card reveal">
            <strong data-counter="95">0</strong>
            <span>Client Satisfaction</span>
          </article>
          <article className="stat-card reveal">
            <strong data-counter="1000">0</strong>
            <span>AI Reports Generated</span>
          </article>
          <article className="stat-card reveal">
            <strong data-counter="24">0</strong>
            <span>AI Support</span>
          </article>
        </div>
      </section>
      <Features />
      <HowItWorks />
      <Services />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <section className="final-cta">
        <div className="container final-cta__inner reveal">
          <div>
            <p className="eyebrow">Ready to scale?</p>
            <h2>Ready to Grow Your Business?</h2>
            <p>Bring clarity to your next stage with expert AI support and measurable growth strategy.</p>
          </div>
          <div className="final-cta__actions">
            <a className="btn btn--primary" href="/ai-analyzer">Start Free Analysis</a>
            <a className="btn btn--secondary" href="/contact">Contact Us</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

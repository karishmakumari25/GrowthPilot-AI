import { Link } from 'react-router-dom';
import LogoMark from '../LogoMark';

function Hero() {
  return (
    <section className="hero reveal">
      <div className="container hero__grid">
        <div className="hero__content">
          <div className="hero__brand-row">
            <LogoMark />
            <span>GrowthPilot AI</span>
          </div>
          <p className="eyebrow">AI Growth Intelligence</p>
          <h1>Grow Your Business with AI</h1>
          <p className="hero__description">
            Turn data, strategy, and customer signals into confident growth decisions with a premium AI partner built for modern brands.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/ai-analyzer">Get Free AI Analysis</Link>
            <Link className="btn btn--secondary" to="/pricing">View Pricing</Link>
          </div>
          <ul className="hero__highlights">
            <li>Smart growth plans</li>
            <li>Conversion-focused insights</li>
            <li>Fast expert support</li>
          </ul>
        </div>

        <div className="hero__visual" aria-label="GrowthPilot AI dashboard illustration">
          <div className="hero__orb hero__orb--one" />
          <div className="hero__orb hero__orb--two" />
          <div className="hero__visual-card hero__visual-card--main">
            <div className="hero__visual-top">
              <span>Growth dashboard</span>
              <span className="hero__chip">Live</span>
            </div>
            <div className="hero__visual-bar" />
            <div className="hero__visual-bar hero__visual-bar--wide" />
            <div className="hero__visual-bar hero__visual-bar--short" />
            <div className="hero__mini-grid">
              <div className="hero__mini-card" />
              <div className="hero__mini-card hero__mini-card--accent" />
            </div>
          </div>
          <div className="hero__visual-card hero__visual-card--accent">
            <p>Revenue Forecast</p>
            <strong>+32% Growth</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

const services = [
  { label: 'AI Analyzer', href: '/ai-analyzer' },
  { label: 'Competitor Insights', href: '/competitor-analysis' },
  { label: 'Referral Program', href: '/referral-program' },
  { label: 'Dashboard', href: '/dashboard' },
];

/**
 * Polished footer for the SaaS experience.
 */
function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__brand-mark">✦</div>
          <div>
            <h3>GrowthPilot AI</h3>
            <p>Turn growth signals into confident decisions with a calm, intelligent command center.</p>
          </div>
        </div>

        <div className="footer__column">
          <h4>Quick Links</h4>
          <ul className="footer__list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a className="footer__link" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>Services</h4>
          <ul className="footer__list">
            {services.map((service) => (
              <li key={service.label}>
                <a className="footer__link" href={service.href}>
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>Contact</h4>
          <ul className="footer__list">
            <li>hello@growthpilot.ai</li>
            <li>+1 (800) 555-0199</li>
            <li>Remote • Global Support</li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© 2026 GrowthPilot AI. All rights reserved.</p>
        <div className="footer__legal">
          <a href="/about" className="footer__link">Privacy</a>
          <a href="/contact" className="footer__link">Terms</a>
          <a href="/dashboard" className="footer__link">Status</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/ai-analyzer', label: 'AI Analyzer' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/competitor-analysis', label: 'Competitor Analysis' },
  { to: '/referral-program', label: 'Referral Program' },
  { to: '/contact', label: 'Contact' },
  { to: '/dashboard', label: 'Dashboard' },
];

/**
 * Reusable navigation component.
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" onClick={closeMenu}>
          <span className="navbar__brand-mark">✦</span>
          <span>GrowthPilot AI</span>
        </NavLink>

        <button
          className={`navbar__toggle ${isOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`navbar__menu ${isOpen ? 'is-open' : ''}`}>
          <nav className="navbar__links" aria-label="Primary navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <NavLink to="/contact" className="navbar__cta" onClick={closeMenu}>
            Get Started
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

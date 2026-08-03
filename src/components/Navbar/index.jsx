import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'AI Analyzer', path: '/ai-analyzer' },
  { label: 'Competitor', path: '/competitor-analysis' },
  { label: 'Referral', path: '/referral-program' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  async function handleLogout() {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
  }

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(6,11,20,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(245,158,11,0.3)',
          }}>
            <span style={{ fontSize: 14, fontWeight: 900, color: '#0a0500' }}>GP</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em', color: 'var(--text)' }}>
            GrowthPilot <span style={{ color: 'var(--gold)' }}>AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 600,
                color: location.pathname === l.path ? 'var(--gold)' : 'var(--text-muted)',
                background: location.pathname === l.path ? 'rgba(245,158,11,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/signup" className="btn btn-gold btn-sm">Get Started</Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--text)', padding: 8 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor">
              {menuOpen
                ? <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                : <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(6,11,20,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '16px 24px 24px',
        }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.path} to={l.path} style={{
              display: 'block', padding: '12px 0', fontSize: '0.95rem', fontWeight: 600,
              color: location.pathname === l.path ? 'var(--gold)' : 'var(--text-muted)',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              {l.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
                <Link to="/signup" className="btn btn-gold btn-sm">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}

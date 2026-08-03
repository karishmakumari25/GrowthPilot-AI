import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import WhatsAppButton from './WhatsAppButton';

const HIDE_NAVBAR_ROUTES = ['/login', '/signup', '/forgot-password','/dashboard'];

export default function Layout({ children }) {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const hideNav = HIDE_NAVBAR_ROUTES.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: 'var(--surface-3)',
            color: 'var(--text)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px',
            fontSize: '0.875rem',
          },
          success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444',  secondary: '#fff' } },
        }}
      />

      {!hideNav && <Navbar />}

      <main style={{ minHeight: '100vh' }}>
        {children}
      </main>

      {!hideNav && <WhatsAppButton />}

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          style={{
            position: 'fixed', bottom: 96, right: 28, zIndex: 998,
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--surface-3)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-card)',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface-3)'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </>
  );
}

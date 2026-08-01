import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <a href="https://wa.me/18005550199" className="whatsapp-fab" target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp">
        <span>💬</span>
      </a>

      {showTop && (
        <button className="scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
          ↑
        </button>
      )}
    </>
  );
}

export default Layout;

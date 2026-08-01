import { useEffect, useState } from 'react';

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
      <main>{children}</main>

      {showTop && (
        <button 
          className="fixed bottom-6 right-6 z-50 bg-primary-container text-on-primary-container p-3 rounded-full shadow-lg hover:bg-primary transition-all font-bold"
          onClick={scrollToTop} 
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default Layout;

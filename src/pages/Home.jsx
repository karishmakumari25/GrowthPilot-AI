import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ── Animated counter hook ───────────────────────────────── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

/* ── Intersection observer hook ─────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ── Stats data ──────────────────────────────────────────── */
const STATS = [
  { label: 'Businesses Analyzed', value: 2400, suffix: '+' },
  { label: 'Average ROI Increase', value: 340, suffix: '%' },
  { label: 'Cities Covered', value: 120, suffix: '+' },
  { label: 'Happy Clients', value: 98, suffix: '%' },
];

/* ── Features data ───────────────────────────────────────── */
const FEATURES = [
  { icon: '🧠', title: 'AI Business Analysis', desc: 'Deep-dive AI analysis of your business with actionable growth recommendations powered by Gemini.' },
  { icon: '🔍', title: 'Competitor Intelligence', desc: 'Know exactly what your competitors are doing — SEO, social media, strategy and weaknesses.' },
  { icon: '📊', title: 'Digital Presence Score', desc: 'Get a comprehensive score of your online presence with a clear improvement roadmap.' },
  { icon: '📱', title: 'Social Media Strategy', desc: 'Platform-specific strategies tailored to your audience and business goals.' },
  { icon: '🚀', title: 'Growth Opportunities', desc: 'AI-detected untapped revenue opportunities with estimated ROI projections.' },
  { icon: '🤝', title: 'Referral Network', desc: 'Earn ₹1000 per referral with our partner program — no qualifications needed.' },
];

/* ── Testimonials data ───────────────────────────────────── */
const TESTIMONIALS = [
  { name: 'Rahul Sharma', role: 'Owner, TechMart Delhi', text: 'GrowthPilot AI gave us a complete roadmap in minutes. Our online sales grew 280% in 3 months!', rating: 5 },
  { name: 'Priya Mehta', role: 'Founder, StyleHub Mumbai', text: 'The competitor analysis feature is incredible. We finally understood why we were losing customers and fixed it.', rating: 5 },
  { name: 'Arjun Patel', role: 'CEO, FoodChain Ahmedabad', text: 'The AI report was better than anything our marketing agency produced. Pure gold for any business.', rating: 5 },
];

/* ── FAQ data ────────────────────────────────────────────── */
const FAQS = [
  { q: 'How does the AI analysis work?', a: 'We use Google Gemini AI to analyze your business details, market position, and competition. The AI generates a comprehensive report with scores, recommendations, and an action plan.' },
  { q: 'Is my business data secure?', a: 'Yes. All data is encrypted and stored securely in Firebase. We never share your business information with third parties.' },
  { q: 'How accurate are the AI recommendations?', a: 'Our AI is trained on millions of business data points and provides industry-specific insights with 85-95% relevance for most business types.' },
  { q: 'Can I download my analysis report?', a: 'Yes! Every analysis generates a professional PDF report you can download, share with your team, or present to investors.' },
  { q: 'How does the referral program work?', a: 'Refer any business to GrowthPilot AI. When they sign up for a paid plan, you earn ₹1000 instantly. No cap, no qualification required.' },
];

export default function Home() {
  const [statsRef, statsInView] = useInView();
  const [openFaq, setOpenFaq] = useState(null);
  const c0 = useCounter(STATS[0].value, 2000, statsInView);
  const c1 = useCounter(STATS[1].value, 2000, statsInView);
  const c2 = useCounter(STATS[2].value, 2000, statsInView);
  const c3 = useCounter(STATS[3].value, 2000, statsInView);
  const counts = [c0, c1, c2, c3];

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', paddingTop: 80,
        background: 'radial-gradient(ellipse 100% 80% at 50% -10%, rgba(245,158,11,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 60%), var(--bg)',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '60px 24px' }}>
          <div className="animate-fade-up" style={{ marginBottom: 24 }}>
            <span className="badge badge-gold">
              <span className="live-dot" /> AI-Powered Growth Engine v2.4
            </span>
          </div>
          <h1 className="animate-fade-up delay-1" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, color: 'var(--text)' }}>
            Scale Your Business with<br />
            <span className="gradient-text">Precision AI Intelligence</span>
          </h1>
          <p className="animate-fade-up delay-2" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: 580, margin: '0 auto 40px', lineHeight: 1.7 }}>
            Get a complete AI-powered analysis of your business, competitors, and growth opportunities. Trusted by 2400+ businesses across India.
          </p>
          <div className="animate-fade-up delay-3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ai-analyzer" className="btn btn-gold btn-lg">
              🚀 Analyze My Business Free
            </Link>
            <Link to="/pricing" className="btn btn-outline btn-lg">
              View Pricing Plans
            </Link>
          </div>
          {/* Trust badges */}
          <div className="animate-fade-up delay-4" style={{ marginTop: 48, display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['🔒 Secure & Private', '⚡ Results in 60 Seconds', '📥 Downloadable Report', '🤖 Gemini AI Powered'].map(b => (
              <span key={b} style={{ fontSize: '0.8rem', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 6 }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section ref={statsRef} style={{ padding: '64px 0', background: 'var(--surface)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="grid-4">
            {STATS.map((s, i) => (
              <div key={s.label} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, background: 'linear-gradient(135deg, var(--gold-light), var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1.1 }}>
                  {counts[i]}{s.suffix}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 8, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Core Capabilities</div>
            <h2 className="section-title">Everything You Need to <span className="gradient-text">Dominate Your Market</span></h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>AI-powered tools that give you unfair advantages over your competition.</p>
          </div>
          <div className="grid-3">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="glass-card" style={{ padding: '32px 28px', animationDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>{f.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>{f.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Process</div>
            <h2 className="section-title">Get Results in <span className="gradient-text">4 Simple Steps</span></h2>
          </div>
          <div className="grid-4">
            {[
              { step: '01', icon: '📝', title: 'Fill the Form', desc: 'Enter your business details — takes less than 3 minutes.' },
              { step: '02', icon: '🤖', title: 'AI Analyzes', desc: 'Gemini AI processes your data and generates insights in seconds.' },
              { step: '03', icon: '📊', title: 'Get Your Report', desc: 'Receive a comprehensive report with scores and action plans.' },
              { step: '04', icon: '📈', title: 'Implement & Grow', desc: 'Follow the roadmap and watch your business scale.' },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: 'center', padding: '32px 20px', position: 'relative' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--gold)', letterSpacing: '0.15em', marginBottom: 16 }}>STEP {s.step}</div>
                <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/ai-analyzer" className="btn btn-gold btn-lg">Start Free Analysis →</Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label">Testimonials</div>
            <h2 className="section-title">What Our Clients <span className="gradient-text">Say</span></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="glass-card" style={{ padding: '32px 28px' }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: 'var(--gold)', fontSize: '1.1rem' }}>★</span>
                  ))}
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic' }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem' }}>{t.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold)', marginTop: 4 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section style={{ padding: '80px 0', background: 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(59,130,246,0.08) 100%)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, color: 'var(--text)', marginBottom: 20 }}>
            Ready to <span className="gradient-text">10x Your Growth?</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Join 2400+ businesses using AI to outpace their competition. Free analysis, no credit card required.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/ai-analyzer" className="btn btn-gold btn-lg">🚀 Get Free AI Analysis</Link>
            <Link to="/contact" className="btn btn-outline btn-lg">Talk to an Expert</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card" style={{ padding: '0', overflow: 'hidden', cursor: 'pointer' }} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem' }}>{faq.q}</span>
                  <span style={{ color: 'var(--gold)', fontSize: '1.3rem', transform: openFaq === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0, marginLeft: 16 }}>+</span>
                </div>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 20px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, borderTop: '1px solid var(--glass-border)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--glass-border)', padding: '64px 0 32px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: '#0a0500' }}>GP</span>
                </div>
                <span style={{ fontWeight: 800, color: 'var(--text)' }}>GrowthPilot <span style={{ color: 'var(--gold)' }}>AI</span></span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 260 }}>AI-powered digital growth platform for ambitious Indian businesses.</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                  <a key={s} href="#" style={{ fontSize: '0.75rem', color: 'var(--text-faint)', padding: '6px 12px', border: '1px solid var(--glass-border)', borderRadius: 8, transition: 'all 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { title: 'Platform', links: [['AI Analyzer', '/ai-analyzer'], ['Competitor Analysis', '/competitor-analysis'], ['Pricing', '/pricing'], ['Dashboard', '/dashboard']] },
              { title: 'Company',  links: [['About', '/about'], ['Contact', '/contact'], ['Referral Program', '/referral-program'], ['Privacy Policy', '#']] },
              { title: 'Support',  links: [['Documentation', '#'], ['WhatsApp Support', '#'], ['Email Us', '#'], ['FAQ', '#']] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>{col.title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {col.links.map(([label, href]) => (
                    <Link key={label} to={href} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>{label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-faint)' }}>© 2026 GrowthPilot AI. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="live-dot" />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

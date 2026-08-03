import { useState } from 'react';
import { saveContactForm } from '../services/storage';
import toast from 'react-hot-toast';

const INITIAL = { name:'', phone:'', email:'', business:'', message:'' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) return toast.error('Please fill required fields');
    setLoading(true);
    try {
      await saveContactForm(form);
      setDone(true);
      setForm(INITIAL);
      toast.success('Message sent! We\'ll contact you within 2 hours.');
    } catch {
      toast.error('Failed to send. Please try WhatsApp instead.');
    } finally { setLoading(false); }
  }

  return (
    <div style={{ paddingTop:80 }}>
      <div className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label">Talk to Expert</div>
          <h1 className="section-title">Let's Grow Your <span className="gradient-text">Business Together</span></h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Fill the form or WhatsApp us directly. Our growth experts respond within 2 hours.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom:80 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, maxWidth:1000, margin:'0 auto', alignItems:'start' }}>
          {/* Form */}
          <div className="glass-card" style={{ padding:40 }}>
            {done ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ fontSize:'4rem', marginBottom:16 }}>✅</div>
                <h3 style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--text)', marginBottom:12 }}>Message Received!</h3>
                <p style={{ color:'var(--text-muted)', marginBottom:24, lineHeight:1.7 }}>Our expert will contact you within 2 hours. Check your WhatsApp and email.</p>
                <button onClick={() => setDone(false)} className="btn btn-outline">Send Another Message</button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--text)', marginBottom:28 }}>📋 Contact Form</h2>
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                  <div className="grid-2" style={{ gap:16 }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input className="form-input" placeholder="Rahul Sharma" value={form.name} onChange={e=>set('name',e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set('phone',e.target.value)} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={e=>set('email',e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Name</label>
                    <input className="form-input" placeholder="Your business name" value={form.business} onChange={e=>set('business',e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" rows={4} placeholder="Tell us about your business and what you need help with..." value={form.message} onChange={e=>set('message',e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
                    {loading ? '⟳ Sending...' : '🚀 Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Contact info */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div className="glass-card" style={{ padding:28 }}>
              <h3 style={{ fontWeight:800, color:'var(--text)', marginBottom:20 }}>📞 Contact Information</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { icon:'📱', label:'WhatsApp', value:'+91 99999 99999', href:'https://wa.me/919999999999' },
                  { icon:'📧', label:'Email',    value:'hello@growthpilotai.com', href:'mailto:hello@growthpilotai.com' },
                  { icon:'📍', label:'Location', value:'New Delhi, India', href:null },
                  { icon:'⏰', label:'Response Time', value:'Within 2 hours', href:null },
                ].map(item => (
                  <div key={item.label} style={{ display:'flex', gap:14, alignItems:'center' }}>
                    <span style={{ fontSize:'1.4rem' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize:'0.72rem', color:'var(--text-faint)', fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{ color:'var(--gold)', fontWeight:600, fontSize:'0.9rem' }}>{item.value}</a>
                      ) : (
                        <div style={{ color:'var(--text)', fontWeight:600, fontSize:'0.9rem' }}>{item.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="https://wa.me/919999999999?text=Hi!%20I%20want%20to%20talk%20to%20an%20expert%20about%20digital%20growth." target="_blank" rel="noopener noreferrer"
              style={{ display:'flex', alignItems:'center', gap:16, padding:'24px', background:'rgba(37,211,102,0.1)', borderRadius:16, border:'1px solid rgba(37,211,102,0.25)', transition:'all 0.2s', cursor:'pointer' }}
              onMouseEnter={e=>e.currentTarget.style.background='rgba(37,211,102,0.18)'}
              onMouseLeave={e=>e.currentTarget.style.background='rgba(37,211,102,0.1)'}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 16px rgba(37,211,102,0.4)' }}>
                <span style={{ fontSize:'1.5rem' }}>💬</span>
              </div>
              <div>
                <div style={{ fontWeight:800, color:'#25D366', fontSize:'1rem' }}>Chat on WhatsApp</div>
                <div style={{ fontSize:'0.82rem', color:'var(--text-muted)', marginTop:2 }}>Instant response · Available 9AM–9PM IST</div>
              </div>
            </a>

            <div className="glass-card" style={{ padding:24 }}>
              <h4 style={{ fontWeight:700, color:'var(--text)', marginBottom:14, fontSize:'0.95rem' }}>🕐 Working Hours</h4>
              {[['Mon – Sat', '9:00 AM – 9:00 PM'], ['Sunday', '10:00 AM – 6:00 PM']].map(([d, t]) => (
                <div key={d} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--glass-border)', fontSize:'0.85rem' }}>
                  <span style={{ color:'var(--text-muted)' }}>{d}</span>
                  <span style={{ color:'var(--gold)', fontWeight:600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

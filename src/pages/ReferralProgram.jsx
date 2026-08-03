import { useState } from 'react';
import { saveReferralPartner } from '../services/storage';
import { askReferralAssistant } from '../services/gemini';
import toast from 'react-hot-toast';

const INIT_FORM = { name:'', email:'', phone:'', city:'', experience:'' };

export default function ReferralProgram() {
  const [form, setForm] = useState(INIT_FORM);
  const [referrals, setReferrals] = useState(1);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [aiQ, setAiQ] = useState('');
  const [aiA, setAiA] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));

  const earning = referrals * 1000;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return toast.error('Fill required fields');
    setLoading(true);
    try {
      await saveReferralPartner(form);
      setDone(true); setForm(INIT_FORM);
      toast.success('Welcome to the GrowthPilot Partner Program! 🎉');
    } catch { toast.error('Registration failed. Try again.'); }
    finally { setLoading(false); }
  }

  async function handleAiAsk(e) {
    e.preventDefault();
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiA('');
    try {
      const answer = await askReferralAssistant(aiQ);
      setAiA(answer);
    } catch { setAiA('Sorry, I could not answer that. Please WhatsApp us directly.'); }
    finally { setAiLoading(false); }
  }

  return (
    <div style={{ paddingTop:80 }}>
      {/* Hero */}
      <div className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label">Referral Partner Program</div>
          <h1 className="section-title">Earn <span className="gradient-text">₹1000 Per Referral</span></h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>No investment. No qualification required. Just refer businesses and earn unlimited commissions.</p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', marginTop:24, flexWrap:'wrap' }}>
            <span className="badge badge-gold">✓ ₹1000 per referral</span>
            <span className="badge badge-green">✓ No investment needed</span>
            <span className="badge badge-blue">✓ Unlimited earnings</span>
            <span className="badge badge-gold">✓ Instant payout</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom:80 }}>
        {/* Benefits */}
        <div style={{ marginBottom:80 }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--text)', marginBottom:32, textAlign:'center' }}>🎁 Partner Benefits</h2>
          <div className="grid-4" style={{ gap:20 }}>
            {[
              { icon:'💰', title:'₹1000 Commission', desc:'Earn ₹1000 for every business you successfully refer to GrowthPilot AI.' },
              { icon:'🎓', title:'No Qualification', desc:'Anyone can join — students, housewives, retired professionals, anyone!' },
              { icon:'📱', title:'Work From Anywhere', desc:'Share your link on WhatsApp, social media, or in person. No office needed.' },
              { icon:'⚡', title:'Instant Payout', desc:'Commission credited within 48 hours of successful conversion. No delays.' },
            ].map(b => (
              <div key={b.title} className="glass-card" style={{ padding:'28px 20px', textAlign:'center' }}>
                <div style={{ fontSize:'2.5rem', marginBottom:16 }}>{b.icon}</div>
                <h3 style={{ fontWeight:700, color:'var(--gold)', fontSize:'1rem', marginBottom:10 }}>{b.title}</h3>
                <p style={{ fontSize:'0.83rem', color:'var(--text-muted)', lineHeight:1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom:80 }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--text)', marginBottom:32, textAlign:'center' }}>🔄 How It Works</h2>
          <div className="grid-4" style={{ gap:20 }}>
            {[
              { step:'01', title:'Register',   desc:'Fill the partner registration form below. Takes 2 minutes.' },
              { step:'02', title:'Get Link',    desc:'Receive your unique referral link via WhatsApp and email.' },
              { step:'03', title:'Refer',       desc:'Share with businesses who need a website or digital marketing.' },
              { step:'04', title:'Earn ₹1000', desc:'When they sign up, ₹1000 is credited to your account.' },
            ].map(s => (
              <div key={s.step} style={{ textAlign:'center', padding:'20px' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px', color:'#0a0500', fontWeight:900, fontSize:'0.85rem' }}>
                  {s.step}
                </div>
                <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:8, fontSize:'0.95rem' }}>{s.title}</h3>
                <p style={{ fontSize:'0.82rem', color:'var(--text-muted)', lineHeight:1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:60, alignItems:'start' }}>
          {/* Earnings calculator */}
          <div className="glass-card" style={{ padding:36 }}>
            <h3 style={{ fontWeight:800, color:'var(--text)', marginBottom:24, fontSize:'1.15rem' }}>🧮 Earnings Calculator</h3>
            <div className="form-group" style={{ marginBottom:20 }}>
              <label className="form-label">Referrals per month: <span style={{ color:'var(--gold)', fontWeight:700 }}>{referrals}</span></label>
              <input type="range" min="1" max="50" value={referrals} onChange={e=>setReferrals(+e.target.value)}
                style={{ width:'100%', accentColor:'var(--gold)', marginTop:8 }} />
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.72rem', color:'var(--text-faint)' }}><span>1</span><span>50</span></div>
            </div>
            <div style={{ textAlign:'center', padding:'24px', background:'linear-gradient(135deg,rgba(245,158,11,0.1),rgba(59,130,246,0.06))', borderRadius:12, marginBottom:16 }}>
              <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:4 }}>Monthly Earnings</div>
              <div style={{ fontSize:'3rem', fontWeight:900, color:'var(--gold)' }}>₹{earning.toLocaleString('en-IN')}</div>
              <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:4 }}>₹{(earning*12).toLocaleString('en-IN')} per year</div>
            </div>
            <div className="grid-2" style={{ gap:12 }}>
              <div style={{ padding:'12px', background:'var(--surface-2)', borderRadius:10, textAlign:'center' }}>
                <div style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--success)' }}>{referrals * 1}</div>
                <div style={{ fontSize:'0.7rem', color:'var(--text-faint)' }}>Referrals</div>
              </div>
              <div style={{ padding:'12px', background:'var(--surface-2)', borderRadius:10, textAlign:'center' }}>
                <div style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--gold)' }}>₹1,000</div>
                <div style={{ fontSize:'0.7rem', color:'var(--text-faint)' }}>Per Referral</div>
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div className="glass-card" style={{ padding:36 }}>
            {done ? (
              <div style={{ textAlign:'center', padding:'32px 0' }}>
                <div style={{ fontSize:'3.5rem', marginBottom:16 }}>🎉</div>
                <h3 style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--gold)', marginBottom:12 }}>You're a Partner!</h3>
                <p style={{ color:'var(--text-muted)', marginBottom:24, lineHeight:1.7 }}>Welcome to the GrowthPilot Partner Program! Your referral link will be sent to your WhatsApp within 24 hours.</p>
                <button onClick={()=>setDone(false)} className="btn btn-outline">Register Another</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontWeight:800, color:'var(--text)', marginBottom:24, fontSize:'1.15rem' }}>📝 Partner Registration</h3>
                <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {[
                    { k:'name',  label:'Full Name *',    placeholder:'Rahul Sharma', type:'text' },
                    { k:'email', label:'Email *',         placeholder:'you@gmail.com', type:'email' },
                    { k:'phone', label:'WhatsApp Number *', placeholder:'+91 98765 43210', type:'tel' },
                    { k:'city',  label:'City',             placeholder:'Delhi', type:'text' },
                  ].map(f => (
                    <div key={f.k} className="form-group">
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" type={f.type} placeholder={f.placeholder} value={form[f.k]} onChange={e=>set(f.k,e.target.value)} required={f.label.includes('*')} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label className="form-label">Your Network / Experience</label>
                    <textarea className="form-textarea" rows={2} placeholder="e.g. I know many shop owners, I'm active on social media..." value={form.experience} onChange={e=>set('experience',e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
                    {loading ? '⟳ Registering...' : '🚀 Join Partner Program'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="glass-card" style={{ padding:36, maxWidth:720, margin:'0 auto' }}>
          <h3 style={{ fontWeight:800, color:'var(--text)', marginBottom:8, fontSize:'1.1rem' }}>🤖 AI Referral Assistant</h3>
          <p style={{ color:'var(--text-muted)', fontSize:'0.85rem', marginBottom:24 }}>Ask any question about the referral program and get instant AI answers.</p>
          <form onSubmit={handleAiAsk} style={{ display:'flex', gap:12, marginBottom:20 }}>
            <input className="form-input" placeholder="e.g. How do I get my referral link? When do I get paid?" value={aiQ} onChange={e=>setAiQ(e.target.value)} style={{ flex:1 }} />
            <button type="submit" className="btn btn-gold" disabled={aiLoading} style={{ flexShrink:0 }}>
              {aiLoading ? '⟳' : 'Ask →'}
            </button>
          </form>
          {aiLoading && <div className="skeleton" style={{ height:72, borderRadius:12 }} />}
          {aiA && !aiLoading && (
            <div style={{ padding:'16px 20px', background:'rgba(245,158,11,0.06)', borderRadius:12, border:'1px solid rgba(245,158,11,0.2)' }}>
              <p style={{ fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.7 }}>🤖 {aiA}</p>
            </div>
          )}
        </div>
      </div>
      <style>{`@media(max-width:768px){.ref-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}

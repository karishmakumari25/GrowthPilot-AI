import { Link } from 'react-router-dom';

const PLANS = [
  {
    name:'Website Starter', price:'₹9,999', delivery:'7 days', badge:null,
    features:['5-page responsive website','Basic SEO setup','Contact form','Mobile optimized','1 month support'],
    roi:'2x–3x in 3 months', support:'Email support',
    color:'var(--blue-light)', gradient:'rgba(59,130,246,0.08)',
  },
  {
    name:'Business Website', price:'₹24,999', delivery:'14 days', badge:'Most Popular',
    features:['10-page custom website','Advanced SEO','Google Analytics','WhatsApp integration','Social media setup','3 months support'],
    roi:'3x–5x in 6 months', support:'Priority support',
    color:'var(--gold)', gradient:'rgba(245,158,11,0.1)',
  },
  {
    name:'Premium Website', price:'₹49,999', delivery:'21 days', badge:null,
    features:['Unlimited pages','E-commerce integration','Payment gateway','AI chatbot','Blog/CMS','6 months support'],
    roi:'5x–8x in 6 months', support:'Dedicated support',
    color:'var(--success)', gradient:'rgba(16,185,129,0.08)',
  },
  {
    name:'Enterprise Solution', price:'Custom', delivery:'30+ days', badge:'Enterprise',
    features:['Custom development','ERP/CRM integration','Mobile app','Advanced analytics','API development','1 year support'],
    roi:'8x–15x in 12 months', support:'24/7 dedicated team',
    color:'#a855f7', gradient:'rgba(168,85,247,0.08)',
  },
];

const MARKETING_PACKAGES = [
  { name:'Starter Marketing', price:'₹7,999/mo', items:['Social media management (2 platforms)','8 posts per month','Basic ad management','Monthly report'] },
  { name:'Growth Marketing',  price:'₹15,999/mo', items:['4 platform management','20 posts/month','Google + Meta ads','SEO optimization','Bi-weekly reports'], popular:true },
  { name:'Full Funnel',       price:'₹29,999/mo', items:['All platforms','Unlimited content','Performance marketing','Email campaigns','Weekly strategy calls'] },
];

export default function Pricing() {
  return (
    <div style={{ paddingTop:80 }}>
      <div className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label">Pricing</div>
          <h1 className="section-title">Transparent <span className="gradient-text">Pricing Plans</span></h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Choose the perfect plan for your business. All plans include AI analysis and dedicated support.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom:80 }}>
        {/* Website Plans */}
        <div style={{ marginBottom:80 }}>
          <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--text)', marginBottom:32, textAlign:'center' }}>🌐 Website Development Plans</h2>
          <div className="grid-4" style={{ gap:20, alignItems:'stretch' }}>
            {PLANS.map(plan => (
              <div key={plan.name} className="glass-card" style={{ padding:'28px 24px', display:'flex', flexDirection:'column', position:'relative', background:`linear-gradient(135deg, ${plan.gradient}, transparent)`, border: plan.badge==='Most Popular' ? '1.5px solid var(--gold)' : undefined }}>
                {plan.badge && (
                  <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background: plan.badge==='Most Popular' ? 'var(--grad-gold)' : 'var(--grad-blue)', color: plan.badge==='Most Popular' ? '#0a0500' : '#fff', fontSize:'0.7rem', fontWeight:800, padding:'4px 14px', borderRadius:99, whiteSpace:'nowrap', letterSpacing:'0.06em' }}>
                    {plan.badge}
                  </div>
                )}
                <h3 style={{ fontSize:'1rem', fontWeight:800, color:plan.color, marginBottom:8 }}>{plan.name}</h3>
                <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--text)', marginBottom:4 }}>{plan.price}</div>
                <div style={{ display:'flex', gap:8, marginBottom:16 }}>
                  <span className="badge badge-gold" style={{ fontSize:'0.68rem' }}>⏱ {plan.delivery}</span>
                  <span className="badge badge-green" style={{ fontSize:'0.68rem' }}>📈 ROI: {plan.roi}</span>
                </div>
                <ul style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24, flex:1 }}>
                  {plan.features.map(f => (
                    <li key={f} style={{ display:'flex', gap:8, fontSize:'0.82rem', color:'var(--text-muted)' }}>
                      <span style={{ color:plan.color }}>✓</span>{f}
                    </li>
                  ))}
                </ul>
                <div style={{ fontSize:'0.75rem', color:'var(--text-faint)', marginBottom:16 }}>🛡 {plan.support}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:'auto' }}>
                  <Link to="/contact" className="btn btn-gold btn-full btn-sm">Get Started</Link>
                  <Link to="/contact" className="btn btn-outline btn-full btn-sm">Talk to Expert</Link>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px', borderRadius:10, background:'rgba(37,211,102,0.12)', color:'#25D366', fontSize:'0.8rem', fontWeight:700, border:'1px solid rgba(37,211,102,0.25)', transition:'all 0.2s' }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing packages */}
        <div>
          <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--text)', marginBottom:32, textAlign:'center' }}>📣 Digital Marketing Packages</h2>
          <div className="grid-3" style={{ gap:24 }}>
            {MARKETING_PACKAGES.map(pkg => (
              <div key={pkg.name} className="glass-card" style={{ padding:'28px', position:'relative', border: pkg.popular ? '1.5px solid var(--gold)' : undefined }}>
                {pkg.popular && <div style={{ position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)', background:'var(--grad-gold)', color:'#0a0500', fontSize:'0.7rem', fontWeight:800, padding:'4px 14px', borderRadius:99 }}>Best Value</div>}
                <h3 style={{ fontSize:'1.05rem', fontWeight:800, color:'var(--text)', marginBottom:8 }}>{pkg.name}</h3>
                <div style={{ fontSize:'1.6rem', fontWeight:900, color:'var(--gold)', marginBottom:20 }}>{pkg.price}</div>
                <ul style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                  {pkg.items.map(item => (
                    <li key={item} style={{ display:'flex', gap:8, fontSize:'0.85rem', color:'var(--text-muted)' }}>
                      <span style={{ color:'var(--gold)' }}>✓</span>{item}
                    </li>
                  ))}
                </ul>
                <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:'auto' }}>
                  <Link to="/contact" className="btn btn-gold btn-full btn-sm">Get Started</Link>
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, padding:'8px', borderRadius:10, background:'rgba(37,211,102,0.12)', color:'#25D366', fontSize:'0.8rem', fontWeight:700, border:'1px solid rgba(37,211,102,0.25)' }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center', marginTop:64, padding:'48px', background:'linear-gradient(135deg,rgba(245,158,11,0.08),rgba(59,130,246,0.06))', borderRadius:24, border:'1px solid var(--glass-border)' }}>
          <h3 style={{ fontSize:'1.6rem', fontWeight:800, color:'var(--text)', marginBottom:12 }}>Not sure which plan is right for you?</h3>
          <p style={{ color:'var(--text-muted)', marginBottom:28 }}>Get a free consultation and we'll recommend the best solution for your business.</p>
          <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/contact" className="btn btn-gold btn-lg">Talk to an Expert</Link>
            <Link to="/ai-analyzer" className="btn btn-outline btn-lg">Get Free AI Analysis</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

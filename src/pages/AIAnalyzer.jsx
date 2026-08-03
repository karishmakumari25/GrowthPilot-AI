import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { analyzeBusiness } from '../services/gemini';
import { saveAnalysisReport } from '../services/storage';
import toast from 'react-hot-toast';

const INITIAL = { businessName:'', ownerName:'', businessType:'', city:'', website:'', monthlySales:'', problems:'', marketingMethods:'', targetCustomers:'', goals:'' };

function ScoreCircle({ score, label, color }) {
  const r = 36, c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <div style={{ textAlign:'center' }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={`${dash} ${c}`} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition:'stroke-dasharray 1.2s ease' }}/>
        <text x="50" y="55" textAnchor="middle" fill={color} fontSize="18" fontWeight="800">{score}</text>
      </svg>
      <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginTop:4, fontWeight:600 }}>{label}</p>
    </div>
  );
}

function ReportSection({ title, icon, items, color='var(--gold)' }) {
  return (
    <div className="glass-card" style={{ padding:'24px' }}>
      <h3 style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--text)', marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
        <span>{icon}</span>{title}
      </h3>
      <ul style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {items?.map((item, i) => (
          <li key={i} style={{ display:'flex', gap:10, fontSize:'0.875rem', color:'var(--text-muted)', lineHeight:1.6 }}>
            <span style={{ color, flexShrink:0, marginTop:2 }}>▸</span>{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AIAnalyzer() {
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  async function handleSubmit(e) {
    e.preventDefault();
    const required = ['businessName','ownerName','businessType','city','problems','goals'];
    for (const k of required) {
      if (!form[k].trim()) return toast.error(`Please fill: ${k.replace(/([A-Z])/g,' $1')}`);
    }
    setLoading(true);
    setReport(null);
    try {
      const result = await analyzeBusiness(form);
      setReport(result);
      if (user) {
        await saveAnalysisReport(user.uid, { formData: form, report: result }).catch(() => {});
      }
      toast.success('Analysis complete!');
      setTimeout(() => document.getElementById('report-section')?.scrollIntoView({ behavior:'smooth' }), 200);
    } catch (err) {
      console.error(err);
      toast.error('Analysis failed. Check your Gemini API key.');
    } finally {
      setLoading(false);
    }
  }

  function downloadReport() {
    if (!report) return;
    const lines = [
      `GROWTHPILOT AI — BUSINESS ANALYSIS REPORT`,
      `Generated: ${new Date().toLocaleDateString('en-IN')}`,
      `${'='.repeat(50)}`,
      `Business: ${form.businessName}  |  Owner: ${form.ownerName}`,
      `City: ${form.city}  |  Type: ${form.businessType}`,
      `${'='.repeat(50)}`,
      `BUSINESS SCORE: ${report.businessScore}/100`,
      `DIGITAL PRESENCE SCORE: ${report.digitalPresenceScore}/100`,
      ``,`SUMMARY`,`${report.summary}`,``,
      `STRENGTHS`,  ...(report.strengths||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `WEAKNESSES`, ...(report.weaknesses||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `WEBSITE RECOMMENDATIONS`, ...(report.websiteRecommendations||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `SEO SUGGESTIONS`, ...(report.seoSuggestions||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `SOCIAL MEDIA STRATEGY`, ...(report.socialMediaStrategy||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `ADVERTISING SUGGESTIONS`, ...(report.advertisingSuggestions||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `GROWTH OPPORTUNITIES`, ...(report.growthOpportunities||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `PRIORITY ACTIONS`, ...(report.priorityActions||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `ESTIMATED ROI: ${report.estimatedROI}`,
      `TIMELINE: ${report.timelineMonths} months`,
      `${'='.repeat(50)}`,
      `© GrowthPilot AI | growthpilotai.com`,
    ];
    const blob = new Blob([lines.join('\n')], { type:'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${form.businessName.replace(/\s+/g,'-')}-GrowthPilot-Report.txt`;
    a.click();
    toast.success('Report downloaded!');
  }

  return (
    <div style={{ paddingTop:80 }}>
      {/* Page hero */}
      <div className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label">AI Business Analysis</div>
          <h1 className="section-title">Get Your <span className="gradient-text">Free AI Report</span></h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>
            Fill in your business details and Gemini AI will generate a comprehensive growth report in under 60 seconds.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom:80 }}>
        {/* Form */}
        <div className="glass-card" style={{ maxWidth:800, margin:'0 auto 48px', padding:40 }}>
          <h2 style={{ fontSize:'1.25rem', fontWeight:800, color:'var(--text)', marginBottom:32 }}>📝 Business Information</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid-2" style={{ gap:20, marginBottom:20 }}>
              {[
                { key:'businessName', label:'Business Name *', placeholder:'e.g. TechMart Pvt Ltd' },
                { key:'ownerName',    label:'Owner Name *',    placeholder:'e.g. Rahul Sharma' },
                { key:'businessType', label:'Business Type *', placeholder:'e.g. Retail, SaaS, Restaurant' },
                { key:'city',         label:'City *',          placeholder:'e.g. Delhi, Mumbai' },
                { key:'website',      label:'Current Website', placeholder:'https://yoursite.com (optional)' },
                { key:'monthlySales', label:'Monthly Sales',   placeholder:'e.g. ₹2-5 Lakhs' },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input className="form-input" placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)} />
                </div>
              ))}
            </div>
            {[
              { key:'problems',         label:'Biggest Business Problems *',  placeholder:'e.g. Low online sales, poor visibility, high competition...' },
              { key:'marketingMethods', label:'Current Marketing Methods',     placeholder:'e.g. Facebook ads, word of mouth, local newspaper...' },
              { key:'targetCustomers',  label:'Target Customers',              placeholder:'e.g. Working professionals aged 25-45 in metro cities...' },
              { key:'goals',            label:'Business Goals *',              placeholder:'e.g. Double revenue in 6 months, expand to 3 new cities...' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="form-group" style={{ marginBottom:20 }}>
                <label className="form-label">{label}</label>
                <textarea className="form-textarea" rows={3} placeholder={placeholder} value={form[key]} onChange={e => set(key, e.target.value)} />
              </div>
            ))}
            <button type="submit" className="btn btn-gold btn-lg btn-full" disabled={loading} style={{ marginTop:8 }}>
              {loading ? (
                <><span className="animate-spin" style={{ display:'inline-block', marginRight:10 }}>⟳</span>AI is analyzing your business...</>
              ) : '🤖 Generate AI Analysis Report →'}
            </button>
            {!user && <p style={{ textAlign:'center', fontSize:'0.8rem', color:'var(--text-faint)', marginTop:12 }}>💡 Login to save your reports to dashboard</p>}
          </form>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
            {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height:120, borderRadius:16 }} />)}
          </div>
        )}

        {/* Report */}
        {report && !loading && (
          <div id="report-section" style={{ maxWidth:900, margin:'0 auto' }}>
            {/* Header */}
            <div className="glass-card" style={{ padding:'32px', marginBottom:24, background:'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(59,130,246,0.06))' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:20, marginBottom:24 }}>
                <div>
                  <h2 style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--text)', marginBottom:8 }}>📊 Analysis Report — {form.businessName}</h2>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.875rem' }}>Generated {new Date().toLocaleDateString('en-IN', { dateStyle:'long' })}</p>
                </div>
                <button onClick={downloadReport} className="btn btn-gold">📥 Download Report</button>
              </div>
              <div style={{ display:'flex', gap:32, justifyContent:'center', flexWrap:'wrap', padding:'20px 0', borderTop:'1px solid var(--glass-border)' }}>
                <ScoreCircle score={report.businessScore}        label="Business Score"        color="var(--gold)" />
                <ScoreCircle score={report.digitalPresenceScore} label="Digital Presence Score" color="var(--blue-light)" />
                <div style={{ textAlign:'center', padding:'10px 20px' }}>
                  <div style={{ fontSize:'1.5rem', fontWeight:900, color:'var(--success)', marginBottom:4 }}>{report.estimatedROI}</div>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>Estimated ROI</p>
                  <div style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--blue-light)', marginTop:12 }}>{report.timelineMonths} months</div>
                  <p style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>Timeline</p>
                </div>
              </div>
              <div style={{ marginTop:20, padding:'16px 20px', background:'rgba(255,255,255,0.03)', borderRadius:12, borderLeft:'3px solid var(--gold)' }}>
                <p style={{ fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.7, fontStyle:'italic' }}>{report.summary}</p>
              </div>
            </div>

            <div className="grid-2" style={{ gap:20, marginBottom:20 }}>
              <ReportSection title="Strengths"            icon="💪" items={report.strengths}               color="var(--success)" />
              <ReportSection title="Weaknesses"           icon="⚠️"  items={report.weaknesses}              color="var(--error)" />
              <ReportSection title="Website Recommendations" icon="🌐" items={report.websiteRecommendations} color="var(--blue-light)" />
              <ReportSection title="SEO Suggestions"      icon="🔍" items={report.seoSuggestions}           color="var(--gold)" />
              <ReportSection title="Social Media Strategy" icon="📱" items={report.socialMediaStrategy}     color="var(--gold)" />
              <ReportSection title="Advertising Suggestions" icon="📣" items={report.advertisingSuggestions} color="var(--blue-light)" />
            </div>
            <div className="grid-2" style={{ gap:20 }}>
              <ReportSection title="Growth Opportunities" icon="🚀" items={report.growthOpportunities}      color="var(--success)" />
              <ReportSection title="Priority Actions"     icon="✅" items={report.priorityActions}          color="var(--gold)" />
            </div>
            <div style={{ textAlign:'center', marginTop:32 }}>
              <button onClick={downloadReport} className="btn btn-gold btn-lg">📥 Download Full Report</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

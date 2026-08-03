import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { analyzeCompetitor } from '../services/gemini';
import { saveCompetitorReport } from '../services/firestore';
import toast from 'react-hot-toast';

const INITIAL = { myBusiness:'', competitorName:'', competitorWebsite:'', location:'', industry:'' };

const THREAT_COLOR = { Low:'var(--success)', Medium:'var(--warning)', High:'var(--error)', Critical:'#dc2626' };

export default function CompetitorAnalysis() {
  const { user } = useAuth();
  const [form, setForm] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const set = (k,v) => setForm(p => ({ ...p, [k]:v }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.myBusiness || !form.competitorName || !form.industry) return toast.error('Please fill required fields');
    setLoading(true); setReport(null);
    try {
      const result = await analyzeCompetitor(form);
      setReport(result);
      if (user) await saveCompetitorReport(user.uid, { formData:form, report:result }).catch(()=>{});
      toast.success('Competitor analysis complete!');
      setTimeout(() => document.getElementById('comp-report')?.scrollIntoView({ behavior:'smooth' }), 200);
    } catch (err) {
      console.error(err);
      toast.error('Analysis failed. Check your Gemini API key.');
    } finally { setLoading(false); }
  }

  function downloadReport() {
    if (!report) return;
    const lines = [
      `GROWTHPILOT AI — COMPETITOR ANALYSIS REPORT`,
      `Generated: ${new Date().toLocaleDateString('en-IN')}`, `${'='.repeat(50)}`,
      `My Business: ${form.myBusiness}  |  Competitor: ${form.competitorName}`,
      `Industry: ${form.industry}  |  Location: ${form.location}`,``,
      `COMPETITOR SUMMARY`, report.competitorSummary,``,
      `THREAT LEVEL: ${report.threatLevel}`,``,
      `SEO SCORE: ${report.seoScore}/100`,``,
      `SOCIAL MEDIA: ${report.socialMediaPresence?.analysis}`, `Score: ${report.socialMediaPresence?.score}/100`,``,
      `STRENGTHS`, ...(report.strengths||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `WEAKNESSES`, ...(report.weaknesses||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `WEBSITE SUGGESTIONS`, ...(report.websiteSuggestions||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `MARKETING SUGGESTIONS`, ...(report.marketingSuggestions||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `FEATURE RECOMMENDATIONS`, ...(report.featureRecommendations||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `GROWTH OPPORTUNITIES`, ...(report.growthOpportunities||[]).map((s,i)=>`${i+1}. ${s}`),``,
      `HOW TO WIN`, report.competitiveAdvantage,
      `${'='.repeat(50)}`, `© GrowthPilot AI`,
    ];
    const blob = new Blob([lines.join('\n')], { type:'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Competitor-${form.competitorName.replace(/\s+/g,'-')}-Report.txt`;
    a.click();
    toast.success('Report downloaded!');
  }

  return (
    <div style={{ paddingTop:80 }}>
      <div className="page-hero">
        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="section-label">Competitor Intelligence</div>
          <h1 className="section-title">Analyze Your <span className="gradient-text">Competition</span></h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Discover your competitor's strengths, weaknesses, and how to beat them with AI intelligence.</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom:80 }}>
        <div className="glass-card" style={{ maxWidth:720, margin:'0 auto 48px', padding:40 }}>
          <h2 style={{ fontSize:'1.2rem', fontWeight:800, color:'var(--text)', marginBottom:28 }}>🔍 Enter Business Details</h2>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:18 }}>
            <div className="grid-2" style={{ gap:18 }}>
              <div className="form-group">
                <label className="form-label">My Business Name *</label>
                <input className="form-input" placeholder="Your business name" value={form.myBusiness} onChange={e=>set('myBusiness',e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Competitor Name *</label>
                <input className="form-input" placeholder="Competitor's business name" value={form.competitorName} onChange={e=>set('competitorName',e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Competitor Website</label>
                <input className="form-input" placeholder="https://competitor.com" value={form.competitorWebsite} onChange={e=>set('competitorWebsite',e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" placeholder="e.g. Delhi, India" value={form.location} onChange={e=>set('location',e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Industry / Niche *</label>
              <input className="form-input" placeholder="e.g. E-commerce, Restaurant, SaaS, Retail..." value={form.industry} onChange={e=>set('industry',e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={loading}>
              {loading ? '⟳ AI is analyzing competitor...' : '🔍 Analyze Competitor →'}
            </button>
          </form>
        </div>

        {loading && (
          <div style={{ maxWidth:800, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
            {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:140, borderRadius:16 }} />)}
          </div>
        )}

        {report && !loading && (
          <div id="comp-report" style={{ maxWidth:900, margin:'0 auto' }}>
            <div className="glass-card" style={{ padding:32, marginBottom:24, background:'linear-gradient(135deg,rgba(59,130,246,0.08),rgba(245,158,11,0.06))' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:16, marginBottom:20 }}>
                <div>
                  <h2 style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--text)', marginBottom:6 }}>📊 Competitor Report — {form.competitorName}</h2>
                  <p style={{ color:'var(--text-muted)', fontSize:'0.875rem' }}>vs {form.myBusiness} · {form.industry}</p>
                </div>
                <button onClick={downloadReport} className="btn btn-gold">📥 Download</button>
              </div>
              <div style={{ display:'flex', gap:24, flexWrap:'wrap', marginBottom:20 }}>
                <div className="glass-card" style={{ padding:'16px 24px', flex:1, minWidth:140, textAlign:'center' }}>
                  <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--blue-light)' }}>{report.seoScore}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>SEO Score</div>
                  <div className="score-bar-wrap" style={{ marginTop:8 }}><div className="score-bar score-bar-blue" style={{ width:`${report.seoScore}%` }} /></div>
                </div>
                <div className="glass-card" style={{ padding:'16px 24px', flex:1, minWidth:140, textAlign:'center' }}>
                  <div style={{ fontSize:'2rem', fontWeight:900, color:'var(--gold)' }}>{report.socialMediaPresence?.score}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>Social Media</div>
                  <div className="score-bar-wrap" style={{ marginTop:8 }}><div className="score-bar score-bar-gold" style={{ width:`${report.socialMediaPresence?.score}%` }} /></div>
                </div>
                <div className="glass-card" style={{ padding:'16px 24px', flex:1, minWidth:140, textAlign:'center' }}>
                  <div style={{ fontSize:'1.2rem', fontWeight:900, color: THREAT_COLOR[report.threatLevel] || 'var(--warning)' }}>{report.threatLevel}</div>
                  <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', fontWeight:600 }}>Threat Level</div>
                </div>
              </div>
              <div style={{ padding:'16px 20px', background:'rgba(255,255,255,0.03)', borderRadius:12, borderLeft:'3px solid var(--blue-light)' }}>
                <p style={{ fontSize:'0.88rem', color:'var(--text-muted)', lineHeight:1.7 }}>{report.competitorSummary}</p>
              </div>
            </div>

            <div className="grid-2" style={{ gap:20, marginBottom:20 }}>
              {[
                { title:'Strengths',               icon:'💪', items:report.strengths,              color:'var(--success)' },
                { title:'Weaknesses',              icon:'⚠️',  items:report.weaknesses,             color:'var(--error)' },
                { title:'Website Suggestions',     icon:'🌐', items:report.websiteSuggestions,      color:'var(--blue-light)' },
                { title:'Marketing Suggestions',   icon:'📣', items:report.marketingSuggestions,    color:'var(--gold)' },
                { title:'Feature Recommendations', icon:'⚡', items:report.featureRecommendations,  color:'var(--gold)' },
                { title:'Growth Opportunities',    icon:'🚀', items:report.growthOpportunities,     color:'var(--success)' },
              ].map(s => (
                <div key={s.title} className="glass-card" style={{ padding:'24px' }}>
                  <h3 style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--text)', marginBottom:14, display:'flex', gap:8 }}><span>{s.icon}</span>{s.title}</h3>
                  <ul style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {s.items?.map((item,i) => (
                      <li key={i} style={{ display:'flex', gap:8, fontSize:'0.85rem', color:'var(--text-muted)', lineHeight:1.6 }}>
                        <span style={{ color:s.color, flexShrink:0 }}>▸</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="glass-card" style={{ padding:'24px', background:'linear-gradient(135deg,rgba(16,185,129,0.08),rgba(245,158,11,0.06))', marginBottom:24 }}>
              <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--success)', marginBottom:12 }}>🏆 How to Beat {form.competitorName}</h3>
              <p style={{ fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.75 }}>{report.competitiveAdvantage}</p>
            </div>
            <div style={{ textAlign:'center' }}><button onClick={downloadReport} className="btn btn-gold btn-lg">📥 Download Full Report</button></div>
          </div>
        )}
      </div>
    </div>
  );
}

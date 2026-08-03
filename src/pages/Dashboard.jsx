import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserReports, getUserCompetitorReports, saveUserProfile } from '../services/firestore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';

const CHART_DATA = [
  { month:'Jan', revenue:18000, leads:42 }, { month:'Feb', revenue:22000, leads:58 },
  { month:'Mar', revenue:19000, leads:49 }, { month:'Apr', revenue:31000, leads:73 },
  { month:'May', revenue:28000, leads:65 }, { month:'Jun', revenue:41000, leads:91 },
  { month:'Jul', revenue:48200, leads:108 },
];

function StatCard({ icon, label, value, change, positive }) {
  return (
    <div className="glass-card" style={{ padding:'24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
        <span style={{ fontSize:'1.5rem' }}>{icon}</span>
        {change && (
          <span style={{ fontSize:'0.72rem', fontWeight:700, color: positive ? 'var(--success)' : 'var(--error)', background: positive ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', padding:'3px 8px', borderRadius:99 }}>
            {positive ? '▲' : '▼'} {change}
          </span>
        )}
      </div>
      <div style={{ fontSize:'1.8rem', fontWeight:900, color:'var(--text)', marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:'0.78rem', color:'var(--text-muted)', fontWeight:600 }}>{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [reports, setReports] = useState([]);
  const [compReports, setCompReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({ displayName: '', phone: '', business: '' });

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    async function load() {
      try {
        const [r, c] = await Promise.all([
          getUserReports(user.uid),
          getUserCompetitorReports(user.uid),
        ]);
        setReports(r);
        setCompReports(c);
      } catch {}
      finally { setLoading(false); }
    }
    load();
    setProfileForm({
      displayName: user.displayName || '',
      phone: profile?.phone || '',
      business: profile?.business || '',
    });
  }, [user, profile, navigate]);

  async function handleLogout() {
    await logout();
    toast.success('Logged out');
    navigate('/');
  }

  async function saveProfile(e) {
    e.preventDefault();
    try {
      await saveUserProfile(user.uid, profileForm);
      toast.success('Profile updated!');
      setEditProfile(false);
    } catch { toast.error('Update failed'); }
  }

  const TABS = [
    { id:'overview', label:'Overview', icon:'📊' },
    { id:'reports',  label:'AI Reports', icon:'🧠' },
    { id:'competitor', label:'Competitor', icon:'🔍' },
    { id:'referral', label:'Referral', icon:'🤝' },
    { id:'profile',  label:'Profile', icon:'👤' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', paddingTop:0 }}>
      {/* Dashboard header */}
      <div style={{ background:'var(--surface)', borderBottom:'1px solid var(--glass-border)', padding:'16px 0', position:'sticky', top:0, zIndex:100 }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:11, fontWeight:900, color:'#0a0500' }}>GP</span>
              </div>
            </Link>
            <div>
              <div style={{ fontWeight:800, color:'var(--text)', fontSize:'0.95rem' }}>
                Welcome, {user?.displayName?.split(' ')[0] || 'User'} 👋
              </div>
              <div style={{ fontSize:'0.72rem', color:'var(--text-muted)' }}>
                <span className="live-dot" style={{ marginRight:6 }} />Dashboard · {profile?.plan || 'Free'} Plan
              </div>
            </div>
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <Link to="/ai-analyzer" className="btn btn-gold btn-sm">+ New Analysis</Link>
            <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding:'32px 24px' }}>
        {/* Tabs */}
        <div style={{ display:'flex', gap:4, marginBottom:32, background:'var(--surface)', padding:4, borderRadius:14, border:'1px solid var(--glass-border)', width:'fit-content', flexWrap:'wrap' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding:'8px 18px', borderRadius:10, border:'none', fontSize:'0.82rem', fontWeight:700, cursor:'pointer', transition:'all 0.2s',
                background: tab===t.id ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'transparent',
                color: tab===t.id ? '#0a0500' : 'var(--text-muted)' }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ─────────────────────────────────── */}
        {tab === 'overview' && (
          <div>
            <div className="grid-4" style={{ gap:20, marginBottom:28 }}>
              <StatCard icon="💰" label="Revenue This Month" value="₹48,200" change="12.4%" positive />
              <StatCard icon="👥" label="New Leads" value="1,284" change="8.1%" positive />
              <StatCard icon="📊" label="Reports Generated" value={reports.length || 0} />
              <StatCard icon="🤝" label="Referral Earnings" value="₹3,000" change="3 referrals" positive />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:24, marginBottom:24 }}>
              {/* Revenue chart */}
              <div className="glass-card" style={{ padding:'24px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
                  <h3 style={{ fontWeight:700, color:'var(--text)', fontSize:'0.95rem' }}>📈 Revenue Overview</h3>
                  <span className="badge badge-green">+12.4% this month</span>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={CHART_DATA}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill:'rgba(255,255,255,0.4)', fontSize:11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:'rgba(255,255,255,0.4)', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`₹${v/1000}k`} />
                    <Tooltip contentStyle={{ background:'var(--surface-3)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'var(--text)', fontSize:12 }} formatter={v=>[`₹${v.toLocaleString('en-IN')}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#goldGrad)" dot={{ fill:'#f59e0b', r:3 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Leads chart */}
              <div className="glass-card" style={{ padding:'24px' }}>
                <h3 style={{ fontWeight:700, color:'var(--text)', fontSize:'0.95rem', marginBottom:20 }}>👥 Monthly Leads</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={CHART_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="month" tick={{ fill:'rgba(255,255,255,0.4)', fontSize:11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill:'rgba(255,255,255,0.4)', fontSize:11 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background:'var(--surface-3)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, color:'var(--text)', fontSize:12 }} />
                    <Bar dataKey="leads" fill="#3b82f6" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent activity */}
            <div className="glass-card" style={{ padding:'24px' }}>
              <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:20, fontSize:'0.95rem' }}>🕐 Recent Activity</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {[
                  { icon:'🧠', text:'AI Analysis completed — TechMart Delhi', time:'2 hours ago', color:'var(--gold)' },
                  { icon:'🔍', text:'Competitor report — vs ShopEasy India', time:'5 hours ago', color:'var(--blue-light)' },
                  { icon:'✅', text:'Deal closed — Acme Corp · ₹12,000', time:'1 day ago', color:'var(--success)' },
                  { icon:'🤝', text:'New referral earned — ₹1,000', time:'2 days ago', color:'var(--gold)' },
                  { icon:'📧', text:'Expert consultation scheduled', time:'3 days ago', color:'var(--text-muted)' },
                ].map((a,i) => (
                  <div key={i} style={{ display:'flex', gap:16, padding:'14px 0', borderBottom:'1px solid var(--glass-border)' }}>
                    <span style={{ fontSize:'1.3rem', flexShrink:0 }}>{a.icon}</span>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:'0.875rem', color:'var(--text)', fontWeight:500 }}>{a.text}</p>
                    </div>
                    <span style={{ fontSize:'0.72rem', color:'var(--text-faint)', whiteSpace:'nowrap' }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── AI REPORTS ─────────────────────────────── */}
        {tab === 'reports' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontWeight:800, color:'var(--text)', fontSize:'1.2rem' }}>🧠 AI Business Reports</h2>
              <Link to="/ai-analyzer" className="btn btn-gold btn-sm">+ New Analysis</Link>
            </div>
            {loading ? (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height:100, borderRadius:16 }} />)}
              </div>
            ) : reports.length === 0 ? (
              <div className="glass-card" style={{ padding:'64px', textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:16 }}>🧠</div>
                <h3 style={{ color:'var(--text)', marginBottom:12 }}>No reports yet</h3>
                <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Run your first AI business analysis to see reports here.</p>
                <Link to="/ai-analyzer" className="btn btn-gold">Start Free Analysis →</Link>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {reports.map(r => (
                  <div key={r.id} className="glass-card" style={{ padding:'24px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                      <div>
                        <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:6 }}>{r.formData?.businessName || 'Business Analysis'}</h3>
                        <p style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{r.formData?.city} · {r.formData?.businessType} · {r.createdAt?.toDate?.()?.toLocaleDateString('en-IN') || 'Recent'}</p>
                      </div>
                      <div style={{ display:'flex', gap:12 }}>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ fontSize:'1.3rem', fontWeight:900, color:'var(--gold)' }}>{r.report?.businessScore || '-'}</div>
                          <div style={{ fontSize:'0.68rem', color:'var(--text-faint)' }}>Business</div>
                        </div>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ fontSize:'1.3rem', fontWeight:900, color:'var(--blue-light)' }}>{r.report?.digitalPresenceScore || '-'}</div>
                          <div style={{ fontSize:'0.68rem', color:'var(--text-faint)' }}>Digital</div>
                        </div>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ fontSize:'1rem', fontWeight:700, color:'var(--success)' }}>{r.report?.estimatedROI || '-'}</div>
                          <div style={{ fontSize:'0.68rem', color:'var(--text-faint)' }}>Est. ROI</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── COMPETITOR REPORTS ────────────────────── */}
        {tab === 'competitor' && (
          <div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
              <h2 style={{ fontWeight:800, color:'var(--text)', fontSize:'1.2rem' }}>🔍 Competitor Reports</h2>
              <Link to="/competitor-analysis" className="btn btn-blue btn-sm">+ New Analysis</Link>
            </div>
            {loading ? (
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                {[1,2].map(i => <div key={i} className="skeleton" style={{ height:100, borderRadius:16 }} />)}
              </div>
            ) : compReports.length === 0 ? (
              <div className="glass-card" style={{ padding:'64px', textAlign:'center' }}>
                <div style={{ fontSize:'3rem', marginBottom:16 }}>🔍</div>
                <h3 style={{ color:'var(--text)', marginBottom:12 }}>No competitor reports yet</h3>
                <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Analyze your competitors and see their strengths and weaknesses.</p>
                <Link to="/competitor-analysis" className="btn btn-gold">Analyze Competitor →</Link>
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {compReports.map(r => (
                  <div key={r.id} className="glass-card" style={{ padding:'24px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:12 }}>
                      <div>
                        <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:6 }}>{r.formData?.competitorName || 'Competitor'} vs {r.formData?.myBusiness}</h3>
                        <p style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{r.formData?.industry} · {r.createdAt?.toDate?.()?.toLocaleDateString('en-IN') || 'Recent'}</p>
                      </div>
                      <div style={{ display:'flex', gap:12 }}>
                        <div style={{ textAlign:'center' }}>
                          <div style={{ fontSize:'1.3rem', fontWeight:900, color:'var(--blue-light)' }}>{r.report?.seoScore || '-'}</div>
                          <div style={{ fontSize:'0.68rem', color:'var(--text-faint)' }}>SEO Score</div>
                        </div>
                        <span className="badge" style={{ alignSelf:'center', background: r.report?.threatLevel==='High'||r.report?.threatLevel==='Critical' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)', color: r.report?.threatLevel==='High'||r.report?.threatLevel==='Critical' ? 'var(--error)' : 'var(--gold)', border:'none' }}>
                          {r.report?.threatLevel || 'Medium'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── REFERRAL ─────────────────────────────── */}
        {tab === 'referral' && (
          <div>
            <h2 style={{ fontWeight:800, color:'var(--text)', fontSize:'1.2rem', marginBottom:24 }}>🤝 Referral Earnings</h2>
            <div className="grid-3" style={{ gap:20, marginBottom:32 }}>
              <StatCard icon="💰" label="Total Earned" value="₹3,000" />
              <StatCard icon="👥" label="Total Referrals" value="3" />
              <StatCard icon="⏳" label="Pending Payout" value="₹1,000" />
            </div>
            <div className="glass-card" style={{ padding:'32px', textAlign:'center' }}>
              <h3 style={{ fontWeight:700, color:'var(--text)', marginBottom:16 }}>Want to earn more?</h3>
              <p style={{ color:'var(--text-muted)', marginBottom:24 }}>Refer businesses and earn ₹1000 per successful referral. No limit!</p>
              <Link to="/referral-program" className="btn btn-gold btn-lg">Join Referral Program →</Link>
            </div>
          </div>
        )}

        {/* ── PROFILE ──────────────────────────────── */}
        {tab === 'profile' && (
          <div style={{ maxWidth:600 }}>
            <h2 style={{ fontWeight:800, color:'var(--text)', fontSize:'1.2rem', marginBottom:24 }}>👤 Profile Settings</h2>
            <div className="glass-card" style={{ padding:'32px', marginBottom:20 }}>
              <div style={{ display:'flex', alignItems:'center', gap:20, marginBottom:28 }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', fontWeight:900, color:'#0a0500', flexShrink:0 }}>
                  {(user?.displayName || 'U')[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight:800, color:'var(--text)', fontSize:'1.1rem' }}>{user?.displayName || 'User'}</div>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>{user?.email}</div>
                  <span className="badge badge-gold" style={{ marginTop:6 }}>{profile?.plan || 'Free'} Plan</span>
                </div>
              </div>
              {editProfile ? (
                <form onSubmit={saveProfile} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                  {[
                    { k:'displayName', label:'Display Name', placeholder:'Your name' },
                    { k:'phone',       label:'Phone',        placeholder:'+91 98765 43210' },
                    { k:'business',    label:'Business Name', placeholder:'Your business' },
                  ].map(f => (
                    <div key={f.k} className="form-group">
                      <label className="form-label">{f.label}</label>
                      <input className="form-input" placeholder={f.placeholder} value={profileForm[f.k]} onChange={e=>setProfileForm(p=>({...p,[f.k]:e.target.value}))} />
                    </div>
                  ))}
                  <div style={{ display:'flex', gap:12 }}>
                    <button type="submit" className="btn btn-gold">Save Changes</button>
                    <button type="button" onClick={()=>setEditProfile(false)} className="btn btn-outline">Cancel</button>
                  </div>
                </form>
              ) : (
                <button onClick={()=>setEditProfile(true)} className="btn btn-outline">✏️ Edit Profile</button>
              )}
            </div>
            <div className="glass-card" style={{ padding:'24px' }}>
              <h3 style={{ fontWeight:700, color:'var(--error)', marginBottom:16, fontSize:'0.95rem' }}>Account Actions</h3>
              <button onClick={handleLogout} className="btn btn-outline" style={{ borderColor:'var(--error)', color:'var(--error)' }}>🚪 Logout</button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media(max-width:768px){
          .grid-4{grid-template-columns:repeat(2,1fr)!important}
          div[style*="grid-template-columns: 2fr 1fr"]{grid-template-columns:1fr!important}
        }
        @media(max-width:480px){
          .grid-4{grid-template-columns:1fr!important}
        }
      `}</style>
    </div>
  );
}

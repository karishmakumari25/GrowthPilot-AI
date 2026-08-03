import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Please fill all fields');
    if (form.password.length < 8) return toast.error('Password must be at least 8 characters');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      await signup(form.email, form.password, form.name);
      toast.success('Account created! Welcome to GrowthPilot AI 🚀');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use' ? 'Email already registered. Please login.' : 'Signup failed. Try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: 'var(--error)', width: '30%' };
    if (p.length < 10) return { label: 'Medium', color: 'var(--warning)', width: '60%' };
    return { label: 'Strong', color: 'var(--success)', width: '100%' };
  };
  const strength = passwordStrength();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 480, position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(245,158,11,0.3)' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#0a0500' }}>GP</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>GrowthPilot <span style={{ color: 'var(--gold)' }}>AI</span></span>
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Create your account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Start your free AI business analysis today</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
            <span className="badge badge-green">✓ No credit card</span>
            <span className="badge badge-gold">✓ Free analysis</span>
            <span className="badge badge-blue">✓ Instant results</span>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" placeholder="Rahul Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="Min. 8 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
              {strength && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 99 }}>
                    <div style={{ height: '100%', width: strength.width, background: strength.color, borderRadius: 99, transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', color: strength.color, fontWeight: 600 }}>{strength.label} password</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
              {form.confirm && form.password !== form.confirm && <span className="form-error">Passwords don't match</span>}
            </div>
            <button type="submit" className="btn btn-gold btn-full" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? '⟳ Creating Account...' : 'Create Account →'}
            </button>
          </form>
          <div style={{ marginTop: 24, textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: 24 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 700 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

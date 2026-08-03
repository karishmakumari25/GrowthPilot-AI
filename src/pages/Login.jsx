import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.code === 'auth/invalid-credential' ? 'Invalid email or password' : 'Login failed. Try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '24px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ width: '100%', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(245,158,11,0.3)' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#0a0500' }}>GP</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>GrowthPilot <span style={{ color: 'var(--gold)' }}>AI</span></span>
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Sign in to your account to continue</p>
        </div>

        <div className="glass-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Password</label>
                <Link to="/forgot-password" style={{ fontSize: '0.78rem', color: 'var(--gold)' }}>Forgot password?</Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={{ paddingRight: 48 }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}>
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-gold btn-full" disabled={loading} style={{ marginTop: 4 }}>
              {loading ? <><span className="animate-spin" style={{ display: 'inline-block', marginRight: 8 }}>⟳</span>Signing in...</> : 'Sign In →'}
            </button>
          </form>
          <div style={{ marginTop: 24, textAlign: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: 24 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Don't have an account?{' '}
              <Link to="/signup" style={{ color: 'var(--gold)', fontWeight: 700 }}>Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

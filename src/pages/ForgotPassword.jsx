import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
      toast.success('Reset link sent! Check your inbox.');
    } catch {
      toast.error('Could not send reset email. Check the address.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 24 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#0a0500' }}>GP</span>
            </div>
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', marginTop: 20, marginBottom: 8 }}>Reset Password</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enter your email and we'll send a reset link</p>
        </div>
        <div className="glass-card" style={{ padding: 36 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>📧</div>
              <h3 style={{ color: 'var(--text)', marginBottom: 12, fontWeight: 700 }}>Check your inbox</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>We sent a reset link to <strong style={{ color: 'var(--gold)' }}>{email}</strong></p>
              <Link to="/login" className="btn btn-gold btn-full">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-gold btn-full" disabled={loading}>
                {loading ? '⟳ Sending...' : 'Send Reset Link'}
              </button>
              <Link to="/login" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>← Back to Login</Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// Auth Context — works in Demo Mode (no Firebase keys needed)
// When Firebase keys are added to .env, it automatically switches to real Firebase Auth.

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'gp_demo_user';

// Check if Firebase is properly configured
const FIREBASE_CONFIGURED =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_API_KEY.length > 10;

/* ── Demo Auth (no Firebase) ─────────────────────────────── */
function useDemoAuth() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const signup = async (email, password, displayName) => {
    const newUser = { uid: 'demo-' + Date.now(), email, displayName, plan: 'free', role: 'user' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser };
  };

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Invalid credentials');
    const demoUser = { uid: 'demo-user-001', email, displayName: email.split('@')[0], plan: 'growth', role: 'user' };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    return { user: demoUser };
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const resetPassword = async (email) => {
    // Demo: just pretend it worked
    return true;
  };

  return { user, profile: user, loading: false, signup, login, logout, resetPassword };
}

/* ── Real Firebase Auth ──────────────────────────────────── */
async function loadFirebaseAuth() {
  const { auth } = await import('../services/firebase');
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
  } = await import('firebase/auth');
  const { saveUserProfile, getUserProfile } = await import('../services/firestore');
  return { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail, updateProfile, saveUserProfile, getUserProfile };
}

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fb, setFb] = useState(null);

  useEffect(() => {
    loadFirebaseAuth().then(firebase => {
      setFb(firebase);
      const unsub = firebase.onAuthStateChanged(firebase.auth, async (u) => {
        setUser(u);
        if (u) {
          const p = await firebase.getUserProfile(u.uid).catch(() => null);
          setProfile(p);
        }
        setLoading(false);
      });
      return unsub;
    });
  }, []);

  const signup = async (email, password, displayName) => {
    const cred = await fb.createUserWithEmailAndPassword(fb.auth, email, password);
    await fb.updateProfile(cred.user, { displayName });
    await fb.saveUserProfile(cred.user.uid, { email, displayName, role: 'user', plan: 'free' });
    return cred;
  };

  const login = (email, password) => fb.signInWithEmailAndPassword(fb.auth, email, password);
  const logout = () => { setProfile(null); return fb.signOut(fb.auth); };
  const resetPassword = (email) => fb.sendPasswordResetEmail(fb.auth, email);

  return { user, profile, loading, signup, login, logout, resetPassword };
}

/* ── Provider ────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  // Use demo auth if Firebase not configured, real auth otherwise
  const demoAuth = useDemoAuth();
  const [realAuth, setRealAuth] = useState(null);

  useEffect(() => {
    if (FIREBASE_CONFIGURED) {
      // lazy-load firebase auth only when keys exist
      import('../services/firebase').catch(() => {});
    }
  }, []);

  const value = FIREBASE_CONFIGURED && realAuth ? realAuth : demoAuth;

  return (
    <AuthContext.Provider value={value}>
      {!value.loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

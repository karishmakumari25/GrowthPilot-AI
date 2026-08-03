// Auth Context — Local Auth (No Firebase needed)

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'gp_demo_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const signup = async (email, password, displayName) => {
    const newUser = {
      uid: 'user-' + Date.now(),
      email,
      displayName: displayName || email.split('@')[0],
      plan: 'free',
      role: 'user',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
    return { user: newUser };
  };

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Invalid credentials');
    const existing = user || {
      uid: 'user-001',
      email,
      displayName: email.split('@')[0],
      plan: 'growth',
      role: 'user',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    setUser(existing);
    return { user: existing };
  };

  const logout = async () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const resetPassword = async (email) => {
    return true;
  };

  const value = {
    user,
    profile: user,
    loading: false,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

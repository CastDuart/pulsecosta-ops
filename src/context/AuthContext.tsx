import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthUser } from '../types';

interface AuthCtx {
  user: AuthUser | null;
  token: string | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try { return JSON.parse(localStorage.getItem('ops_user') || 'null'); }
    catch { return null; }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('ops_token'));

  const login = useCallback((u: AuthUser, t: string) => {
    localStorage.setItem('ops_user', JSON.stringify(u));
    localStorage.setItem('ops_token', t);
    setUser(u); setToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ops_user');
    localStorage.removeItem('ops_token');
    setUser(null); setToken(null);
  }, []);

  return <Ctx.Provider value={{ user, token, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

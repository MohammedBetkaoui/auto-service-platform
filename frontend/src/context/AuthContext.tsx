import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getProfile as apiGetProfile, registerUser, logoutUser, api } from '../api/auth';

// Minimal JWT parse helper — only decodes the payload (not verifies)
function parseJwt(token: string | null | undefined) {
  if (!token) return null;
  try {
    const b64 = token.split('.')[1];
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
}

type User = { id?: number; email?: string; role?: string } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User>(null);

  // Keep axios instance Authorization header in sync
  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      if (!token) return setUser(null);
      try {
        // decode token to get quick user info
  const decoded: any = parseJwt(token);
  if (mounted) setUser(decoded ? { id: decoded.sub, email: decoded.email, role: decoded.role } : null);

  // confirm with server
  const res = await apiGetProfile(token);
        if (mounted) setUser(res.data || (decoded ? { id: decoded.sub, email: decoded.email, role: decoded.role } : null));
      } catch (e) {
        // If token expired or invalid, clear it
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
      }
    };
    init();
    return () => {
      mounted = false;
    };
  }, [token]);

  const login = async (data: { email: string; password: string }) => {
    const res = await loginUser(data);
    const access = res.data?.access_token;
    if (!access) throw new Error('No access token returned from server');
    localStorage.setItem('token', access);
    setToken(access);
    // redirect after login
    try {
      navigate('/dashboard');
    } catch (e) {
      // ignore if navigation not available
    }
  };

  const register = async (data: Record<string, unknown>) => {
    await registerUser(data);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore logout errors
    }
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    try {
      navigate('/login');
    } catch (e) {
      // ignore
    }
  };

  const value = useMemo(() => ({ user, token, login, logout, register }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

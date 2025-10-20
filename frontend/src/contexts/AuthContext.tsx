import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi, RegisterData, LoginData, AuthResponse } from '../api/authApi';

export type UserRole = 'client' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'banned';
  // provider specific
  availability?: boolean;
  rating?: number;
  reviewsCount?: number;
  specialties?: string[];
  // Client specific
  ordersCount?: number;
  joinedDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('autoserve_user');
      const accessToken = localStorage.getItem('access_token');

      if (storedUser && accessToken) {
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      }

      // Tenter de rafraîchir le token via le cookie HTTP-only
      try {
        const resp = await authApi.refresh();
        localStorage.setItem('access_token', resp.access_token);

        const userData: User = {
          id: resp.user.id.toString(),
          email: resp.user.email,
          name: resp.user.full_name,
          role: resp.user.role as UserRole,
          avatar: resp.user.avatar_url,
          phone: resp.user.phone,
          status: resp.user.status as 'active' | 'inactive' | 'banned',
        };

        setUser(userData);
        localStorage.setItem('autoserve_user', JSON.stringify(userData));
      } catch (e) {
        // refresh failed, clear storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('autoserve_user');
        setUser(null);
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response: AuthResponse = await authApi.login({ email, password });

      // Store tokens
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);

      // Convert API user to our User interface
      const userData: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.full_name,
        role: response.user.role as UserRole,
        avatar: response.user.avatar_url,
        phone: response.user.phone,
        status: response.user.status as 'active' | 'inactive' | 'banned',
      };

      setUser(userData);
      localStorage.setItem('autoserve_user', JSON.stringify(userData));

      // Redirect to dashboard
      window.location.hash = '#dashboard';
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authApi.register(data);

      // Store tokens
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('refresh_token', response.refresh_token);

      // Convert API user to our User interface
      const userData: User = {
        id: response.user.id.toString(),
        email: response.user.email,
        name: response.user.full_name,
        role: response.user.role as UserRole,
        avatar: response.user.avatar_url,
        phone: response.user.phone,
        status: response.user.status as 'active' | 'inactive' | 'banned',
      };

      setUser(userData);
      localStorage.setItem('autoserve_user', JSON.stringify(userData));

      // Redirect to dashboard
      window.location.hash = '#dashboard';
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      // Clear local storage
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('autoserve_user');
      window.location.hash = '';
    }
  };

  const forgotPassword = async (email: string) => {
    await authApi.forgotPassword({ email });
  };

  const resetPassword = async (token: string, newPassword: string) => {
    await authApi.resetPassword({ token, new_password: newPassword });
  };

  const verifyEmail = async (token: string) => {
    await authApi.verifyEmail(token);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('autoserve_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword,
      verifyEmail,
      updateUser,
      isAuthenticated: !!user,
      isLoading,
    }}>
      {isLoading ? <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}><span>Chargement...</span></div> : children}
    </AuthContext.Provider>
  );
}


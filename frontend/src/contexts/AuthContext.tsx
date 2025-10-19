import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'client' | 'worker' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  status?: 'active' | 'inactive' | 'banned';
  // Worker specific
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
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('autoserve_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role?: UserRole) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data based on role
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      role: role || 'client',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      phone: '+213 555 123 456',
      status: 'active',
      joinedDate: new Date().toISOString(),
    };

    // Add role-specific data
    if (mockUser.role === 'worker') {
      mockUser.availability = true;
      mockUser.rating = 4.8;
      mockUser.reviewsCount = 156;
      mockUser.specialties = ['Lavage Premium', 'Entretien Complet'];
    } else if (mockUser.role === 'client') {
      mockUser.ordersCount = 12;
    }

    setUser(mockUser);
    localStorage.setItem('autoserve_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('autoserve_user');
    window.location.hash = '';
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('autoserve_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

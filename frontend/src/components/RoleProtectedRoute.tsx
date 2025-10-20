import { ReactNode, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RoleProtectedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

export function RoleProtectedRoute({ children, allowedRoles, redirectTo = '#login' }: RoleProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user || !allowedRoles.includes(user.role))) {
      window.location.hash = redirectTo;
    }
  }, [isAuthenticated, isLoading, user, allowedRoles, redirectTo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role)) {
    return null; // Will redirect via useEffect
  }

  return <>{children}</>;
}

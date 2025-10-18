import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PublicRoute
 * Prevents logged-in users from accessing public pages (login/register).
 */
export default function PublicRoute() {
  const { token } = useAuth();
  if (token) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}

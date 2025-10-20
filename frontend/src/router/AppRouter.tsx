import React from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';

import { LoginPage } from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage';
import { DashboardPage } from '../components/DashboardPage';
import { ForgotPasswordPage } from '../components/ForgotPasswordPage';
import { ResetPasswordPage } from '../components/ResetPasswordPage';
import { VerifyEmailPage } from '../components/VerifyEmailPage';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// Simple hash-based router helper rendered by App
export function AppRouter({ currentPage }: { currentPage: string }) {
  switch (currentPage) {
    case 'register':
      return (
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      );

    case 'login':
      return (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      );

    case 'forgot-password':
      return (
        <PublicRoute>
          <ForgotPasswordPage />
        </PublicRoute>
      );

    case 'reset-password':
      return (
        <PublicRoute>
          <ResetPasswordPage />
        </PublicRoute>
      );

    case 'verify':
      return (
        <PublicRoute>
          <VerifyEmailPage />
        </PublicRoute>
      );

    case 'dashboard':
      return (
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      );

    default:
      return null;
  }
}

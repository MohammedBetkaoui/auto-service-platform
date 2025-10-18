import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Routes>
      {/* Public routes (only when not authenticated) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes (requires auth) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Dashboard />} />
      </Route>

      {/* Public home */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

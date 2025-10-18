import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Login page
 * - email + password
 * - calls login() from AuthContext
 * - on success redirects to /dashboard
 */
export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.login({ email, password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Se connecter</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <label className="block mb-2">
          Email
          <input className="w-full border p-2 rounded mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">
          Mot de passe
          <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

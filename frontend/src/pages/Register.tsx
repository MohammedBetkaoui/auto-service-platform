import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Register page
 * - collects name, email, password, role
 * - calls register() from AuthContext
 * - redirects to /login after success
 */
export default function Register() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'client' | 'provider'>('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.register({ full_name: fullName, email, password, role });
      navigate('/login');
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l\'inscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Créer un compte</h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}
        <label className="block mb-2">
          Nom complet
          <input className="w-full border p-2 rounded mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </label>
        <label className="block mb-2">
          Email
          <input className="w-full border p-2 rounded mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">
          Mot de passe
          <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label className="block mb-4">
          Rôle
          <select className="w-full border p-2 rounded mt-1" value={role} onChange={(e) => setRole(e.target.value as any)}>
            <option value="client">Client</option>
            <option value="provider">Prestataire</option>
          </select>
        </label>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
          {loading ? 'Inscription...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
}

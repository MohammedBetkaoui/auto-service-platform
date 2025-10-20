import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await forgotPassword(email);
      setMessage('Un email de réinitialisation a été envoyé.');
    } catch (error) {
      setMessage('Erreur lors de l\'envoi de l\'email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Mot de passe oublié</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Envoi...' : 'Envoyer'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-300">{message}</p>}
        <p className="mt-4 text-center text-gray-400">
          <a href="#login" className="text-blue-400 hover:text-blue-300">Retour à la connexion</a>
        </p>
      </div>
    </div>
  );
}
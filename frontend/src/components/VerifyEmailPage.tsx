import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { verifyEmail } = useAuth();

  useEffect(() => {
    const verify = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        try {
          await verifyEmail(token);
          setMessage('Email vérifié avec succès !');
          setTimeout(() => {
            window.location.hash = '#login';
          }, 2000);
        } catch (error) {
          setMessage('Erreur lors de la vérification de l\'email.');
        }
      } else {
        setMessage('Token manquant.');
      }
      setIsLoading(false);
    };
    verify();
  }, [verifyEmail]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Vérification d'email</h2>
        {isLoading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto"></div>
        ) : (
          <p className="text-gray-300">{message}</p>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * Profile page - displays basic user info from the AuthContext
 */
export default function Profile() {
  const { user } = useAuth();

  if (!user) return <div className="p-6">Aucun utilisateur connecté.</div>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">Mon profil</h2>
      <div>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rôle:</strong> {user.role}</p>
      </div>
    </div>
  );
}

import { CheckCircle, Home, User } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

interface SuccessMessageProps {
  userType: 'client' | 'provider';
  userName: string;
}

export function SuccessMessage({ userType, userName }: SuccessMessageProps) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <div className="w-24 h-24 bg-[#28C76F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={56} className="text-[#28C76F]" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl md:text-4xl text-[#1E1E1E] mb-4">
          Bienvenue sur AutoServe DZ 🎉
        </h1>
        
        <p className="text-lg text-gray-600 mb-2">
          Bonjour <span className="text-[#0077FF]">{userName}</span> !
        </p>

        <p className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
          {userType === 'client'
            ? 'Votre compte client a été créé avec succès. Vous pouvez maintenant commander des services automobiles en quelques clics.'
            : 'Votre compte prestataire a été créé avec succès. Notre équipe va vérifier votre profil et vous recevrez une notification dès que votre compte sera activé.'}
        </p>

        {/* Success Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-[#0077FF]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={24} className="text-[#0077FF]" />
            </div>
            <p className="text-sm">
              {userType === 'client' ? 'Compte activé' : 'Profil créé'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-[#28C76F]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-[#28C76F]" />
            </div>
            <p className="text-sm">
              {userType === 'client' ? 'Profil complété' : 'En cours de validation'}
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="w-12 h-12 bg-[#0077FF]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Home size={24} className="text-[#0077FF]" />
            </div>
            <p className="text-sm">Prêt à démarrer</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full px-8"
            onClick={() => window.location.href = '/'}
          >
            Accéder à mon espace
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8"
            onClick={() => window.location.href = '/'}
          >
            Retour à l'accueil
          </Button>
        </div>

        {userType === 'provider' && (
          <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <strong>Prochaine étape :</strong> Vous recevrez un email dès que votre profil sera validé par notre équipe (généralement sous 24-48h).
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

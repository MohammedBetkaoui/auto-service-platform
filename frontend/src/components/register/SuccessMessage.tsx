import { CheckCircle, Home, User, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

interface SuccessMessageProps {
  userType: 'client' | 'provider';
  userName: string;
}

export function SuccessMessage({ userType, userName }: SuccessMessageProps) {
  return (
    <div className="relative max-w-2xl mx-auto text-center">
      {/* Animated Success Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#28C76F] to-[#22B55E] rounded-full blur-2xl opacity-30"></div>
        <div className="relative w-28 h-28 bg-gradient-to-r from-[#28C76F] to-[#22B55E] rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-[#28C76F]/40">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={64} className="text-white" strokeWidth={2.5} />
          </motion.div>
        </div>
        
        {/* Decorative sparkles */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -top-4 -right-4"
        >
          <Sparkles className="text-[#FF6B35]" size={32} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-2 -left-6"
        >
          <Sparkles className="text-[#F7931E]" size={24} />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-4xl md:text-5xl text-white mb-4">
          Bienvenue sur AutoServe DZ 🎉
        </h1>
        
        <p className="text-xl text-gray-300 mb-2">
          Bonjour <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">{userName}</span> !
        </p>

        <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
          {userType === 'client'
            ? 'Votre compte client a été créé avec succès. Vous pouvez maintenant commander des services automobiles professionnels en quelques clics.'
            : 'Votre compte prestataire a été créé avec succès. Notre équipe va vérifier votre profil et vous recevrez une notification dès que votre compte sera activé.'}
        </p>

        {/* Success Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all">
            <div className="w-14 h-14 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-[#FF6B35]" />
            </div>
            <p className="text-white">
              {userType === 'client' ? 'Compte activé' : 'Profil créé'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#28C76F]/30 transition-all">
            <div className="w-14 h-14 bg-[#28C76F]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <User size={28} className="text-[#28C76F]" />
            </div>
            <p className="text-white">
              {userType === 'client' ? 'Profil complété' : 'En cours de validation'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all">
            <div className="w-14 h-14 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Home size={28} className="text-[#FF6B35]" />
            </div>
            <p className="text-white">Prêt à démarrer</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-10 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all"
            onClick={() => window.location.href = '/#dashboard'}
          >
            Accéder à mon espace
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/5 rounded-xl px-10 text-lg"
            onClick={() => window.location.href = '/'}
          >
            Retour à l'accueil
          </Button>
        </div>

        {userType === 'provider' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 p-5 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-500/20"
          >
            <p className="text-sm text-blue-300">
              💡 <strong className="text-blue-200">Prochaine étape :</strong> Vous recevrez un email dès que votre profil sera validé par notre équipe (généralement sous 24-48h).
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

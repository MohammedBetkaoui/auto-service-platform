import { User, TruckIcon, Check } from 'lucide-react';
import { Button } from '../ui/button';

interface Step1UserTypeProps {
  selectedType: 'client' | 'provider' | null;
  onSelect: (type: 'client' | 'provider') => void;
  onNext: () => void;
}

export function Step1UserType({ selectedType, onSelect, onNext }: Step1UserTypeProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4">
          Vous êtes... ?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Sélectionnez le type de compte que vous souhaitez créer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Client Card */}
        <button
          onClick={() => onSelect('client')}
          className={`group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border-2 transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-2 ${
            selectedType === 'client'
              ? 'border-[#FF6B35] shadow-2xl shadow-[#FF6B35]/30'
              : 'border-white/10 hover:border-[#FF6B35]/50'
          }`}
        >
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#F7931E]/5 rounded-2xl transition-opacity ${
            selectedType === 'client' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}></div>

          {selectedType === 'client' && (
            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center shadow-lg shadow-[#FF6B35]/30">
              <Check size={20} className="text-white" strokeWidth={3} />
            </div>
          )}

          <div className="relative">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                selectedType === 'client'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] shadow-lg shadow-[#FF6B35]/30'
                  : 'bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 group-hover:scale-110'
              }`}
            >
              <User
                size={40}
                className={selectedType === 'client' ? 'text-white' : 'text-[#FF6B35]'}
              />
            </div>

            <h3 className="text-2xl md:text-3xl text-white mb-3">
              Client
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Je veux demander des services pour ma voiture : lavage, vidange, dépannage, etc.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Réserver des services à la demande</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Suivi en temps réel</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Paiement sécurisé</span>
              </div>
            </div>
          </div>
        </button>

        {/* Provider Card */}
        <button
          onClick={() => onSelect('provider')}
          className={`group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border-2 transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-2 ${
            selectedType === 'provider'
              ? 'border-[#FF6B35] shadow-2xl shadow-[#FF6B35]/30'
              : 'border-white/10 hover:border-[#FF6B35]/50'
          }`}
        >
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#F7931E]/5 rounded-2xl transition-opacity ${
            selectedType === 'provider' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}></div>

          {selectedType === 'provider' && (
            <div className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center shadow-lg shadow-[#FF6B35]/30">
              <Check size={20} className="text-white" strokeWidth={3} />
            </div>
          )}

          <div className="relative">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                selectedType === 'provider'
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] shadow-lg shadow-[#FF6B35]/30'
                  : 'bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 group-hover:scale-110'
              }`}
            >
              <TruckIcon
                size={40}
                className={selectedType === 'provider' ? 'text-white' : 'text-[#FF6B35]'}
              />
            </div>

            <h3 className="text-2xl md:text-3xl text-white mb-3">
              Prestataire
            </h3>

            <p className="text-gray-400 leading-relaxed mb-6">
              Je possède un véhicule de service et souhaite offrir mes prestations automobiles.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Accéder à une clientèle qualifiée</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Gérer vos horaires librement</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div className="w-5 h-5 rounded-full bg-[#28C76F]/20 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-[#28C76F]"></div>
                </div>
                <span>Revenus optimisés</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!selectedType}
          className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-12 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}

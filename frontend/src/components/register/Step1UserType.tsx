import { User, TruckIcon } from 'lucide-react';
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
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#1E1E1E] mb-3">
          Vous êtes... ?
        </h2>
        <p className="text-gray-600 text-lg">
          Sélectionnez le type de compte que vous souhaitez créer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Client Card */}
        <button
          onClick={() => onSelect('client')}
          className={`group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-2 ${
            selectedType === 'client'
              ? 'border-[#0077FF] shadow-lg shadow-[#0077FF]/20'
              : 'border-gray-200 hover:border-[#0077FF]/50'
          }`}
        >
          {selectedType === 'client' && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#0077FF] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              selectedType === 'client'
                ? 'bg-[#0077FF]'
                : 'bg-[#0077FF]/10 group-hover:bg-[#0077FF]/20'
            }`}
          >
            <User
              size={40}
              className={selectedType === 'client' ? 'text-white' : 'text-[#0077FF]'}
            />
          </div>

          <h3 className="text-xl md:text-2xl text-[#1E1E1E] mb-3">
            Client
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Je veux demander des services pour ma voiture : lavage, vidange, dépannage, etc.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Réserver des services à la demande</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Suivi en temps réel</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </button>

        {/* Provider Card */}
        <button
          onClick={() => onSelect('provider')}
          className={`group relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-2 ${
            selectedType === 'provider'
              ? 'border-[#0077FF] shadow-lg shadow-[#0077FF]/20'
              : 'border-gray-200 hover:border-[#0077FF]/50'
          }`}
        >
          {selectedType === 'provider' && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#0077FF] rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}

          <div
            className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              selectedType === 'provider'
                ? 'bg-[#0077FF]'
                : 'bg-[#0077FF]/10 group-hover:bg-[#0077FF]/20'
            }`}
          >
            <TruckIcon
              size={40}
              className={selectedType === 'provider' ? 'text-white' : 'text-[#0077FF]'}
            />
          </div>

          <h3 className="text-xl md:text-2xl text-[#1E1E1E] mb-3">
            Prestataire
          </h3>

          <p className="text-gray-600 leading-relaxed mb-6">
            Je possède un véhicule utilitaire et je souhaite proposer mes services automobiles.
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Revenus attractifs et flexibles</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Accès à une large clientèle</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-[#28C76F]"></div>
              <span>Gérez vos horaires</span>
            </div>
          </div>
        </button>
      </div>

      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={onNext}
          disabled={!selectedType}
          className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full px-12 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}

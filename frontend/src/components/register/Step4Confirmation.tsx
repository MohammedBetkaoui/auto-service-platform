import { CheckCircle, User, Mail, Phone, Car, MapPin, TruckIcon, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { useState } from 'react';

interface Step4ConfirmationProps {
  userType: 'client' | 'provider';
  formData: any;
  onConfirm: () => void;
  onBack: () => void;
}

export function Step4Confirmation({ userType, formData, onConfirm, onBack }: Step4ConfirmationProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = () => {
    if (!acceptTerms) {
      setError('Vous devez accepter les conditions générales pour continuer');
      return;
    }
    setError('');
    onConfirm();
  };

  const getServiceLabel = (id: string) => {
    const services: Record<string, string> = {
      lavage: 'Lavage auto',
      vidange: 'Vidange & entretien',
      depannage: 'Dépannage / Remorquage',
      nettoyage: 'Nettoyage intérieur',
      batterie: 'Recharge batterie',
      carburant: 'Carburant d\'urgence',
    };
    return services[id] || id;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#28C76F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-[#28C76F]" />
        </div>
        <h2 className="text-2xl md:text-3xl text-[#1E1E1E] mb-3">
          Confirmation de votre inscription
        </h2>
        <p className="text-gray-600">
          Vérifiez vos informations avant de créer votre compte
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-6">
        {/* Type Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0077FF]/10 text-[#0077FF] rounded-full px-6 py-2">
            {userType === 'client' ? (
              <>
                <User size={20} />
                <span>Compte Client</span>
              </>
            ) : (
              <>
                <TruckIcon size={20} />
                <span>Compte Prestataire</span>
              </>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg text-[#1E1E1E] pb-2 border-b border-gray-200">
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-[#0077FF]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Nom complet</p>
                <p className="text-[#1E1E1E]">{formData.fullName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#0077FF]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-[#1E1E1E]">{formData.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-[#0077FF]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="text-[#1E1E1E]">{formData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specific Information */}
        <div className="space-y-4">
          <h3 className="text-lg text-[#1E1E1E] pb-2 border-b border-gray-200">
            {userType === 'client' ? 'Informations véhicule' : 'Informations service'}
          </h3>

          {userType === 'client' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.carBrand && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Car size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Marque de voiture</p>
                    <p className="text-[#1E1E1E]">{formData.carBrand}</p>
                  </div>
                </div>
              )}

              {formData.carRegistration && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Immatriculation</p>
                    <p className="text-[#1E1E1E]">{formData.carRegistration}</p>
                  </div>
                </div>
              )}

              {formData.city && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ville</p>
                    <p className="text-[#1E1E1E]">{formData.city}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {formData.serviceTypes && formData.serviceTypes.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={18} className="text-[#0077FF]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Services proposés</p>
                    <div className="flex flex-wrap gap-2">
                      {formData.serviceTypes.map((serviceId: string) => (
                        <span
                          key={serviceId}
                          className="inline-block bg-[#0077FF]/10 text-[#0077FF] px-3 py-1 rounded-full text-sm"
                        >
                          {getServiceLabel(serviceId)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {formData.vehicleType && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TruckIcon size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Type de véhicule</p>
                    <p className="text-[#1E1E1E]">{formData.vehicleType}</p>
                  </div>
                </div>
              )}

              {formData.vehicleRegistration && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Immatriculation</p>
                    <p className="text-[#1E1E1E]">{formData.vehicleRegistration}</p>
                  </div>
                </div>
              )}

              {formData.documents && formData.documents.length > 0 && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#0077FF]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={18} className="text-[#0077FF]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Documents téléchargés</p>
                    <p className="text-[#1E1E1E]">{formData.documents.length} fichier(s)</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className={`bg-white rounded-2xl p-6 border-2 transition-colors ${
        error ? 'border-red-500' : 'border-gray-200'
      }`}>
        <div className="flex items-start gap-3">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
            J'accepte les{' '}
            <a href="#" className="text-[#0077FF] hover:underline">
              conditions générales d'utilisation
            </a>{' '}
            et la{' '}
            <a href="#" className="text-[#0077FF] hover:underline">
              politique de confidentialité
            </a>{' '}
            d'AutoServe DZ.
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm mt-2 ml-8">{error}</p>}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button size="lg" variant="outline" onClick={onBack} className="flex-1 rounded-full">
          Retour
        </Button>
        <Button
          size="lg"
          onClick={handleConfirm}
          className="flex-1 bg-[#28C76F] hover:bg-[#28C76F]/90 text-white rounded-full"
        >
          Créer mon compte
        </Button>
      </div>
    </div>
  );
}

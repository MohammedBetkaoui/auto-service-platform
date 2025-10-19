import { useState } from 'react';
import { Car, Upload, FileText, MapPin, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface Step3SpecificInfoProps {
  userType: 'client' | 'provider';
  formData: {
    // Client
    carBrand?: string;
    carRegistration?: string;
    city?: string;
    // Provider
    serviceTypes?: string[];
    vehicleType?: string;
    vehicleRegistration?: string;
    documents?: File[];
  };
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const cities = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Sétif', 'Sidi Bel Abbès',
  'Biskra', 'Tébessa', 'Tlemcen', 'Béjaïa', 'Tiaret', 'Bordj Bou Arréridj', 'Béchar',
];

const carBrands = [
  'Renault', 'Peugeot', 'Citroën', 'Volkswagen', 'Toyota', 'Hyundai', 'Kia',
  'Nissan', 'Mercedes-Benz', 'BMW', 'Audi', 'Seat', 'Skoda', 'Dacia', 'Autre',
];

const serviceTypes = [
  { id: 'lavage', label: 'Lavage auto' },
  { id: 'vidange', label: 'Vidange & entretien' },
  { id: 'depannage', label: 'Dépannage / Remorquage' },
  { id: 'nettoyage', label: 'Nettoyage intérieur' },
  { id: 'batterie', label: 'Recharge batterie' },
  { id: 'carburant', label: 'Carburant d\'urgence' },
];

const vehicleTypes = [
  'Camionnette', 'Fourgon', 'Camion léger', 'Véhicule utilitaire', 'Autre',
];

export function Step3SpecificInfo({ userType, formData, onChange, onNext, onBack }: Step3SpecificInfoProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileNames = Array.from(files).map((file) => file.name);
      setUploadedFiles([...uploadedFiles, ...fileNames]);
      onChange('documents', [...(formData.documents || []), ...Array.from(files)]);
    }
  };

  const handleServiceTypeToggle = (serviceId: string) => {
    const current = formData.serviceTypes || [];
    const updated = current.includes(serviceId)
      ? current.filter((id) => id !== serviceId)
      : [...current, serviceId];
    onChange('serviceTypes', updated);
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (userType === 'client') {
      if (!formData.city) newErrors.city = 'La ville est requise';
    } else {
      if (!formData.serviceTypes?.length) newErrors.serviceTypes = 'Sélectionnez au moins un service';
      if (!formData.vehicleType) newErrors.vehicleType = 'Le type de véhicule est requis';
      if (!formData.vehicleRegistration) newErrors.vehicleRegistration = 'L\'immatriculation est requise';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SettingsIcon size={32} className="text-[#FF6B35]" />
        </div>
        <h2 className="text-3xl md:text-4xl text-white mb-3">
          {userType === 'client' ? 'Informations sur votre véhicule' : 'Informations sur votre service'}
        </h2>
        <p className="text-gray-400">
          {userType === 'client'
            ? 'Dites-nous en plus sur votre voiture'
            : 'Configurez votre profil de prestataire'}
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="relative">
          {userType === 'client' ? (
            // Client Form
            <div className="space-y-6">
              {/* Car Brand */}
              <div>
                <Label htmlFor="carBrand" className="text-white">Marque de voiture principale</Label>
                <div className="relative mt-2">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" size={20} />
                  <Select value={formData.carBrand} onValueChange={(value: string) => onChange('carBrand', value)}>
                    <SelectTrigger className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white focus:ring-[#FF6B35]">
                      <SelectValue placeholder="Sélectionnez une marque" />
                    </SelectTrigger>
                    <SelectContent>
                      {carBrands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Car Registration */}
              <div>
                <Label htmlFor="carRegistration" className="text-white">Immatriculation (facultatif)</Label>
                <div className="relative mt-2">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="carRegistration"
                    type="text"
                    placeholder="Ex: 123456-16-16"
                    value={formData.carRegistration || ''}
                    onChange={(e) => onChange('carRegistration', e.target.value)}
                    className="pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B35]"
                  />
                </div>
              </div>

              {/* City */}
              <div>
                <Label htmlFor="city" className="text-white">Ville *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" size={20} />
                  <Select value={formData.city} onValueChange={(value: string) => onChange('city', value)}>
                    <SelectTrigger className={`pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white focus:ring-[#FF6B35] ${errors.city ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Sélectionnez votre ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>
          ) : (
            // Provider Form
            <div className="space-y-6">
              {/* Service Types */}
              <div>
                <Label className="text-white">Services proposés *</Label>
                <p className="text-sm text-gray-400 mb-3">Sélectionnez un ou plusieurs services</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {serviceTypes.map((service) => (
                    <div
                      key={service.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.serviceTypes?.includes(service.id)
                          ? 'border-[#FF6B35] bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10'
                          : 'border-white/10 hover:border-[#FF6B35]/30 hover:bg-white/5'
                      }`}
                      onClick={() => handleServiceTypeToggle(service.id)}
                    >
                      <Checkbox
                        id={service.id}
                        checked={formData.serviceTypes?.includes(service.id)}
                        onCheckedChange={() => handleServiceTypeToggle(service.id)}
                      />
                      <Label htmlFor={service.id} className="cursor-pointer flex-1 text-white">
                        {service.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.serviceTypes && <p className="text-red-400 text-sm mt-1">{errors.serviceTypes}</p>}
              </div>

              {/* Vehicle Type */}
              <div>
                <Label htmlFor="vehicleType" className="text-white">Type de véhicule de service *</Label>
                <div className="relative mt-2">
                  <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10 pointer-events-none" size={20} />
                  <Select value={formData.vehicleType} onValueChange={(value: string) => onChange('vehicleType', value)}>
                    <SelectTrigger className={`pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white focus:ring-[#FF6B35] ${errors.vehicleType ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Sélectionnez le type de véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicleTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {errors.vehicleType && <p className="text-red-400 text-sm mt-1">{errors.vehicleType}</p>}
              </div>

              {/* Vehicle Registration */}
              <div>
                <Label htmlFor="vehicleRegistration" className="text-white">Numéro d'immatriculation *</Label>
                <div className="relative mt-2">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <Input
                    id="vehicleRegistration"
                    type="text"
                    placeholder="Ex: 123456-16-16"
                    value={formData.vehicleRegistration || ''}
                    onChange={(e) => onChange('vehicleRegistration', e.target.value)}
                    className={`pl-11 rounded-xl bg-[#0a0a0a] border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-[#FF6B35] ${errors.vehicleRegistration ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.vehicleRegistration && (
                  <p className="text-red-400 text-sm mt-1">{errors.vehicleRegistration}</p>
                )}
              </div>

              {/* Document Upload */}
              <div>
                <Label className="text-white">Documents (facultatif)</Label>
                <p className="text-sm text-gray-400 mb-3">
                  Permis de conduire, carte grise, photo du véhicule
                </p>
                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#FF6B35] hover:bg-white/5 transition-colors cursor-pointer">
                  <input
                    type="file"
                    id="documents"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label htmlFor="documents" className="cursor-pointer">
                    <Upload className="mx-auto mb-3 text-[#FF6B35]" size={40} />
                    <p className="text-white mb-1">Cliquez pour télécharger ou glissez-déposez</p>
                    <p className="text-sm text-gray-400">PNG, JPG, PDF jusqu'à 10MB</p>
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-3 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-lg text-sm"
                      >
                        <FileText size={16} className="text-[#FF6B35]" />
                        <span className="flex-1 text-white">{file}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button 
          size="lg" 
          variant="outline" 
          onClick={onBack} 
          className="flex-1 rounded-xl bg-transparent border-white/20 text-white hover:bg-white/5"
        >
          Retour
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit}
          className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:shadow-[#FF6B35]/40 transition-all"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}

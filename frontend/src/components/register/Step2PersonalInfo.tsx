import { useState } from 'react';
import { Eye, EyeOff, Mail, Phone, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

interface Step2PersonalInfoProps {
  formData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step2PersonalInfo({ formData, onChange, onNext, onBack }: Step2PersonalInfoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone.replace(/\s/g, ''));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Faible', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 2, text: 'Moyen', color: 'bg-yellow-500' };
    if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password))
      return { strength: 3, text: 'Fort', color: 'bg-[#28C76F]' };
    return { strength: 2, text: 'Moyen', color: 'bg-yellow-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Le nom complet est requis';
    if (!validateEmail(formData.email)) newErrors.email = 'Email invalide';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Numéro de téléphone invalide (10 chiffres)';
    if (formData.password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#0077FF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User size={32} className="text-[#0077FF]" />
        </div>
        <h2 className="text-2xl md:text-3xl text-[#1E1E1E] mb-3">
          Informations personnelles
        </h2>
        <p className="text-gray-600">
          Renseignez vos informations pour créer votre compte
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <Label htmlFor="fullName">Nom complet *</Label>
            <div className="relative mt-2">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="fullName"
                type="text"
                placeholder="Entrez votre nom complet"
                value={formData.fullName}
                onChange={(e) => onChange('fullName', e.target.value)}
                className={`pl-11 rounded-xl ${errors.fullName ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email *</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="email"
                type="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={(e) => onChange('email', e.target.value)}
                className={`pl-11 rounded-xl ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Numéro de téléphone *</Label>
            <div className="relative mt-2">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                id="phone"
                type="tel"
                placeholder="0555 123 456"
                value={formData.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className={`pl-11 rounded-xl ${errors.phone ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Créez un mot de passe"
                value={formData.password}
                onChange={(e) => onChange('password', e.target.value)}
                className={`rounded-xl pr-11 ${errors.password ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        passwordStrength.strength >= level ? passwordStrength.color : 'bg-gray-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-gray-600">Force : {passwordStrength.text}</p>
              </div>
            )}
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmez votre mot de passe"
                value={formData.confirmPassword}
                onChange={(e) => onChange('confirmPassword', e.target.value)}
                className={`rounded-xl pr-11 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <Separator className="my-6" />

          {/* Google Sign In */}
          <Button
            variant="outline"
            className="w-full rounded-xl h-12 border-gray-300"
            type="button"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Se connecter avec Google
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button
          size="lg"
          variant="outline"
          onClick={onBack}
          className="flex-1 rounded-full"
        >
          Retour
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit}
          className="flex-1 bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}

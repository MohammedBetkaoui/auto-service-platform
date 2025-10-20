import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StepIndicator } from './register/StepIndicator';
import { Step1UserType } from './register/Step1UserType';
import { Step2PersonalInfo } from './register/Step2PersonalInfo';
import { Step3SpecificInfo } from './register/Step3SpecificInfo';
import { Step4Confirmation } from './register/Step4Confirmation';
import { SuccessMessage } from './register/SuccessMessage';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { useAuth } from '../contexts/AuthContext';

type UserType = 'client' | 'provider' | null;

interface FormData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Client specific
  carBrand?: string;
  carRegistration?: string;
  city?: string;
  // Provider specific
  serviceTypes?: string[];
  vehicleType?: string;
  vehicleRegistration?: string;
  documents?: File[];
}

export function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType>(null);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleNext = () => {
    setDirection('forward');
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setDirection('backward');
    setCurrentStep((prev) => prev - 1);
  };

  const handleUserTypeSelect = (type: 'client' | 'provider') => {
    setUserType(type);
  };

  const handleFormDataChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = async () => {
    setError('');
    setIsLoading(true);
    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        phone: formData.phone,
        role: (userType === 'client' ? 'client' : 'provider') as 'client' | 'provider',
      };
      await register(registerData);
      // Redirection handled in AuthContext
    } catch (err: any) {
      setError(err.message || 'Erreur lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const variants = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? -50 : 50,
      opacity: 0,
    }),
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        
        {/* Gradient Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>
        
        <SuccessMessage userType={userType!} userName={formData.fullName} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F7931E]/10 to-transparent rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="relative bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="rounded-full text-gray-300 hover:text-white hover:bg-white/5"
              >
                <ArrowLeft size={20} />
              </Button>
              <Logo size="md" showTagline={true} />
            </div>
            <p className="text-sm text-gray-400 hidden sm:block">
              Déjà inscrit ?{' '}
              <a href="#login" className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Step Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <Step1UserType
                selectedType={userType}
                onSelect={handleUserTypeSelect}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <Step2PersonalInfo
                formData={formData}
                onChange={handleFormDataChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && userType && (
              <Step3SpecificInfo
                userType={userType}
                formData={formData}
                onChange={handleFormDataChange}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && userType && (
              <Step4Confirmation
                userType={userType}
                formData={formData}
                onConfirm={handleConfirm}
                onBack={handleBack}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative py-6 text-center text-sm text-gray-500 border-t border-white/10">
        <p>© 2025 AutoServe DZ. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

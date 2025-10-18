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

  const handleConfirm = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', { userType, ...formData });
    setIsComplete(true);
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
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center py-12 px-4">
        <SuccessMessage userType={userType!} userName={formData.fullName} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToHome}
                className="rounded-full"
              >
                <ArrowLeft size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#0077FF] rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">A</span>
                </div>
                <span className="text-xl text-[#0077FF] tracking-tight">
                  AutoServe <span className="text-[#1E1E1E]">DZ</span>
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 hidden sm:block">
              Déjà inscrit ?{' '}
              <a href="#login" className="text-[#0077FF] hover:underline">
                Se connecter
              </a>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
      <footer className="py-6 text-center text-sm text-gray-500">
        <p>© 2025 AutoServe DZ. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

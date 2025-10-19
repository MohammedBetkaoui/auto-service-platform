import { Users, FileText, Settings, CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: 'Type d\'utilisateur', icon: Users },
  { number: 2, title: 'Informations personnelles', icon: FileText },
  { number: 3, title: 'Détails véhicule/service', icon: Settings },
  { number: 4, title: 'Confirmation', icon: CheckCircle },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full mb-8 md:mb-12">
      {/* Desktop: Horizontal */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div className="relative">
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full blur-lg opacity-50"></div>
                    )}
                    <div
                      className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? 'bg-gradient-to-r from-[#28C76F] to-[#22B55E] text-white shadow-lg shadow-[#28C76F]/30'
                          : isActive
                          ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white shadow-xl shadow-[#FF6B35]/40 scale-110'
                          : 'bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 text-gray-500'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={30} />
                      ) : (
                        <IconComponent size={30} />
                      )}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <span
                    className={`mt-4 text-sm text-center transition-colors ${
                      isActive || isCompleted ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step.title}
                  </span>
                  
                  {/* Step Number */}
                  <span
                    className={`mt-1 text-xs transition-colors ${
                      isActive 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]' 
                        : isCompleted 
                        ? 'text-[#28C76F]' 
                        : 'text-gray-600'
                    }`}
                  >
                    Étape {step.number}
                  </span>
                </div>

                {/* Line connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-6 -mt-16">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        currentStep > step.number 
                          ? 'bg-gradient-to-r from-[#28C76F] to-[#22B55E]' 
                          : 'bg-white/10'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: Compact */}
      <div className="md:hidden">
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                currentStep >= step.number 
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E]' 
                  : 'bg-white/10'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-400">
          Étape {currentStep} sur {steps.length} - <span className="text-white">{steps[currentStep - 1].title}</span>
        </p>
      </div>
    </div>
  );
}

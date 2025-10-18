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
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? 'bg-[#28C76F] text-white'
                        : isActive
                        ? 'bg-[#0077FF] text-white shadow-lg scale-110'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={28} />
                    ) : (
                      <IconComponent size={28} />
                    )}
                  </div>
                  
                  {/* Title */}
                  <span
                    className={`mt-3 text-sm text-center transition-colors ${
                      isActive || isCompleted ? 'text-[#1E1E1E]' : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Line connector */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 mx-4 -mt-10">
                    <div
                      className={`h-full transition-all duration-300 ${
                        currentStep > step.number ? 'bg-[#28C76F]' : 'bg-gray-200'
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
                currentStep >= step.number ? 'bg-[#0077FF]' : 'bg-gray-200'
              }`}
            ></div>
          ))}
        </div>
        <p className="text-center text-sm text-gray-600">
          Étape {currentStep} sur {steps.length} - {steps[currentStep - 1].title}
        </p>
      </div>
    </div>
  );
}

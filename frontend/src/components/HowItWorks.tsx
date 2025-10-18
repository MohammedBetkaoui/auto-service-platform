import { Search, MapPin, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Demandez un service',
    description: 'Choisissez le service dont vous avez besoin et remplissez un formulaire simple avec votre localisation.',
    step: '01',
  },
  {
    icon: MapPin,
    title: 'Nous vous envoyons un prestataire',
    description: 'Notre système trouve le prestataire le plus proche et disponible pour intervenir rapidement.',
    step: '02',
  },
  {
    icon: CheckCircle,
    title: 'Service effectué & paiement sécurisé',
    description: 'Le prestataire effectue le service sur place et vous payez de manière sécurisée via l\'application.',
    step: '03',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-[#0077FF]/10 text-[#0077FF] rounded-full px-4 py-2 mb-4">
            Processus simple
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1E1E1E] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Trois étapes simples pour obtenir votre service automobile
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#0077FF] via-[#0077FF] to-[#28C76F]" style={{ width: '75%', left: '12.5%' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#0077FF] to-[#28C76F] rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                        <IconComponent size={36} className="text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-white border-4 border-[#F5F7FA] rounded-full flex items-center justify-center z-20">
                        <span className="text-[#0077FF] text-sm">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-[#1E1E1E] text-xl md:text-2xl mb-3">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-6">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#0077FF] to-[#28C76F]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

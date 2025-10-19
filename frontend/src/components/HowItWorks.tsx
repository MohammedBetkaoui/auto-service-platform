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
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#28C76F]/5 via-transparent to-[#0077FF]/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-block bg-gradient-to-r from-[#0077FF]/20 to-[#28C76F]/20 backdrop-blur-md text-white rounded-full px-4 py-2 mb-4 border border-white/10">
            Processus simple
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-bold">
            Comment ça <span className="bg-gradient-to-r from-[#0077FF] to-[#28C76F] bg-clip-text text-transparent">marche</span> ?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Trois étapes simples pour obtenir votre service automobile
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#0077FF] via-[#28C76F] to-[#0077FF] opacity-50" style={{ width: '75%', left: '12.5%' }}></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Step Number */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#0077FF] to-[#28C76F] rounded-2xl flex items-center justify-center shadow-2xl relative z-10 border border-white/20">
                        <IconComponent size={36} className="text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#28C76F] to-[#0077FF] border-4 border-[#0F0F0F] rounded-full flex items-center justify-center z-20 shadow-lg">
                        <span className="text-white text-sm font-bold">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-white text-xl md:text-2xl mb-3 font-semibold">
                      {step.title}
                    </h3>

                    <p className="text-white/80 leading-relaxed max-w-xs">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-6">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#0077FF] to-[#28C76F] rounded-full"></div>
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

import { Search, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Sélectionnez votre service',
    description: 'Parcourez notre catalogue de services professionnels et choisissez celui adapté à vos besoins automobiles.',
    step: '01',
  },
  {
    icon: MapPin,
    title: 'Expert assigné instantanément',
    description: 'Notre système intelligent sélectionne le professionnel certifié le plus proche avec disponibilité immédiate.',
    step: '02',
  },
  {
    icon: CheckCircle,
    title: 'Intervention & Paiement',
    description: 'L\'expert intervient sur place avec équipement professionnel. Paiement sécurisé après validation du service.',
    step: '03',
  },
];

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-full px-5 py-2 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
              Processus optimisé
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Une expérience <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">simplifiée</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Un système intelligent qui connecte vos besoins automobiles aux meilleurs professionnels en quelques secondes
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-28 left-0 right-0 h-0.5">
            <div className="h-full bg-gradient-to-r from-transparent via-[#FF6B35]/30 to-transparent" style={{ width: '80%', margin: '0 auto' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Step Content */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      {/* Main Icon Container */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="relative w-24 h-24 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-white/10 group-hover:border-[#FF6B35]/50 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-xl flex items-center justify-center shadow-lg">
                            <IconComponent size={40} className="text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center shadow-lg shadow-[#FF6B35]/30 z-10 border-4 border-[#0A0A0A]">
                        <span className="text-white text-lg">{step.step}</span>
                      </div>
                    </div>

                    <h3 className="text-white text-xl md:text-2xl mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#F7931E] transition-all duration-300">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 leading-relaxed max-w-sm mb-6">
                      {step.description}
                    </p>

                    {/* Decorative Element */}
                    <div className="w-16 h-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  {/* Arrow for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-8">
                      <ArrowRight className="text-[#FF6B35] animate-pulse" size={32} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              &lt;15min
            </div>
            <div className="text-gray-500 text-sm">Temps de réponse</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              24/7
            </div>
            <div className="text-gray-500 text-sm">Support client</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              100%
            </div>
            <div className="text-gray-500 text-sm">Sécurisé</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              98%
            </div>
            <div className="text-gray-500 text-sm">Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
}

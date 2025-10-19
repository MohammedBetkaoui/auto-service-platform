import { Droplets, Wrench, TruckIcon, Sparkles, Battery, Fuel, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: Droplets,
    name: 'Lavage Premium',
    description: 'Lavage professionnel extérieur et intérieur avec produits haut de gamme. Service à domicile garanti.',
    color: '#FF6B35',
    gradient: 'from-[#FF6B35] to-[#F7931E]',
    link: 'service-lavage',
  },
  {
    icon: Wrench,
    name: 'Entretien Complet',
    description: 'Vidange, changement de filtres et maintenance préventive par des mécaniciens certifiés.',
    color: '#F7931E',
    gradient: 'from-[#F7931E] to-[#FFB84D]',
    link: 'service-entretien',
  },
  {
    icon: TruckIcon,
    name: 'Assistance Routière',
    description: 'Dépannage et remorquage d\'urgence 24/7. Intervention rapide partout en Algérie.',
    color: '#FF6B35',
    gradient: 'from-[#FF6B35] to-[#F7931E]',
    link: 'service-assistance',
  },
  {
    icon: Sparkles,
    name: 'Détailing Intérieur',
    description: 'Nettoyage approfondi et restauration complète de l\'habitacle avec équipements professionnels.',
    color: '#F7931E',
    gradient: 'from-[#F7931E] to-[#FFB84D]',
    link: 'service-detailing',
  },
  {
    icon: Battery,
    name: 'Batterie & Électrique',
    description: 'Diagnostic électrique, remplacement de batterie et réparation du système électronique.',
    color: '#FF6B35',
    gradient: 'from-[#FF6B35] to-[#F7931E]',
    link: 'service-batterie',
  },
  {
    icon: Fuel,
    name: 'Carburant Express',
    description: 'Livraison de carburant d\'urgence avec service de géolocalisation en temps réel.',
    color: '#F7931E',
    gradient: 'from-[#F7931E] to-[#FFB84D]',
    link: 'service-carburant',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-[#F7931E]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-full px-5 py-2 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
              Solutions professionnelles
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">sur mesure</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Des prestations automobiles de qualité professionnelle, réalisées par des experts certifiés, directement à votre emplacement
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* Hover Gradient Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg shadow-${service.color}/20 group-hover:shadow-xl group-hover:shadow-${service.color}/30 transition-all duration-300 group-hover:scale-110`}>
                    <IconComponent size={32} className="text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-white text-xl mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#F7931E] transition-all duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white p-0 group/btn"
                    onClick={() => window.location.hash = service.link}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                      En savoir plus
                    </span>
                    <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform text-[#FF6B35]" size={16} />
                  </Button>
                </div>

                {/* Bottom Accent Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-10 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all"
            onClick={() => window.location.hash = 'register'}
          >
            Réserver un service maintenant
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
}

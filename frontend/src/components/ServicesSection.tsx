import { Droplets, Wrench, TruckIcon, Sparkles, Battery, Fuel } from 'lucide-react';
import { Button } from './ui/button';

const services = [
  {
    icon: Droplets,
    name: 'Lavage auto à domicile',
    description: 'Lavage extérieur et intérieur complet de votre véhicule, directement chez vous.',
    color: '#0077FF',
  },
  {
    icon: Wrench,
    name: 'Vidange & entretien',
    description: 'Vidange d\'huile, changement de filtres et entretien préventif sans bouger de chez vous.',
    color: '#0077FF',
  },
  {
    icon: TruckIcon,
    name: 'Dépannage / Remorquage',
    description: 'Service de dépannage rapide et remorquage en cas de panne sur route.',
    color: '#0077FF',
  },
  {
    icon: Sparkles,
    name: 'Nettoyage intérieur',
    description: 'Nettoyage professionnel de l\'habitacle, sièges et tapis de votre voiture.',
    color: '#0077FF',
  },
  {
    icon: Battery,
    name: 'Recharge batterie',
    description: 'Intervention rapide pour recharger ou remplacer votre batterie à plat.',
    color: '#0077FF',
  },
  {
    icon: Fuel,
    name: 'Carburant d\'urgence',
    description: 'Livraison de carburant d\'urgence si vous êtes en panne sèche.',
    color: '#0077FF',
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0077FF]/5 via-transparent to-[#28C76F]/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0077FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#28C76F]/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-block bg-gradient-to-r from-[#0077FF]/20 to-[#28C76F]/20 backdrop-blur-md text-white rounded-full px-6 py-3 mb-6 animate-fade-in-scale shadow-lg border border-white/10">
            <span className="font-semibold">Nos services</span>
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 animate-fade-in-up delay-100 font-bold">
            Nos services à la <span className="bg-gradient-to-r from-[#0077FF] to-[#28C76F] bg-clip-text text-transparent">demande</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto animate-fade-in-up delay-200">
            Des services automobiles professionnels qui viennent directement à vous
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const delayClass = `delay-${(index + 3) * 100}`;
            return (
              <div
                key={index}
                className={`service-card-3d animate-rotate-in ${delayClass} group relative`}
              >
                <div className="card-inner bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 card-shadow hover:card-shadow border border-white/10 transition-all duration-500 h-full">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-float bg-gradient-to-br from-[#0077FF]/20 to-[#28C76F]/20 border border-white/20"
                  >
                    <IconComponent size={32} style={{ color: '#28C76F' }} className="drop-shadow-sm" />
                  </div>
                  
                  <h3 className="text-white text-xl md:text-2xl mb-4 font-semibold group-hover:text-[#28C76F] transition-colors duration-300">
                    {service.name}
                  </h3>
                  
                  <p className="text-white/80 mb-8 leading-relaxed text-base">
                    {service.description}
                  </p>
                  
                  <Button
                    variant="ghost"
                    className="text-[#28C76F] hover:text-white hover:bg-gradient-to-r hover:from-[#0077FF]/20 hover:to-[#28C76F]/20 p-3 rounded-xl transition-all duration-300 group-hover:translate-x-2 transform border border-white/10"
                  >
                    <span className="font-medium">Commander</span>
                    <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

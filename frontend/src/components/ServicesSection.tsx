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
    <section id="services" className="py-16 md:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block bg-[#0077FF]/10 text-[#0077FF] rounded-full px-4 py-2 mb-4">
            Nos services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#1E1E1E] mb-4">
            Nos services à la demande
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des services automobiles professionnels qui viennent directement à vous
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <IconComponent size={28} style={{ color: service.color }} />
                </div>
                
                <h3 className="text-[#1E1E1E] text-xl mb-3">{service.name}</h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <Button
                  variant="ghost"
                  className="text-[#0077FF] hover:text-[#0066DD] hover:bg-[#0077FF]/5 p-0"
                >
                  Commander →
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

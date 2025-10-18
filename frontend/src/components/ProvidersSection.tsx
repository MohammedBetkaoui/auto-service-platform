import { TrendingUp, DollarSign, Clock, Users } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const benefits = [
  {
    icon: DollarSign,
    title: 'Revenus attractifs',
    description: 'Gagnez selon votre disponibilité',
  },
  {
    icon: Clock,
    title: 'Flexibilité totale',
    description: 'Choisissez vos horaires',
  },
  {
    icon: Users,
    title: 'Clientèle garantie',
    description: 'Accédez à une large base de clients',
  },
  {
    icon: TrendingUp,
    title: 'Croissance assurée',
    description: 'Développez votre activité',
  },
];

export function ProvidersSection() {
  return (
    <section id="prestataires" className="py-16 md:py-24 bg-gradient-to-br from-[#0077FF] to-[#0055CC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block bg-white/20 text-white rounded-full px-4 py-2 mb-6">
              Devenez partenaire
            </div>
            
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-6">
              Vous avez un véhicule de service ?
            </h2>
            
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Rejoignez notre réseau de prestataires et gagnez de l'argent avec votre camion ou véhicule utilitaire. 
              AutoServe DZ vous connecte avec des milliers de clients qui ont besoin de vos services.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <IconComponent size={24} className="text-[#28C76F] mb-2" />
                    <h4 className="text-white mb-1">{benefit.title}</h4>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-white text-[#0077FF] hover:bg-gray-100 rounded-full px-8 text-lg shadow-lg"
              >
                Devenir prestataire
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-8 text-lg"
              >
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#28C76F] to-[#0077FF] rounded-3xl blur-2xl opacity-30"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1725471306802-9ef7ede6aff8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2aWNlJTIwdmFuJTIwYnVzaW5lc3N8ZW58MXx8fHwxNzYwODAyMDI5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Véhicule de service professionnel"
                className="relative rounded-3xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

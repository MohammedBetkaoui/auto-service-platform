import { Smartphone, Bell, MapPin, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: Bell,
    title: 'Notifications en temps réel',
    description: 'Suivez l\'arrivée de votre prestataire',
  },
  {
    icon: MapPin,
    title: 'Géolocalisation précise',
    description: 'Trouvez les services les plus proches',
  },
  {
    icon: CreditCard,
    title: 'Paiement sécurisé',
    description: 'Payez en toute sécurité dans l\'app',
  },
];

export function AppSection() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative max-w-md mx-auto">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#0077FF]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#28C76F]/10 rounded-full blur-3xl"></div>
              
              {/* Phone mockup */}
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-[3rem] p-2 shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9ja3VwJTIwYXBwfGVufDF8fHx8MTc2MDgwMjAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Application mobile AutoServe DZ"
                    className="rounded-[2.5rem] w-full h-[600px] object-cover"
                  />
                </div>
              </div>

              {/* Floating element */}
              <div className="absolute -right-4 top-20 bg-white rounded-2xl shadow-xl p-4 hidden lg:block animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#28C76F]/20 rounded-xl flex items-center justify-center">
                    <Smartphone className="text-[#28C76F]" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Disponible</div>
                    <div className="text-[#1E1E1E]">Bientôt</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-block bg-[#0077FF]/10 text-[#0077FF] rounded-full px-4 py-2 mb-6">
              Application mobile
            </div>
            
            <h2 className="text-[#1E1E1E] text-3xl md:text-4xl lg:text-5xl mb-6">
              Bientôt disponible sur mobile !
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Téléchargez notre application mobile pour accéder à tous nos services automobiles en un clic. 
              Une expérience optimisée pour commander vos services où que vous soyez.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0077FF]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-[#0077FF]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[#1E1E1E] mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 text-white rounded-xl px-6"
                disabled
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                App Store
              </Button>
              
              <Button 
                size="lg"
                className="bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 text-white rounded-xl px-6"
                disabled
              >
                <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Google Play
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              * Application en cours de développement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

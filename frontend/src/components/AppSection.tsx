import { Smartphone, Bell, MapPin, CreditCard, Shield, Zap, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: Zap,
    title: 'Réservation instantanée',
    description: 'Commandez un service en moins de 60 secondes',
  },
  {
    icon: MapPin,
    title: 'Suivi en temps réel',
    description: 'Géolocalisation et ETA précis du professionnel',
  },
  {
    icon: Shield,
    title: 'Paiement sécurisé',
    description: 'Transactions cryptées et garantie satisfaction',
  },
];

export function AppSection() {
  return (
    <section className="py-20 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      {/* Gradient Accents */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Phone Mockup */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative max-w-md mx-auto">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-[#F7931E]/20 to-transparent rounded-full blur-3xl"></div>
              
              {/* Phone mockup */}
              <div className="relative z-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-[3rem] blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-[3rem] p-3 border border-white/10 shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9ja3VwJTIwYXBwfGVufDF8fHx8MTc2MDgwMjAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Application mobile AutoServe DZ"
                    className="rounded-[2.5rem] w-full h-[650px] object-cover"
                  />
                </div>
              </div>

              {/* Floating Status Card */}
              <div className="absolute -right-6 top-24 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl hidden lg:block animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-xl flex items-center justify-center">
                    <Smartphone className="text-white" size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Lancement prévu</div>
                    <div className="text-white text-lg">T1 2026</div>
                  </div>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="absolute -left-6 bottom-32 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-2xl p-4 shadow-2xl shadow-[#FF6B35]/30 hidden lg:block">
                <QrCode className="text-white" size={64} />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-full px-5 py-2 mb-8">
              <Smartphone size={16} className="text-[#FF6B35]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                Application mobile premium
              </span>
            </div>
            
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              L'excellence automobile <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">dans votre poche</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
              Une interface intuitive pensée pour les professionnels exigeants. Réservation instantanée, suivi en temps réel et gestion simplifiée de tous vos services automobiles.
            </p>

            {/* Features */}
            <div className="space-y-5 mb-10">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="group flex items-start gap-5 bg-gradient-to-r from-[#1a1a1a] to-transparent border border-white/5 hover:border-[#FF6B35]/20 rounded-xl p-5 transition-all duration-300">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <IconComponent className="text-[#FF6B35]" size={28} />
                    </div>
                    <div>
                      <h4 className="text-white text-lg mb-2">{feature.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Store Buttons */}
            <div className="space-y-4">
              <p className="text-gray-400 text-sm mb-4">Bientôt disponible sur :</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-white/20 text-white rounded-xl px-8 group transition-all"
                  disabled
                >
                  <svg className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Télécharger sur</div>
                    <div className="text-base">App Store</div>
                  </div>
                </Button>
                
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-white/20 text-white rounded-xl px-8 group transition-all"
                  disabled
                >
                  <svg className="w-7 h-7 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Disponible sur</div>
                    <div className="text-base">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F7931E] border-2 border-[#0F0F0F] flex items-center justify-center text-white text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Rejoignez <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">2,500+</span> utilisateurs en liste d'attente
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

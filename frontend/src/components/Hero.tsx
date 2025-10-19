import { MapPin, ArrowRight, Play, Shield, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center pt-20 bg-[#0A0A0A]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F7931E]/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 backdrop-blur-sm border border-[#FF6B35]/20 rounded-full px-5 py-2.5 mb-8">
              <Shield size={16} className="text-[#FF6B35]" />
              <span className="text-white text-sm">Service certifié et sécurisé</span>
            </div>

            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
              Services auto <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">premium</span> à domicile
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
              Confiez l'entretien de votre véhicule à des professionnels certifiés. Intervention rapide, qualité garantie, partout en Algérie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-8 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all group"
                onClick={() => window.location.hash = 'register'}
              >
                Réserver un service
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/5 rounded-xl px-8 text-lg backdrop-blur-sm group"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="mr-2" size={20} />
                Voir la démo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <Shield size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-white text-xl mb-1">500+</div>
                  <div className="text-gray-500 text-sm">Experts certifiés</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-white text-xl mb-1">24/7</div>
                  <div className="text-gray-500 text-sm">Disponibilité</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 flex items-center justify-center flex-shrink-0">
                  <Award size={20} className="text-[#FF6B35]" />
                </div>
                <div>
                  <div className="text-white text-xl mb-1">4.9/5</div>
                  <div className="text-gray-500 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-3xl blur-xl opacity-30"></div>
              
              {/* Main Image Container */}
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl p-2 border border-white/10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjBzZXJ2aWNlJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDgwMjAyOHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Service automobile professionnel"
                  className="w-full h-[500px] object-cover rounded-2xl"
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#1a1a1a]/90 to-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                    <Award size={28} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white text-2xl mb-1">15,000+</div>
                    <div className="text-gray-400 text-sm">Services réalisés</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-2xl p-4 shadow-2xl shadow-[#FF6B35]/30 rotate-3">
                <div className="text-white text-center">
                  <div className="text-2xl mb-1">⭐ 4.9</div>
                  <div className="text-white/90 text-xs">Note moyenne</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#0F0F0F"/>
        </svg>
      </div>
    </section>
  );
}

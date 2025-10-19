import { MapPin, Search } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center pt-16 md:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1743865433868-03d1053822b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB3YXNoaW5nJTIwc2VydmljZSUyMG1vYmlsZXxlbnwxfHx8fDE3NjA4MDIwMjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Service automobile à domicile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/90 via-[#1A1A1A]/80 to-[#0077FF]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/50 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0077FF]/20 to-[#28C76F]/20 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in-left shadow-lg">
            <MapPin size={16} className="text-[#28C76F]" />
            <span className="text-white text-sm font-medium">Services disponibles partout en Algérie</span>
          </div>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 animate-fade-in-up delay-100 font-bold leading-tight">
            Vos services auto, <span className="bg-gradient-to-r from-[#0077FF] to-[#28C76F] bg-clip-text text-transparent">où que vous soyez</span> 🚗
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed animate-fade-in-up delay-200 max-w-3xl">
            Demandez un lavage, une vidange ou une assistance en un clic, nous venons à vous.
            <span className="text-[#28C76F] font-semibold"> Service professionnel, paiement sécurisé.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in delay-300">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#0077FF] to-[#0055CC] hover:from-[#0066DD] hover:to-[#004499] text-white rounded-full px-8 text-lg shadow-2xl hover:shadow-[#0077FF]/25 transition-all hover:scale-105 transform border border-white/20"
              onClick={() => window.location.hash = 'register'}
            >
              <Search className="mr-2" size={20} />
              Commander un service maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 rounded-full px-8 text-lg hover:scale-105 transform transition-all shadow-xl"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              En savoir plus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-white/20 animate-fade-in-up delay-500">
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1 font-bold">500+</div>
              <div className="text-white/80 text-sm">Prestataires</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1 font-bold">5000+</div>
              <div className="text-white/80 text-sm">Services effectués</div>
            </div>
            <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1 font-bold">4.8★</div>
              <div className="text-white/80 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

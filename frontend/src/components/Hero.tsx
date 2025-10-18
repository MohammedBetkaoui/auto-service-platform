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
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E1E1E]/80 via-[#1E1E1E]/60 to-[#0077FF]/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <MapPin size={16} className="text-[#28C76F]" />
            <span className="text-white text-sm">Services disponibles partout en Algérie</span>
          </div>

          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            Vos services auto, où que vous soyez 🚗
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-8 leading-relaxed">
            Demandez un lavage, une vidange ou une assistance en un clic, nous venons à vous.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg"
              className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full px-8 text-lg shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.location.hash = 'register'}
            >
              <Search className="mr-2" size={20} />
              Commander un service maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 rounded-full px-8 text-lg"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              En savoir plus
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-8 pt-8 border-t border-white/20">
            <div>
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1">500+</div>
              <div className="text-white/80 text-sm">Prestataires</div>
            </div>
            <div>
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1">5000+</div>
              <div className="text-white/80 text-sm">Services effectués</div>
            </div>
            <div>
              <div className="text-[#28C76F] text-2xl md:text-3xl mb-1">4.8★</div>
              <div className="text-white/80 text-sm">Note moyenne</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

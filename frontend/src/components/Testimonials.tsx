import { Star, Quote, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Karim Benali',
    role: 'Directeur Commercial',
    location: 'Alger',
    rating: 5,
    comment: 'Un service d\'excellence qui répond parfaitement aux exigences professionnelles. L\'intervention a été rapide, efficace et le résultat impeccable. AutoServe DZ a révolutionné notre gestion automobile.',
    avatar: 'https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3ODU0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'KB',
  },
  {
    name: 'Amina Larbi',
    role: 'Entrepreneuse',
    location: 'Oran',
    rating: 5,
    comment: 'La qualité du service et le professionnalisme des techniciens sont exceptionnels. Maintenance préventive réalisée dans les règles de l\'art. Une solution que je recommande sans hésitation.',
    avatar: '',
    initials: 'AL',
  },
  {
    name: 'Yacine Meziani',
    role: 'Chef d\'Entreprise',
    location: 'Constantine',
    rating: 5,
    comment: 'Intervention d\'urgence exemplaire. Équipe réactive, compétente et équipée de matériel professionnel. Le suivi client et la transparence des tarifs sont des atouts majeurs.',
    avatar: '',
    initials: 'YM',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section id="temoignages" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      {/* Gradient Accent */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-full px-5 py-2 mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
              Témoignages clients
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Ils nous font <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">confiance</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Découvrez les retours d'expérience de nos clients professionnels à travers toute l'Algérie
          </p>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Testimonials Carousel - Mobile */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[currentIndex]} index={currentIndex} />
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] w-8' 
                    : 'bg-gray-700 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/10">
          <div className="text-center">
            <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              4.9/5
            </div>
            <div className="text-gray-500 text-sm">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              15K+
            </div>
            <div className="text-gray-500 text-sm">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              98%
            </div>
            <div className="text-gray-500 text-sm">Recommandations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E] mb-2">
              500+
            </div>
            <div className="text-gray-500 text-sm">Avis 5 étoiles</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <div className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#FF6B35]/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 to-[#F7931E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Quote Icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Quote size={64} className="text-[#FF6B35]" />
      </div>
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full blur-md opacity-30"></div>
              <Avatar className="relative w-14 h-14 border-2 border-white/10">
                <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white">
                  {testimonial.initials}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div>
              <h4 className="text-white mb-1">{testimonial.name}</h4>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
              <p className="text-gray-600 text-xs">{testimonial.location}</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-6">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={18} className="fill-[#FF6B35] text-[#FF6B35]" />
          ))}
        </div>

        {/* Comment */}
        <p className="text-gray-400 leading-relaxed mb-4">
          "{testimonial.comment}"
        </p>

        {/* Bottom Accent */}
        <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-[#FF6B35] transition-colors">
          <span>Lire le témoignage complet</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Decorative Number */}
      <div className="absolute bottom-4 right-6 text-6xl font-bold text-white/5 group-hover:text-[#FF6B35]/10 transition-colors">
        {(index + 1).toString().padStart(2, '0')}
      </div>
    </div>
  );
}

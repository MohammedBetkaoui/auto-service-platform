import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Karim Benali',
    location: 'Alger',
    rating: 5,
    comment: 'Service impeccable ! Le lavage a été fait directement devant mon bureau. Gain de temps énorme et qualité professionnelle.',
    avatar: 'https://images.unsplash.com/photo-1570170609489-43197f518df0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjA3ODU0MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    initials: 'KB',
  },
  {
    name: 'Amina Larbi',
    location: 'Oran',
    rating: 5,
    comment: 'Très satisfaite du service de vidange à domicile. Le technicien était professionnel et m\'a tout expliqué. Je recommande !',
    avatar: '',
    initials: 'AL',
  },
  {
    name: 'Yacine Meziani',
    location: 'Constantine',
    rating: 5,
    comment: 'J\'ai eu une panne de batterie en pleine nuit. Ils sont venus en moins de 30 minutes ! Service rapide et efficace.',
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
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0077FF]/5 via-transparent to-[#28C76F]/5"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0077FF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#28C76F]/10 rounded-full blur-3xl"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 relative z-10">
          <div className="inline-block bg-gradient-to-r from-[#0077FF]/20 to-[#28C76F]/20 backdrop-blur-md text-white rounded-full px-4 py-2 mb-4 border border-white/10">
            Témoignages
          </div>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 font-bold">
            Ce que disent nos <span className="bg-gradient-to-r from-[#0077FF] to-[#28C76F] bg-clip-text text-transparent">clients</span>
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Des milliers de clients satisfaits à travers toute l'Algérie
          </p>
        </div>

        {/* Testimonials Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Testimonials Carousel - Mobile */}
        <div className="md:hidden">
          <TestimonialCard testimonial={testimonials[currentIndex]} />
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#28C76F] w-8 shadow-lg shadow-[#28C76F]/50' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-[#0077FF]/20 transition-all duration-300 relative border border-white/10 hover:border-white/20">
      <Quote className="absolute top-6 right-6 text-[#0077FF]/20" size={48} />
      
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-14 h-14 border-2 border-[#0077FF]/30">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback className="bg-gradient-to-br from-[#0077FF] to-[#28C76F] text-white">
            {testimonial.initials}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <h4 className="text-white font-semibold">{testimonial.name}</h4>
          <p className="text-white/60 text-sm">{testimonial.location}</p>
        </div>
      </div>

      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={16} className="fill-[#28C76F] text-[#28C76F]" />
        ))}
      </div>

      <p className="text-white/80 leading-relaxed">
        "{testimonial.comment}"
      </p>
    </div>
  );
}

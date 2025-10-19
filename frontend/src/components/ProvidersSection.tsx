import { TrendingUp, DollarSign, Clock, Users, Shield, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

const benefits = [
  {
    icon: DollarSign,
    title: 'Revenus optimisés',
    description: 'Tarification compétitive avec paiements garantis',
  },
  {
    icon: Clock,
    title: 'Flexibilité maximale',
    description: 'Gérez votre planning en toute autonomie',
  },
  {
    icon: Users,
    title: 'Clientèle qualifiée',
    description: 'Accès à une base clients premium vérifiée',
  },
  {
    icon: TrendingUp,
    title: 'Croissance garantie',
    description: 'Développement business avec support dédié',
  },
];

export function ProvidersSection() {
  return (
    <section id="prestataires" className="py-20 md:py-32 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border border-[#FF6B35]/20 rounded-full px-5 py-2 mb-8">
              <Shield size={16} className="text-[#FF6B35]" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                Programme Partenaire Premium
              </span>
            </div>
            
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Développez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">activité</span> avec nous
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed">
              Rejoignez le réseau de professionnels certifiés AutoServe DZ. Accédez à des milliers de clients, optimisez vos revenus et bénéficiez d'un accompagnement personnalisé.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/5 hover:border-[#FF6B35]/30 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <IconComponent size={24} className="text-[#FF6B35]" />
                    </div>
                    <h4 className="text-white mb-2">{benefit.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Additional Benefits List */}
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 mb-8">
              <h4 className="text-white text-lg mb-4">Avantages exclusifs :</h4>
              <div className="space-y-3">
                {['Formation et certification gratuites', 'Assurance professionnelle incluse', 'Application mobile dédiée', 'Support technique 24/7'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-[#FF6B35] flex-shrink-0" />
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-8 text-lg shadow-xl shadow-[#FF6B35]/30 hover:shadow-2xl hover:shadow-[#FF6B35]/40 transition-all group"
                onClick={() => window.location.hash = 'register'}
              >
                Devenir partenaire
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/5 rounded-xl px-8 text-lg backdrop-blur-sm"
              >
                Télécharger la brochure
              </Button>
            </div>
          </div>

          {/* Right: Image with Stats */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Main Image */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] rounded-3xl blur-xl opacity-30"></div>
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl p-2 border border-white/10">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzZXJ2aWNlJTIwdmFufGVufDF8fHx8MTc2MDgwMjAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Partenaire professionnel AutoServe DZ"
                    className="rounded-2xl w-full h-[450px] object-cover"
                  />
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#1a1a1a]/95 to-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                    <DollarSign size={28} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white text-2xl mb-1">+45%</div>
                    <div className="text-gray-400 text-sm">Revenus moyens</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-2xl p-5 shadow-2xl shadow-[#FF6B35]/30 rotate-3">
                <div className="text-white text-center">
                  <div className="text-3xl mb-1">500+</div>
                  <div className="text-white/90 text-sm">Partenaires actifs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowLeft, Check, Clock, MapPin, Star, ArrowRight, Battery, Zap, Shield, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { motion } from 'motion/react';

export function BatterieService() {
  const features = [
    { icon: Zap, title: 'Diagnostic électrique', description: 'Test complet du système électrique et de charge' },
    { icon: Battery, title: 'Remplacement rapide', description: 'Installation de batterie neuve en 30 minutes' },
    { icon: Shield, title: 'Batteries premium', description: 'Marques reconnues avec garantie constructeur' },
    { icon: AlertCircle, title: 'Conseil personnalisé', description: 'Choix de la batterie adaptée à votre véhicule' },
  ];

  const pricing = [
    {
      name: 'Diagnostic',
      price: '1,500 DZD',
      features: ['Test batterie', 'Test alternateur', 'Test démarreur', 'Rapport détaillé'],
      popular: false,
    },
    {
      name: 'Remplacement Standard',
      price: '8,500 DZD',
      features: ['Diagnostic complet', 'Batterie 12V standard', 'Installation professionnelle', 'Recyclage ancienne batterie', 'Garantie 1 an'],
      popular: true,
    },
    {
      name: 'Batterie Premium',
      price: '14,500 DZD',
      features: ['Tout du pack Standard', 'Batterie AGM/EFB premium', 'Garantie 2 ans', 'Nettoyage bornes', 'Protection anti-corrosion', 'Suivi après-vente'],
      popular: false,
    },
  ];

  const process = [
    { step: '01', title: 'Test diagnostic', description: 'Analyse complète de la batterie et du système électrique' },
    { step: '02', title: 'Choix batterie', description: 'Recommandation selon votre véhicule et utilisation' },
    { step: '03', title: 'Installation', description: 'Remplacement professionnel et recyclage de l\'ancienne' },
    { step: '04', title: 'Vérification', description: 'Test final et remise du certificat de garantie' },
  ];

  const faqs = [
    { q: 'Comment savoir si ma batterie est à changer ?', a: 'Signes courants : démarrage difficile, lumières faibles, batterie de plus de 3-4 ans, corrosion visible. Notre diagnostic gratuit vous le dira.' },
    { q: 'Quelle est la durée de vie d\'une batterie ?', a: 'En moyenne 3 à 5 ans selon l\'utilisation et les conditions climatiques. Les batteries premium peuvent durer jusqu\'à 7 ans.' },
    { q: 'Proposez-vous des batteries pour tous les véhicules ?', a: 'Oui, nous avons des batteries pour voitures, SUV, 4x4, utilitaires et motos de toutes marques.' },
    { q: 'Que faites-vous de mon ancienne batterie ?', a: 'Nous la recyclons gratuitement dans un centre agréé. C\'est obligatoire et inclus dans le service.' },
    { q: 'La garantie couvre quoi exactement ?', a: 'La garantie couvre les défauts de fabrication et la performance. Selon la batterie, c\'est 1 à 2 ans de remplacement gratuit.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <Button
            variant="ghost"
            onClick={() => window.location.hash = ''}
            className="mb-8 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour aux services
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10 border-[#FF6B35]/20 text-[#FF6B35]">
                Service Électrique Expert
              </Badge>
              
              <h1 className="text-5xl md:text-6xl text-white mb-6">
                Batterie & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">Électrique</span>
              </h1>
              
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Diagnostic électrique complet, remplacement de batterie et réparation du système électronique à domicile.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Clock size={20} className="text-[#FF6B35]" />
                  <span className="text-white">30-45 min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <MapPin size={20} className="text-[#FF6B35]" />
                  <span className="text-white">À domicile</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Star size={20} className="text-[#FF6B35]" />
                  <span className="text-white">4.9/5 (2,187 avis)</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl shadow-lg shadow-[#FF6B35]/30"
                  onClick={() => window.location.hash = 'register'}
                >
                  Réserver maintenant
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-[#FF6B35]/20 to-[#F7931E]/20 rounded-2xl flex items-center justify-center">
                  <Battery size={120} className="text-white opacity-20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">services</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35]/30 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F0F0F] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">Tarifs</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border ${
                  plan.popular ? 'border-[#FF6B35]/50' : 'border-white/10'
                } rounded-2xl p-8 ${plan.popular ? 'transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white border-none">
                      Le plus populaire
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">
                    {plan.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-[#28C76F] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-xl ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                  onClick={() => window.location.hash = 'register'}
                >
                  Choisir cette option
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">fonctionne</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-2xl mb-4 text-white text-2xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#FF6B35]/50 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">fréquentes</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-xl px-6 data-[state=open]:border-[#FF6B35]/30"
              >
                <AccordionTrigger className="text-white hover:text-[#FF6B35] text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Problème de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">batterie</span> ?
          </h2>
          <p className="text-gray-400 text-xl mb-8">
            Réservez un diagnostic gratuit et repartez avec une batterie neuve en moins d'une heure
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-12 text-lg shadow-xl shadow-[#FF6B35]/30"
            onClick={() => window.location.hash = 'register'}
          >
            Réserver maintenant
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}

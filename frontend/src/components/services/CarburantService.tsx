import { ArrowLeft, Check, Clock, MapPin, Star, ArrowRight, Fuel, Zap, Shield, Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { motion } from 'motion/react';

export function CarburantService() {
  const features = [
    { icon: Zap, title: 'Livraison ultra-rapide', description: 'Arrivée en moins de 30 minutes avec carburant' },
    { icon: Navigation, title: 'Géolocalisation précise', description: 'Nous vous trouvons où que vous soyez' },
    { icon: Fuel, title: 'Carburant certifié', description: 'Essence ou diesel de qualité premium' },
    { icon: Shield, title: 'Service sécurisé', description: 'Transport et livraison en toute sécurité' },
  ];

  const pricing = [
    {
      name: 'Dépannage 5L',
      price: '2,500 DZD',
      features: ['5 litres de carburant', 'Livraison express', 'Géolocalisation GPS', 'Disponible 24/7'],
      popular: false,
    },
    {
      name: 'Livraison 10L',
      price: '4,000 DZD',
      features: ['10 litres de carburant', 'Livraison express', 'Géolocalisation GPS', 'Disponible 24/7', 'Service prioritaire'],
      popular: true,
    },
    {
      name: 'Plein Complet',
      price: '8,500 DZD',
      features: ['Remplissage complet (jusqu\'à 50L)', 'Livraison express', 'Géolocalisation GPS', 'Disponible 24/7', 'Service VIP', 'Vérification niveaux offerte'],
      popular: false,
    },
  ];

  const process = [
    { step: '01', title: 'Commande urgente', description: 'Via l\'app ou téléphone avec votre position GPS' },
    { step: '02', title: 'Confirmation rapide', description: 'Validation de votre commande et temps d\'arrivée estimé' },
    { step: '03', title: 'Livraison express', description: 'Notre équipe arrive avec le carburant en moins de 30 min' },
    { step: '04', title: 'Remplissage sécurisé', description: 'Remplissage professionnel et paiement facile' },
  ];

  const faqs = [
    { q: 'Quel type de carburant livrez-vous ?', a: 'Nous livrons de l\'essence sans plomb (95 et 98) et du diesel de qualité, provenant de stations service agréées.' },
    { q: 'Combien de temps faut-il pour recevoir le carburant ?', a: 'Notre temps de livraison moyen est de 20-30 minutes selon votre localisation, 24h/24 et 7j/7.' },
    { q: 'Comment payez-vous le carburant livré ?', a: 'Vous pouvez payer en espèces, par carte bancaire ou via l\'application mobile lors de la livraison.' },
    { q: 'Y a-t-il une quantité minimum ou maximum ?', a: 'Nous livrons de 5 litres minimum jusqu\'à un plein complet (généralement 50-60 litres selon le véhicule).' },
    { q: 'Le service est-il disponible partout ?', a: 'Oui, nous intervenons dans toutes les zones urbaines et périurbaines des grandes villes d\'Algérie. En zones rurales, contactez-nous pour vérifier la disponibilité.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#F7931E]/20 to-transparent rounded-full blur-3xl"></div>

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
              <Badge className="mb-4 bg-gradient-to-r from-[#F7931E]/10 to-[#FFB84D]/10 border-[#F7931E]/20 text-[#F7931E]">
                Service Express 24/7
              </Badge>
              
              <h1 className="text-5xl md:text-6xl text-white mb-6">
                Carburant <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">Express</span>
              </h1>
              
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Livraison de carburant d'urgence avec géolocalisation en temps réel. Ne restez plus jamais en panne sèche !
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Clock size={20} className="text-[#F7931E]" />
                  <span className="text-white">20-30 min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <MapPin size={20} className="text-[#F7931E]" />
                  <span className="text-white">Partout en Algérie</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Star size={20} className="text-[#F7931E]" />
                  <span className="text-white">4.8/5 (1,672 avis)</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white rounded-xl shadow-lg shadow-[#F7931E]/30"
                  onClick={() => window.location.hash = 'register'}
                >
                  Commander maintenant
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
                <div className="aspect-video bg-gradient-to-br from-[#F7931E]/20 to-[#FFB84D]/20 rounded-2xl flex items-center justify-center">
                  <Fuel size={120} className="text-white opacity-20" />
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
              Pourquoi nous <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">choisir</span>
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
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-6 hover:border-[#F7931E]/30 transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#F7931E] to-[#FFB84D] rounded-xl flex items-center justify-center mb-4">
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
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">Offres</span>
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
                  plan.popular ? 'border-[#F7931E]/50' : 'border-white/10'
                } rounded-2xl p-8 ${plan.popular ? 'transform scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-[#F7931E] to-[#FFB84D] text-white border-none">
                      Le plus commandé
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm ml-2">+ prix carburant</span>
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
                      ? 'bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                  onClick={() => window.location.hash = 'register'}
                >
                  Commander
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
              Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">fonctionne</span>
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
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#F7931E] to-[#FFB84D] rounded-2xl mb-4 text-white text-2xl shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-white text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#F7931E]/50 to-transparent"></div>
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
              Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">fréquentes</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-xl px-6 data-[state=open]:border-[#F7931E]/30"
              >
                <AccordionTrigger className="text-white hover:text-[#F7931E] text-left">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7931E]/10 to-[#FFB84D]/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            En panne de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">carburant</span> ?
          </h2>
          <p className="text-gray-400 text-xl mb-8">
            Commandez maintenant et recevez votre carburant en moins de 30 minutes !
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white rounded-xl px-12 text-lg shadow-xl shadow-[#F7931E]/30"
            onClick={() => window.location.hash = 'register'}
          >
            Commander maintenant
            <ArrowRight size={20} className="ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}

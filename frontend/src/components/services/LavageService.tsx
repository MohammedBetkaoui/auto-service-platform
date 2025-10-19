import { ArrowLeft, Check, Clock, MapPin, Shield, Star, ArrowRight, Droplets, Sparkles, Wind } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { motion } from 'motion/react';

export function LavageService() {
  const features = [
    { icon: Droplets, title: 'Lavage extérieur complet', description: 'Nettoyage haute pression de la carrosserie et des jantes' },
    { icon: Sparkles, title: 'Nettoyage intérieur', description: 'Aspiration et nettoyage complet de l\'habitacle' },
    { icon: Wind, title: 'Séchage professionnel', description: 'Séchage sans traces avec équipement premium' },
    { icon: Shield, title: 'Protection carrosserie', description: 'Application de cire protectrice longue durée' },
  ];

  const pricing = [
    {
      name: 'Lavage Express',
      price: '1,500 DZD',
      features: ['Lavage extérieur', 'Rinçage haute pression', 'Séchage', 'Nettoyage jantes'],
      popular: false,
    },
    {
      name: 'Lavage Premium',
      price: '3,500 DZD',
      features: ['Tout du pack Express', 'Nettoyage intérieur complet', 'Aspiration profonde', 'Lustrage carrosserie', 'Protection vitres'],
      popular: true,
    },
    {
      name: 'Lavage Prestige',
      price: '5,500 DZD',
      features: ['Tout du pack Premium', 'Cirage complet', 'Nettoyage moteur', 'Polish carrosserie', 'Traitement cuir', 'Désodorisation'],
      popular: false,
    },
  ];

  const process = [
    { step: '01', title: 'Réservation', description: 'Choisissez votre formule et prenez rendez-vous en ligne' },
    { step: '02', title: 'Arrivée du professionnel', description: 'Notre équipe arrive à l\'heure avec tout l\'équipement nécessaire' },
    { step: '03', title: 'Lavage complet', description: 'Service professionnel selon la formule choisie' },
    { step: '04', title: 'Contrôle qualité', description: 'Vérification finale et validation de votre satisfaction' },
  ];

  const faqs = [
    { q: 'Combien de temps prend un lavage premium ?', a: 'Un lavage premium complet prend environ 45 à 60 minutes selon l\'état du véhicule.' },
    { q: 'Dois-je fournir l\'eau et l\'électricité ?', a: 'Non, nos équipes mobiles arrivent avec leur propre eau et équipement autonome.' },
    { q: 'Quels produits utilisez-vous ?', a: 'Nous utilisons uniquement des produits professionnels haut de gamme, biodégradables et respectueux de l\'environnement.' },
    { q: 'Puis-je annuler ou modifier mon rendez-vous ?', a: 'Oui, vous pouvez modifier ou annuler gratuitement jusqu\'à 2 heures avant le rendez-vous.' },
    { q: 'Le service est-il disponible partout en Algérie ?', a: 'Nous couvrons actuellement Alger, Oran, Constantine, Annaba et Blida. D\'autres villes seront bientôt disponibles.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#FF6B35]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#F7931E]/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          {/* Back Button */}
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
                Service Premium
              </Badge>
              
              <h1 className="text-5xl md:text-6xl text-white mb-6">
                Lavage <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">Premium</span>
              </h1>
              
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Profitez d'un service de lavage professionnel à domicile avec des produits haut de gamme et un équipement de pointe.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Clock size={20} className="text-[#FF6B35]" />
                  <span className="text-white">45-60 min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <MapPin size={20} className="text-[#FF6B35]" />
                  <span className="text-white">À domicile</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Star size={20} className="text-[#FF6B35]" />
                  <span className="text-white">4.9/5 (2,453 avis)</span>
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
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/5 rounded-xl"
                >
                  Voir les tarifs
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
                  <Droplets size={120} className="text-white opacity-20" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Ce qui est <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">inclus</span>
            </h2>
            <p className="text-gray-400 text-lg">Un service complet pour une voiture impeccable</p>
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

      {/* Pricing Section */}
      <section className="py-20 bg-[#0F0F0F] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">Formules</span>
            </h2>
            <p className="text-gray-400 text-lg">Choisissez la formule adaptée à vos besoins</p>
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
                  Choisir cette formule
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">fonctionne</span>
            </h2>
            <p className="text-gray-400 text-lg">Un processus simple et rapide en 4 étapes</p>
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

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 to-[#F7931E]/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Prêt à faire <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">briller</span> votre voiture ?
          </h2>
          <p className="text-gray-400 text-xl mb-8">
            Réservez votre lavage premium dès maintenant et profitez d'un service professionnel à domicile
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

import { ArrowLeft, Check, Clock, MapPin, Shield, Star, ArrowRight, Wrench, Filter, Droplets as Oil, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { motion } from 'motion/react';

export function EntretienService() {
  const features = [
    { icon: Oil, title: 'Vidange complète', description: 'Changement d\'huile moteur avec huile de qualité premium' },
    { icon: Filter, title: 'Remplacement filtres', description: 'Filtre à huile, air et habitacle neufs' },
    { icon: CheckCircle2, title: 'Diagnostic complet', description: 'Vérification de tous les niveaux et systèmes' },
    { icon: Shield, title: 'Garantie service', description: 'Pièces et main d\'œuvre garanties 6 mois' },
  ];

  const pricing = [
    {
      name: 'Vidange Simple',
      price: '3,500 DZD',
      features: ['Vidange moteur', 'Filtre à huile', 'Contrôle niveaux', 'Huile synthèse 10W40'],
      popular: false,
    },
    {
      name: 'Entretien Complet',
      price: '6,500 DZD',
      features: ['Tout du pack Simple', 'Filtre à air', 'Filtre habitacle', 'Contrôle freins', 'Vérification suspension', 'Huile premium 5W30'],
      popular: true,
    },
    {
      name: 'Révision Complète',
      price: '12,000 DZD',
      features: ['Tout du pack Complet', 'Changement liquide de frein', 'Liquide de refroidissement', 'Nettoyage injecteurs', 'Diagnostic électronique', 'Rapport détaillé'],
      popular: false,
    },
  ];

  const process = [
    { step: '01', title: 'Diagnostic initial', description: 'Inspection complète de votre véhicule et vérification des points clés' },
    { step: '02', title: 'Vidange & filtres', description: 'Remplacement de l\'huile et des filtres selon les normes constructeur' },
    { step: '03', title: 'Contrôles techniques', description: 'Vérification freins, suspension, niveaux et systèmes électriques' },
    { step: '04', title: 'Rapport & conseils', description: 'Remise d\'un rapport détaillé avec recommandations personnalisées' },
  ];

  const faqs = [
    { q: 'Quelle huile utilisez-vous ?', a: 'Nous utilisons uniquement des huiles de marques premium (Castrol, Mobil 1, Total) adaptées à votre moteur selon les recommandations du constructeur.' },
    { q: 'Combien de temps dure un entretien complet ?', a: 'Un entretien complet prend généralement entre 60 et 90 minutes selon le véhicule et les opérations nécessaires.' },
    { q: 'Fournissez-vous une garantie ?', a: 'Oui, toutes nos pièces et notre main d\'œuvre sont garanties 6 mois ou 10,000 km, selon ce qui arrive en premier.' },
    { q: 'Dois-je avoir un historique d\'entretien ?', a: 'Ce n\'est pas obligatoire, mais cela nous aide à mieux servir votre véhicule. Si vous n\'en avez pas, nous en créerons un nouveau.' },
    { q: 'Proposez-vous un service de rappel ?', a: 'Oui, nous vous envoyons automatiquement un rappel par SMS/email quand votre prochain entretien est dû.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#F7931E]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FFB84D]/10 to-transparent rounded-full blur-3xl"></div>

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
                Maintenance Professionnelle
              </Badge>
              
              <h1 className="text-5xl md:text-6xl text-white mb-6">
                Entretien <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">Complet</span>
              </h1>
              
              <p className="text-gray-400 text-xl mb-8 leading-relaxed">
                Confiez l'entretien de votre véhicule à nos mécaniciens certifiés. Vidange, filtres et diagnostic complet à domicile.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Clock size={20} className="text-[#F7931E]" />
                  <span className="text-white">60-90 min</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <MapPin size={20} className="text-[#F7931E]" />
                  <span className="text-white">À domicile</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Star size={20} className="text-[#F7931E]" />
                  <span className="text-white">4.8/5 (1,892 avis)</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white rounded-xl shadow-lg shadow-[#F7931E]/30"
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
                <div className="aspect-video bg-gradient-to-br from-[#F7931E]/20 to-[#FFB84D]/20 rounded-2xl flex items-center justify-center">
                  <Wrench size={120} className="text-white opacity-20" />
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
              Services <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">inclus</span>
            </h2>
            <p className="text-gray-400 text-lg">Un entretien professionnel complet pour prolonger la vie de votre moteur</p>
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

      {/* Pricing Section */}
      <section className="py-20 bg-[#0F0F0F] relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">Forfaits</span>
            </h2>
            <p className="text-gray-400 text-lg">Choisissez le forfait adapté à votre véhicule</p>
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
                      Recommandé
                    </Badge>
                  </div>
                )}

                <h3 className="text-2xl text-white mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">
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
                      ? 'bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white'
                      : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
                  onClick={() => window.location.hash = 'register'}
                >
                  Choisir ce forfait
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
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">processus</span>
            </h2>
            <p className="text-gray-400 text-lg">4 étapes pour un entretien professionnel</p>
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

      {/* FAQ Section */}
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

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7931E]/10 to-[#FFB84D]/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl text-white mb-6">
            Prenez soin de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7931E] to-[#FFB84D]">votre moteur</span>
          </h2>
          <p className="text-gray-400 text-xl mb-8">
            Réservez votre entretien dès maintenant et bénéficiez d'un service professionnel à domicile
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#F7931E] to-[#FFB84D] hover:from-[#FFB84D] hover:to-[#F7931E] text-white rounded-xl px-12 text-lg shadow-xl shadow-[#F7931E]/30"
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

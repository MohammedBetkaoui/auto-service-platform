import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Droplets, Wrench, TruckIcon, Sparkles, Battery, Fuel, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { useActiveSection } from './hooks/useActiveSection';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection();

  // Detect scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside & lock body scroll
  useEffect(() => {
    const handleClickOutside = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const services = [
    {
      icon: Droplets,
      name: 'Lavage Premium',
      description: 'Lavage professionnel à domicile',
      gradient: 'from-[#FF6B35] to-[#F7931E]',
      link: 'service-lavage',
    },
    {
      icon: Wrench,
      name: 'Entretien Complet',
      description: 'Vidange et maintenance',
      gradient: 'from-[#F7931E] to-[#FFB84D]',
      link: 'service-entretien',
    },
    {
      icon: TruckIcon,
      name: 'Assistance Routière',
      description: 'Dépannage 24/7',
      gradient: 'from-[#FF6B35] to-[#F7931E]',
      link: 'service-assistance',
    },
    {
      icon: Sparkles,
      name: 'Détailing Intérieur',
      description: 'Nettoyage approfondi',
      gradient: 'from-[#F7931E] to-[#FFB84D]',
      link: 'service-detailing',
    },
    {
      icon: Battery,
      name: 'Batterie & Électrique',
      description: 'Diagnostic et remplacement',
      gradient: 'from-[#FF6B35] to-[#F7931E]',
      link: 'service-batterie',
    },
    {
      icon: Fuel,
      name: 'Carburant Express',
      description: 'Livraison rapide',
      gradient: 'from-[#F7931E] to-[#FFB84D]',
      link: 'service-carburant',
    },
  ];

  const navLinks = [
    { href: '#accueil', label: 'Accueil', id: 'accueil' },
    { href: '#comment-ca-marche', label: 'Comment ça marche', id: 'comment-ca-marche' },
    { href: '#prestataires', label: 'Partenaires', id: 'prestataires' },
    { href: '#temoignages', label: 'Témoignages', id: 'temoignages' },
    { href: '#contact', label: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' 
            : 'bg-[#0A0A0A]/70 backdrop-blur-md border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>
                <Logo size={scrolled ? 'sm' : 'md'} showTagline={!scrolled} />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group ${
                    activeSection === link.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] transition-all duration-300 ${
                      activeSection === link.id 
                        ? 'w-1/2' 
                        : 'w-0 group-hover:w-1/2'
                    }`}
                  ></span>
                </a>
              ))}

              {/* Services Mega Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="relative px-4 py-2 text-sm rounded-lg transition-all duration-300 group text-gray-400 hover:text-white flex items-center gap-1"
                >
                  Services
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                  <span 
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] transition-all duration-300 ${
                      servicesOpen ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                    }`}
                  ></span>
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px]"
                    >
                      <div className="bg-[#0F0F0F]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6">
                        <div className="grid grid-cols-2 gap-3">
                          {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                              <a
                                key={index}
                                href={`#${service.link}`}
                                onClick={() => {
                                  window.location.hash = service.link;
                                  setServicesOpen(false);
                                }}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
                              >
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                  <IconComponent size={20} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white text-sm mb-0.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF6B35] group-hover:to-[#F7931E] transition-all">
                                    {service.name}
                                  </h4>
                                  <p className="text-gray-400 text-xs line-clamp-1">
                                    {service.description}
                                  </p>
                                </div>
                                <ArrowRight 
                                  size={16} 
                                  className="text-gray-600 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" 
                                />
                              </a>
                            );
                          })}
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <a 
                            href="#services"
                            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                          >
                            Voir tous les services
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button 
                variant="ghost" 
                size={scrolled ? 'sm' : 'default'}
                className="text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={() => window.location.hash = 'login'}
              >
                Connexion
              </Button>
              <Button 
                size={scrolled ? 'sm' : 'default'}
                className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:shadow-[#FF6B35]/40 transition-all" 
                onClick={() => window.location.hash = 'register'}
              >
                Démarrer maintenant
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2.5 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-95 border border-white/10"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="lg:hidden fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-[#0A0A0A] to-[#1a1a1a] backdrop-blur-xl border-l border-white/10 shadow-2xl z-[70] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#0A0A0A] to-[#1a1a1a] sticky top-0 z-10 backdrop-blur-xl">
              <Logo size="sm" showTagline={false} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white transition-all py-4 px-5 hover:bg-white/5 rounded-xl flex items-center justify-between group border border-transparent hover:border-white/10"
                  >
                    <span className="text-base">{link.label}</span>
                    <ArrowRight size={18} className="text-gray-600 group-hover:text-[#FF6B35] group-hover:translate-x-1 transition-all" />
                  </a>
                ))}

                {/* Mobile Services Dropdown */}
                <div className="mt-4">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="w-full text-gray-300 hover:text-white transition-all py-4 px-5 hover:bg-white/5 rounded-xl flex items-center justify-between border border-transparent hover:border-white/10"
                  >
                    <span className="text-base">Services</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 space-y-2">
                          {services.map((service, index) => {
                            const IconComponent = service.icon;
                            return (
                              <a
                                key={index}
                                href={`#${service.link}`}
                                onClick={() => {
                                  window.location.hash = service.link;
                                  setMobileMenuOpen(false);
                                  setServicesOpen(false);
                                }}
                                className="flex items-start gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
                              >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                                  <IconComponent size={20} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white mb-1">{service.name}</h4>
                                  <p className="text-gray-400 text-sm">{service.description}</p>
                                </div>
                              </a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-white/10">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/5 rounded-xl w-full justify-center"
                    onClick={() => { 
                      window.location.hash = 'login'; 
                      setMobileMenuOpen(false); 
                    }}
                  >
                    Connexion
                  </Button>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl w-full justify-center shadow-lg shadow-[#FF6B35]/30" 
                    onClick={() => { 
                      window.location.hash = 'register'; 
                      setMobileMenuOpen(false); 
                    }}
                  >
                    Démarrer maintenant
                  </Button>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

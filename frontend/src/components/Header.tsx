import { useState } from 'react';
import { Menu, X, Home, Wrench, Users, Info, Phone, Car } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 group-hover:ring-white/40 transition-all duration-300 group-hover:scale-110">
                <Car className="text-white" size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight leading-tight">
                  AutoServe
                </span>
                <span className="text-sm text-white/80 font-medium">
                  DZ
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#accueil" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Home size={18} />
              Accueil
            </a>
            <a href="#services" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Wrench size={18} />
              Services
            </a>
            <a href="#prestataires" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Users size={18} />
              Prestataires
            </a>
            <a href="#apropos" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Info size={18} />
              À propos
            </a>
            <a href="#contact" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium">
              <Phone size={18} />
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50" onClick={() => window.location.hash = 'login'}>
              Connexion
            </Button>
            <Button className="bg-gradient-to-r from-[#0077FF] to-[#0055CC] hover:from-[#0066DD] hover:to-[#004499] text-white rounded-full px-6 shadow-lg hover:shadow-[#0077FF]/25 transition-shadow" onClick={() => window.location.hash = 'register'}>
              Demander un service
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 bg-black/90 backdrop-blur-xl">
            <nav className="flex flex-col gap-4">
              <a href="#accueil" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2">
                <Home size={18} />
                Accueil
              </a>
              <a href="#services" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2">
                <Wrench size={18} />
                Services
              </a>
              <a href="#prestataires" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2">
                <Users size={18} />
                Prestataires
              </a>
              <a href="#apropos" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2">
                <Info size={18} />
                À propos
              </a>
              <a href="#contact" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2">
                <Phone size={18} />
                Contact
              </a>
                            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50" onClick={() => { window.location.hash = 'login'; setMobileMenuOpen(false); }}>Connexion</Button>
                <Button className="bg-gradient-to-r from-[#0077FF] to-[#0055CC] hover:from-[#0066DD] hover:to-[#004499] text-white rounded-full shadow-lg hover:shadow-[#0077FF]/25 transition-shadow" onClick={() => { window.location.hash = 'register'; setMobileMenuOpen(false); }}>
                  Demander un service
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

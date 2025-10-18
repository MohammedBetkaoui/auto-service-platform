import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#0077FF] rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">A</span>
              </div>
              <span className="text-xl md:text-2xl text-[#0077FF] tracking-tight">
                AutoServe <span className="text-[#1E1E1E]">DZ</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#accueil" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors">
              Accueil
            </a>
            <a href="#services" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors">
              Services
            </a>
            <a href="#prestataires" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors">
              Prestataires
            </a>
            <a href="#apropos" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors">
              À propos
            </a>
            <a href="#contact" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors">
              Contact
            </a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {!auth.user ? (
              <>
                <Button variant="ghost" className="text-[#1E1E1E]" onClick={() => navigate('/login')}>
                  Connexion
                </Button>
                <Button className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full px-6" onClick={() => navigate('/register')}>
                  S'inscrire
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="text-[#1E1E1E]" onClick={() => navigate('/dashboard')}>
                  {auth.user.role === 'provider' ? 'Mon espace' : 'Tableau de bord'}
                </Button>
                <Button variant="outline" onClick={async () => { await auth.logout(); window.location.hash = ''; }}>
                  Déconnexion
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1E1E1E]"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              <a href="#accueil" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors py-2">
                Accueil
              </a>
              <a href="#services" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors py-2">
                Services
              </a>
              <a href="#prestataires" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors py-2">
                Prestataires
              </a>
              <a href="#apropos" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors py-2">
                À propos
              </a>
              <a href="#contact" className="text-[#1E1E1E] hover:text-[#0077FF] transition-colors py-2">
                Contact
              </a>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {!auth.user ? (
                  <>
                    <Button variant="outline" onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}>Connexion</Button>
                    <Button className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full" onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}>
                      S'inscrire
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => { navigate('/dashboard'); setMobileMenuOpen(false); }}>
                      {auth.user.role === 'provider' ? 'Mon espace' : 'Tableau de bord'}
                    </Button>
                    <Button className="bg-red-50 text-red-600" onClick={async () => { await auth.logout(); setMobileMenuOpen(false); navigate('/'); }}>
                      Déconnexion
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

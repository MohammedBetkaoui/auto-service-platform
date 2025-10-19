import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0077FF] to-[#0055CC] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <span className="text-xl text-white tracking-tight">
                AutoServe <span className="text-[#0077FF]">DZ</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              La première plateforme algérienne de services automobiles à domicile. 
              Nous connectons les clients aux meilleurs prestataires.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-[#0077FF] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-[#0077FF] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-[#0077FF] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <a href="#accueil" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Nos services
                </a>
              </li>
              <li>
                <a href="#prestataires" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Devenir prestataire
                </a>
              </li>
              <li>
                <a href="#apropos" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white mb-4">Légal</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#0077FF] transition-colors">
                  CGV
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-[#0077FF] flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  Alger, Algérie
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-[#0077FF] flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  +213 555 123 456
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-[#0077FF] flex-shrink-0 mt-1" />
                <span className="text-gray-400">
                  contact@autoserve.dz
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © 2025 AutoServe DZ. Tous droits réservés.
            </p>
            <p className="text-white/60 text-sm text-center md:text-right">
              Fait avec ❤️ en Algérie
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

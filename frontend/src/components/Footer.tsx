import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0A0A] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10"></div>
      
      {/* Gradient Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-gradient-to-b from-[#FF6B35]/5 to-transparent blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl text-white mb-4">
              Restez <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#F7931E]">informé</span>
            </h3>
            <p className="text-gray-400 text-lg mb-8">
              Recevez nos dernières offres et actualités directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-[#FF6B35]"
              />
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#F7931E] hover:to-[#FF6B35] text-white rounded-xl px-8 whitespace-nowrap">
                <Send size={18} className="mr-2" />
                S'abonner
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* About - Larger Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="md" showTagline={true} />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              Plateforme leader de services automobiles professionnels en Algérie. 
              Excellence, rapidité et fiabilité au service de votre mobilité.
            </p>
            
            {/* Social Links */}
            <div>
              <p className="text-sm text-gray-500 mb-3">Suivez-nous</p>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#FF6B35]/50 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Facebook size={20} className="group-hover:text-[#FF6B35] transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#FF6B35]/50 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Instagram size={20} className="group-hover:text-[#FF6B35] transition-colors" />
                </a>
                <a 
                  href="#" 
                  className="w-11 h-11 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 hover:border-[#FF6B35]/50 rounded-xl flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <Linkedin size={20} className="group-hover:text-[#FF6B35] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white mb-6 text-lg">Solutions</h4>
            <ul className="space-y-3">
              {['Lavage Premium', 'Entretien Auto', 'Assistance 24/7', 'Dépannage', 'Diagnostic'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-400 hover:text-[#FF6B35] transition-colors flex items-center group">
                    <ArrowRight size={16} className="mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#FF6B35]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h4 className="text-white mb-6 text-lg">Entreprise</h4>
            <ul className="space-y-3">
              {['À propos', 'Partenaires', 'Carrières', 'Blog', 'Presse'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-[#FF6B35] transition-colors flex items-center group">
                    <ArrowRight size={16} className="mr-2 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#FF6B35]" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-6 text-lg">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={18} className="text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Siège social</p>
                  <span className="text-gray-300">Alger, Algérie</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={18} className="text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                  <span className="text-gray-300">+213 555 123 456</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={18} className="text-[#FF6B35]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <span className="text-gray-300">contact@autoserve.dz</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © 2025 AutoServe DZ. Tous droits réservés.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                Confidentialité
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                CGU
              </a>
              <a href="#" className="text-gray-500 hover:text-[#FF6B35] transition-colors">
                Cookies
              </a>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-right flex items-center gap-2">
              Développé avec <span className="text-red-500">❤</span> en Algérie
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

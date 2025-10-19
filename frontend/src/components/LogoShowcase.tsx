import { Logo } from './Logo';

export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Guide du Logo AutoServe DZ</h1>
          <p className="text-gray-400">Variantes et utilisations du logo de la plateforme</p>
        </div>

        {/* Default Logo */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Logo par défaut</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center bg-[#0A0A0A] rounded-xl p-8">
            <Logo variant="default" size="sm" showTagline={true} />
            <Logo variant="default" size="md" showTagline={true} />
            <Logo variant="default" size="lg" showTagline={true} />
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Usage : En-tête, pied de page, pages de connexion/inscription
          </p>
        </section>

        {/* Compact Logo */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Logo compact (sans sous-titre)</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center bg-[#0A0A0A] rounded-xl p-8">
            <Logo variant="compact" size="sm" />
            <Logo variant="compact" size="md" />
            <Logo variant="compact" size="lg" />
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Usage : Barre latérale, espaces restreints
          </p>
        </section>

        {/* Icon Only */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Icône seule</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center bg-[#0A0A0A] rounded-xl p-8">
            <Logo variant="icon-only" size="sm" />
            <Logo variant="icon-only" size="md" />
            <Logo variant="icon-only" size="lg" />
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Usage : Favicon, icône d'application mobile, avatar
          </p>
        </section>

        {/* Text Only */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Texte seul</h2>
          <div className="flex flex-wrap gap-8 items-center justify-center bg-[#0A0A0A] rounded-xl p-8">
            <Logo variant="text-only" size="sm" showTagline={false} />
            <Logo variant="text-only" size="md" showTagline={false} />
            <Logo variant="text-only" size="lg" showTagline={true} />
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Usage : Titre de documents, signatures email
          </p>
        </section>

        {/* On Different Backgrounds */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Sur différents fonds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0A0A0A] rounded-xl p-8 flex items-center justify-center">
              <Logo variant="default" size="md" showTagline={true} />
            </div>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl p-8 flex items-center justify-center">
              <Logo variant="default" size="md" showTagline={true} />
            </div>
            <div className="bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 rounded-xl p-8 flex items-center justify-center border border-[#FF6B35]/20">
              <Logo variant="default" size="md" showTagline={true} />
            </div>
          </div>
          <p className="text-gray-400 mt-4 text-sm">
            Le logo s'adapte à différents arrière-plans tout en conservant sa lisibilité
          </p>
        </section>

        {/* Brand Colors */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Couleurs de la marque</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-xl"></div>
              <p className="text-white text-sm">Gradient Principal</p>
              <p className="text-gray-400 text-xs">#FF6B35 → #F7931E</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#0A0A0A] rounded-xl border border-white/10"></div>
              <p className="text-white text-sm">Fond Sombre</p>
              <p className="text-gray-400 text-xs">#0A0A0A</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-white rounded-xl"></div>
              <p className="text-white text-sm">Blanc Pur</p>
              <p className="text-gray-400 text-xs">#FFFFFF</p>
            </div>
            <div className="space-y-2">
              <div className="h-24 bg-[#28C76F] rounded-xl"></div>
              <p className="text-white text-sm">Accent Vert</p>
              <p className="text-gray-400 text-xs">#28C76F</p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-2xl p-8">
          <h2 className="text-2xl text-white mb-6">Règles d'utilisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#28C76F]/10 border border-[#28C76F]/20 rounded-xl p-6">
              <h3 className="text-[#28C76F] mb-4 flex items-center gap-2">
                <span className="text-xl">✓</span>
                À FAIRE
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Respecter les espaces autour du logo</li>
                <li>• Maintenir les proportions d'origine</li>
                <li>• Utiliser sur fond sombre de préférence</li>
                <li>• Garder le gradient orange-doré signature</li>
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
              <h3 className="text-red-400 mb-4 flex items-center gap-2">
                <span className="text-xl">✗</span>
                À ÉVITER
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Ne pas déformer ou étirer le logo</li>
                <li>• Ne pas changer les couleurs du gradient</li>
                <li>• Ne pas ajouter d'effets non approuvés</li>
                <li>• Ne pas utiliser sur fond trop chargé</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

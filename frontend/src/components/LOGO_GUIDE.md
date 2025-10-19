# 🎨 Guide du Logo AutoServe DZ

## Vue d'ensemble

Le logo AutoServe DZ a été conçu pour refléter le professionnalisme, la modernité et l'innovation de la plateforme de services automobiles. Il combine un symbole visuel fort avec une typographie claire et distinctive.

## Composants du Logo

### 1. **Icône** 
- Représentation stylisée d'une voiture
- Gradient orange-doré signature (#FF6B35 → #F7931E)
- Forme carrée arrondie (border-radius: 12px)
- Effet de brillance au survol
- Ombre portée avec couleur de marque

### 2. **Typographie**
- **"AutoServe"** : Blanc (#FFFFFF), police semi-bold
- **"DZ"** : Gradient orange-doré, police bold
- **Sous-titre** : Gris (#9CA3AF), petite taille, uppercase

## Variantes Disponibles

### Default (par défaut)
```tsx
<Logo variant="default" size="md" showTagline={true} />
```
- **Usage** : En-tête, footer, pages principales
- **Contient** : Icône + Texte + Sous-titre

### Compact
```tsx
<Logo variant="compact" size="md" />
```
- **Usage** : Sidebar, espaces restreints
- **Contient** : Icône + Texte (sans sous-titre)

### Icon Only
```tsx
<Logo variant="icon-only" size="md" />
```
- **Usage** : Favicon, icône mobile, avatar
- **Contient** : Icône uniquement

### Text Only
```tsx
<Logo variant="text-only" size="md" showTagline={true} />
```
- **Usage** : Documents, signatures email
- **Contient** : Texte uniquement (avec ou sans sous-titre)

## Tailles

### Small (sm)
- Icône : 36px × 36px
- Texte : 16px (text-base)
- Sous-titre : 9px

### Medium (md) - Recommandé
- Icône : 48px × 48px
- Texte : 20px (text-xl)
- Sous-titre : 10px

### Large (lg)
- Icône : 64px × 64px
- Texte : 30px (text-3xl)
- Sous-titre : 12px

## Couleurs de la Marque

### Couleurs Principales
| Nom | Hex | Usage |
|-----|-----|-------|
| Orange Principal | #FF6B35 | Début du gradient |
| Orange Doré | #F7931E | Fin du gradient |
| Fond Sombre | #0A0A0A | Arrière-plan principal |
| Blanc | #FFFFFF | Texte principal |

### Couleurs Secondaires
| Nom | Hex | Usage |
|-----|-----|-------|
| Vert Accent | #28C76F | Succès, validations |
| Gris Clair | #9CA3AF | Texte secondaire |
| Gris Foncé | #1A1A1A | Fonds de cartes |

## Espaces de Protection

Maintenez un espace minimum équivalent à la hauteur de l'icône autour du logo pour assurer sa lisibilité et son impact visuel.

```
┌─────────────────────────────────┐
│                                 │
│    ┌─────────────────┐         │
│    │                 │         │
│    │      LOGO       │         │
│    │                 │         │
│    └─────────────────┘         │
│                                 │
└─────────────────────────────────┘
```

## Animations

Le logo inclut des animations subtiles :

### Effet de Brillance (Shine Effect)
- Déclenché au survol (hover)
- Animation de 1.5s
- Ajoute du dynamisme sans être intrusif

### Effet de Zoom
- Léger agrandissement (scale: 1.05) au survol
- Transition douce de 300ms
- Améliore l'interactivité

## Règles d'Utilisation

### ✓ À FAIRE
- Utiliser les variantes officielles fournies
- Respecter les espaces de protection
- Maintenir les proportions d'origine
- Privilégier les fonds sombres
- Utiliser le gradient orange-doré signature

### ✗ À ÉVITER
- Déformer ou étirer le logo
- Changer les couleurs du gradient
- Ajouter des effets non approuvés (ombre, contour, etc.)
- Utiliser sur fond trop chargé ou peu contrasté
- Réduire en dessous des tailles minimales recommandées
- Modifier la typographie

## Tailles Minimales

Pour garantir la lisibilité :
- **Web** : Minimum 32px de hauteur
- **Mobile** : Minimum 28px de hauteur
- **Print** : Minimum 15mm de hauteur

## Accessibilité

Le logo est conçu pour être accessible :
- Contraste suffisant (WCAG AA minimum)
- Lisible sur fond sombre
- Alternative texte disponible
- Fonctionne en monochrome si nécessaire

## Fichiers Source

```
/components/
  ├── Logo.tsx           # Composant principal
  ├── LogoIcon.tsx       # Icône SVG personnalisée
  └── LogoShowcase.tsx   # Guide visuel interactif
```

## Exemples d'Implémentation

### Header
```tsx
import { Logo } from './components/Logo';

<header>
  <a href="/">
    <Logo size="md" showTagline={true} />
  </a>
</header>
```

### Sidebar
```tsx
<aside>
  <Logo variant="compact" size="md" />
</aside>
```

### Footer
```tsx
<footer>
  <Logo size="md" showTagline={true} />
</footer>
```

### Favicon
```tsx
<Logo variant="icon-only" size="sm" />
```

## Support

Pour toute question concernant l'utilisation du logo, référez-vous au composant `LogoShowcase.tsx` qui présente visuellement toutes les variantes et cas d'usage.

---

**Version** : 1.0  
**Dernière mise à jour** : Octobre 2025  
**Plateforme** : AutoServe DZ

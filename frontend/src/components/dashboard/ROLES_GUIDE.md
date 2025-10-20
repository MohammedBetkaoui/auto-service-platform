# 🎭 Guide des Rôles Utilisateurs - AutoServe DZ

## Vue d'ensemble

La plateforme AutoServe DZ supporte 3 types d'utilisateurs avec des fonctionnalités spécifiques :

1. **Client** - Propriétaire de véhicule
2. **provider (Prestataire)** - Fournisseur de services mobiles
3. **Admin** - Administrateur de la plateforme

---

## 👤 1. CLIENT

### Fonctionnalités

#### ✅ Authentification & Profil
- S'inscrire et se connecter
- Consulter et mettre à jour son profil
- Mettre à jour son mot de passe
- Supprimer son propre compte

#### 📦 Gestion des Commandes
- **Créer** une nouvelle commande de service
- **Consulter** l'historique des commandes
- **Suivre** l'état des commandes en temps réel
- **Annuler** une commande (selon conditions)

#### ⭐ Avis & Feedbacks
- **Laisser des avis** sur les prestataires après service
- **Noter** les prestataires (1-5 étoiles)
- **Consulter** ses avis précédents
- **Modifier/Supprimer** ses propres avis

#### 💬 Communication
- **Messagerie** avec les prestataires
- **Notifications** en temps réel
- **Support client** intégré

#### 💳 Paiements
- **Historique** des paiements
- **Factures** téléchargeables
- **Méthodes de paiement** enregistrées

### Sections du Dashboard Client

```
/dashboard (home)
  ├── Statistiques (commandes, dépenses)
  ├── Commandes récentes
  ├── Notifications
  └── Avis récents

/orders
  ├── Liste complète des commandes
  ├── Filtres (statut, date, service)
  └── Détails de commande avec suivi

/reviews
  ├── Écrire un nouvel avis
  └── Avis précédents

/payments
  ├── Historique des transactions
  └── Factures

/messages
  └── Conversations avec prestataires

/profile
  ├── Informations personnelles
  ├── Sécurité (mot de passe)
  ├── Notifications
  └── Préférences
```

---

## 🚛 2. provider (Prestataire)

### Fonctionnalités

#### ✅ Authentification & Profil
- S'inscrire et se connecter
- **Profil public** visible par les clients
- Mettre à jour informations professionnelles
- **Photo de profil** (avatar)
- Mettre à jour mot de passe
- Supprimer son compte

#### 🚗 Gestion des Véhicules
- **Ajouter** un nouveau véhicule professionnel
- **Modifier** les détails du véhicule
- **Supprimer** un véhicule
- **Mettre à jour la disponibilité** de chaque véhicule
- **Photos** et documents du véhicule
- **Statut d'approbation** (en attente, approuvé, rejeté)

#### 📋 Gestion des Commandes
- **Recevoir** des demandes de service
- **Accepter/Refuser** les commandes
- **Gérer** les commandes en cours
- **Terminer** les services
- **Historique** complet

#### 💰 Revenus & Statistiques
- **Tableau de bord** des revenus
- **Statistiques** de performance
- **Historique** des paiements
- **Rapports** mensuels

#### ⭐ Réputation
- **Recevoir des avis** des clients
- **Note moyenne** visible
- **Nombre total d'avis**
- **Répondre** aux avis (optionnel)

#### 📍 Disponibilité
- **Statut en ligne/hors ligne**
- **Zones de service** définies
- **Horaires** de disponibilité

### Sections du Dashboard provider

```
/dashboard (home)
  ├── Statistiques (revenus, commandes)
  ├── Nouvelles commandes
  ├── Commandes en cours
  └── Notifications

/orders
  ├── Nouvelles demandes (à accepter/refuser)
  ├── Commandes acceptées
  ├── Commandes en cours
  └── Historique complet

/vehicles
  ├── Liste des véhicules
  ├── Ajouter un véhicule
  ├── Modifier véhicule
  ├── Toggle disponibilité
  └── Statut d'approbation

/reviews
  ├── Note moyenne
  ├── Tous les avis reçus
  └── Statistiques de satisfaction

/payments
  ├── Revenus du mois
  ├── Historique des paiements
  └── Rapports

/messages
  └── Conversations avec clients

/profile
  ├── Profil public
  ├── Informations professionnelles
  ├── Spécialités & services
  ├── Photos & certifications
  └── Paramètres de compte
```

---

## 👨‍💼 3. ADMIN (Administrateur)

### Fonctionnalités

#### 👥 Gestion des Utilisateurs
- **Accéder** à la liste de tous les utilisateurs
- **Filtrer** par rôle (client, provider, admin)
- **Rechercher** un utilisateur
- **Voir** les profils détaillés
- **Mettre à jour le statut** :
  - ✅ Actif
  - ⏸️ Inactif
  - 🚫 Banni
- **Supprimer** n'importe quel utilisateur

#### 🚗 Gestion des Véhicules
- **Accéder** à tous les véhicules de la plateforme
- **Filtrer** par statut (approuvé, en attente, rejeté)
- **Approuver** les nouveaux véhicules
- **Rejeter** les véhicules non conformes
- **Supprimer** n'importe quel véhicule
- **Voir** les détails complets (propriétaire, documents)

#### 📊 Tableau de Bord Global
- **Statistiques** de la plateforme
- **Nombre total** d'utilisateurs
- **Commandes** totales
- **Revenus** de la plateforme
- **Graphiques** et rapports

#### 🔍 Monitoring & Contrôle
- **Surveiller** l'activité de la plateforme
- **Gérer** les litiges
- **Modération** des avis
- **Support** avancé

### Sections du Dashboard Admin

```
/dashboard (home)
  ├── Statistiques globales
  ├── Graphiques de croissance
  ├── Activité récente
  └── Alertes système

/users
  ├── Liste de tous les utilisateurs
  ├── Filtres (rôle, statut)
  ├── Recherche avancée
  ├── Actions :
  │   ├── Voir profil
  │   ├── Activer
  │   ├── Désactiver
  │   ├── Bannir
  │   └── Supprimer

/vehicles
  ├── Tous les véhicules
  ├── Filtres (statut, type)
  ├── En attente d'approbation (priorité)
  ├── Actions :
  │   ├── Approuver
  │   ├── Rejeter
  │   ├── Voir détails
  │   └── Supprimer

/orders
  ├── Toutes les commandes
  ├── Statistiques
  └── Gestion des litiges

/profile
  └── Paramètres admin
```

---

## 🔐 Permissions & Sécurité

### Matrice des Permissions

| Fonctionnalité | Client | provider | Admin |
|----------------|--------|--------|-------|
| Voir son profil | ✅ | ✅ | ✅ |
| Modifier son profil | ✅ | ✅ | ✅ |
| Supprimer son compte | ✅ | ✅ | ❌ |
| Créer une commande | ✅ | ❌ | ❌ |
| Recevoir des commandes | ❌ | ✅ | ❌ |
| Laisser un avis | ✅ | ❌ | ❌ |
| Recevoir des avis | ❌ | ✅ | ❌ |
| Ajouter un véhicule | ❌ | ✅ | ❌ |
| Approuver un véhicule | ❌ | ❌ | ✅ |
| Voir tous les utilisateurs | ❌ | ❌ | ✅ |
| Bannir un utilisateur | ❌ | ❌ | ✅ |
| Supprimer n'importe quel compte | ❌ | ❌ | ✅ |

---

## 🎨 Design System

### Badges de Rôle

- **Client** : Bleu (`blue-500`)
- **provider** : Violet (`purple-500`)
- **Admin** : Rouge (`red-500`)

### Couleurs de Statut

- **Actif** : Vert (`green-500`)
- **Inactif** : Gris (`gray-500`)
- **Banni** : Rouge (`red-500`)
- **En attente** : Jaune (`yellow-500`)
- **Approuvé** : Vert (`green-500`)
- **Rejeté** : Rouge (`red-500`)

---

## 🚀 Utilisation

### Connexion avec un rôle spécifique

```tsx
// Dans LoginPage.tsx
const { login } = useAuth();

// Client
await login('client@email.com', 'password', 'client');

// provider
await login('provider@email.com', 'password', 'provider');

// Admin
await login('admin@email.com', 'password', 'admin');
```

### Vérifier le rôle

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    // Contenu admin uniquement
  }
  
  if (user?.role === 'provider') {
    // Contenu provider uniquement
  }
  
  if (user?.role === 'client') {
    // Contenu client uniquement
  }
}
```

---

## 📝 Notes Importantes

1. **Sécurité** : Toutes les actions sont validées côté serveur (à implémenter)
2. **Persistance** : Les données utilisateur sont stockées dans localStorage (temporaire)
3. **API** : Remplacer les mocks par de vrais appels API
4. **Notifications** : Système de notifications en temps réel à implémenter
5. **Paiements** : Intégration avec gateway de paiement algérien

---

## 🔄 Flux de Travail

### Client commande un service
1. Client se connecte
2. Choisit un service
3. Remplit les détails
4. Système trouve un provider disponible
5. provider accepte la commande
6. Service effectué
7. Client laisse un avis
8. Paiement traité

### provider ajoute un véhicule
1. provider se connecte
2. Va dans "Mes véhicules"
3. Clique "Ajouter un véhicule"
4. Remplit le formulaire
5. Statut: "En attente"
6. Admin approuve/rejette
7. Véhicule devient actif

### Admin modère la plateforme
1. Admin se connecte
2. Voit statistiques globales
3. Gère les demandes d'approbation véhicules
4. Surveille les utilisateurs
5. Résout les problèmes
6. Génère des rapports

---

## 📞 Support

Pour toute question sur l'implémentation des rôles, consultez :
- `/contexts/AuthContext.tsx` - Système d'authentification
- `/components/DashboardPage.tsx` - Router principal
- `/components/dashboard/Sidebar.tsx` - Navigation par rôle

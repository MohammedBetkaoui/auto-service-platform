# 📦 Récapitulatif - Base de Données Auto-Service Platform

## ✅ Fichiers Créés

### 📁 Structure
```
backend/
├── database/
│   ├── migrations/
│   │   ├── create_database.sql      # Création de la BDD (7 tables)
│   │   ├── seed_data.sql            # Données de test
│   │   └── drop_database.sql        # Suppression de la BDD
│   ├── queries/
│   │   └── useful_queries.sql       # 10+ requêtes SQL utiles
│   ├── install.ps1                  # Script d'installation PowerShell
│   ├── QUICK_START.md               # Guide d'installation rapide
│   └── README.md                    # Documentation complète
├── src/
│   └── entities/
│       ├── user.entity.ts           # Entité Users (TypeORM)
│       ├── vehicle.entity.ts        # Entité Vehicles
│       ├── service.entity.ts        # Entité Services
│       ├── order.entity.ts          # Entité Orders
│       ├── payment.entity.ts        # Entité Payments
│       ├── review.entity.ts         # Entité Reviews
│       ├── notification.entity.ts   # Entité Notifications
│       └── index.ts                 # Export global
└── DATABASE_SCHEMA.md               # Schéma visuel complet
```

---

## 🗄️ Tables Créées (7)

| # | Table | Description | Champs clés |
|---|-------|-------------|-------------|
| 1 | **users** | Utilisateurs (clients, providers, admin) | id, email, role, password_hash |
| 2 | **vehicles** | Véhicules des prestataires | id, user_id, brand, model |
| 3 | **services** | Services proposés | id, name, base_price |
| 4 | **orders** | Commandes/réservations | id, client_id, provider_id, status |
| 5 | **payments** | Paiements | id, order_id, amount, status |
| 6 | **reviews** | Avis clients | id, order_id, rating, comment |
| 7 | **notifications** | Notifications utilisateurs | id, user_id, message, is_read |

---

## 🔗 Relations Principales

```
users (1) ──── (N) vehicles
users (1) ──── (N) orders (client)
users (1) ──── (N) orders (provider)
services (1) ── (N) orders
orders (1) ──── (N) payments
orders (1) ──── (1) reviews
users (1) ──── (N) notifications
```

---

## 📊 Données de Test Insérées

Après `seed_data.sql` :

| Type | Quantité | Détails |
|------|----------|---------|
| 👥 **Utilisateurs** | 9 | 1 admin + 4 clients + 4 providers |
| 🚗 **Véhicules** | 7 | Mercedes, Ford, Peugeot, etc. |
| ⚙️ **Services** | 8 | Dépannage, remorquage, vidange, etc. |
| 📋 **Commandes** | 9 | Statuts variés (pending, completed, etc.) |
| 💳 **Paiements** | 7 | Success, pending, failed |
| ⭐ **Avis** | 4 | Notes 4-5 étoiles |
| 🔔 **Notifications** | 10 | Lues et non lues |

---

## 🚀 Installation Rapide

### Option 1 : Script PowerShell (Recommandé)
```powershell
cd backend/database
.\install.ps1
```

### Option 2 : MySQL CLI
```powershell
mysql -u root -p < database/migrations/create_database.sql
mysql -u root -p < database/migrations/seed_data.sql
```

### Option 3 : phpMyAdmin
1. Import `create_database.sql`
2. Import `seed_data.sql`

---

## 🔐 Comptes de Test

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| 👑 Admin | admin@autoservice.com | password123 |
| 👤 Client | mohammed.alami@gmail.com | password123 |
| 🔧 provider | karim.mechanic@gmail.com | password123 |

---

## 🔒 Sécurité Implémentée

- ✅ Mots de passe hachés avec bcrypt (10 rounds)
- ✅ Foreign Keys avec CASCADE et SET NULL
- ✅ Index sur colonnes fréquentes (email, status, etc.)
- ✅ UNIQUE constraint sur email
- ✅ CHECK constraint sur rating (1-5)
- ✅ Validation des ENUM (role, status, method, etc.)

---

## 📝 Entités TypeORM

7 entités TypeORM créées dans `backend/src/entities/` :

- **User** : Avec énums UserRole (client/provider/admin)
- **Vehicle** : Lié à User (prestataire)
- **Service** : Services indépendants
- **Order** : Avec enum OrderStatus (5 états)
- **Payment** : Avec enums PaymentMethod et PaymentStatus
- **Review** : Rating 1-5 + commentaire
- **Notification** : Avec enum NotificationType

Toutes avec relations bidirectionnelles complètes.

---

## 📚 Documentation

| Fichier | Contenu |
|---------|---------|
| **QUICK_START.md** | Guide d'installation en 3 étapes |
| **README.md** | Documentation complète de la BDD |
| **DATABASE_SCHEMA.md** | Diagramme visuel des relations |
| **useful_queries.sql** | 10+ requêtes SQL prêtes à l'emploi |

---

## 🎯 Prochaines Étapes

### 1. Installation de la BDD
```powershell
cd backend/database
.\install.ps1
```

### 2. Vérifier la configuration
Fichier : `backend/.env`
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=auto_service_platform
```

### 3. Installer TypeORM (si nécessaire)
```powershell
cd backend
npm install @nestjs/typeorm typeorm mysql2
```

### 4. Configurer NestJS
Créer ou mettre à jour `app.module.ts` avec TypeORM

### 5. Lancer le backend
```powershell
npm run start:dev
```

---

## 🧪 Tester la BDD

### Requête SQL de test
```sql
USE auto_service_platform;

-- Lister les commandes
SELECT o.id, c.full_name AS client, w.full_name AS provider, 
       s.name AS service, o.status, o.price
FROM orders o
JOIN users c ON o.client_id = c.id
LEFT JOIN users w ON o.provider_id = w.id
JOIN services s ON o.service_id = s.id;
```

### Requêtes disponibles
Consultez `database/queries/useful_queries.sql` pour :
- Vue d'ensemble des commandes
- Statistiques par prestataire
- Revenus par service
- Commandes en attente
- Historique des paiements
- Top clients
- Et plus...

---

## 🛠️ Maintenance

### Backup
```powershell
mysqldump -u root -p auto_service_platform > backup.sql
```

### Restauration
```powershell
mysql -u root -p auto_service_platform < backup.sql
```

### Réinitialisation complète
```sql
-- Supprimer
source database/migrations/drop_database.sql

-- Recréer
source database/migrations/create_database.sql
source database/migrations/seed_data.sql
```

---

## ✨ Fonctionnalités de la BDD

### Gestion des utilisateurs
- ✅ Authentification (email + password_hash)
- ✅ Rôles (client, provider, admin)
- ✅ Vérification email (is_verified)
- ✅ Timestamps (created_at, updated_at)

### Gestion des commandes
- ✅ Statuts multiples (pending → accepted → in_progress → completed)
- ✅ Annulation possible
- ✅ Lien client-provider-service-vehicle
- ✅ Géolocalisation (location)
- ✅ Prix dynamique

### Gestion des paiements
- ✅ Méthodes variées (card, cash, wallet)
- ✅ Statuts (pending, success, failed)
- ✅ Transaction ID pour traçabilité
- ✅ Lié aux commandes

### Système d'avis
- ✅ Note 1-5 étoiles
- ✅ Commentaire texte
- ✅ Relation 1-1 avec commande
- ✅ Lié au client ET au provider

### Notifications
- ✅ Types (order, payment, system)
- ✅ État lu/non lu
- ✅ Timestamps
- ✅ Par utilisateur

---

## 📞 Support

**Questions ?** Consultez :
1. `QUICK_START.md` - Installation rapide
2. `README.md` - Documentation complète
3. `DATABASE_SCHEMA.md` - Schéma visuel
4. `useful_queries.sql` - Exemples SQL

---

**✅ Base de données complète et prête à l'emploi !**

**Version :** 1.0.0  
**Date de création :** 13 Octobre 2025  
**Développé pour :** Auto-Service Platform - Plateforme de services automobiles

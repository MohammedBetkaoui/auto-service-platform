# 🗄️ Base de Données - Plateforme Auto-Service

## 📋 Description

Base de données MySQL pour la plateforme de services automobiles. Cette base gère les utilisateurs (clients et prestataires), les véhicules, les services, les commandes, les paiements, les avis et les notifications.

## 🏗️ Architecture

### Tables principales (7)
- **users** - Utilisateurs (clients, prestataires, admin)
- **vehicles** - Véhicules des prestataires
- **services** - Services proposés
- **orders** - Commandes/réservations
- **payments** - Paiements
- **reviews** - Avis clients
- **notifications** - Notifications utilisateurs

## 🚀 Installation

### Option 1 : Via MySQL Client (Recommandé)

1. **Ouvrir MySQL dans le terminal**
```powershell
mysql -u root -p
```

2. **Exécuter le script de création**
```sql
source c:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/create_database.sql
```

3. **Insérer les données de test**
```sql
source c:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/seed_data.sql
```

### Option 2 : Via phpMyAdmin

1. Ouvrir phpMyAdmin
2. Cliquer sur "Import"
3. Sélectionner `create_database.sql`
4. Cliquer sur "Go"
5. Répéter pour `seed_data.sql`

### Option 3 : Via ligne de commande

```powershell
# Créer la base de données
mysql -u root -p < c:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/create_database.sql

# Insérer les données de test
mysql -u root -p < c:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/seed_data.sql
```

## 📊 Structure des Tables

### 1. users
Stocke tous les utilisateurs de la plateforme.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| full_name | VARCHAR(100) | Nom complet |
| email | VARCHAR(120) | Email unique |
| phone | VARCHAR(20) | Téléphone |
| password_hash | VARCHAR(255) | Mot de passe haché |
| role | ENUM | client / worker / admin |
| is_verified | BOOLEAN | Email vérifié |
| created_at | DATETIME | Date de création |
| updated_at | DATETIME | Dernière modification |

### 2. vehicles
Véhicules appartenant aux prestataires.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| user_id | INT (FK) | Propriétaire (prestataire) |
| brand | VARCHAR(50) | Marque |
| model | VARCHAR(50) | Modèle |
| license_plate | VARCHAR(20) | Immatriculation |
| capacity | VARCHAR(20) | Capacité |
| is_available | BOOLEAN | Disponible |
| created_at | DATETIME | Date d'ajout |

### 3. services
Services proposés sur la plateforme.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| name | VARCHAR(100) | Nom du service |
| description | TEXT | Description |
| base_price | DECIMAL(10,2) | Prix de base |
| duration_estimate | VARCHAR(50) | Durée estimée |
| is_active | BOOLEAN | Service actif |

### 4. orders
Commandes de services.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| client_id | INT (FK) | Client |
| worker_id | INT (FK) | Prestataire |
| service_id | INT (FK) | Service demandé |
| vehicle_id | INT (FK) | Véhicule utilisé |
| status | ENUM | Statut de la commande |
| price | DECIMAL(10,2) | Prix final |
| location | VARCHAR(255) | Localisation |
| created_at | DATETIME | Date de création |
| updated_at | DATETIME | Dernière modification |

**Statuts possibles :** `pending`, `accepted`, `in_progress`, `completed`, `cancelled`

### 5. payments
Paiements pour les services.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| order_id | INT (FK) | Commande associée |
| amount | DECIMAL(10,2) | Montant |
| method | ENUM | Méthode de paiement |
| status | ENUM | Statut du paiement |
| transaction_id | VARCHAR(255) | ID de transaction |
| created_at | DATETIME | Date du paiement |

**Méthodes :** `card`, `cash`, `wallet`
**Statuts :** `pending`, `success`, `failed`

### 6. reviews
Avis des clients.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| order_id | INT (FK) | Commande évaluée |
| client_id | INT (FK) | Client auteur |
| worker_id | INT (FK) | Prestataire évalué |
| rating | INT | Note (1-5) |
| comment | TEXT | Commentaire |
| created_at | DATETIME | Date de l'avis |

### 7. notifications
Notifications pour les utilisateurs.

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT (PK) | Identifiant unique |
| user_id | INT (FK) | Destinataire |
| message | TEXT | Message |
| type | ENUM | Type de notification |
| is_read | BOOLEAN | Lu / non lu |
| created_at | DATETIME | Date d'envoi |

**Types :** `order`, `payment`, `system`

## 🔗 Relations

```
users (1) ──< (N) vehicles
users (1) ──< (N) orders (client)
users (1) ──< (N) orders (worker)
users (1) ──< (N) reviews (client)
users (1) ──< (N) reviews (worker)
users (1) ──< (N) notifications

services (1) ──< (N) orders
vehicles (1) ──< (N) orders

orders (1) ──< (N) payments
orders (1) ──< (1) reviews
```

## 🧪 Données de Test

Après l'exécution du script `seed_data.sql`, vous aurez :

- **9 utilisateurs**
  - 1 administrateur
  - 4 clients
  - 4 prestataires
- **8 services** (dépannage, remorquage, vidange, etc.)
- **7 véhicules** (pour les prestataires)
- **9 commandes** (différents statuts)
- **7 paiements** (succès, en attente, échoué)
- **4 avis** (notes 4-5 étoiles)
- **10 notifications**

### Comptes de test

**Admin:**
- Email: `admin@autoservice.com`
- Mot de passe: `password123`

**Client:**
- Email: `mohammed.alami@gmail.com`
- Mot de passe: `password123`

**Prestataire:**
- Email: `karim.mechanic@gmail.com`
- Mot de passe: `password123`

## 📝 Requêtes Utiles

Des requêtes SQL prêtes à l'emploi sont disponibles dans :
```
backend/database/queries/useful_queries.sql
```

### Exemples de requêtes :

**1. Lister toutes les commandes avec détails**
```sql
SELECT o.id, c.full_name AS client, w.full_name AS worker, 
       s.name AS service, o.status, o.price
FROM orders o
JOIN users c ON o.client_id = c.id
LEFT JOIN users w ON o.worker_id = w.id
JOIN services s ON o.service_id = s.id;
```

**2. Statistiques par prestataire**
```sql
SELECT u.full_name, 
       COUNT(o.id) AS total_orders,
       AVG(r.rating) AS avg_rating
FROM users u
LEFT JOIN orders o ON u.id = o.worker_id
LEFT JOIN reviews r ON u.id = r.worker_id
WHERE u.role = 'worker'
GROUP BY u.id;
```

**3. Commandes en attente**
```sql
SELECT o.id, c.full_name, s.name, o.location, o.created_at
FROM orders o
JOIN users c ON o.client_id = c.id
JOIN services s ON o.service_id = s.id
WHERE o.status = 'pending';
```

## 🔒 Sécurité

### Contraintes implémentées :
- ✅ Foreign Keys avec CASCADE et SET NULL appropriés
- ✅ Index sur les colonnes fréquemment interrogées
- ✅ UNIQUE sur l'email des utilisateurs
- ✅ CHECK constraint sur le rating (1-5)
- ✅ DEFAULT values pour les champs booléens et dates

### Recommandations :
- 🔐 Les mots de passe sont hachés avec bcrypt (salt rounds: 10)
- 🔐 Ne jamais exposer directement la BDD
- 🔐 Utiliser des requêtes préparées (TypeORM le fait automatiquement)
- 🔐 Limiter les privilèges MySQL par utilisateur

## 🛠️ Maintenance

### Vérifier l'intégrité
```sql
-- Vérifier les relations orphelines
SELECT * FROM orders WHERE client_id NOT IN (SELECT id FROM users);
SELECT * FROM vehicles WHERE user_id NOT IN (SELECT id FROM users);
```

### Nettoyer les anciennes notifications
```sql
-- Supprimer les notifications lues de plus de 30 jours
DELETE FROM notifications 
WHERE is_read = TRUE 
  AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

### Backup
```powershell
# Sauvegarder la base de données
mysqldump -u root -p auto_service_platform > backup_$(date +%Y%m%d).sql

# Restaurer
mysql -u root -p auto_service_platform < backup_20250113.sql
```

## 📈 Index créés

Pour optimiser les performances :
```sql
-- Sur users
INDEX idx_email (email)
INDEX idx_role (role)

-- Sur orders
INDEX idx_client_id (client_id)
INDEX idx_worker_id (worker_id)
INDEX idx_status (status)
INDEX idx_created_at (created_at)

-- Sur vehicles
INDEX idx_user_id (user_id)
INDEX idx_is_available (is_available)

-- Sur notifications
INDEX idx_user_id (user_id)
INDEX idx_is_read (is_read)
INDEX idx_created_at (created_at)
```

## 🔄 Migrations futures

Pour ajouter de nouvelles fonctionnalités, créez des fichiers de migration dans :
```
backend/database/migrations/
```

Nommage : `YYYYMMDD_description.sql`

Exemple : `20250114_add_rating_to_services.sql`

## 📞 Support

Pour toute question sur la structure de la base de données, consultez :
- **Schema visuel :** `DATABASE_SCHEMA.md`
- **Entités TypeORM :** `backend/src/entities/`
- **Requêtes utiles :** `backend/database/queries/useful_queries.sql`

---

**Version :** 1.0.0  
**Dernière mise à jour :** 13 Octobre 2025

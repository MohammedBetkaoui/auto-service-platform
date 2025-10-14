# 🚀 Guide Rapide - Installation de la Base de Données

## Installation en 3 étapes

### ✨ Méthode 1 : Script PowerShell Automatique (Recommandé)

```powershell
cd backend/database
.\install.ps1
```

Suivez les instructions à l'écran. Le script va :
- ✅ Vérifier MySQL
- ✅ Créer la base de données
- ✅ Insérer les données de test
- ✅ Afficher les statistiques

---

### 🔧 Méthode 2 : Manuelle via MySQL

#### Étape 1 : Ouvrir MySQL
```powershell
mysql -u root -p
```

#### Étape 2 : Exécuter les scripts
```sql
source C:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/create_database.sql

source C:/Users/HP/OneDrive/Desktop/auto-service-platform/backend/database/migrations/seed_data.sql
```

#### Étape 3 : Vérifier
```sql
USE auto_service_platform;
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

---

### 🌐 Méthode 3 : Via phpMyAdmin (XAMPP)

1. Ouvrir http://localhost/phpmyadmin
2. Aller dans l'onglet **Import**
3. Sélectionner `create_database.sql`
4. Cliquer sur **Go**
5. Répéter pour `seed_data.sql`

---

## 🔐 Comptes de Test

Après l'installation, utilisez ces comptes :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| **Admin** | admin@autoservice.com | password123 |
| **Client** | mohammed.alami@gmail.com | password123 |
| **Prestataire** | karim.mechanic@gmail.com | password123 |

---

## 📊 Vérification

### Vérifier que tout fonctionne :

```sql
USE auto_service_platform;

-- Nombre de tables
SHOW TABLES;

-- Statistiques rapides
SELECT 'Users' as Type, COUNT(*) as Count FROM users
UNION ALL SELECT 'Orders', COUNT(*) FROM orders
UNION ALL SELECT 'Services', COUNT(*) FROM services;
```

**Résultat attendu :**
- 7 tables créées
- 9 utilisateurs
- 9 commandes
- 8 services

---

## ⚙️ Configuration Backend

### Mettre à jour le fichier `.env` :

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=auto_service_platform
```

---

## 🛠️ Commandes Utiles

### Sauvegarder la BDD
```powershell
mysqldump -u root -p auto_service_platform > backup.sql
```

### Restaurer la BDD
```powershell
mysql -u root -p auto_service_platform < backup.sql
```

### Supprimer la BDD
```sql
DROP DATABASE auto_service_platform;
```

### Réinstaller tout
```powershell
cd backend/database
.\install.ps1
# Choisir l'option 2 (Créer BDD + données de test)
```

---

## 📚 Documentation Complète

- **README complet** : `backend/database/README.md`
- **Schéma visuel** : `backend/DATABASE_SCHEMA.md`
- **Entités TypeORM** : `backend/src/entities/`
- **Requêtes SQL** : `backend/database/queries/useful_queries.sql`

---

## ❓ Problèmes Courants

### ❌ "MySQL n'est pas reconnu"

**Solution :** Ajouter MySQL au PATH
```powershell
# Ajouter ceci au PATH système :
C:\xampp\mysql\bin
# ou
C:\Program Files\MySQL\MySQL Server 8.0\bin
```

### ❌ "Access denied for user 'root'"

**Solution :** Vérifier le mot de passe MySQL dans XAMPP ou MySQL Workbench

### ❌ "Database already exists"

**Solution :** Supprimer d'abord la base existante
```sql
DROP DATABASE IF EXISTS auto_service_platform;
```

---

## 🎯 Prochaines Étapes

1. ✅ Base de données installée
2. ⚙️ Configurer le backend NestJS
3. 🚀 Lancer le serveur : `npm run start:dev`
4. 🧪 Tester l'API avec Postman
5. 🎨 Connecter le frontend React

---

**Version :** 1.0.0  
**Date :** 13 Octobre 2025  
**Support :** Consultez `backend/database/README.md` pour plus d'aide

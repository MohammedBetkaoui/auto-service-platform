# 🚀 Backend - Plateforme Auto-Service

API REST développée avec NestJS et TypeORM pour la plateforme de services automobiles.

## 📋 Prérequis

- Node.js >= 18.x
- npm >= 9.x
- MySQL >= 8.0 ou MariaDB >= 10.5
- Git

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/MohammedBetkaoui/auto-service-platform.git
cd auto-service-platform/backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Le fichier `.env` existe déjà, vérifiez et modifiez si nécessaire :
```env
# Application
NODE_ENV=development
PORT=3000

# Frontend
FRONTEND_URL=http://localhost:5173

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=votre_mot_de_passe
DB_NAME=auto_service_platform

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars
JWT_EXPIRATION=24h

# Security
BCRYPT_SALT_ROUNDS=10
```

### 4. Créer la base de données
```powershell
# Option 1 : Script automatique
cd database
.\install.ps1

# Option 2 : MySQL CLI
mysql -u root -p < database/migrations/create_database.sql
mysql -u root -p < database/migrations/seed_data.sql
```

### 5. Lancer l'application
```bash
# Mode développement (avec rechargement automatique)
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

L'API sera accessible sur : **http://localhost:3000/api**

## 📁 Structure du Projet

```
backend/
├── database/                    # Base de données
│   ├── migrations/             # Scripts SQL
│   │   ├── create_database.sql
│   │   ├── seed_data.sql
│   │   └── drop_database.sql
│   ├── queries/                # Requêtes SQL utiles
│   │   └── useful_queries.sql
│   ├── install.ps1             # Script d'installation
│   ├── README.md               # Documentation BDD
│   └── QUICK_START.md          # Guide rapide
├── src/
│   ├── entities/               # Entités TypeORM
│   │   ├── user.entity.ts
│   │   ├── vehicle.entity.ts
│   │   ├── service.entity.ts
│   │   ├── order.entity.ts
│   │   ├── payment.entity.ts
│   │   ├── review.entity.ts
│   │   ├── notification.entity.ts
│   │   └── index.ts
│   ├── app.module.ts           # Module principal
│   └── main.ts                 # Point d'entrée
├── .env                        # Variables d'environnement
├── package.json                # Dépendances
├── tsconfig.json               # Configuration TypeScript
└── nest-cli.json               # Configuration NestJS
```

## 🗄️ Base de Données

### Tables (7)
1. **users** - Utilisateurs (clients, prestataires, admin)
2. **vehicles** - Véhicules des prestataires
3. **services** - Services proposés
4. **orders** - Commandes/réservations
5. **payments** - Paiements
6. **reviews** - Avis clients
7. **notifications** - Notifications

### Documentation complète
- **database/README.md** - Guide complet de la base de données
- **database/QUICK_START.md** - Installation rapide
- **DATABASE_SCHEMA.md** - Schéma visuel des relations

## 🔐 Comptes de Test

Après l'installation de la base de données :

| Rôle | Email | Mot de passe |
|------|-------|--------------|
| Admin | admin@autoservice.com | password123 |
| Client | mohammed.alami@gmail.com | password123 |
| Prestataire | karim.mechanic@gmail.com | password123 |

## 📝 Scripts NPM

```bash
# Développement
npm run start          # Démarrer l'application
npm run start:dev      # Démarrer avec rechargement automatique
npm run start:debug    # Démarrer en mode debug

# Production
npm run build          # Compiler le projet
npm run start:prod     # Démarrer en production

# Tests
npm run test           # Lancer les tests
npm run test:watch     # Tests en mode watch
npm run test:cov       # Tests avec couverture

# Qualité du code
npm run lint           # Linter le code
npm run format         # Formater le code
```

## 🛠️ Technologies

- **Framework** : NestJS 10.x
- **ORM** : TypeORM 0.3.x
- **Database** : MySQL / MariaDB
- **Validation** : class-validator, class-transformer
- **Auth** : JWT, Passport
- **Security** : bcrypt
- **Language** : TypeScript 5.x

## 📊 API Endpoints (À venir)

```
# Authentification
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/profile

# Utilisateurs
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id

# Services
GET    /api/services
GET    /api/services/:id
POST   /api/services (admin)
PUT    /api/services/:id (admin)
DELETE /api/services/:id (admin)

# Commandes
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders
PUT    /api/orders/:id
DELETE /api/orders/:id

# Paiements
GET    /api/payments
GET    /api/payments/:id
POST   /api/payments

# Avis
GET    /api/reviews
GET    /api/reviews/:id
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id

# Notifications
GET    /api/notifications
PUT    /api/notifications/:id/read
DELETE /api/notifications/:id
```

## 🔒 Sécurité

- ✅ Mots de passe hachés avec bcrypt
- ✅ Authentification JWT
- ✅ Validation des données (class-validator)
- ✅ CORS configuré
- ✅ Variables d'environnement sécurisées
- ✅ Requêtes préparées (TypeORM)

## 🐛 Debugging

### Vérifier la connexion à la BDD
```bash
npm run start:dev
```
Recherchez dans les logs :
```
🚀 Application is running on: http://localhost:3000/api
```

### Tester la connexion MySQL
```bash
mysql -u root -p -e "USE auto_service_platform; SHOW TABLES;"
```

### Logs détaillés
Activez le logging dans `app.module.ts` :
```typescript
logging: true,  // Affiche toutes les requêtes SQL
```

## 🔄 Maintenance

### Backup de la BDD
```powershell
mysqldump -u root -p auto_service_platform > backup_$(Get-Date -Format "yyyyMMdd").sql
```

### Restaurer la BDD
```powershell
mysql -u root -p auto_service_platform < backup_20251013.sql
```

### Réinitialiser la BDD
```powershell
cd database
mysql -u root -p < migrations/drop_database.sql
mysql -u root -p < migrations/create_database.sql
mysql -u root -p < migrations/seed_data.sql
```

## 📚 Prochaines Étapes

1. ✅ Base de données installée
2. ✅ Entités TypeORM créées
3. ✅ Configuration NestJS
4. ⏳ Créer les modules (auth, users, orders, etc.)
5. ⏳ Créer les contrôleurs
6. ⏳ Créer les services
7. ⏳ Ajouter les DTOs
8. ⏳ Ajouter les guards JWT
9. ⏳ Tests unitaires
10. ⏳ Documentation Swagger

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📞 Support

- **Documentation BDD** : `database/README.md`
- **Guide rapide** : `database/QUICK_START.md`
- **Schéma** : `DATABASE_SCHEMA.md`

## 📄 Licence

MIT

---

**Développé avec ❤️ pour la plateforme Auto-Service**

# 🔐 Module d'Authentification - Documentation Complète

## 📋 Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture](#architecture)
3. [Installation](#installation)
4. [Endpoints API](#endpoints-api)
5. [Exemples d'utilisation](#exemples-dutilisation)
6. [Sécurité](#sécurité)
7. [Guards et Décorateurs](#guards-et-décorateurs)
8. [Tests](#tests)

---

## 🎯 Vue d'ensemble

Module d'authentification robuste et sécurisé permettant :
- ✅ Inscription (register) avec validation stricte
- ✅ Connexion (login) avec JWT
- ✅ Gestion des rôles (client, worker, admin)
- ✅ Refresh token (7 jours)
- ✅ Vérification d'email
- ✅ Récupération de mot de passe
- ✅ Protection des routes
- ✅ Rate limiting (à implémenter)

---

## 🏗️ Architecture

```
src/
├── auth/
│   ├── auth.controller.ts       # Endpoints API
│   ├── auth.service.ts          # Logique métier
│   ├── auth.module.ts           # Configuration du module
│   ├── dto/                     # Data Transfer Objects
│   │   ├── register.dto.ts
│   │   ├── login.dto.ts
│   │   ├── refresh-token.dto.ts
│   │   ├── forgot-password.dto.ts
│   │   └── reset-password.dto.ts
│   ├── strategies/              # Stratégies Passport
│   │   ├── jwt.strategy.ts
│   │   └── local.strategy.ts
│   ├── guards/                  # Guards NestJS
│   │   ├── jwt-auth.guard.ts
│   │   ├── local-auth.guard.ts
│   │   └── roles.guard.ts
│   └── decorators/              # Décorateurs personnalisés
│       ├── roles.decorator.ts
│       └── current-user.decorator.ts
├── users/
│   ├── users.service.ts
│   └── users.module.ts
└── entities/
    └── user.entity.ts
```

---

## 📦 Installation

### 1. Dépendances déjà installées ✅

```bash
npm install @nestjs/passport passport passport-jwt passport-local
npm install @nestjs/jwt bcrypt
npm install class-validator class-transformer
npm install @types/bcrypt @types/passport-jwt @types/passport-local
```

### 2. Configuration `.env`

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars_2025_autoservice
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_in_production_64_chars_long_2025
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Security
BCRYPT_SALT_ROUNDS=12
```

---

## 🌐 Endpoints API

### 1. **POST** `/api/auth/register` - Inscription

**Requête :**
```json
{
  "full_name": "Ahmed Benali",
  "email": "ahmed@gmail.com",
  "password": "MyStrongPass123!",
  "phone": "+212667000111",
  "role": "client"
}
```

**Validation :**
- `full_name` : 3-100 caractères
- `email` : Format email valide
- `password` : 8+ caractères, 1 majuscule, 1 minuscule, 1 chiffre
- `phone` : 10-20 caractères
- `role` : `client`, `worker`, ou `admin`

**Réponse (201) :**
```json
{
  "message": "Compte créé avec succès. Veuillez vérifier votre e-mail pour activer votre compte.",
  "user": {
    "id": 10,
    "full_name": "Ahmed Benali",
    "email": "ahmed@gmail.com",
    "role": "client"
  }
}
```

**Erreurs possibles :**
- `409 Conflict` : Email déjà utilisé
- `400 Bad Request` : Données invalides

---

### 2. **POST** `/api/auth/login` - Connexion

**Requête :**
```json
{
  "email": "ahmed@gmail.com",
  "password": "MyStrongPass123!"
}
```

**Réponse (200) :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 10,
    "full_name": "Ahmed Benali",
    "email": "ahmed@gmail.com",
    "role": "client",
    "is_verified": true
  }
}
```

**Erreurs possibles :**
- `401 Unauthorized` : Email ou mot de passe incorrect
- `401 Unauthorized` : Compte non vérifié

---

### 3. **POST** `/api/auth/refresh` - Rafraîchir le token

**Requête :**
```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Réponse (200) :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 4. **POST** `/api/auth/logout` - Déconnexion

**Headers :**
```
Authorization: Bearer <access_token>
```

**Réponse (200) :**
```json
{
  "message": "Déconnexion réussie"
}
```

---

### 5. **GET** `/api/auth/verify?token=xxx` - Vérifier l'email

**Réponse (200) :**
```json
{
  "message": "Compte vérifié avec succès. Vous pouvez maintenant vous connecter."
}
```

**Erreurs possibles :**
- `400 Bad Request` : Token invalide ou expiré

---

### 6. **POST** `/api/auth/forgot-password` - Mot de passe oublié

**Requête :**
```json
{
  "email": "ahmed@gmail.com"
}
```

**Réponse (200) :**
```json
{
  "message": "Si cet email existe, vous recevrez un lien de réinitialisation."
}
```

---

### 7. **POST** `/api/auth/reset-password` - Réinitialiser le mot de passe

**Requête :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "new_password": "MyNewPassword123!"
}
```

**Réponse (200) :**
```json
{
  "message": "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter."
}
```

---

### 8. **GET** `/api/auth/profile` - Profil utilisateur

**Headers :**
```
Authorization: Bearer <access_token>
```

**Réponse (200) :**
```json
{
  "id": 10,
  "email": "ahmed@gmail.com",
  "role": "client"
}
```

---

## 💡 Exemples d'utilisation

### Frontend (React/Angular/Vue)

#### 1. Inscription
```typescript
const register = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: 'Ahmed Benali',
        email: 'ahmed@gmail.com',
        password: 'MyStrongPass123!',
        phone: '+212667000111',
        role: 'client',
      }),
    });
    
    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
  }
};
```

#### 2. Connexion
```typescript
const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'ahmed@gmail.com',
        password: 'MyStrongPass123!',
      }),
    });
    
    const data = await response.json();
    
    // Stocker les tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('user', JSON.stringify(data.user));
  } catch (error) {
    console.error('Erreur de connexion:', error);
  }
};
```

#### 3. Requête avec token
```typescript
const getProfile = async () => {
  const token = localStorage.getItem('access_token');
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    const data = await response.json();
    console.log('Profil:', data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

#### 4. Refresh token
```typescript
const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  
  try {
    const response = await fetch('http://localhost:3000/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token }),
    });
    
    const data = await response.json();
    
    // Mettre à jour les tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
  } catch (error) {
    console.error('Erreur de refresh:', error);
    // Rediriger vers la page de connexion
  }
};
```

---

## 🔐 Sécurité

### Mesures implémentées :

| Mesure | Status | Description |
|--------|--------|-------------|
| ✅ Hash bcrypt | Implémenté | Salt rounds: 12 |
| ✅ JWT double token | Implémenté | Access (15min) + Refresh (7j) |
| ✅ Validation stricte | Implémenté | class-validator sur tous les DTOs |
| ✅ Pas de données sensibles | Implémenté | Mot de passe jamais retourné |
| ✅ CORS configuré | Implémenté | Uniquement frontend autorisé |
| ✅ Vérification email | Implémenté | Token avec expiration 24h |
| ✅ Reset password | Implémenté | Token avec expiration 1h |
| ⏳ Rate limiting | À implémenter | 5 tentatives/min |
| ⏳ Logs d'audit | À implémenter | IP + date des connexions |
| ⏳ Helmet | À implémenter | Sécuriser les headers HTTP |

### Recommandations :

1. **En production**, changez les secrets JWT :
```env
JWT_SECRET=générez_un_secret_très_long_et_aléatoire_64_caractères_minimum
JWT_REFRESH_SECRET=un_autre_secret_différent_très_long_et_aléatoire
```

2. **Rate Limiting** (à ajouter) :
```bash
npm install @nestjs/throttler
```

3. **Helmet** (à ajouter) :
```bash
npm install helmet
```

---

## 🛡️ Guards et Décorateurs

### 1. JwtAuthGuard - Protection des routes

```typescript
@Controller('orders')
export class OrdersController {
  @Get()
  @UseGuards(JwtAuthGuard)  // ✅ Nécessite un token valide
  findAll() {
    return this.ordersService.findAll();
  }
}
```

### 2. RolesGuard - Contrôle d'accès par rôle

```typescript
@Controller('admin')
export class AdminController {
  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)  // ✅ Seulement pour les admins
  getAllUsers() {
    return this.usersService.findAll();
  }
}
```

### 3. @CurrentUser() - Récupérer l'utilisateur connecté

```typescript
@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getMyProfile(@CurrentUser() user: any) {
    // user contient : { id, email, role }
    return this.usersService.findOne(user.id);
  }
}
```

### 4. Combinaison de guards

```typescript
@Controller('workers')
export class WorkersController {
  @Get('dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER, UserRole.ADMIN)  // ✅ Worker OU Admin
  getDashboard(@CurrentUser() user: any) {
    return this.workersService.getDashboard(user.id);
  }
}
```

---

## 🧪 Tests

### Test avec Postman

#### 1. Inscription
```
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "full_name": "Test User",
  "email": "test@example.com",
  "password": "TestPass123!",
  "phone": "+212600000000",
  "role": "client"
}
```

#### 2. Connexion
```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "mohammed.alami@gmail.com",
  "password": "password123"
}
```

#### 3. Profil (avec token)
```
GET http://localhost:3000/api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Test avec cURL

```bash
# Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!",
    "phone": "+212600000000",
    "role": "client"
  }'

# Connexion
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mohammed.alami@gmail.com",
    "password": "password123"
  }'
```

---

## 📊 Flux d'authentification

```
┌─────────────┐
│   CLIENT    │
└──────┬──────┘
       │
       │ 1. POST /auth/register
       │    { email, password, ... }
       ▼
┌─────────────────┐
│   AUTH SERVICE  │
└────────┬────────┘
         │
         │ 2. Hash password (bcrypt)
         │ 3. Create user in DB
         │ 4. Generate verification token
         │
         ▼
┌─────────────────┐
│   RESPONSE      │
│ "Vérifiez votre │
│   email"        │
└─────────────────┘
         │
         │ 5. User clique sur le lien
         │    GET /auth/verify?token=xxx
         ▼
┌─────────────────┐
│ Compte vérifié  │
└─────────────────┘
         │
         │ 6. POST /auth/login
         │    { email, password }
         ▼
┌─────────────────┐
│   JWT TOKENS    │
│ - access_token  │
│ - refresh_token │
└─────────────────┘
         │
         │ 7. Requests avec Authorization: Bearer <token>
         ▼
┌─────────────────┐
│ Protected Route │
│   JwtAuthGuard  │
│   RolesGuard    │
└─────────────────┘
```

---

## 🚀 Prochaines étapes

1. ✅ Module Auth créé
2. ⏳ Ajouter Rate Limiting
3. ⏳ Ajouter service d'envoi d'emails
4. ⏳ Ajouter logs d'audit
5. ⏳ Ajouter Helmet
6. ⏳ Tests unitaires et E2E
7. ⏳ Documentation Swagger

---

## 📞 Support

Pour toute question sur l'authentification :
- Consultez ce fichier : `AUTH_MODULE.md`
- Backend README : `backend/README.md`
- Database : `database/README.md`

---

**✨ Module d'authentification complet et sécurisé !**

**Version :** 1.0.0  
**Date :** 13 Octobre 2025  
**Status :** ✅ OPÉRATIONNEL

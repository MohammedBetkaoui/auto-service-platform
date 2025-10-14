# 📊 Diagramme de la Base de Données

## Structure des Tables et Relations

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USERS                                       │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • full_name                                                              │
│ • email (UNIQUE)                                                         │
│ • phone                                                                  │
│ • password_hash                                                          │
│ • role (ENUM: client, worker, admin)                                    │
│ • is_verified                                                            │
│ • created_at                                                             │
│ • updated_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘
        │                │              │              │             │
        │ 1              │ 1            │ 1            │ 1           │ 1
        │                │              │              │             │
        │ *              │ *            │ *            │ *           │ *
┌───────▼──────┐  ┌──────▼──────┐  ┌──▼──────┐  ┌───▼──────┐  ┌───▼──────────┐
│   VEHICLES   │  │   ORDERS    │  │ ORDERS  │  │ REVIEWS  │  │NOTIFICATIONS │
│   (worker)   │  │  (client)   │  │(worker) │  │ (client) │  │              │
└──────────────┘  └─────────────┘  └─────────┘  └──────────┘  └──────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                            VEHICLES                                      │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • user_id (FK → users.id) [CASCADE]                                     │
│ • brand                                                                  │
│ • model                                                                  │
│ • license_plate                                                          │
│ • capacity                                                               │
│ • is_available                                                           │
│ • created_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1
                              │
                              │ *
                         ┌────▼──────┐
                         │  ORDERS   │
                         └───────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                            SERVICES                                      │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • name                                                                   │
│ • description                                                            │
│ • base_price                                                             │
│ • duration_estimate                                                      │
│ • is_active                                                              │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │ 1
                              │
                              │ *
                         ┌────▼──────┐
                         │  ORDERS   │
                         └───────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                             ORDERS                                       │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • client_id (FK → users.id) [CASCADE]                                   │
│ • worker_id (FK → users.id) [SET NULL]                                  │
│ • service_id (FK → services.id) [CASCADE]                               │
│ • vehicle_id (FK → vehicles.id) [SET NULL]                              │
│ • status (ENUM: pending, accepted, in_progress, completed, cancelled)   │
│ • price                                                                  │
│ • location                                                               │
│ • created_at                                                             │
│ • updated_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘
        │                              │
        │ 1                            │ 1
        │                              │
        │ *                            │ 1
┌───────▼────────┐              ┌──────▼────────┐
│   PAYMENTS     │              │   REVIEWS     │
└────────────────┘              └───────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                            PAYMENTS                                      │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • order_id (FK → orders.id) [CASCADE]                                   │
│ • amount                                                                 │
│ • method (ENUM: card, cash, wallet)                                     │
│ • status (ENUM: pending, success, failed)                               │
│ • transaction_id                                                         │
│ • created_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                            REVIEWS                                       │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • order_id (FK → orders.id) [CASCADE] [ONE-TO-ONE]                      │
│ • client_id (FK → users.id) [CASCADE]                                   │
│ • worker_id (FK → users.id) [CASCADE]                                   │
│ • rating (1-5)                                                           │
│ • comment                                                                │
│ • created_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                          NOTIFICATIONS                                   │
│─────────────────────────────────────────────────────────────────────────│
│ • id (PK)                                                                │
│ • user_id (FK → users.id) [CASCADE]                                     │
│ • message                                                                │
│ • type (ENUM: order, payment, system)                                   │
│ • is_read                                                                │
│ • created_at                                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🔗 Résumé des Relations

### 1. **USERS** (Table centrale)
- **1:N** avec **VEHICLES** (un prestataire a plusieurs véhicules)
- **1:N** avec **ORDERS** (en tant que client)
- **1:N** avec **ORDERS** (en tant que worker/prestataire)
- **1:N** avec **REVIEWS** (en tant que client)
- **1:N** avec **REVIEWS** (en tant que worker)
- **1:N** avec **NOTIFICATIONS**

### 2. **VEHICLES**
- **N:1** avec **USERS** (appartient à un prestataire)
- **1:N** avec **ORDERS** (utilisé dans plusieurs commandes)

### 3. **SERVICES**
- **1:N** avec **ORDERS** (un service peut être dans plusieurs commandes)

### 4. **ORDERS** (Table pivot centrale)
- **N:1** avec **USERS** (client)
- **N:1** avec **USERS** (worker)
- **N:1** avec **SERVICES**
- **N:1** avec **VEHICLES**
- **1:N** avec **PAYMENTS**
- **1:1** avec **REVIEWS**

### 5. **PAYMENTS**
- **N:1** avec **ORDERS**

### 6. **REVIEWS**
- **1:1** avec **ORDERS**
- **N:1** avec **USERS** (client)
- **N:1** avec **USERS** (worker)

### 7. **NOTIFICATIONS**
- **N:1** avec **USERS**

## 🔒 Stratégies de Suppression

- **CASCADE** : Supprime les enregistrements liés
  - users → vehicles
  - users → orders (client)
  - users → reviews
  - users → notifications
  - orders → payments
  - orders → reviews
  - services → orders

- **SET NULL** : Met la clé étrangère à NULL
  - users → orders (worker) - si un prestataire est supprimé
  - vehicles → orders - si un véhicule est supprimé

## 📝 Index Recommandés

```sql
-- Pour les recherches fréquentes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_client_id ON orders(client_id);
CREATE INDEX idx_orders_worker_id ON orders(worker_id);
CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_reviews_worker_id ON reviews(worker_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
```

# Auto Service Platform — Backend

This README documents the backend code, architecture and developer instructions for the Auto Service Platform project (NestJS + TypeORM + MySQL + Socket.io).

This file summarizes the backend logic, important modules, database migrations, WebSocket namespaces, environment variables and quick start commands.

---

## Table of contents

- Overview
- Project layout
- Main modules and responsibilities
- REST endpoints (high-level)
- WebSocket namespaces & events
- Database & migrations
- Environment variables
- Local development (build / run)
- Tests
- Notes, recommendations and next steps

---

## Overview

The backend is a NestJS application using TypeORM to access a MySQL/MariaDB database. It provides authentication (JWT), user management, vehicle and service catalogs, order lifecycle management, payments and notifications. Real-time features (tracking, notifications, chat) are implemented using Socket.io (NestJS WebSocket gateways).

Key goals:
- Correct domain modeling for Orders, Users, Vehicles, Services.
- Real-time updates for orders, notifications and chat.
- Secure flows using JWT + role-based guards.
- Persisted history for orders, messages and notifications.

---

## Project layout (important folders)

- `backend/` — NestJS app
  - `src/` — source code
    - `auth/` — auth module, DTOs, guards, strategies
    - `users/` — user module, controller, service
    - `vehicles/` — vehicle module
    - `services/` — services & pricing
    - `orders/` — order management, tracking, gateway
    - `reviews/` — ratings & reviews service
    - `notifications/` — notifications module & gateway
    - `chat/` — chat module (gateway, service, controllers, entities)
    - `entities/` — TypeORM entities (User, Vehicle, Order, Payment, Review, Notification, Conversation, Message, etc.)
    - `main.ts` — app bootstrap and global middleware/pipes
  - `database/migrations/` — SQL migration files (create_database.sql, chat migration, ...)
  - `package.json` — npm scripts

- `frontend/` — (separate React app)

---

## Main modules and responsibilities

- Auth Module (`src/auth`)
  - Register / login / refresh / logout
  - JWT generation and validation
  - Local / JWT guards and strategies

- Users Module (`src/users`)
  - Profile management, avatar uploads (Multer), availability/status
  - Admin user management endpoints

- Vehicles Module (`src/vehicles`)
  - Vehicle CRUD for providers, admin approval flow, availability toggles

- Services Module (`src/services`)
  - Service catalog and `service_pricing` for region & vehicle type pricing

- Orders Module (`src/orders`)
  - Full order lifecycle: create (pending), accept, start, complete, cancel
  - Tracking: `order_tracking` table + WebSocket gateway for realtime location updates
  - Payments integration hook points on completion

- Reviews Module (`src/reviews`)
  - Create review (one per order), summary rating table (`ratings_summary`)
  - Update provider/service/vehicle ratings

- Notifications Module (`src/notifications`)
  - Persisted notifications, REST endpoints for history, Socket.io gateway to push notifications

- Chat Module (`src/chat`)
  - Conversations, messages and attachments
  - Chat gateway (`/chat`) with events: `register`, `message:new`, `message:seen` and rooms per conversation

---

## REST endpoints — high level

All endpoints are prefixed with `/api` (global prefix in `main.ts`). Below is a high-level overview — see controllers in `src/*` for details and DTOs.

- `POST /api/auth/register` — register
- `POST /api/auth/login` — login
- `POST /api/auth/refresh` — refresh tokens
- `GET /api/auth/profile` — get current user

- Users
  - `GET /api/users/me` — profile
  - `PATCH /api/users/update-profile` — update
  - `PATCH /api/users/update-password` — change password
  - `POST /api/users/upload-avatar` — upload avatar
  - Admin: `/api/admin/users` endpoints

- Vehicles
  - `POST /api/vehicles` — create (provider)
  - `GET /api/vehicles/my` — list provider vehicles
  - `PATCH /api/vehicles/:id` — update
  - Admin: `/api/admin/vehicles` endpoints

- Services
  - `GET /api/services` — list public services
  - Admin: `/api/admin/services` endpoints
  - `POST /api/admin/services/:id/pricing` — add pricing entry

- Orders
  - `POST /api/orders` — create order (client)
  - `PATCH /api/orders/:id/accept` — provider accept
  - `PATCH /api/orders/:id/start` — provider start
  - `PATCH /api/orders/:id/complete` — provider complete
  - `PATCH /api/orders/:id/cancel` — cancel (client/provider/admin)
  - Admin: `/api/admin/orders` endpoints

- Reviews
  - `POST /api/reviews` — create review (client, after order completed)
  - `GET /api/reviews/my` — my reviews
  - `GET /api/reviews/received` — provider received
  - `PATCH /api/reviews/:id/report` — report abuse

- Notifications
  - `GET /api/notifications` — list user's notifications
  - `PATCH /api/notifications/:id/read` — mark read
  - `PATCH /api/notifications/mark-all-read` — mark all
  - `DELETE /api/notifications/:id` — delete

- Chat
  - `POST /api/conversations` — create or get conversation
  - `GET /api/conversations` — list user conversations
  - `GET /api/conversations/:id/messages` — list messages (pagination)
  - `POST /api/conversations/:id/messages` — send message (fallback REST)

---

## WebSocket namespaces & events

The app exposes several namespaces for real-time features. Each gateway authenticates/validates tokens on connect (should be implemented):

- `/orders` — order tracking and order events
  - events: `location:update`, `status:update`, `order_created`, `order_accepted`, etc.

- `/notifications` — push notifications
  - events: `notification` (server -> client), `register` (client -> server to join room)
  - rooms: `user_{id}`

- `/chat` — messaging
  - events: `register`, `message:new`, `message:seen`, `conversation:updated`
  - rooms: `conversation_{id}` and `user_{id}`

All socket events should be authenticated using JWT; attach token to handshake or pass via initial `register` event.

---

## Database & migrations

- SQL migrations are in `backend/database/migrations/`.
  - `create_database.sql` — initial dump (base schema)
  - `20251018_create_chat_schema.sql` — new chat tables

- Entities are under `src/entities/` — keep in sync with migrations.
- TypeORM `synchronize` is intentionally set to `false` for production. Use migrations for schema changes.

---

## Environment variables

Place a `.env` file or set these in your environment before running the app:

```
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=auto_service_platform

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
REFRESH_TOKEN_SECRET=your_refresh_secret

# Bcrypt
BCRYPT_SALT_ROUNDS=12

# App
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

## Local development (PowerShell)

From project root run:

```powershell
# install deps (if not already)
npm --prefix backend install

# build the backend
npm --prefix backend run build

# run in development
npm --prefix backend run start:dev
```

If you prefer to run from within `backend` folder:

```powershell
cd backend
npm install
npm run build
npm run start:dev
```

---

## Tests

No comprehensive tests are included yet. Recommended tests to add:
- Unit tests for services: OrdersService, ChatService, ReviewsService
- e2e tests for auth flows and protected routes (supertest + Jest)
- Gateway integration tests using socket.io-client

---

## Notes, recommendations and next steps

- Socket auth: validate JWT during socket handshake and use Redis for scaled socket rooms across processes.
- Use Redis (adapter) for socket broadcasting if you run multiple instances.
- Offload file uploads to S3/Cloudinary for scalability and security; store only URL in DB.
- Implement rate-limiting on gateways to prevent spam/DDoS.
- Add a background provider (BullMQ) for async tasks (notifications delivery, emails, cleanup).
- Add TypeORM migrations (ts) for each schema change and version them in `database/migrations`.

---

If you want, I can:
- Add OpenAPI (Swagger) decorators and expose `/api-docs`.
- Generate TypeORM migration TS files for the recent schema changes.
- Create e2e tests for critical flows (auth -> create order -> accept -> complete).



---

_Last updated: 2025-10-18_

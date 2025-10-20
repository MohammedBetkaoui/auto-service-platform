-- ============================================================
-- Script d'Insertion de Données de Test
-- Plateforme Auto-Service
-- ============================================================

USE auto_service_platform;

-- ============================================================
-- 1. Insertion des utilisateurs (mot de passe: "password123")
-- Hash bcrypt pour "password123" avec 10 rounds
-- ============================================================
INSERT INTO users (full_name, email, phone, password_hash, role, is_verified) VALUES
-- Administrateur
('Admin Principal', 'admin@autoservice.com', '+212600000001', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'admin', TRUE),

-- Clients
('Mohammed Alami', 'mohammed.alami@gmail.com', '+212600111111', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'client', TRUE),
('Fatima Zahra', 'fatima.zahra@gmail.com', '+212600222222', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'client', TRUE),
('Youssef Bennani', 'youssef.bennani@gmail.com', '+212600333333', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'client', TRUE),
('Amina El Fassi', 'amina.elfassi@gmail.com', '+212600444444', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'client', FALSE),

-- Prestataires (providers)
('Karim Mechanic', 'karim.mechanic@gmail.com', '+212600555555', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'provider', TRUE),
('Hassan Towing', 'hassan.towing@gmail.com', '+212600666666', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'provider', TRUE),
('Rachid Carwash', 'rachid.carwash@gmail.com', '+212600777777', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'provider', TRUE),
('Omar Service', 'omar.service@gmail.com', '+212600888888', '$2b$10$rKvVZQk5XkJxLMQXvxVzLuYmZH7xJ8KqNH6p.ZVxLQXvxVzLuYmZH', 'provider', TRUE);

-- ============================================================
-- 2. Insertion des services
-- ============================================================
INSERT INTO services (name, description, base_price, duration_estimate, is_active) VALUES
('Dépannage Mécanique', 'Réparation et diagnostic mécanique sur place', 300.00, '1-2 heures', TRUE),
('Remorquage', 'Service de remorquage disponible 24/7', 250.00, '30 minutes', TRUE),
('Changement de Pneu', 'Changement rapide de pneu crevé', 150.00, '30 minutes', TRUE),
('Vidange', 'Vidange d\'huile moteur complète', 200.00, '45 minutes', TRUE),
('Lavage Complet', 'Lavage intérieur et extérieur du véhicule', 100.00, '1 heure', TRUE),
('Diagnostic Électronique', 'Diagnostic complet avec appareil OBD', 180.00, '30 minutes', TRUE),
('Recharge Batterie', 'Recharge ou remplacement de batterie', 120.00, '20 minutes', TRUE),
('Révision Complète', 'Révision complète du véhicule', 500.00, '2-3 heures', TRUE);

-- ============================================================
-- 3. Insertion des véhicules (pour les prestataires)
-- ============================================================
INSERT INTO vehicles (user_id, brand, model, license_plate, capacity, is_available) VALUES
-- Véhicules de Karim Mechanic (user_id = 6)
(6, 'Mercedes', 'Sprinter', 'A-12345-B', '3 tonnes', TRUE),
(6, 'Renault', 'Master', 'A-67890-C', '2.5 tonnes', TRUE),

-- Véhicules de Hassan Towing (user_id = 7)
(7, 'Ford', 'F-350', 'B-11111-D', '5 tonnes', TRUE),
(7, 'Iveco', 'Daily', 'B-22222-E', '3.5 tonnes', TRUE),

-- Véhicules de Rachid Carwash (user_id = 8)
(8, 'Peugeot', 'Boxer', 'C-33333-F', '2 tonnes', TRUE),

-- Véhicules de Omar Service (user_id = 9)
(9, 'Fiat', 'Ducato', 'D-44444-G', '2.5 tonnes', TRUE),
(9, 'Volkswagen', 'Crafter', 'D-55555-H', '3 tonnes', FALSE);

-- ============================================================
-- 4. Insertion des commandes
-- ============================================================
INSERT INTO orders (client_id, provider_id, service_id, vehicle_id, status, price, location) VALUES
-- Commandes complétées
(2, 6, 1, 1, 'completed', 300.00, 'Avenue Mohammed V, Casablanca'),
(3, 7, 2, 3, 'completed', 250.00, 'Route de Rabat, Témara'),
(4, 8, 5, 5, 'completed', 100.00, 'Boulevard Zerktouni, Casablanca'),
(2, 9, 4, 6, 'completed', 200.00, 'Rue Oued Fes, Fès'),

-- Commandes en cours
(3, 6, 6, 1, 'in_progress', 180.00, 'Quartier Maarif, Casablanca'),
(4, 7, 3, 3, 'accepted', 150.00, 'Avenue Hassan II, Rabat'),

-- Commandes en attente
(2, NULL, 7, NULL, 'pending', 120.00, 'Agdal, Rabat'),
(5, NULL, 1, NULL, 'pending', 300.00, 'Californie, Casablanca'),

-- Commande annulée
(3, 8, 5, 5, 'cancelled', 100.00, 'Ain Diab, Casablanca');

-- ============================================================
-- 5. Insertion des paiements
-- ============================================================
INSERT INTO payments (order_id, amount, method, status, transaction_id) VALUES
-- Paiements réussis
(1, 300.00, 'card', 'success', 'TXN_001_20250113_001'),
(2, 250.00, 'cash', 'success', NULL),
(3, 100.00, 'wallet', 'success', 'TXN_003_20250113_003'),
(4, 200.00, 'card', 'success', 'TXN_004_20250113_004'),

-- Paiement en attente
(5, 180.00, 'card', 'pending', 'TXN_005_20250113_005'),
(6, 150.00, 'cash', 'pending', NULL),

-- Paiement échoué
(9, 100.00, 'card', 'failed', 'TXN_009_20250113_009');

-- ============================================================
-- 6. Insertion des avis
-- ============================================================
INSERT INTO reviews (order_id, client_id, provider_id, rating, comment) VALUES
(1, 2, 6, 5, 'Excellent service ! Karim est très professionnel et rapide. Je recommande vivement.'),
(2, 3, 7, 4, 'Bon service de remorquage, mais le délai était un peu long. Sinon très satisfait.'),
(3, 4, 8, 5, 'Lavage impeccable ! Ma voiture brille comme neuve. Merci Rachid !'),
(4, 2, 9, 5, 'Vidange rapide et efficace. Omar explique bien tout ce qu\'il fait. Top !');

-- ============================================================
-- 7. Insertion des notifications
-- ============================================================
INSERT INTO notifications (user_id, message, type, is_read) VALUES
-- Notifications pour les clients
(2, 'Votre commande #1 a été complétée avec succès', 'order', TRUE),
(2, 'Paiement de 300 DH confirmé pour la commande #1', 'payment', TRUE),
(3, 'Votre commande #5 est en cours de traitement', 'order', FALSE),
(4, 'Votre commande #6 a été acceptée par Hassan Towing', 'order', FALSE),
(2, 'Nouvelle promotion : -20% sur le lavage ce weekend !', 'system', FALSE),

-- Notifications pour les prestataires
(6, 'Nouvelle demande de service dans votre zone', 'order', TRUE),
(6, 'Paiement reçu : 300 DH pour la commande #1', 'payment', TRUE),
(7, 'Nouvelle commande assignée : Remorquage à Témara', 'order', TRUE),
(8, 'Votre profil a reçu un nouvel avis 5 étoiles', 'system', FALSE),
(9, 'Rappel : Commande #4 à finaliser', 'order', TRUE);

-- ============================================================
-- Fin de l'insertion des données de test
-- ============================================================

SELECT 'Données de test insérées avec succès!' AS status;

-- Statistiques rapides
SELECT 
    'STATISTIQUES' as info,
    (SELECT COUNT(*) FROM users) as total_users,
    (SELECT COUNT(*) FROM users WHERE role='client') as clients,
    (SELECT COUNT(*) FROM users WHERE role='provider') as providers,
    (SELECT COUNT(*) FROM services) as services,
    (SELECT COUNT(*) FROM vehicles) as vehicles,
    (SELECT COUNT(*) FROM orders) as orders,
    (SELECT COUNT(*) FROM payments) as payments,
    (SELECT COUNT(*) FROM reviews) as reviews,
    (SELECT COUNT(*) FROM notifications) as notifications;

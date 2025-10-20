-- ============================================================
-- Script de Requêtes Utiles
-- Plateforme Auto-Service
-- ============================================================

USE auto_service_platform;

-- ============================================================
-- 1. Vue d'ensemble des commandes avec détails
-- ============================================================
SELECT 
    o.id AS order_id,
    o.status,
    c.full_name AS client_name,
    c.phone AS client_phone,
    w.full_name AS provider_name,
    s.name AS service_name,
    v.brand AS vehicle_brand,
    v.model AS vehicle_model,
    o.price,
    o.location,
    o.created_at
FROM orders o
LEFT JOIN users c ON o.client_id = c.id
LEFT JOIN users w ON o.provider_id = w.id
LEFT JOIN services s ON o.service_id = s.id
LEFT JOIN vehicles v ON o.vehicle_id = v.id
ORDER BY o.created_at DESC;

-- ============================================================
-- 2. Statistiques par prestataire
-- ============================================================
SELECT 
    u.id,
    u.full_name AS provider_name,
    u.phone,
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT CASE WHEN o.status = 'completed' THEN o.id END) AS completed_orders,
    COALESCE(AVG(r.rating), 0) AS average_rating,
    COUNT(DISTINCT r.id) AS total_reviews,
    COUNT(DISTINCT v.id) AS total_vehicles
FROM users u
LEFT JOIN orders o ON u.id = o.provider_id
LEFT JOIN reviews r ON u.id = r.provider_id
LEFT JOIN vehicles v ON u.id = v.user_id
WHERE u.role = 'provider'
GROUP BY u.id, u.full_name, u.phone
ORDER BY average_rating DESC, completed_orders DESC;

-- ============================================================
-- 3. Revenus par service
-- ============================================================
SELECT 
    s.name AS service_name,
    COUNT(o.id) AS times_ordered,
    SUM(o.price) AS total_revenue,
    AVG(o.price) AS average_price,
    s.base_price
FROM services s
LEFT JOIN orders o ON s.id = o.service_id AND o.status = 'completed'
GROUP BY s.id, s.name, s.base_price
ORDER BY total_revenue DESC;

-- ============================================================
-- 4. Commandes en attente avec localisation
-- ============================================================
SELECT 
    o.id,
    c.full_name AS client_name,
    c.phone AS client_phone,
    s.name AS service_requested,
    o.price,
    o.location,
    o.created_at
FROM orders o
JOIN users c ON o.client_id = c.id
JOIN services s ON o.service_id = s.id
WHERE o.status = 'pending'
ORDER BY o.created_at ASC;

-- ============================================================
-- 5. Historique des paiements
-- ============================================================
SELECT 
    p.id AS payment_id,
    o.id AS order_id,
    c.full_name AS client_name,
    s.name AS service_name,
    p.amount,
    p.method,
    p.status,
    p.transaction_id,
    p.created_at
FROM payments p
JOIN orders o ON p.order_id = o.id
JOIN users c ON o.client_id = c.id
JOIN services s ON o.service_id = s.id
ORDER BY p.created_at DESC;

-- ============================================================
-- 6. Top 5 clients (par nombre de commandes)
-- ============================================================
SELECT 
    u.full_name,
    u.email,
    u.phone,
    COUNT(o.id) AS total_orders,
    SUM(CASE WHEN o.status = 'completed' THEN 1 ELSE 0 END) AS completed_orders,
    SUM(CASE WHEN o.status = 'completed' THEN o.price ELSE 0 END) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.client_id
WHERE u.role = 'client'
GROUP BY u.id, u.full_name, u.email, u.phone
ORDER BY total_orders DESC
LIMIT 5;

-- ============================================================
-- 7. Véhicules disponibles par prestataire
-- ============================================================
SELECT 
    u.full_name AS provider_name,
    u.phone,
    v.brand,
    v.model,
    v.license_plate,
    v.capacity,
    v.is_available
FROM vehicles v
JOIN users u ON v.user_id = u.id
WHERE v.is_available = TRUE
ORDER BY u.full_name;

-- ============================================================
-- 8. Notifications non lues par utilisateur
-- ============================================================
SELECT 
    u.full_name,
    u.email,
    n.message,
    n.type,
    n.created_at
FROM notifications n
JOIN users u ON n.user_id = u.id
WHERE n.is_read = FALSE
ORDER BY u.full_name, n.created_at DESC;

-- ============================================================
-- 9. Avis récents avec détails
-- ============================================================
SELECT 
    r.id AS review_id,
    c.full_name AS client_name,
    w.full_name AS provider_name,
    s.name AS service_name,
    r.rating,
    r.comment,
    r.created_at
FROM reviews r
JOIN users c ON r.client_id = c.id
JOIN users w ON r.provider_id = w.id
JOIN orders o ON r.order_id = o.id
JOIN services s ON o.service_id = s.id
ORDER BY r.created_at DESC
LIMIT 10;

-- ============================================================
-- 10. Performance globale de la plateforme
-- ============================================================
SELECT 
    'Total Users' AS metric, COUNT(*) AS value FROM users
UNION ALL
SELECT 'Total Clients', COUNT(*) FROM users WHERE role='client'
UNION ALL
SELECT 'Total providers', COUNT(*) FROM users WHERE role='provider'
UNION ALL
SELECT 'Total Services', COUNT(*) FROM services
UNION ALL
SELECT 'Total Vehicles', COUNT(*) FROM vehicles
UNION ALL
SELECT 'Total Orders', COUNT(*) FROM orders
UNION ALL
SELECT 'Completed Orders', COUNT(*) FROM orders WHERE status='completed'
UNION ALL
SELECT 'Pending Orders', COUNT(*) FROM orders WHERE status='pending'
UNION ALL
SELECT 'Total Revenue', CAST(SUM(price) AS CHAR) FROM orders WHERE status='completed'
UNION ALL
SELECT 'Successful Payments', COUNT(*) FROM payments WHERE status='success'
UNION ALL
SELECT 'Total Reviews', COUNT(*) FROM reviews
UNION ALL
SELECT 'Average Rating', CAST(AVG(rating) AS CHAR) FROM reviews;

-- ============================================================
-- Fin des requêtes utiles
-- ============================================================

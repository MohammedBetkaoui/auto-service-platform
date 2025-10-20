-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 20 oct. 2025 à 21:12
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `auto_service_platform`
--

-- --------------------------------------------------------

--
-- Structure de la table `attachments`
--

CREATE TABLE `attachments` (
  `id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(11) NOT NULL,
  `participant1_id` int(11) NOT NULL,
  `participant2_id` int(11) NOT NULL,
  `last_message` text DEFAULT NULL,
  `last_message_at` datetime DEFAULT NULL,
  `is_support_chat` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `attachment_url` varchar(255) DEFAULT NULL,
  `type` enum('text','image','file','audio') NOT NULL DEFAULT 'text',
  `is_seen` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `message` text NOT NULL,
  `type` enum('order','payment','system','review','message') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `sender_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `status` enum('unread','read') NOT NULL DEFAULT 'unread',
  `priority` enum('normal','high','critical') NOT NULL DEFAULT 'normal',
  `read_at` datetime DEFAULT NULL,
  `is_pushed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `service_id` int(11) NOT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `status` enum('pending','accepted','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
  `price` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `region` varchar(100) NOT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_tracking`
--

CREATE TABLE `order_tracking` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `method` enum('card','cash','wallet') NOT NULL,
  `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ratings_summary`
--

CREATE TABLE `ratings_summary` (
  `id` int(11) NOT NULL,
  `worker_id` int(11) DEFAULT NULL,
  `total_reviews` int(11) NOT NULL DEFAULT 0,
  `avg_rating` decimal(3,2) NOT NULL DEFAULT 0.00,
  `last_update` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `rating` tinyint(4) NOT NULL,
  `comment` text DEFAULT NULL,
  `sentiment` enum('positive','neutral','negative') DEFAULT NULL,
  `visibility` tinyint(1) NOT NULL DEFAULT 1,
  `reported` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `duration_estimate` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `category` enum('wash','oil_change','repair','towing','battery','other') NOT NULL DEFAULT 'other',
  `unit` enum('vehicle','hour','distance') NOT NULL DEFAULT 'vehicle',
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `service_pricing`
--

CREATE TABLE `service_pricing` (
  `id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `vehicle_type` enum('car','truck','van','bike') NOT NULL,
  `region` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `last_token_activity` datetime DEFAULT NULL,
  `role` enum('client','provider','admin') NOT NULL DEFAULT 'client',
  `is_verified` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `avatar_url` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `status` enum('active','inactive','banned') NOT NULL DEFAULT 'active',
  `is_available` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `brand` varchar(50) NOT NULL,
  `model` varchar(50) NOT NULL,
  `license_plate` varchar(20) NOT NULL,
  `capacity` varchar(50) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `type` enum('car','truck','van','bike') NOT NULL DEFAULT 'car',
  `color` varchar(50) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  `documents_url` varchar(255) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_attachments_message` (`message_id`);

--
-- Index pour la table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_conv_participants` (`participant1_id`,`participant2_id`),
  ADD KEY `idx_conv_last_message_at` (`last_message_at`),
  ADD KEY `fk_conv_participant2` (`participant2_id`);

--
-- Index pour la table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_messages_conv` (`conversation_id`),
  ADD KEY `idx_messages_created` (`created_at`),
  ADD KEY `fk_messages_sender` (`sender_id`),
  ADD KEY `idx_messages_conv_created` (`conversation_id`,`created_at`);

--
-- Index pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_receiver_id` (`receiver_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_priority` (`priority`),
  ADD KEY `notifications_fk_sender` (`sender_id`);

--
-- Index pour la table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `vehicle_id` (`vehicle_id`),
  ADD KEY `idx_client_id` (`client_id`),
  ADD KEY `idx_worker_id` (`worker_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_region` (`region`),
  ADD KEY `idx_client_created` (`client_id`,`created_at`);

--
-- Index pour la table `order_tracking`
--
ALTER TABLE `order_tracking`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_tracking_order_id` (`order_id`),
  ADD KEY `idx_order_tracking_timestamp` (`timestamp`);

--
-- Index pour la table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_order_id` (`order_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_transaction_id` (`transaction_id`);

--
-- Index pour la table `ratings_summary`
--
ALTER TABLE `ratings_summary`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_ratings_worker` (`worker_id`);

--
-- Index pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id_unique` (`order_id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `worker_id` (`worker_id`),
  ADD KEY `idx_rating` (`rating`);

--
-- Index pour la table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_is_active` (`is_active`),
  ADD KEY `idx_services_category` (`category`);

--
-- Index pour la table `service_pricing`
--
ALTER TABLE `service_pricing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_service_pricing_service_id` (`service_id`),
  ADD KEY `idx_service_pricing_vehicle_type` (`vehicle_type`),
  ADD KEY `idx_service_pricing_region` (`region`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_city` (`city`),
  ADD KEY `idx_is_available` (`is_available`);

--
-- Index pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_vehicle_license_plate` (`license_plate`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_is_available` (`is_available`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `order_tracking`
--
ALTER TABLE `order_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ratings_summary`
--
ALTER TABLE `ratings_summary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `service_pricing`
--
ALTER TABLE `service_pricing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `attachments`
--
ALTER TABLE `attachments`
  ADD CONSTRAINT `fk_attachments_message` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `conversations`
--
ALTER TABLE `conversations`
  ADD CONSTRAINT `fk_conv_participant1` FOREIGN KEY (`participant1_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_conv_participant2` FOREIGN KEY (`participant2_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_fk_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_fk_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `order_tracking`
--
ALTER TABLE `order_tracking`
  ADD CONSTRAINT `fk_order_tracking_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `ratings_summary`
--
ALTER TABLE `ratings_summary`
  ADD CONSTRAINT `fk_ratings_summary_worker` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`worker_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `service_pricing`
--
ALTER TABLE `service_pricing`
  ADD CONSTRAINT `fk_service_pricing_service` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

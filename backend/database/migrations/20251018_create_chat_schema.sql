-- Migration: create chat schema (conversations, messages, attachments)
-- Date: 2025-10-18
-- Run this on your MySQL/MariaDB database (test first on staging)

START TRANSACTION;

CREATE TABLE IF NOT EXISTS `conversations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `participant1_id` INT NOT NULL,
  `participant2_id` INT NOT NULL,
  `last_message` TEXT DEFAULT NULL,
  `last_message_at` DATETIME DEFAULT NULL,
  `is_support_chat` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_conv_participants` (`participant1_id`,`participant2_id`),
  KEY `idx_conv_last_message_at` (`last_message_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conversation_id` INT NOT NULL,
  `sender_id` INT NOT NULL,
  `message` TEXT DEFAULT NULL,
  `attachment_url` VARCHAR(255) DEFAULT NULL,
  `type` ENUM('text','image','file','audio') NOT NULL DEFAULT 'text',
  `is_seen` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_messages_conv` (`conversation_id`),
  KEY `idx_messages_created` (`created_at`),
  CONSTRAINT `fk_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `attachments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message_id` INT NOT NULL,
  `url` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) DEFAULT NULL,
  `size` INT DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_attachments_message` (`message_id`),
  CONSTRAINT `fk_attachments_message` FOREIGN KEY (`message_id`) REFERENCES `messages`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Foreign keys to users
ALTER TABLE `conversations`
  ADD CONSTRAINT `fk_conv_participant1` FOREIGN KEY (`participant1_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_conv_participant2` FOREIGN KEY (`participant2_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

ALTER TABLE `messages`
  ADD CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS `idx_messages_conv_created` ON `messages` (`conversation_id`, `created_at`);

COMMIT;

-- Notes:
-- - Use application-level checks to prevent creating duplicate 1:1 conversations.
-- - Consider adding a uniqueness constraint for canonical participant ordering (participant1_id < participant2_id) if you want strictly one conversation per pair.
-- - For group chats, extend the schema with a conversation_participants table instead.

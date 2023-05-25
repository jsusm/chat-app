CREATE TABLE `chat_subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_id` integer,
	`author_id` integer,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`),
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer,
	`created_at` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`id`) REFERENCES `chat_subscriptions`(`id`)
);

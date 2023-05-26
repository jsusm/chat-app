CREATE TABLE `chat_subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_id` integer NOT NULL,
	`author_id` integer NOT NULL,
	FOREIGN KEY (`chat_id`) REFERENCES `chats`(`id`),
	FOREIGN KEY (`author_id`) REFERENCES `users`(`id`)
);
--> statement-breakpoint
CREATE TABLE `chats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`chat_sub_id` integer NOT NULL,
	`created_at` integer NOT NULL,
	`content` text NOT NULL,
	FOREIGN KEY (`chat_sub_id`) REFERENCES `chat_subscriptions`(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `nameIdx` ON `users` (`name`);
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now())
);

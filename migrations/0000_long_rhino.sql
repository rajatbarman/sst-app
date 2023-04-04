CREATE TABLE `tokens` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`token` varchar(256) NOT NULL,
	`type` enum('0') NOT NULL,
	`expiry_at` timestamp NOT NULL,
	`user_id` int NOT NULL,
	`created_at` timestamp DEFAULT (now())
);

CREATE TABLE `users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`full_name` text,
	`email` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now())
);

CREATE TABLE `otp_users` (
	`id` int AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`email` varchar(256) NOT NULL,
	`otp` varchar(256) NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`update_at` timestamp DEFAULT (now())
);

ALTER TABLE tokens ADD CONSTRAINT tokens_user_id_users_id_fk FOREIGN KEY (`user_id`) REFERENCES users(`id`) ;
CREATE UNIQUE INDEX email_index ON users (`email`);
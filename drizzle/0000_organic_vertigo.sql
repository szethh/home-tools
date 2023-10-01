CREATE TABLE `groceries` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`status` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idIdx` ON `groceries` (`id`);
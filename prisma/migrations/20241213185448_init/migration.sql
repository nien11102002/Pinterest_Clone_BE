-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_2`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `saved_images` DROP FOREIGN KEY `saved_images_ibfk_1`;

-- DropForeignKey
ALTER TABLE `saved_images` DROP FOREIGN KEY `saved_images_ibfk_2`;

-- AlterTable
ALTER TABLE `images` ADD COLUMN `title` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `display_name` VARCHAR(255) NULL,
    ADD COLUMN `introduction` VARCHAR(255) NULL,
    ADD COLUMN `web_link` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `saved_images` ADD CONSTRAINT `saved_images_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `saved_images` ADD CONSTRAINT `saved_images_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `images`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

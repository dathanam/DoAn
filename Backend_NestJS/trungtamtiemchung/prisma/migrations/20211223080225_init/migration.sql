-- CreateTable
CREATE TABLE `typeProduct` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `deleteflag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `deleteflag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `degree` VARCHAR(191) NOT NULL,
    `salary` DOUBLE NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `checkcode` BOOLEAN NOT NULL,
    `loginfirst` BOOLEAN NOT NULL,
    `id_facilitie` INTEGER NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `deleteflag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_employee` INTEGER NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `role` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `employee_id_facilitie_fkey` FOREIGN KEY (`id_facilitie`) REFERENCES `facilities`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

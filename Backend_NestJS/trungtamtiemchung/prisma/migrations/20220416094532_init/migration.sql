/*
  Warnings:

  - Added the required column `avata` to the `nhanvien` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nhanvien` ADD COLUMN `avata` VARCHAR(191) NOT NULL;

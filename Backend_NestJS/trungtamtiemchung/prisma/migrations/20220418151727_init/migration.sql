/*
  Warnings:

  - You are about to drop the column `id_dich_vu` on the `phieutiem` table. All the data in the column will be lost.
  - You are about to drop the column `id_thuoc` on the `phieutiem` table. All the data in the column will be lost.
  - You are about to drop the column `phong_benh` on the `phieutiem` table. All the data in the column will be lost.
  - You are about to drop the column `ten_thuoc` on the `phieutiem` table. All the data in the column will be lost.
  - Added the required column `doi_tuong` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_dich_vu1` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_dich_vu2` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_thuoc1` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_thuoc2` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phong_benh1` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phong_benh2` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ten_thuoc1` to the `phieutiem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ten_thuoc2` to the `phieutiem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `phieutiem` DROP FOREIGN KEY `phieutiem_id_dich_vu_fkey`;

-- DropForeignKey
ALTER TABLE `phieutiem` DROP FOREIGN KEY `phieutiem_id_thuoc_fkey`;

-- AlterTable
ALTER TABLE `phieutiem` DROP COLUMN `id_dich_vu`,
    DROP COLUMN `id_thuoc`,
    DROP COLUMN `phong_benh`,
    DROP COLUMN `ten_thuoc`,
    ADD COLUMN `doi_tuong` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_dich_vu1` INTEGER NOT NULL,
    ADD COLUMN `id_dich_vu2` INTEGER NOT NULL,
    ADD COLUMN `id_thuoc1` INTEGER NOT NULL,
    ADD COLUMN `id_thuoc2` INTEGER NOT NULL,
    ADD COLUMN `phong_benh1` VARCHAR(191) NOT NULL,
    ADD COLUMN `phong_benh2` VARCHAR(191) NOT NULL,
    ADD COLUMN `ten_thuoc1` VARCHAR(191) NOT NULL,
    ADD COLUMN `ten_thuoc2` VARCHAR(191) NOT NULL;

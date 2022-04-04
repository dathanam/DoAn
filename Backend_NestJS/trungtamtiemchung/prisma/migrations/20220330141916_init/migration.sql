-- CreateTable
CREATE TABLE `khachhang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_khach_hang` INTEGER NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `ngay_sinh` DATETIME(3) NOT NULL,
    `gioi_tinh` DATETIME(3) NOT NULL,
    `que_quan` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    UNIQUE INDEX `khachhang_ma_khach_hang_key`(`ma_khach_hang`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quyen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nhanvien` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `ngay_sinh` DATETIME(3) NOT NULL,
    `bang_cap` VARCHAR(191) NOT NULL,
    `dia_chi` VARCHAR(191) NOT NULL,
    `sdt` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,
    `id_quyen` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dichvu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phongbenh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `nguyen_nhan` VARCHAR(191) NOT NULL,
    `trieu_chung` VARCHAR(191) NOT NULL,
    `phong_ngua` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thuoc` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `so_luong` INTEGER NOT NULL,
    `ngay_san_xuat` DATETIME(3) NOT NULL,
    `han_su_dung` DATETIME(3) NOT NULL,
    `so_lo` VARCHAR(191) NOT NULL,
    `duong_tiem` VARCHAR(191) NOT NULL,
    `bao_quan` VARCHAR(191) NOT NULL,
    `doi_tuong` VARCHAR(191) NOT NULL,
    `gia_ban_le` DOUBLE NOT NULL,
    `gia_dat_mua` DOUBLE NOT NULL,
    `nuoc_san_xuat` VARCHAR(191) NOT NULL,
    `tinh_trang` VARCHAR(191) NOT NULL,
    `id_phong_benh` INTEGER NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trangthai` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `phieutiem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_khach_hang` INTEGER NOT NULL,
    `id_dich_vu` INTEGER NOT NULL,
    `id_thuoc` INTEGER NOT NULL,
    `id_nhan_vien` INTEGER NOT NULL,
    `id_trang_thai` INTEGER NOT NULL,
    `phong_benh` VARCHAR(191) NOT NULL,
    `ten_thuoc` VARCHAR(191) NOT NULL,
    `tong_tien` DOUBLE NOT NULL,
    `trang_thai` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loaithietbivattu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `thietbivattu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `so_luong` INTEGER NOT NULL,
    `don_vi_tinh` VARCHAR(191) NOT NULL,
    `id_loai_thiet_bi_vat_tu` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nhapkho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loai_san_pham` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietnhapkho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_phieu_nhap_kho` INTEGER NOT NULL,
    `id_san_pham` INTEGER NOT NULL,
    `so_luong` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `xuatkho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `loai_san_pham` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietxuatkho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_phieu_xuat_kho` INTEGER NOT NULL,
    `id_san_pham` INTEGER NOT NULL,
    `so_luong` INTEGER NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `token` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_employee` INTEGER NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `role` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `nhanvien` ADD CONSTRAINT `nhanvien_id_quyen_fkey` FOREIGN KEY (`id_quyen`) REFERENCES `quyen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thuoc` ADD CONSTRAINT `thuoc_id_phong_benh_fkey` FOREIGN KEY (`id_phong_benh`) REFERENCES `phongbenh`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phieutiem` ADD CONSTRAINT `phieutiem_id_khach_hang_fkey` FOREIGN KEY (`id_khach_hang`) REFERENCES `khachhang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phieutiem` ADD CONSTRAINT `phieutiem_id_dich_vu_fkey` FOREIGN KEY (`id_dich_vu`) REFERENCES `dichvu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phieutiem` ADD CONSTRAINT `phieutiem_id_thuoc_fkey` FOREIGN KEY (`id_thuoc`) REFERENCES `thuoc`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phieutiem` ADD CONSTRAINT `phieutiem_id_nhan_vien_fkey` FOREIGN KEY (`id_nhan_vien`) REFERENCES `nhanvien`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phieutiem` ADD CONSTRAINT `phieutiem_id_trang_thai_fkey` FOREIGN KEY (`id_trang_thai`) REFERENCES `trangthai`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thietbivattu` ADD CONSTRAINT `thietbivattu_id_loai_thiet_bi_vat_tu_fkey` FOREIGN KEY (`id_loai_thiet_bi_vat_tu`) REFERENCES `loaithietbivattu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietnhapkho` ADD CONSTRAINT `chitietnhapkho_id_phieu_nhap_kho_fkey` FOREIGN KEY (`id_phieu_nhap_kho`) REFERENCES `nhapkho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietxuatkho` ADD CONSTRAINT `chitietxuatkho_id_phieu_xuat_kho_fkey` FOREIGN KEY (`id_phieu_xuat_kho`) REFERENCES `xuatkho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

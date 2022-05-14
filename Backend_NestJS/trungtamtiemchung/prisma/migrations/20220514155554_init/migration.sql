-- CreateTable
CREATE TABLE `khachhang` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ma_khach_hang` VARCHAR(191) NOT NULL,
    `ten` VARCHAR(191) NOT NULL,
    `ngay_sinh` DATETIME(3) NOT NULL,
    `gioi_tinh` VARCHAR(191) NOT NULL,
    `que_quan` VARCHAR(191) NOT NULL,
    `sdt` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiensubenh` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_khach_hang` INTEGER NOT NULL,
    `dich_vu` VARCHAR(191) NOT NULL,
    `phong_benh` VARCHAR(191) NOT NULL,
    `ghi_chu` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

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
    `anh` VARCHAR(191) NOT NULL DEFAULT 'null',
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
    `doi_tuong` VARCHAR(191) NOT NULL,
    `tong_tien` DOUBLE NOT NULL DEFAULT 0,
    `trang_thai` VARCHAR(191) NOT NULL,
    `ghi_chu` VARCHAR(191) NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,
    `id_khach_hang` INTEGER NOT NULL,
    `id_trang_thai` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietphieutiem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_phieu_tiem` INTEGER NOT NULL,
    `id_dich_vu` INTEGER NOT NULL,
    `id_phong_benh` INTEGER NOT NULL,
    `id_thuoc` INTEGER NOT NULL,
    `dich_vu` VARCHAR(191) NOT NULL,
    `phong_benh` VARCHAR(191) NOT NULL,
    `thuoc` VARCHAR(191) NOT NULL,
    `tien` DOUBLE NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loaiphong` (
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
CREATE TABLE `phongkham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ten` VARCHAR(191) NOT NULL,
    `so_nguoi` INTEGER NOT NULL,
    `id_loai_phong` INTEGER NOT NULL,
    `trang_thai` BOOLEAN NOT NULL,
    `create_at` DATETIME(3) NOT NULL,
    `update_at` DATETIME(3) NOT NULL,
    `id_created` INTEGER NOT NULL,
    `id_updated` INTEGER NOT NULL,
    `delete_flag` INTEGER NOT NULL,
    `oldid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chitietphongkham` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_phong_kham` INTEGER NOT NULL,
    `id_phieu_tiem` INTEGER NOT NULL,
    `id_trang_thai` INTEGER NOT NULL,
    `id_khach_hang` INTEGER NOT NULL,
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
ALTER TABLE `tiensubenh` ADD CONSTRAINT `tiensubenh_id_khach_hang_fkey` FOREIGN KEY (`id_khach_hang`) REFERENCES `khachhang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nhanvien` ADD CONSTRAINT `nhanvien_id_quyen_fkey` FOREIGN KEY (`id_quyen`) REFERENCES `quyen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thuoc` ADD CONSTRAINT `thuoc_id_phong_benh_fkey` FOREIGN KEY (`id_phong_benh`) REFERENCES `phongbenh`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietphieutiem` ADD CONSTRAINT `chitietphieutiem_id_phieu_tiem_fkey` FOREIGN KEY (`id_phieu_tiem`) REFERENCES `phieutiem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `phongkham` ADD CONSTRAINT `phongkham_id_loai_phong_fkey` FOREIGN KEY (`id_loai_phong`) REFERENCES `loaiphong`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietphongkham` ADD CONSTRAINT `chitietphongkham_id_phong_kham_fkey` FOREIGN KEY (`id_phong_kham`) REFERENCES `phongkham`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietphongkham` ADD CONSTRAINT `chitietphongkham_id_phieu_tiem_fkey` FOREIGN KEY (`id_phieu_tiem`) REFERENCES `phieutiem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `thietbivattu` ADD CONSTRAINT `thietbivattu_id_loai_thiet_bi_vat_tu_fkey` FOREIGN KEY (`id_loai_thiet_bi_vat_tu`) REFERENCES `loaithietbivattu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietnhapkho` ADD CONSTRAINT `chitietnhapkho_id_phieu_nhap_kho_fkey` FOREIGN KEY (`id_phieu_nhap_kho`) REFERENCES `nhapkho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chitietxuatkho` ADD CONSTRAINT `chitietxuatkho_id_phieu_xuat_kho_fkey` FOREIGN KEY (`id_phieu_xuat_kho`) REFERENCES `xuatkho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModuleOptions } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prima.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async validateUser(data): Promise<any> {
        const username = { 'username': data.username }
        const user = await this.prisma['employee'].findMany({ where: username });
        if (user && user[0].password === data.password) {
            const { password, ...result } = user[0];

            return result;
        }
        return null;
    }


    async login(data): Promise<any> {
        try {
            const username = { 'username': data.username }
            const userFind = await this.prisma['nhanvien'].findMany({ where: username });
            if (!userFind) {
                return { statusCode: 404, message: "Không tìm thấy tài khoản" }
            } else {
                if (userFind[0].password === data.password) {
                    const payload = { role: userFind[0].id_quyen, idNV: userFind[0].id }
                    const token = this.jwtService.sign(payload)
                    const datainfo = {
                        id_employee: userFind[0].id,
                        data: token,
                        date: new Date(),
                        role: userFind[0].id_quyen
                    }
                    try {
                        await this.prisma['token'].create({ data: datainfo })
                        return {
                            token: token
                        }
                    } catch (error) {
                        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return { statusCode: 404, message: "Sai thông tin đăng nhập" }
                }
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getRoleFromToken(dataInfo): Promise<any> {
        const token = { 'data': dataInfo }
        const tokenFind = await this.prisma['token'].findMany({ where: token });

        return tokenFind[0].role
    }

    async getIdEmployeeFromToken(dataInfo): Promise<any> {
        const token = { 'data': dataInfo }
        const tokenFind = await this.prisma['token'].findMany({ where: token });

        return tokenFind[0].id_employee
    }

    getPermmision(role, table, type) {
        // 1 Admin, 2 bac sỹ, 3 quản lý kho, 4 lễ tân, 5 thu ngân
        var tableCheck = {
            1: {
                dichvu: { get: true, post: true, put: true, delete: true, search: true },
                khachhang: { get: true, post: true, put: true, delete: true, search: true },
                nhanvien: { get: true, post: true, put: true, delete: true, search: true },
                nhapkho: { get: true, post: false, put: false, delete: true, search: true },
                xuatkho: { get: true, post: false, put: false, delete: true, search: true },
                chitietnhapkho: { get: true, post: false, put: false, delete: false, search: true },
                chitietxuatkho: { get: true, post: false, put: false, delete: false, search: true },
                phieutiem: { get: true, post: false, put: false, delete: true, search: true },
                phongbenh: { get: true, post: true, put: true, delete: true, search: true },
                thuoc: { get: true, post: true, put: true, delete: true, search: true },
                quyen: { get: true, post: true, put: true, delete: true, search: true },
                loaithietbivattu: { get: true, post: true, put: true, delete: true, search: true },
                thietbivattu: { get: true, post: true, put: true, delete: true, search: true },
                trangthai: { get: true, post: true, put: true, delete: true, search: true },
            },
            2: {
                dichvu: { get: true, post: false, put: false, delete: false, search: true },
                khachhang: { get: true, post: true, put: true, delete: false, search: true },
                nhanvien: { get: true, post: false, put: false, delete: false, search: true },
                nhapkho: { get: true, post: false, put: false, delete: false, search: false },
                xuatkho: { get: true, post: false, put: false, delete: false, search: false },
                chitietnhapkho: { get: true, post: false, put: false, delete: false, search: false },
                chitietxuatkho: { get: true, post: false, put: false, delete: false, search: false },
                phieutiem: { get: true, post: true, put: true, delete: false, search: true },
                phongbenh: { get: true, post: false, put: false, delete: false, search: true },
                thuoc: { get: true, post: false, put: false, delete: false, search: true },
                quyen: { get: true, post: false, put: false, delete: false, search: false },
                loaithietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                thietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                trangthai: { get: true, post: false, put: false, delete: false, search: true },
            },
            3: {
                dichvu: { get: true, post: false, put: false, delete: false, search: false },
                khachhang: { get: false, post: false, put: false, delete: false, search: false },
                nhanvien: { get: true, post: false, put: false, delete: false, search: false },
                nhapkho: { get: true, post: true, put: true, delete: false, search: true },
                xuatkho: { get: true, post: true, put: true, delete: false, search: true },
                chitietnhapkho: { get: true, post: true, put: true, delete: false, search: true },
                chitietxuatkho: { get: true, post: true, put: true, delete: false, search: true },
                phieutiem: { get: true, post: false, put: false, delete: false, search: false },
                phongbenh: { get: true, post: false, put: false, delete: false, search: true },
                thuoc: { get: true, post: false, put: false, delete: false, search: true },
                quyen: { get: true, post: false, put: false, delete: false, search: false },
                loaithietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                thietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                trangthai: { get: true, post: false, put: false, delete: false, search: true },
            },
            4: {
                dichvu: { get: true, post: false, put: false, delete: false, search: false },
                khachhang: { get: true, post: true, put: true, delete: false, search: true },
                nhanvien: { get: true, post: false, put: false, delete: false, search: true },
                nhapkho: { get: false, post: false, put: false, delete: false, search: false },
                xuatkho: { get: false, post: false, put: false, delete: false, search: false },
                chitietnhapkho: { get: false, post: false, put: false, delete: false, search: false },
                chitietxuatkho: { get: false, post: false, put: false, delete: false, search: false },
                phieutiem: { get: true, post: false, put: false, delete: false, search: false },
                phongbenh: { get: true, post: false, put: false, delete: false, search: true },
                thuoc: { get: true, post: false, put: false, delete: false, search: true },
                quyen: { get: true, post: false, put: false, delete: false, search: false },
                loaithietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                thietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                trangthai: { get: true, post: false, put: false, delete: false, search: true },
            },
            5: {
                dichvu: { get: true, post: false, put: false, delete: false, search: false },
                khachhang: { get: true, post: false, put: false, delete: false, search: false },
                nhanvien: { get: false, post: false, put: false, delete: false, search: false },
                nhapkho: { get: false, post: false, put: false, delete: false, search: false },
                xuatkho: { get: false, post: false, put: false, delete: false, search: false },
                chitietnhapkho: { get: false, post: false, put: false, delete: false, search: false },
                chitietxuatkho: { get: false, post: false, put: false, delete: false, search: false },
                phieutiem: { get: true, post: false, put: true, delete: false, search: true },
                phongbenh: { get: true, post: false, put: false, delete: false, search: false },
                thuoc: { get: true, post: false, put: false, delete: false, search: false },
                quyen: { get: true, post: false, put: false, delete: false, search: false },
                loaithietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                thietbivattu: { get: true, post: false, put: false, delete: false, search: false },
                trangthai: { get: true, post: false, put: false, delete: false, search: false },
            },
        }
        return tableCheck[role][table][type];
    }
}

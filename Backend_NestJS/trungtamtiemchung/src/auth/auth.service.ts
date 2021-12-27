import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
            const userFind = await this.prisma['employee'].findMany({ where: username });
            if (!userFind) {
                return { statusCode: 404, message: "Không tìm thấy tài khoản" }
            } else {
                if (userFind[0].password === data.password) {
                    const payload = { username: userFind[0].username, email: userFind[0].email, role: userFind[0].role, loginFrist: userFind[0].loginfirst, idNV: userFind[0].id }
                    const token = this.jwtService.sign(payload)
                    const datainfo = {
                        id_employee: userFind[0].id,
                        data: token,
                        date: new Date(),
                        role: userFind[0].role
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
                    return { statusCode: 201, message: "Sai thông tin đăng nhập" }
                }
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    async getRoleFromToken(dataInfo) : Promise<any> {
        const token = { 'data': dataInfo }
        const tokenFind = await this.prisma['token'].findMany({ where: token });

        return tokenFind[0].role
    }

    async getIdEmployeeFromToken(dataInfo) : Promise<any> {
        const token = { 'data': dataInfo }
        const tokenFind = await this.prisma['token'].findMany({ where: token });

        return tokenFind[0].id_employee
    }

    getPermmision(role, table, type) {
        var tableCheck ={
            premium:{
                employee:{get: true, post: true, put: true, delete: true, search: true},
                facilities:{get: true, post: true, put: true, delete: true, search: true},
                typeProduct:{get: true, post: true, put: true, delete: true, search: true},
            },
            admin:{
                employee:{get: true, post: true, put: true, delete: true, search: true},
                facilities:{get: true, post: false, put: false, delete: false, search: true},
                typeProduct:{get: true, post: true, put: true, delete: true, search: true},
            },
            user:{
                employee:{get: true, post: false, put: false, delete: false, search: true},
                facilities:{get: true, post: false, put: false, delete: false, search: true},
                typeProduct:{get: true, post: true, put: true, delete: true, search: true},
            },
            customer:{
                employee:{get: false, post: false, put: false, delete: false, search: false},
                facilities:{get: true, post: false, put: false, delete: false, search: true},
                typeProduct:{get: true, post: false, put: false, delete: false, search: true},
            }
        }
        if(tableCheck[role][table][type])
            return tableCheck[role][table][type];
        else return false
    }
}

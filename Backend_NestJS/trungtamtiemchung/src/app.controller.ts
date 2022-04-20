import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Post('login')
  @ApiBody({ type: Object })
  async login(@Body() body) {
    return this.authService.login(body);
  }

  @Post('getData')
  @ApiBody({ type: Object })
  async GetData(@Body() data): Promise<string> {
    var role = await this.authService.getRoleFromToken(data.token);
    var checkRole = await this.authService.getPermmision(role, data.table, 'get');

    delete data['token'];
    if (checkRole) {
      return this.appService.getTable(data);
    } else {
      return "Không được phép";
    }
  }
  @Post('getAllData')
  @ApiBody({ type: Object })
  async GetAllData(@Body() data): Promise<string> {
    var role = await this.authService.getRoleFromToken(data.token);
    var checkRole = await this.authService.getPermmision(role, data.table, 'get');

    delete data['token'];
    if (checkRole) {
      return this.appService.getAllTable(data);
    } else {
      return "Không được phép";
    }
  }

  @Post('getTableFromID')
  @ApiBody({ type: Object })
  async getTableFromID(@Body() data): Promise<string> {
    var role = await this.authService.getRoleFromToken(data.token);
    var checkRole = await this.authService.getPermmision(role, data.table, 'get');

    delete data['token'];
    if (checkRole) {
      return this.appService.getTableFromID(data);
    } else {
      return "Không được phép";
    }
  }

  @Post('getKHFromMKH')
  @ApiBody({ type: Object })
  async getKHFromMKH(@Body() data): Promise<string> {

    console.log(data)
    data.table = "khachhang";
    return this.appService.getKHFromMKH(data);
  }

  @Post('getPhieuTiemFromMKH')
  @ApiBody({ type: Object })
  async getPhieuTiemFromMKH(@Body() data): Promise<string> {

    data.table = "phieutiem";
    return this.appService.getPhieuTiemFromMKH(data);
  }

  @Post('getEmployeeFromToken')
  @ApiBody({ type: Object })
  async getEmployeeFromToken(@Body() data): Promise<string> {
    var id_employee = await this.authService.getIdEmployeeFromToken(data.token);
    data.table = "nhanvien";
    data.id_employee = id_employee;
    delete data["token"];

    return this.appService.getEmployeeFromToken(data);
  }

  @Post('addData')
  @ApiBody({ type: Object })
  async PostData(@Body() data) {
    var role = await this.authService.getRoleFromToken(data.token);
    var id_employee = await this.authService.getIdEmployeeFromToken(data.token);
    var checkRole = await this.authService.getPermmision(role, data.table, 'post');

    delete data['token'];
    data.id_employee = id_employee;

    if (checkRole) {
      return this.appService.addTable(data);
    } else {
      return "Không được phép";
    }
  }

  @Post('editData')
  @ApiBody({ type: Object })
  async PutData(@Body() data) {
    var role = await this.authService.getRoleFromToken(data.token);
    var id_employee = await this.authService.getIdEmployeeFromToken(data.token);
    var checkRole = await this.authService.getPermmision(role, data.table, 'put')

    delete data['token'];
    data.id_employee = id_employee;

    if (checkRole) {
      return this.appService.editTable(data);
    } else {
      return "Không được phép";
    }
  }

  @Post('deleteData')
  @ApiBody({ type: Object })
  async DeleteData(@Body() data) {

    var role = await this.authService.getRoleFromToken(data.token)
    var checkRole = await this.authService.getPermmision(role, data.table, 'delete')

    delete data['token'];
    delete data['ten'];

    if (checkRole) {
      return this.appService.deleteTable(data);
    } else {
      return "Không được phép";
    }
  }

  @Post('detailData')
  @ApiBody({ type: Object })
  async detailData(@Body() data) {
    var role = await this.authService.getRoleFromToken(data.token)
    var checkRole = await this.authService.getPermmision(role, data.table, 'get')

    delete data['token'];
    delete data['ten'];

    if (checkRole) {
      return this.appService.detailData(data);
    } else {
      return "Không được phép";
    }
  }
}

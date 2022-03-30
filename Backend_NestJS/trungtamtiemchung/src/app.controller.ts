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

  @Post('addData')
  @ApiBody({ type: Object })
  async PostData(@Body() data) {
    console.log(data)
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

    if (checkRole) {
      return this.appService.deleteTable(data);
    } else {
      return "Không được phép";
    }
  }
}

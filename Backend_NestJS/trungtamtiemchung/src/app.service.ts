import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prima.service';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  getTable(data): Promise<string> {
    var table = data.table;

    return this.prisma[table].findMany({ where: { deleteflag: 0 } });
  }

  async addTable(data): Promise<any> {
    const table = data.table
    const id_employee = data.id_employee;
    var dataInfo = JSON.parse(JSON.stringify(data));
    delete dataInfo['table'];
    delete dataInfo['id_employee'];
    try {
      // const check = await this.prisma[table].findUnique({ where:{name: data.name }})
      // if (check != null){
      //   return { statusCode: 400, message: "đã tồn tại !" }
      // }
      dataInfo.create_at = new Date()
      dataInfo.update_at = new Date()
      dataInfo.id_created = id_employee;
      dataInfo.id_updated = id_employee;
      dataInfo.deleteflag = 0;
      dataInfo.oldid = 0;
      const dataSave = await this.prisma[table].create({ data: dataInfo })
      return { statusCode: 200, message: "Thêm thành công !", dataSave }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async editTable(data): Promise<any> {
    var table = data.table;
    const id_employee = data.id_employee;
    var MainID = data.MainID;
    var dataInfo = JSON.parse(JSON.stringify(data));
    delete dataInfo['table'];
    delete dataInfo['MainID'];
    delete dataInfo['id_employee'];
    var infoSave = await this.prisma[table].findUnique({ where: MainID });
    if (infoSave == null) return JSON.stringify({ data: false });
    infoSave.deleteflag = 1;
    for (var k in MainID) infoSave.oldid = MainID[k];
    dataInfo.update_at = new Date()
    dataInfo.id_updated=id_employee
    delete infoSave['id'];
    try {
      await this.prisma[table].create({ data: infoSave })
      await this.prisma[table].update({
        data: dataInfo,
        where: MainID
      });
      return { statusCode: 200, message: "Sửa thành công !" }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteTable(data): Promise<any> {
    var table = data.table;
    var MainID = data.MainID;
    var dataInfo = JSON.parse(JSON.stringify(data));
    delete dataInfo['table'];
    delete dataInfo['MainID'];
    dataInfo.deleteflag = 1;
    try {
      await this.prisma[table].update({
        data: dataInfo,
        where: MainID
      });
      return { statusCode: 200, message: "Xóa thành công !" }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}

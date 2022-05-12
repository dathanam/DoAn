import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import moment from 'moment';
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
    return this.prisma[table].findMany({ where: { delete_flag: 0 } });
  }

  getAllTable(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany();
  }

  getTableFromID(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id: data.id } });
  }

  getEmployeeFromToken(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id: data.id_employee } });
  }

  getKHFromMKH(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { ma_khach_hang: data.ma_khach_hang } });
  }

  getKHFromSDT(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { sdt: data.sdt } });
  }

  getPhieuTiemFromMKH(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id_trang_thai: 1, id_khach_hang: parseInt(data.id_khach_hang), delete_flag: 0 } });
  }

  getPhieuTiemChuaThanhToanFromIdKH(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id_trang_thai: 2, id_khach_hang: parseInt(data.id_khach_hang), delete_flag: 0 } });
  }

  getPhieuTiemChuaTiemFromIdKH(data): Promise<string> {
    var table = data.table;
    var a = this.prisma[table].findMany({
      where: {
        AND: [
          { id_khach_hang: parseInt(data.id_khach_hang) },
          { delete_flag: 0 },
          { id_trang_thai: 3 } || { id_trang_thai: 6 }
        ],
      },
    });
    return a;
  }

  getChiTietPhieuTiemFromPT(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id_phieu_tiem: data.id_phieu_tiem } });
  }

  getTienSuBenhFromMaKH(data): Promise<string> {
    var table = data.table;
    return this.prisma[table].findMany({ where: { id_khach_hang: data.id_khach_hang } });
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
      if (table === "thuoc") {
        dataInfo.ngay_san_xuat = new Date()
        dataInfo.han_su_dung = new Date()
        dataInfo.gia_ban_le = parseFloat(dataInfo.gia_ban_le)
        dataInfo.gia_dat_mua = parseFloat(dataInfo.gia_dat_mua)
        dataInfo.so_luong = parseInt(dataInfo.so_luong)
      }
      if (table === "nhanvien") {
        dataInfo.avata = ""
      }
      dataInfo.id_created = id_employee;
      dataInfo.id_updated = id_employee;
      dataInfo.delete_flag = 0;
      dataInfo.oldid = 0;
      if (!!dataInfo.ngay_sinh) dataInfo.ngay_sinh = new Date(dataInfo.ngay_sinh)
      const dataSave = await this.prisma[table].create({ data: dataInfo })
      return { statusCode: 200, message: "Thêm thành công !", dataSave }
    } catch (error) {
      console.log(error)
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
    infoSave.delete_flag = 1;
    for (var k in MainID) infoSave.oldid = MainID[k];
    dataInfo.update_at = new Date()
    dataInfo.id_updated = id_employee
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

  async editTableNoSave(data): Promise<any> {
    var table = data.table;
    const id_employee = data.id_employee;
    var MainID = data.MainID;
    var dataInfo = JSON.parse(JSON.stringify(data));
    delete dataInfo['table'];
    delete dataInfo['MainID'];
    delete dataInfo['id_employee'];
    dataInfo.update_at = new Date()
    dataInfo.id_updated = id_employee
    try {
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
    dataInfo.delete_flag = 1;
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

  async detailData(data): Promise<any> {
    var table = data.table;
    var idCat = data.idCat;
    if (table === "chitietxuatkho") {
      return this.prisma[table].findMany({ where: { id_phieu_xuat_kho: idCat } });
    } else if (table === "chitietnhapkho") {
      return this.prisma[table].findMany({ where: { id_phieu_nhap_kho: idCat } });
    } else if (table === "phieutiem") {
      return this.prisma[table].findMany({ where: { id_khach_hang: idCat } });
    }
    return
  }


  // Thống kê ++++++++++++++
  // Doanh thu theo tháng (thang)
  async doanhThuTheoThang(data): Promise<any> {
    console.log(data)

    var query = `SELECT * FROM tiem.phieutiem where create_at between "${data.startDay}" and "${data.endDay}"`

    const result = await this.prisma.$queryRawUnsafe(query);

    return result
  }

  async khachHangTheoTuan(data): Promise<any> {
    console.log(data)

    var query = `SELECT * FROM tiem.phieutiem where create_at between "${data.startDay}" and "${data.endDay}"`

    const result = await this.prisma.$queryRawUnsafe(query);

    return result
  }

  async khachHangTheoKhuVuc(): Promise<any> {
    var query1 = `SELECT gioi_tinh, COUNT(gioi_tinh) as "so_luong", que_quan FROM tiem.khachhang group by gioi_tinh, que_quan`

    const result = await this.prisma.$queryRawUnsafe(query1);

    return result
  }
}

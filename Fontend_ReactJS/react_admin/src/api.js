import { axios } from './HeaderApi'
export default{
    login: (data) => axios.post('/login', data),

    getData:(data) => axios.post('/getData', data),

    getAllData:(data) => axios.post('/getAllData', data),

    getTableFromID:(data) => axios.post('/getTableFromID', data),

    getEmployeeFromToken:(data) => axios.post('/getEmployeeFromToken', data),

    getKHFromMKH:(data) => axios.post('/getKHFromMKH', data),

    getKHFromSDT:(data) => axios.post('/getKHFromSDT', data),

    getPhieuTiemFromMKH:(data) => axios.post('/getPhieuTiemFromMKH', data),

    getPhieuTiemChuaThanhToanFromIdKH:(data) => axios.post('/getPhieuTiemChuaThanhToanFromIdKH', data),

    getPhieuTiemChuaTiemFromIdKH:(data) => axios.post('/getPhieuTiemChuaTiemFromIdKH', data),

    getChiTietPhieuTiemFromPT:(data) => axios.post('/getChiTietPhieuTiemFromPT', data),

    getTienSuBenhFromMaKH:(data) => axios.post('/getTienSuBenhFromMaKH', data),

    postData:(data) => axios.post('/addData', data),

    editData:(data) => axios.post('/editData', data),

    editTableNoSave:(data) => axios.post('/editTableNoSave', data),

    deleteData:(data) => axios.post('/deleteData', data),

    detailData:(data) => axios.post('/detailData', data),

    khachHangTheoTuan:(data) => axios.post('/khachHangTheoTuan', data),

    doanhThuTheoThang:(data) => axios.post('/doanhThuTheoThang', data),

    khachHangTheoKhuVuc:(data) => axios.post('/khachHangTheoKhuVuc', data),

    khachHangThang:(data) => axios.post('/khachHangThang', data),
}
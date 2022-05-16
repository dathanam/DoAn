import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutLeft from "../Layout/LayoutLeft.jsx";
import Home from '../Component/Home/Home.jsx';
import Role from "../Component/Home/Role.jsx";
import Page404 from "../Layout/Page404";
import DichVu from "../Component/Home/DichVu.jsx";
import KhachHang from "../Component/Home/KhachHang.jsx";
import NhanVien from "../Component/Home/NhanVien.jsx";
import PhongBenh from "../Component/Home/PhongBenh.jsx";
import TrangThai from "../Component/Home/TrangThai.jsx";
import Thuoc from "../Component/Home/Thuoc.jsx";
import PhieuTiem from "../Component/Home/PhieuTiem.jsx";
import HoaDon from "../Component/Home/HoaDon.jsx";
import LeTan from "../Component/Home/LeTan.jsx";
import PhongTiem from "../Component/Home/PhongTiem.jsx";
import TheoDoiSauTiem from "../Component/Home/TheoDoiSauTiem.jsx";
import PhieuTiemAdmin from "../Component/Home/PhieuTiemAdmin.jsx";
import HoaDonAdmin from "../Component/Home/HoaDonAdmin.jsx";
import PhieuTiemThuNgan from "../Component/Home/PhieuTiemThuNgan.jsx";

function RouterAdmin() {
    return (
        <div className="container">
            <LayoutLeft />
            <Router>
                <Switch>
                    <Route path="/admin" exact component={Home} />
                    <Route path="/admin/quyen" component={Role} />
                    <Route path="/admin/dichvu" component={DichVu} />
                    <Route path="/admin/khachhang" component={KhachHang} />
                    <Route path="/admin/nhanvien" component={NhanVien} />
                    <Route path="/admin/phongbenh" component={PhongBenh} />
                    <Route path="/admin/trangthai" component={TrangThai} />
                    <Route path="/admin/thuoc" component={Thuoc} />
                    <Route path="/admin/phieutiem" component={PhieuTiem} />
                    <Route path="/admin/phongtiem" component={PhongTiem} />
                    <Route path="/admin/phongsautiem" component={PhieuTiem} />
                    <Route path="/admin/hoadon" component={HoaDon} />
                    <Route path="/admin/theodoi" component={TheoDoiSauTiem} />
                    <Route path="/admin/letan" component={LeTan} />
                    <Route path="/admin/adminphieutiem" component={PhieuTiemAdmin} />
                    <Route path="/admin/phieutiemthungan" component={PhieuTiemThuNgan} />
                    <Route path="/admin/adminhoadon" component={HoaDonAdmin} />
                    <Route path="/admin/404" component={Page404} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAdmin;
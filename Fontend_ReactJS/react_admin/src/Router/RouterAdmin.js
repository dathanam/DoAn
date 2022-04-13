import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LayoutLeft from "../Layout/LayoutLeft.jsx";
import Home from '../Component/Home/Home.jsx';
import Role from "../Component/Home/Role.jsx";
import Page404 from "../Layout/Page404";
import DichVu from "../Component/Home/DichVu.jsx";
import KhachHang from "../Component/Home/KhachHang.jsx";
import NhanVien from "../Component/Home/NhanVien.jsx";

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
                    <Route path="/admin/404" component={Page404} />
                    <Route component={Page404} />
                </Switch>
            </Router>
        </div>
    );
}

export default RouterAdmin;
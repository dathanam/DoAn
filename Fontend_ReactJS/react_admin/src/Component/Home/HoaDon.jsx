import React, { useState, useEffect } from 'react';
import '../../CSS/HoaDon.css'
import Logo from '../../WPhoto/LogoTD2.png'
import MainRight from './MainRight';
import Button from '@material-ui/core/Button';
import Function from '../../Function';

function HoaDon() {
    const [phieuTiem, setPhieuTiem] = useState([]);
    const [khachHang, setKhachHang] = useState([]);
    const moment = require('moment')
    const [khachHangSearch, setKhachhangSearch] = useState({});
    function changeKhachHangSearch(event) {
        const newdata = { ...khachHangSearch };
        newdata[event.target.name] = event.target.value;
        setKhachhangSearch(newdata);
    }
    async function getPhieuTiemKhachHang() {
        try {
            var khachHang = await Function.getKHFromMKH(khachHangSearch);
            if (khachHang.length === 0) {
                alert("Khách hàng không tồn tại")
                window.location.reload()
            } else {
                setKhachHang(khachHang[0])
                var phieuTiem = await Function.getPhieuTiemFromMKH({ "id_khach_hang": khachHang[0].id });
                if (phieuTiem.length === 0) {
                    alert("Khách hàng không có phiếu tiêm")
                    window.location.reload()
                }else setPhieuTiem(phieuTiem[0])
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    async function submit() {
        try {
            const edit = {
                token: localStorage.getItem("accessToken"),
                table: "phieutiem",
                MainID: { "id": phieuTiem.id },
                id_trang_thai: 2,
                trang_thai: "đã thanh toán"
            }
            var PT = await Function.editData(edit);
            alert("Thanh toán thành công !");
            window.location.reload();
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <main>
                {
                    (phieuTiem.length === 0) ?
                        <div className="form-mid-three-w3l">
                            <div>
                                <div className="iner-left">
                                    <label>Mã khách hàng</label>
                                </div>
                                <div className="form-inn">
                                    <input name="ma_khach_hang" className="opt-select country-buttom" onChange={changeKhachHangSearch} />
                                </div>
                            </div>
                            <Button variant="contained" onClick={() => getPhieuTiemKhachHang()}>
                                Tìm kiếm
                            </Button>
                        </div> :
                        <div className="wrapper">
                            <div className="invoice_wrapper">
                                <div className="header">
                                    <div className="logo_invoice_wrap">
                                        <div className="logo_sec">
                                            <img src={Logo} alt="logo" />
                                            <div className="title_wrap">
                                                <p className="title bold titleHeader">Trung tâm tiêm chủng Thành Đạt</p>
                                                <p className="sub_title light">236 Hoàng Quốc Việt - quận Bắc Từ Liêm - thành phố Hà Nội</p>
                                            </div>
                                        </div>
                                        <div className="invoice_sec">
                                            {/* <p className="invoice bold">Thông tin</p> */}
                                            <p className="invoice_no">
                                                <span className="bold">ID</span>
                                                <span>#{phieuTiem.id}</span>
                                            </p>
                                            <p className="invoice_no">
                                                <span className="bold">Ngày</span>
                                                <span>{moment(phieuTiem.create_at).utc().format('DD/MM/YYYY')}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bill_total_wrap">
                                        <div className="bill_sec">
                                            <p>Khách Hàng</p>
                                            <p className="bold name bill_sec_name_price">{Function.changeText(khachHang.ten)}</p>
                                            <span>{Function.changeText(khachHang.que_quan)}<br />
                                                {moment(khachHang.ngay_sinh).utc().format('DD/MM/YYYY')}</span>
                                        </div>
                                        {/* <div className="total_wrap">
                            <p>Total Due</p>
                            <p className="bold price bill_sec_name_price">USD: 1200</p>
                        </div> */}
                                    </div>
                                </div>
                                <div className="body">
                                    <div className="main_table">
                                        <div className="table_header">
                                            <div className="row">
                                                <div className="col col_no">STT</div>
                                                <div className="col col_des">Vacxin</div>
                                                <div className="col col_price">Giá</div>
                                                <div className="col col_qty">Số lượng</div>
                                                <div className="col col_total">Thành tiền</div>
                                            </div>
                                        </div>
                                        <div className="table_body">
                                            <div className="row">
                                                <div className="col col_no"><p>01</p></div>
                                                <div className="col col_des">
                                                    <p className="bold">
                                                        {phieuTiem.ten_thuoc1}
                                                    </p>
                                                    <p>
                                                        phòng bênh :{phieuTiem.phong_benh1}
                                                    </p>
                                                </div>
                                                <div className="col col_price">
                                                    <p>$300</p>
                                                </div>
                                                <div className="col col_qty">
                                                    <p>1</p>
                                                </div>
                                                <div className="col col_total">
                                                    <p>600</p>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col col_no"><p>02</p></div>
                                                <div className="col col_des">
                                                    <p className="bold">
                                                        {phieuTiem.ten_thuoc2}
                                                    </p>
                                                    <p>
                                                        phòng bênh :{phieuTiem.phong_benh2}
                                                    </p>
                                                </div>
                                                <div className="col col_price">
                                                    <p>$300</p>
                                                </div>
                                                <div className="col col_qty">
                                                    <p>1</p>
                                                </div>
                                                <div className="col col_total">
                                                    <p>600</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="paymenthod_grandtotal_wrap">
                                        <div className="paymethod_sec">
                                            <p className="bold">Phương thức thanh toán</p>
                                            <p>BIDV: 21610000488079</p>
                                        </div>
                                        <div className="grandtotal_sec">
                                            <p className="bold">
                                                <span>Tổng Tiền</span>
                                                <span>{phieuTiem.tong_tien.toLocaleString()} VNĐ</span>
                                            </p>
                                            <p>
                                                <span>Tax Vat 10%</span>
                                                <span>{(phieuTiem.tong_tien / 10).toLocaleString()}</span>
                                            </p>
                                            <p>
                                                <span>Discount 10%</span>
                                                <span>-{(phieuTiem.tong_tien / 10).toLocaleString()}</span>
                                            </p>
                                            <p className="bold">
                                                <span>Thành Tiền</span>
                                                <span>{phieuTiem.tong_tien.toLocaleString()} VNĐ</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chung tâm</p>
                                    {/* <div className="terms">
                                        <p className="bold tc">Chúc bạn và gia đình thật nhiều sức khỏe !</p>
                                        <p>
                                            Hẹ
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                            <div className="set-reset">
                                <input type="submit" value="Đã thanh toán" onClick={() => submit()} />
                            </div>
                        </div>
                }
            </main>

            <MainRight />
        </>
    );
}

export default HoaDon;
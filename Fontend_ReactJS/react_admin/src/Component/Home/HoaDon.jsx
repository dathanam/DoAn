import React, { useState, useEffect } from 'react';
import '../../CSS/HoaDon.css'
import Logo from '../../WPhoto/LogoTD2.png'
import MainRight from './MainRight';
import Button from '@material-ui/core/Button';
import Function from '../../Function';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function HoaDon() {
    const classes = Styles();
    const [listKH, setListKH] = useState([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
    const [listPT, setListPT] = useState([]);
    const [phieuTiem, setPhieuTiem] = useState([]);
    const [khachHang, setKhachHang] = useState([]);
    const [thuoc, setThuoc] = useState([{ gia_ban_le: '' }]);
    const [methodChonPhongKham, setMethodChonPhongKham] = React.useState('a');
    const [phongKham, setPhongKham] = useState([])
    const moment = require('moment')

    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'khachhang' });
            setListKH(data);

            var data1 = await Function.getData({ "table": 'phieutiem' });
            setListPT(data1);

            var data2 = await Function.getData({ "table": 'phongkham' });
            setPhongKham(data2);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    async function selectKhachHang(id) {
        try {
            var data = await Function.getPhieuTiemChuaThanhToanFromIdKH({ "id_khach_hang": id });
            setPhieuTiem(data);

            var data1 = await Function.getTableFromID({ table: 'khachhang', id: id });
            setKhachHang(data1);

            var data2 = await Function.getTableFromID({ table: 'thuoc', id: data[0].id_thuoc1 });
            setThuoc(data2);

            if (data.id_thuoc2 != 0) {
                var data2 = await Function.getTableFromID({ table: 'thuoc', id: data[0].id_thuoc1 });

                var data3 = await Function.getTableFromID({ table: 'thuoc', id: data[0].id_thuoc2 });
                setThuoc([data2[0], ...data3])
            } else {
                var data2 = await Function.getTableFromID({ table: 'thuoc', id: data[0].id_thuoc1 });
                setThuoc(data2)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleRadioChonPhongKham = (event) => {
        setMethodChonPhongKham(event.target.value);
    };

    async function submit() {
        try {
            const edit = {
                token: localStorage.getItem("accessToken"),
                table: "phieutiem",
                MainID: { "id": phieuTiem[0].id },
                id_trang_thai: 3,
                trang_thai: "đã thanh toán"
            }
            var PT = await Function.editData(edit);

            var newChiTietPhongKham = {}
            newChiTietPhongKham.table = "chitietphongkham";
            newChiTietPhongKham.id_phong_kham = parseInt(methodChonPhongKham)
            newChiTietPhongKham.id_phieu_tiem = phieuTiem[0].id;
            newChiTietPhongKham.id_trang_thai = 3;
            newChiTietPhongKham.id_khach_hang = khachHang[0].id
            var CTPK = await Function.postData(newChiTietPhongKham);

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
                <div className="form-left-three-w3l">
                    <div className="iner-left">
                        <label>Khách hàng :</label>
                    </div>
                    <div className="form-inn">
                        <div className={classes.root}>
                            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                {
                                    listPT.map((item, index) => {
                                        if (item.id_trang_thai === 2)
                                            return (
                                                <Button key={index} onClick={() => selectKhachHang(item.id_khach_hang)}>{listKH.find(e => e.id === item.id_khach_hang).ten}</Button>
                                            )
                                    })
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                {
                    (khachHang.length === 0) ? "" :
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
                                                <span>#{phieuTiem[0].id}</span>
                                            </p>
                                            <p className="invoice_no">
                                                <span className="bold">Ngày</span>
                                                <span>{moment(phieuTiem[0].create_at).utc().format('DD/MM/YYYY')}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bill_total_wrap">
                                        <div className="bill_sec">
                                            <p>Khách Hàng</p>
                                            <p className="bold name bill_sec_name_price">{Function.changeText(khachHang[0].ten)}</p>
                                            <span>Địa chỉ: {Function.changeText(khachHang[0].que_quan)}<br />ngày sinh: {moment(khachHang[0].ngay_sinh).utc().format('DD/MM/YYYY')}</span>
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
                                                        {phieuTiem[0].ten_thuoc1}
                                                    </p>
                                                    <p>
                                                        phòng bênh :{phieuTiem[0].phong_benh1}
                                                    </p>
                                                </div>
                                                <div className="col col_price">
                                                    <p>{thuoc[0].gia_ban_le}</p>
                                                </div>
                                                <div className="col col_qty">
                                                    <p>1</p>
                                                </div>
                                                <div className="col col_total">
                                                    <p>{thuoc[0].gia_ban_le}</p>
                                                </div>
                                            </div>

                                            {
                                                (thuoc.length === 2) ?
                                                    <div className="row">
                                                        <div className="col col_no"><p>02</p></div>
                                                        <div className="col col_des">
                                                            <p className="bold">
                                                                {phieuTiem[0].ten_thuoc2}
                                                            </p>
                                                            <p>
                                                                phòng bênh :{phieuTiem[0].phong_benh2}
                                                            </p>
                                                        </div>
                                                        <div className="col col_price">
                                                            <p>{thuoc[1].gia_ban_le}</p>
                                                        </div>
                                                        <div className="col col_qty">
                                                            <p>1</p>
                                                        </div>
                                                        <div className="col col_total">
                                                            <p>{thuoc[1].gia_ban_le}</p>
                                                        </div>
                                                    </div> : ""
                                            }
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
                                                <span>{phieuTiem[0].tong_tien.toLocaleString()} VNĐ</span>
                                            </p>
                                            <p>
                                                <span>Tax Vat 10%</span>
                                                <span>{(phieuTiem[0].tong_tien / 10).toLocaleString()}</span>
                                            </p>
                                            <p>
                                                <span>Discount 10%</span>
                                                <span>-{(phieuTiem[0].tong_tien / 10).toLocaleString()}</span>
                                            </p>
                                            <p className="bold">
                                                <span>Thành Tiền</span>
                                                <span>{phieuTiem[0].tong_tien.toLocaleString()} VNĐ</span>
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
                            <br />
                            <div className='chon_phong_kham'>
                                <RadioGroup aria-label="quiz" value={methodChonPhongKham} onChange={handleRadioChonPhongKham} className='top_select_method_search'>
                                    <FormControlLabel value="4" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 1 (" + phongKham[3].so_nguoi + "người)"} className='chon_phong_kham_1' />
                                    <FormControlLabel value="5" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 2 (" + phongKham[4].so_nguoi + "người)"} className='chon_phong_kham_2' />
                                    <FormControlLabel value="6" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 3 (" + phongKham[5].so_nguoi + "người)"} className='chon_phong_kham_3' />
                                </RadioGroup>
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
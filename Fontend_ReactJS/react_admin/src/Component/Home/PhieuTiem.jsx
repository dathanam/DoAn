import React, { useState, useEffect } from 'react';
import MainRight from './MainRight';
import '../../CSS/PhieuTiem.css'
import Function from '../../Function';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

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
function PhieuTiem() {
    const classes = Styles();
    const moment = require('moment')
    const [dichVu, setDichVu] = useState([]);
    const [themDichVu, setThemDichVu] = useState(false);
    const [phongBenh, setPhongBenh] = useState([]);
    const [thuocs, setThuocs] = useState([]);
    const [thuocPhongBenh, setThuocPhongbenh] = useState([]);
    const [price, setPrice] = useState({ price1: 0, price2: 0 });
    const [khachHang, setKhachHang] = useState({ id: "", ma_khach_hang: "", ngay_sinh: "", que_quan: "", ten: "", sdt: "", gioi_tinh: "" });
    const [phieuTiem, setPhieuTiem] = useState({})
    const [khachHangTrongPhongKham, setKhachHangTrongPhongKham] = useState([])
    const [khachHangChoKhams, setKhachHangChoKhams] = useState([])
    const [soLuongDichVu, setSoLuongDichVu] = useState([1])

    const [dichVuDonThuoc, setDichVuDonThuoc] = useState([])
    const [dichVuDonThuocSelect, setDichVuDonThuocSelect] = useState({})

    function handlePhieuTiem(event) {
        const newdata = { ...phieuTiem };
        newdata[event.target.name] = event.target.value;
        setPhieuTiem(newdata);
    }

    const handleSelectDichVu = (event) => {
        const newdata = { ...dichVuDonThuocSelect };
        newdata[event.target.name] = event.target.value;
        newdata.dich_vu = (dichVu.find(e =>e.id = parseInt(event.target.value)).ten)
        setDichVuDonThuocSelect(newdata);
    };

    const handleSelectPhongBenh = (event) => {
        const newdata = { ...dichVuDonThuocSelect };
        newdata[event.target.name] = event.target.value;
        newdata.phong_benh = (phongBenh.find(e =>e.id === parseInt(event.target.value)).ten)
        setDichVuDonThuocSelect(newdata);

        var thuocPhongBenh = [];
        thuocs.map(item => {
            if (item.id_phong_benh === parseInt(event.target.value)) {
                thuocPhongBenh.push(item)
            }
        })
        setThuocPhongbenh(thuocPhongBenh)
    };

    const handleSelectThuoc = (event) => {
        const newdata = { ...dichVuDonThuocSelect };
        newdata[event.target.name] = event.target.value;
        newdata.thuoc = (thuocs.find(e =>e.id === parseInt(event.target.value)).ten)

        var arr = dichVuDonThuoc
        arr.push(newdata)

        setDichVuDonThuoc(arr)
        setDichVuDonThuocSelect({})
        setThuocPhongbenh([])
        setThemDichVu(false)
    };

    async function submit() {
        if (!!phieuTiem.id_thuoc1) phieuTiem.id_thuoc1 = parseInt(phieuTiem.id_thuoc1)
        if (!!phieuTiem.id_thuoc2) phieuTiem.id_thuoc2 = parseInt(phieuTiem.id_thuoc2)
        if (!!phieuTiem.id_dich_vu1) phieuTiem.id_dich_vu1 = parseInt(phieuTiem.id_dich_vu1)
        if (!!phieuTiem.id_dich_vu2) phieuTiem.id_dich_vu2 = parseInt(phieuTiem.id_dich_vu2)
        phieuTiem.id_trang_thai = 2;
        phieuTiem.trang_thai = "chưa thanh toán";
        phieuTiem.table = "phieutiem";
        phieuTiem.tong_tien = parseFloat(price.price1 + price.price2)

        const add = {
            table: 'phieutiem',
            MainID: { "id": phieuTiem.id },
        }
        const newdata = Object.assign(phieuTiem, add)

        try {
            var PT = await Function.editTableNoSave(newdata);

            var editPK = Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(localStorage.getItem("phongkham")) },
                so_nguoi: parseInt(khachHangChoKhams.length)
            });

            var editCTPK = Function.editTableNoSave({
                table: "chitietphongkham",
                MainID: { "id": (khachHangTrongPhongKham.find(c => c.id_phieu_tiem === parseInt(phieuTiem.id))).id },
                id_trang_thai: 2
            });

            alert("Mời khách hàng ra quầy thanh toán !");
            window.location.reload()
        }
        catch (error) {
            alert("Error");
            window.location.reload();
        }
    }

    async function HuyTiem() {

        phieuTiem.id_trang_thai = 5;
        phieuTiem.trang_thai = "hủy tiêm";
        phieuTiem.table = 'phieutiem';
        phieuTiem.MainID = { "id": phieuTiem.id };

        try {
            var PT = await Function.editTableNoSave(phieuTiem);

            var editPK = Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(localStorage.getItem("phongkham")) },
                so_nguoi: parseInt(khachHangChoKhams.length)
            });

            var editCTPK = Function.editTableNoSave({
                table: "chitietphongkham",
                MainID: { "id": (khachHangTrongPhongKham.find(c => c.id_phieu_tiem === parseInt(phieuTiem.id))).id },
                id_trang_thai: 5
            });

            alert("Xác nhận hủy tiêm");
            window.location.reload()
        }
        catch (error) {
            alert("Error");
            window.location.reload();
        }
    }

    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'phongbenh' });
            setPhongBenh(data);

            var data1 = await Function.getData({ "table": 'thuoc' });
            setThuocs(data1);

            var data2 = await Function.getData({ "table": 'chitietphongkham' });
            const id_phong_kham = parseInt(localStorage.getItem("phongkham"))
            const newdata = []

            data2.map(item => {
                if (item.id_phong_kham === parseInt(id_phong_kham) && item.id_trang_thai === 1) {
                    newdata.push(item)
                }
            })
            setKhachHangTrongPhongKham(data2)

            var data3 = await Function.getData({ "table": 'khachhang' });
            var KH = data3.find(e => e.id === newdata[0].id_khach_hang)
            setKhachHang(KH);

            var KHInPhongKham = []

            newdata.shift();
            newdata.map(item => {
                var KH = data3.find(e => e.id === item.id_khach_hang)
                KHInPhongKham.push(KH)
            })

            setKhachHangChoKhams(KHInPhongKham);

            var PT = await Function.getPhieuTiemFromMKH({ "id_khach_hang": KH.id });
            setPhieuTiem(Object.assign({ id: PT[0].id, doi_tuong: PT[0].doi_tuong }, phieuTiem))

            var data4 = await Function.getData({ "table": 'dichvu' });
            setDichVu(data4);
        }
        catch (err) {
            console.log(err)
        }
    }, []);
    return (
        <>
            <main>
                <div className="art-bothside">
                    <div className="form-left-three-w3l">
                        <div className="iner-left">
                            <label>Khách hàng đang khám:</label>
                        </div>
                        <div className="form-inn">
                            <div className={classes.root}>
                                <ButtonGroup color="primary" aria-label="outlined secondary button group">
                                    <Button>{khachHang.ten}</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                    <div className="form-left-three-w3l">
                        <div className="iner-left">
                            <label>Khách hàng tiếp theo:</label>
                        </div>
                        <div className="form-inn">
                            <div className={classes.root}>
                                <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                    {
                                        khachHangChoKhams.map((item, index) => {
                                            return (
                                                <Button key={index}>{item.ten}</Button>
                                            )
                                        })
                                    }
                                </ButtonGroup>
                            </div>
                        </div>
                    </div>
                    <div className="info-agile-persnal">
                        <h3>Thông tin khách hàng</h3>
                        <br />
                        <div className="form-group">
                            <div className="form-right-w3ls">
                                <div className="form-right-w3ls-span-ngaySinh">
                                    <span>Họ và tên</span>
                                    <p className='form-right-w3ls-ngaySinh'>{khachHang.ten}</p>
                                </div>
                            </div>

                            <div className="form-right-w3ls">
                                <div className="form-right-w3ls-span-ngaySinh">
                                    <span>Giới tính</span>
                                    <p className='form-right-w3ls-ngaySinh'>{khachHang.gioi_tinh}</p>
                                </div>
                            </div>

                            <div className="form-right-w3ls">
                                <div className='form-right-w3ls-span-ngaySinh'>
                                    <span>Ngày sinh</span>
                                    <p className='form-right-w3ls-ngaySinh'>{moment(khachHang.ngay_sinh).utc().format('DD/MM/YYYY')}</p>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <br />
                        <div className="form-group">
                            <div className="form-right-w3ls">
                                <div className='form-right-w3ls-span-ngaySinh'>
                                    <span>Số điện thoại</span>
                                    <p className='form-right-w3ls-ngaySinh'>{khachHang.sdt}</p>
                                </div>
                            </div>
                            <div className="form-right-w3ls">
                                <div className='form-right-w3ls-span-ngaySinh'>
                                    <span>Đối tượng</span>
                                    <p className='form-right-w3ls-ngaySinh'>{phieuTiem.doi_tuong}</p>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <div className="form-right-w3ls form-left-w3ls-quequan">
                                <span>Quê quán</span>
                                <p className='form-right-w3ls-ngaySinh'>{khachHang.que_quan}</p>
                            </div>
                        </div>
                        <br />
                        <div className="form-group">
                            <div className="form-right-w3ls form-left-w3ls-quequan">
                                <span>Ghi chú</span>
                                <input onChange={handlePhieuTiem} type="text" className="form-control" name='ghi_chu' />
                            </div>
                        </div>
                        {/*++++++++++++++++++ DICH VỤ 111111111111111111111111111 +++++++++++++++++++++++*/}
                        <div className="sub-agile-info">
                            <h6>Thông tin dịch vụ, đơn thuốc</h6>
                            <br />
                        </div>
                        {
                            dichVuDonThuoc.map((item, index) => {
                                return (
                                    <div className="form-group">
                                        <div className="form-right-w3ls">
                                            <div className="form-right-w3ls-span-ngaySinh">
                                                <span>Dịch vụ</span>
                                                <p className='form-right-w3ls-ngaySinh'>{item.dich_vu}</p>
                                            </div>
                                        </div>

                                        <div className="form-right-w3ls">
                                            <div className="form-right-w3ls-span-ngaySinh">
                                                <span>Phòng bệnh</span>
                                                <p className='form-right-w3ls-ngaySinh'>{item.phong_benh}</p>
                                            </div>
                                        </div>

                                        <div className="form-right-w3ls">
                                            <div className='form-right-w3ls-span-ngaySinh'>
                                                <span>Thuốc</span>
                                                <p className='form-right-w3ls-ngaySinh'>{item.thuoc}</p>
                                            </div>
                                        </div>
                                        <span className="material-icons-outlined" onClick={()=>setDichVuDonThuoc(dichVuDonThuoc.slice(0, index).concat(dichVuDonThuoc.slice(index + 1, dichVuDonThuoc.length)))}>close</span>
                                        <div className="clear"></div>
                                    </div>
                                )
                            })
                        }

                        <br />
                        <Button size="small" variant="contained" color="primary" onClick={() => setThemDichVu(true)}>
                            Thêm dịch vụ
                        </Button>
                        {
                            (themDichVu === false) ? "" :
                                <div className="form-group-three">
                                    <div className="form-left-three-w3l">
                                        <div className="iner-left">
                                            <label>Dịch vụ</label>
                                        </div>
                                        <div className="form-inn">
                                            <select className="opt-select country-buttom" onChange={handleSelectDichVu} name='id_dich_vu'>
                                                <option selected="true" disabled="disabled">lựa chọn</option>
                                                {
                                                    dichVu.map((item, index)=>{
                                                        return(
                                                            <option key={index} value={item.id}>{item.ten}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-left-three-w3l">
                                        <div className="iner-left">
                                            <label>Phòng bệnh</label>
                                        </div>
                                        <div className="form-inn">
                                            <select className="opt-select country-buttom" onChange={handleSelectPhongBenh} name='id_phong_benh'>
                                                <option selected="true" disabled="disabled">Lựa chọn</option>
                                                {
                                                    phongBenh.map((item, index) => {
                                                        return (
                                                            <option value={item.id} key={index}>{Function.changeText(item.ten)}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-mid-three-w3l">
                                        <div className="iner-left">
                                            <label>Thuốc</label>
                                        </div>
                                        <div className="form-inn">
                                            <select className="opt-select country-buttom" onChange={handleSelectThuoc} name='id_thuoc'>
                                                <option selected="true" disabled="disabled">Lựa chọn</option>
                                                {
                                                    thuocPhongBenh.map((item, index) => {
                                                        return (
                                                            <option value={item.id} key={index}>{Function.changeText(item.ten)}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                        }
                        <div className="form-right-three-w3l">
                            <div className="iner-left">
                                <label>Tổng tiền</label>
                            </div>
                            <div className="form-inn">
                                <h3>{(price.price1 + price.price2).toLocaleString()} vnđ</h3>
                            </div>
                        </div>
                    </div>
                    <div className="set-reset">
                        <input type="button" value="Hủy tiêm" onClick={() => HuyTiem()} />
                        <input type="submit" value="Submit" onClick={() => submit()} />
                    </div>
                </div>
            </main>



            <MainRight />
        </>
    );
}

export default PhieuTiem;
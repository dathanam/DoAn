import React, { useState, useEffect } from 'react';
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
function PhongTiem() {
    const classes = Styles();
    const moment = require('moment')
    const [khachHang, setKhachHang] = useState({ id: "", ma_khach_hang: "", ngay_sinh: "", que_quan: "", ten: "", sdt: "", gioi_tinh: "" });
    const [phieuTiem, setPhieuTiem] = useState({ doi_tuong: '' })
    const [khachHangTrongPhongKham, setKhachHangTrongPhongKham] = useState([])
    const [khachHangChoKhams, setKhachHangChoKhams] = useState([])
    const [chiTietPhieuTiem, setChiTietPhieuTiem] = useState([]);

    function handlePhieuTiem(event) {
        const newdata = { ...phieuTiem };
        newdata[event.target.name] = event.target.value;
        setPhieuTiem(newdata);
    }

    async function submit() {
        phieuTiem.id_trang_thai = 4;
        phieuTiem.trang_thai = "đã tiêm";
        phieuTiem.table = "phieutiem";
        phieuTiem.MainID = { "id": phieuTiem.id }

        try {
            var PT = await Function.editTableNoSave(phieuTiem);

            var editPK = Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(localStorage.getItem("phongkham")) },
                so_nguoi: parseInt(khachHangChoKhams.length)
            });

            var editCTPK = Function.editTableNoSave({
                table: "chitietphongkham",
                MainID: { "id": (khachHangTrongPhongKham.find(c => (c.id_phieu_tiem === parseInt(phieuTiem.id) && c.id_phong_kham === parseInt(localStorage.getItem("phongkham"))))).id },
                id_trang_thai: 4
            });

            alert("Mời khách hàng ra khu vực theo dõi sau tiêm !");
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
            var data2 = await Function.getData({ "table": 'chitietphongkham' });
            const id_phong_kham = parseInt(localStorage.getItem("phongkham"))
            const newdata = []

            data2.map(item => {
                if (item.id_phong_kham === parseInt(id_phong_kham) && item.id_trang_thai === 3) {
                    newdata.push(item)
                }
            })
            setKhachHangTrongPhongKham(data2)

            var data3 = await Function.getData({ "table": 'khachhang' });
            var KH = data3.find(e => e.id === newdata[0].id_khach_hang)
            setKhachHang(KH);

            var KHChoKham = []
            newdata.shift();
            newdata.map(item => {
                var KH = data3.find(e => e.id === item.id_khach_hang)
                KHChoKham.push(KH)
            })

            setKhachHangChoKhams(KHChoKham);

            var PT = await Function.getPhieuTiemChuaTiemFromIdKH({ "id_khach_hang": parseInt(KH.id) });
            if (PT.length > 0) {
                setPhieuTiem(PT[0])
                var dataDetailPT = await Function.getChiTietPhieuTiemFromPT({ "id_phieu_tiem": PT[0].id });
                setChiTietPhieuTiem(dataDetailPT);
            }
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
                            <label>Khách hàng đang tiêm:</label>
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
                        <br />
                        <br />
                        {/*++++++++++++++++++ DICH VỤ 111111111111111111111111111 +++++++++++++++++++++++*/}
                        <div className="sub-agile-info">
                            <h6>Thông tin dịch vụ, đơn thuốc</h6>
                        </div>
                        {
                            chiTietPhieuTiem.map((item, index) => {
                                return (
                                    <div key={index} className="form-group-three">
                                        <div className="form-left-three-w3l">
                                            <div className="iner-left">
                                                <label>Dịch vụ {index+1}</label>
                                            </div>
                                            <div className="form-inn">
                                                <p className='form-right-w3ls-ngaySinh'>{item.dich_vu}</p>
                                            </div>
                                        </div>
                                        <div className="form-left-three-w3l">
                                            <div className="iner-left">
                                                <label>Phòng bệnh</label>
                                            </div>
                                            <div className="form-inn">
                                                <p className='form-right-w3ls-ngaySinh'>{item.phong_benh}</p>
                                            </div>
                                        </div>
                                        <div className="form-mid-three-w3l">
                                            <div className="iner-left">
                                                <label>Thuốc</label>
                                            </div>
                                            <div className="form-inn">
                                                <p className='form-right-w3ls-ngaySinh'>{item.thuoc}</p>
                                            </div>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="set-reset">
                        <input type="button" value="Hủy tiêm" onClick={() => HuyTiem()} />
                        <input type="submit" value="Submit" onClick={() => submit()} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default PhongTiem;
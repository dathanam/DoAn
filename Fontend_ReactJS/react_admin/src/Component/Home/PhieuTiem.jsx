import React, { useState, useEffect } from 'react';
import '../../CSS/PhieuTiem.css'
import Function from '../../Function';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../Spinner/Spinner';

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
    const [loading, setLoading] = useState(false);
    const moment = require('moment')
    const [dichVu, setDichVu] = useState([]);
    const [themDichVu, setThemDichVu] = useState(false);
    const [phongBenh, setPhongBenh] = useState([]);
    const [thuocs, setThuocs] = useState([]);
    const [thuocPhongBenh, setThuocPhongbenh] = useState([]);
    const [price, setPrice] = useState(0);
    const [khachHang, setKhachHang] = useState({ id: "null", ma_khach_hang: "null", ngay_sinh: "null", que_quan: "null", ten: "null", sdt: "null", gioi_tinh: "null" });
    const [tienSuBenh, setTienSuBenh] = useState([])
    const [phieuTiem, setPhieuTiem] = useState({})
    const [khachHangTrongPhongKham, setKhachHangTrongPhongKham] = useState([])
    const [khachHangChoKhams, setKhachHangChoKhams] = useState([])
    const [phongKham, setPhongKham] = useState([])

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
        newdata.dich_vu = (dichVu.find(e => e.id === parseInt(event.target.value)).ten)
        setDichVuDonThuocSelect(newdata);
    };

    const handleSelectPhongBenh = (event) => {
        const newdata = { ...dichVuDonThuocSelect };
        newdata[event.target.name] = event.target.value;
        newdata.phong_benh = (phongBenh.find(e => e.id === parseInt(event.target.value)).ten)
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
        newdata.thuoc = (thuocs.find(e => e.id === parseInt(event.target.value)).ten)
        newdata.tien = (thuocs.find(e => e.id === parseInt(event.target.value)).gia_ban_le)

        var arr = dichVuDonThuoc
        arr.push(newdata)

        setDichVuDonThuoc(arr)

        setPrice(price + parseFloat(thuocs.find(c => c.id === parseInt(event.target.value)).gia_ban_le))

        setDichVuDonThuocSelect({})
        setThuocPhongbenh([])
        setThemDichVu(false)
    };

    async function submit() {
        phieuTiem.id_trang_thai = 2;
        phieuTiem.trang_thai = "ch??a thanh to??n";
        phieuTiem.table = "phieutiem";
        phieuTiem.tong_tien = parseFloat(price.price1 + price.price2);
        phieuTiem.MainID = { "id": phieuTiem.id };
        phieuTiem.tong_tien = parseFloat(price);

        try {
            var PT = await Function.editTableNoSave(phieuTiem);

            dichVuDonThuoc.map(item => {
                item.id_phieu_tiem = phieuTiem.id
                item.table = "chitietphieutiem"
                item.id_dich_vu = parseInt(item.id_dich_vu)
                item.id_phong_benh = parseInt(item.id_phong_benh)
                item.id_thuoc = parseInt(item.id_thuoc)
                item.tien = parseFloat(item.tien)

                Function.postData(item);
            })

            await Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(localStorage.getItem("phongkham")) },
                so_nguoi: parseInt((phongKham.find(e => e.id === parseInt(localStorage.getItem("phongkham")))).so_nguoi - 1)
            });

            await Function.editTableNoSave({
                table: "chitietphongkham",
                MainID: { "id": (khachHangTrongPhongKham.find(c => c.id_phieu_tiem === parseInt(phieuTiem.id))).id },
                id_trang_thai: 2
            });

            alert("M???i kh??ch h??ng ra qu???y thanh to??n !");
            window.location.reload()
        }
        catch (error) {
            await Function.editTableNoSave({
                table: "phieutiem",
                MainID: { "id": parseInt(PT.data.dataSave.id) },
                id_trang_thai: 1,
                trang_thai: "ch??a kh??m"
            });
            alert("Error");
            window.location.reload();
        }
    }

    async function HuyTiem() {

        phieuTiem.id_trang_thai = 5;
        phieuTiem.trang_thai = "h???y ti??m";
        phieuTiem.table = 'phieutiem';
        phieuTiem.MainID = { "id": phieuTiem.id };

        try {
            var PT = await Function.editTableNoSave(phieuTiem);

            var editPK = Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(localStorage.getItem("phongkham")) },
                so_nguoi: parseInt((phongKham.find(e => e.id === parseInt(localStorage.getItem("phongkham")))).so_nguoi - 1)
            });

            var editCTPK = Function.editTableNoSave({
                table: "chitietphongkham",
                MainID: { "id": (khachHangTrongPhongKham.find(c => c.id_phieu_tiem === parseInt(phieuTiem.id))).id },
                id_trang_thai: 5
            });

            alert("X??c nh???n h???y ti??m");
            window.location.reload()
        }
        catch (error) {
            alert("Error");
            window.location.reload();
        }
    }

    useEffect(async () => {
        try {
            setLoading(true);
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
            setKhachHangTrongPhongKham(newdata)

            var data3 = await Function.getData({ "table": 'khachhang' });
            var KH = data3.find(e => e.id === newdata[0].id_khach_hang)
            setKhachHang(KH);

            var TSB = await Function.getTienSuBenhFromMaKH({ "id_khach_hang": KH.id });
            setTienSuBenh(TSB)

            var KHChoKham = []
            newdata.map((item, index) => {
                if (index > 0) {
                    var KH = data3.find(e => e.id === item.id_khach_hang)
                    KHChoKham.push(KH)
                }
            })

            setKhachHangChoKhams(KHChoKham);

            var PT = await Function.getPhieuTiemFromMKH({ "id_khach_hang": KH.id });
            setPhieuTiem(Object.assign({ id: PT[0].id, doi_tuong: PT[0].doi_tuong }, phieuTiem))

            var data4 = await Function.getData({ "table": 'dichvu' });
            setDichVu(data4);

            var PK = await Function.getData({ "table": 'phongkham' });
            setPhongKham(PK);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (err) {
            setLoading(false);
        }
    }, []);
    return (
        <>
            {loading ? <Spinner /> :
                <main>
                    <div className="art-bothside">
                        <div className="form-left-three-w3l">
                            <div className="iner-left">
                                <label>Kh??ch h??ng ??ang kh??m:</label>
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
                                <label>Kh??ch h??ng ti???p theo:</label>
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
                            <h3>Th??ng tin kh??ch h??ng</h3>
                            <br />
                            <div className="form-group">
                                <div className="form-right-w3ls">
                                    <div className="form-right-w3ls-span-ngaySinh">
                                        <span>H??? v?? t??n</span>
                                        <p className='form-right-w3ls-ngaySinh'>{khachHang.ten}</p>
                                    </div>
                                </div>

                                <div className="form-right-w3ls">
                                    <div className="form-right-w3ls-span-ngaySinh">
                                        <span>Gi???i t??nh</span>
                                        <p className='form-right-w3ls-ngaySinh'>{khachHang.gioi_tinh}</p>
                                    </div>
                                </div>

                                <div className="form-right-w3ls">
                                    <div className='form-right-w3ls-span-ngaySinh'>
                                        <span>Ng??y sinh</span>
                                        <p className='form-right-w3ls-ngaySinh'>{moment(khachHang.ngay_sinh).utc().format('DD-MM-YYYY')}</p>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <br />
                            <div className="form-group">
                                <div className="form-right-w3ls">
                                    <div className='form-right-w3ls-span-ngaySinh'>
                                        <span>S??? ??i???n tho???i</span>
                                        <p className='form-right-w3ls-ngaySinh'>{khachHang.sdt}</p>
                                    </div>
                                </div>
                                <div className="form-right-w3ls">
                                    <div className='form-right-w3ls-span-ngaySinh'>
                                        <span>?????i t?????ng</span>
                                        <p className='form-right-w3ls-ngaySinh'>{phieuTiem.doi_tuong}</p>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="form-group">
                                <div className="form-right-w3ls form-left-w3ls-quequan">
                                    <span>Qu?? qu??n</span>
                                    <p className='form-right-w3ls-ngaySinh'>{khachHang.que_quan}</p>
                                </div>
                            </div>
                            <br />
                            <div className="form-group">
                                <div className="form-right-w3ls form-left-w3ls-quequan">
                                    <span>Ghi ch??</span>
                                    <input onChange={handlePhieuTiem} type="text" className="form-control" name='ghi_chu' />
                                </div>
                            </div>
                            <div className="sub-agile-info">
                                <h6>Ti???n s??? b???nh ???? t???ng g???p ph???i</h6>
                                <br />
                                {
                                    tienSuBenh.map((item, index) => {
                                        return (
                                            <>
                                                <div className="form-group">
                                                    <div className="form-right-w3ls form-left-w3ls-quequan">
                                                        <p key={index} className='tiensubenh'>+ ng??y: {moment(item.create_at).utc().format('DD-MM-YYYY')}  -  {item.dich_vu} &nbsp; ph??ng: {item.phong_benh} &nbsp;  - &nbsp;  c?? bi???u hi???n: {item.ghi_chu}</p>
                                                    </div>
                                                </div>
                                                <br />
                                            </>
                                        )
                                    })
                                }
                            </div>
                            {/*++++++++++++++++++ DICH V??? 111111111111111111111111111 +++++++++++++++++++++++*/}
                            <div className="sub-agile-info">
                                <h6>Th??ng tin d???ch v???, ????n thu???c</h6>
                                <br />
                            </div>
                            {
                                dichVuDonThuoc.map((item, index) => {
                                    return (
                                        <>
                                            <div className='rowThongTinDichVu'>
                                                <div className='col-md-1'>
                                                    <p key={index} className='tiensubenh'>+ {item.dich_vu}: {item.phong_benh} &nbsp; - &nbsp; thu???c: {item.thuoc}</p>
                                                </div>
                                                <div className='col-md-2'>
                                                    <span className="material-icons-outlined" onClick={() => {
                                                        setDichVuDonThuoc(dichVuDonThuoc.slice(0, index).concat(dichVuDonThuoc.slice(index + 1, dichVuDonThuoc.length)))
                                                        setPrice(price - parseFloat(thuocs.find(c => c.ten === item.thuoc).gia_ban_le))
                                                    }}>close</span>
                                                </div>
                                            </div>
                                            <br />
                                        </>
                                    )
                                })
                            }

                            <br />
                            <Button size="small" variant="contained" color="primary" onClick={() => setThemDichVu(true)}>
                                Th??m d???ch v???
                            </Button>
                            {
                                (themDichVu === false) ? "" :
                                    <div className="form-group-three">
                                        <div className="form-left-three-w3l">
                                            <div className="iner-left">
                                                <label>D???ch v???</label>
                                            </div>
                                            <div className="form-inn">
                                                <select className="opt-select country-buttom" onChange={handleSelectDichVu} name='id_dich_vu'>
                                                    <option selected="true" disabled="disabled">l???a ch???n</option>
                                                    {
                                                        dichVu.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{item.ten}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-left-three-w3l">
                                            <div className="iner-left">
                                                <label>Ph??ng b???nh</label>
                                            </div>
                                            <div className="form-inn">
                                                <select className="opt-select country-buttom" onChange={handleSelectPhongBenh} name='id_phong_benh'>
                                                    <option selected="true" disabled="disabled">L???a ch???n</option>
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
                                                <label>Thu???c</label>
                                            </div>
                                            <div className="form-inn">
                                                <select className="opt-select country-buttom" onChange={handleSelectThuoc} name='id_thuoc'>
                                                    <option selected="true" disabled="disabled">L???a ch???n</option>
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
                                    <label>T???ng ti???n</label>
                                </div>
                                <div className="form-inn">
                                    <h3>{price.toLocaleString()} vn??</h3>
                                </div>
                            </div>
                        </div>
                        <div className="set-reset">
                            <input type="button" value="H???y ti??m" onClick={() => HuyTiem()} />
                            <input type="submit" value="Submit" onClick={() => submit()} />
                        </div>
                    </div>
                </main >
            }
        </>
    );
}

export default PhieuTiem;
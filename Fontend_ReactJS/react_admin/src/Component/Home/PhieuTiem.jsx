import React, { useState, useEffect } from 'react';
import MainRight from './MainRight';
import '../../CSS/PhieuTiem.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataAddress from '../../Address';
import Function from '../../Function';
import Button from '@material-ui/core/Button';

function PhieuTiem(props) {
    const moment = require('moment')
    const [dataThanhPho, setDataThanhPho] = useState(DataAddress.thanhPho);
    const [dataQuan, setDataQuan] = useState([]);
    const [dataPhuong, setDataPhuong] = useState([]);
    const [value, setValue] = React.useState('old');
    const [phongBenh, setPhongBenh] = useState([]);
    const [thuocs, setThuocs] = useState([]);
    const [thuoc1, setThuoc1] = useState([]);
    const [thuoc2, setThuoc2] = useState([]);
    const [price, setPrice] = useState({ price1: 0, price2: 0 });
    const [khachHang, setKhachhang] = useState([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
    const [newKH, setNewKH] = useState();
    const [khachHangSearch, setKhachhangSearch] = useState({});
    console.log("setKhachhangSearch", khachHangSearch)
    console.log("khachHang", khachHang)
    const [address, setAddress] = useState("");
    const [phieuTiem, setPhieuTiem] = useState({})
    console.log("newKH", newKH)
    console.log("phieuTiem", phieuTiem)

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setKhachhang([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
        setNewKH();
    };

    async function getKHFromMKH() {
        try {
            var data = await Function.getKHFromMKH(khachHangSearch);
            if (data.length === 0) {
                setKhachhang([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
                setKhachhangSearch()
            } else setKhachhang(data);
            setPhieuTiem(Object.assign({ id_khach_hang: data[0].id }, phieuTiem));
        }
        catch (erro) {
            setKhachhangSearch()
            alert("không tìm thấy khách hàng mã " + khachHangSearch.ma_khach_hang)
        }
    }
    function changeKhachHangSearch(event) {
        const newdata = { ...khachHangSearch };
        newdata[event.target.name] = event.target.value;
        setKhachhangSearch(newdata);
    }
    function khachHangNew(event) {
        const newdata = { ...newKH };
        newdata[event.target.name] = event.target.value;
        setNewKH(newdata);
    }
    function handlePhieuTiem(event) {
        const newdata = { ...phieuTiem };
        newdata[event.target.name] = event.target.value;
        setPhieuTiem(newdata);
    }

    const handleAddressTP = (event) => {
        var newdata = [];
        DataAddress.quan.map(item => {
            if (item.idThanhPho === parseInt(event.target.value)) {
                newdata.push(item);
            }
        })
        setDataQuan(newdata);
        setAddress(dataThanhPho.find(c => c.id === parseInt(event.target.value)).name);
    };
    const handleAddressQuan = (event) => {
        var newdata = [];
        DataAddress.phuong.map(item => {
            if (item.idQuan === parseInt(event.target.value)) {
                newdata.push(item)
            }
        })
        setDataPhuong(newdata)
        setAddress(dataQuan.find(c => c.id === parseInt(event.target.value)).name + " - " + address)
    };
    const handleAddressPhuong = (event) => {
        setNewKH(Object.assign({ que_quan: dataPhuong.find(c => c.id === parseInt(event.target.value)).name + " - " + address }, newKH))
    };
    const handleSelectPhongBenh1 = (event) => {
        var newdata = [];
        thuocs.map(item => {
            if (item.id_phong_benh === parseInt(event.target.value)) {
                newdata.push(item)
            }
        })
        setPrice({
            price1: 0,
            price2: price.price2
        })
        delete phieuTiem["id_thuoc1"]
        delete phieuTiem["ten_thuoc1"]
        delete phieuTiem["phong_benh1"]
        setThuoc1(newdata)
        setPhieuTiem(Object.assign({ phong_benh1: phongBenh.find(c => c.id === parseInt(event.target.value)).ten }, phieuTiem))
    };
    const handleSelectPhongBenh2 = (event) => {
        var newdata = [];
        thuocs.map(item => {
            if (item.id_phong_benh === parseInt(event.target.value)) {
                newdata.push(item)
            }
        })
        setPrice({
            price1: price.price1,
            price2: 0
        })
        delete phieuTiem["id_thuoc2"]
        delete phieuTiem["ten_thuoc2"]
        delete phieuTiem["phong_benh2"]
        setThuoc2(newdata)
        setPhieuTiem(Object.assign({ phong_benh2: phongBenh.find(c => c.id === parseInt(event.target.value)).ten }, phieuTiem))
    };

    const handleSelectThuoc1 = (event) => {
        setPrice({
            price1: parseFloat(thuocs.find(c => c.id === parseInt(event.target.value)).gia_ban_le),
            price2: price.price2
        })
        delete phieuTiem["id_thuoc1"]
        delete phieuTiem["ten_thuoc1"]
        setPhieuTiem(Object.assign({ id_thuoc1: event.target.value, ten_thuoc1: thuocs.find(c => c.id === parseInt(event.target.value)).ten }, phieuTiem))
    }
    const handleSelectThuoc2 = (event) => {
        setPrice({
            price1: price.price1,
            price2: parseFloat(thuocs.find(c => c.id === parseInt(event.target.value)).gia_ban_le)
        })
        delete phieuTiem["id_thuoc2"]
        delete phieuTiem["ten_thuoc2"]
        setPhieuTiem(Object.assign({ id_thuoc2: event.target.value, ten_thuoc2: thuocs.find(c => c.id === parseInt(event.target.value)).ten }, phieuTiem))
    }

    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'phongbenh' });
            setPhongBenh(data);

            var data1 = await Function.getData({ "table": 'thuoc' });
            setThuocs(data1);
        }
        catch (err) {
            console.log(err)
        }
    }, []);
    return (
        <>
            <main>
                <div className="art-bothside">
                    <div className='art-bothside-top'>
                        <div className="form-left-three-w3l">
                            <RadioGroup aria-label="quiz" value={value} onChange={handleRadioChange}>
                                <FormControlLabel value="old" control={<Radio />} label="Khách hàng thân thiết" />
                                <FormControlLabel value="new" control={<Radio />} label="Khách hàng mới" />
                            </RadioGroup>
                        </div>
                        {
                            (value === 'old') ?
                                <div className="form-mid-three-w3l">
                                    <div>
                                        <div className="iner-left">
                                            <label>Mã khách hàng</label>
                                        </div>
                                        <div className="form-inn">
                                            <input name="ma_khach_hang" className="opt-select country-buttom" onChange={changeKhachHangSearch} />
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={() => getKHFromMKH()}>
                                        Tìm kiếm
                                    </Button>
                                </div> : ""
                        }

                    </div>
                    <form>
                        <div className="info-agile-persnal">
                            <h3>Thông tin khách hàng</h3>
                            {
                                (value === 'old') ?
                                    <>
                                        <br />
                                        <div className="form-group">
                                            <div className="form-right-w3ls">
                                                <div className="form-right-w3ls-span-ngaySinh">
                                                    <span>Họ và tên</span>
                                                    <p className='form-right-w3ls-ngaySinh'>{(khachHang === null) ? "" : khachHang[0].ten}</p>
                                                </div>
                                            </div>

                                            <div className="form-right-w3ls">
                                                <div className="form-right-w3ls-span-ngaySinh">
                                                    <span>Giới tính</span>
                                                    <p className='form-right-w3ls-ngaySinh'>{(khachHang === null) ? "" : khachHang[0].gioi_tinh}</p>
                                                </div>
                                            </div>

                                            <div className="form-right-w3ls">
                                                <div className='form-right-w3ls-span-ngaySinh'>
                                                    <span>Ngày sinh</span>
                                                    <p className='form-right-w3ls-ngaySinh'>{moment((khachHang === null) ? "" : khachHang[0].ngay_sinh).utc().format('DD/MM/YYYY')}</p>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <br />
                                        <br />
                                        <div className="form-group">
                                            <div className="form-right-w3ls">
                                                <div className='form-right-w3ls-span-ngaySinh'>
                                                    <span>Quê quán</span>
                                                    <p className='form-right-w3ls-ngaySinh'>{(khachHang === null) ? "" : khachHang[0].que_quan}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </> : <>
                                        <br />
                                        <div className="form-group">
                                            <div className="form-left-w3ls">
                                                <span>Họ và tên</span>
                                                <input onChange={khachHangNew} type="text" className="form-control" name='ten' />
                                            </div>

                                            <div className="form-right-w3ls">
                                                <span>Ngày sinh</span>
                                                <input onChange={khachHangNew} type="date" className="form-control" name='ngay_sinh' />
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <br />
                                        <div className="form-group">
                                            <div className="form-right-w3ls">
                                                <span>Giới tính</span>
                                                <select onChange={khachHangNew} className="opt-select country-buttom" name='gioi_tinh'>
                                                    <option selected="true" disabled="disabled">lựa chọn</option>
                                                    <option value="nam">Nam</option>
                                                    <option value="nữ">Nữ</option>
                                                </select>
                                            </div>

                                            <div className="form-right-w3ls">
                                                <span>Đối tượng</span>
                                                <select className="opt-select country-buttom" onChange={khachHangNew} name='doi_tuong'>
                                                    <option selected="true" disabled="disabled">lựa chọn</option>
                                                    <option value="người lớn">Người lớn</option>
                                                    <option value="trẻ em">Trẻ em</option>
                                                </select>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="sub-agile-info">
                                            <h6>Quê quán</h6>
                                        </div>
                                        <div className="form-group-three">
                                            <div className="form-left-three-w3l">
                                                <div className="iner-left">
                                                    <label>Tỉnh/thành phố</label>
                                                </div>
                                                <div className="form-inn">
                                                    <select className="opt-select country-buttom" onChange={handleAddressTP}>
                                                        <option selected="true" disabled="disabled">lựa chọn</option>
                                                        {
                                                            dataThanhPho.map((item, index) => {
                                                                return (
                                                                    <option value={item.id} key={index}>{Function.changeText(item.name)}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-mid-three-w3l">
                                                <div className="iner-left">
                                                    <label>quận/huyện</label>
                                                </div>
                                                <div className="form-inn">
                                                    <select className="opt-select country-buttom" onChange={handleAddressQuan}>
                                                        <option disabled="disabled">lựa chọn</option>
                                                        {dataQuan.map((item, index) => {
                                                            return (
                                                                <option key={index} value={item.id}>{Function.changeText(item.name)}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-right-three-w3l">
                                                <div className="iner-left">
                                                    <label>phường/xã</label>
                                                </div>
                                                <div className="form-inn">
                                                    <select className="opt-select country-buttom" onChange={handleAddressPhuong}>
                                                        <option selected="true" disabled="disabled">lựa chọn</option>
                                                        {
                                                            dataPhuong.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.id}>{Function.changeText(item.name)}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </>
                            }
                            <br />
                            <br />
                            {/*++++++++++++++++++ DICH VỤ 111111111111111111111111111 +++++++++++++++++++++++*/}
                            <div className="sub-agile-info">
                                <h6>Thông tin dịch vụ, đơn thuốc</h6>
                            </div>
                            <div className="form-group-three">
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Dịch vụ 1</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handlePhieuTiem} name='id_dich_vu1'>
                                            <option selected="true" disabled="disabled">lựa chọn</option>
                                            <option value={1}>Tiêm</option>
                                            <option value={2}>Uống</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Phòng bệnh</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handleSelectPhongBenh1}>
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
                                        <select className="opt-select country-buttom" onChange={handleSelectThuoc1}>
                                            <option selected="true" disabled="disabled">Lựa chọn</option>
                                            {
                                                thuoc1.map((item, index) => {
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

                            {/*++++++++++++++++++ DICH VỤ 22222222222222222222222222222222222222 +++++++++++++++++++++++*/}
                            <div className="form-group-three">
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Dịch vụ 2</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handlePhieuTiem} name='id_dich_vu2'>
                                            <option selected="true" disabled="disabled">lựa chọn</option>
                                            <option value={1}>Tiêm</option>
                                            <option value={2}>Uống</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Phòng bệnh</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handleSelectPhongBenh2}>
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
                                        <select className="opt-select country-buttom" onChange={handleSelectThuoc2}>
                                            <option selected="true" disabled="disabled">Lựa chọn</option>
                                            {
                                                thuoc2.map((item, index) => {
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
                            <input type="button" value="Clear Form" />
                            <input type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </main>



            <MainRight />
        </>
    );
}

export default PhieuTiem;
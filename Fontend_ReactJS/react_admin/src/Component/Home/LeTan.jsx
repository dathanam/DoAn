import React, { useState, useEffect } from 'react';
import '../../CSS/PhieuTiem.css'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DataAddress from '../../Address';
import Function from '../../Function';
import Button from '@material-ui/core/Button';

function LeTan() {
    const moment = require('moment')
    const [dataThanhPho, setDataThanhPho] = useState(DataAddress.thanhPho);
    const [dataQuan, setDataQuan] = useState([]);
    const [dataPhuong, setDataPhuong] = useState([]);
    const [value, setValue] = React.useState('old');
    const [methodSelect, setMethodSelect] = React.useState('MKH');
    const [methodChonPhongKham, setMethodChonPhongKham] = React.useState('a');
    const [newMKH, setNewMKH] = React.useState("");
    const [SearchMKH, setSearchMKH] = useState({ ma_khach_hang: "" });
    const [SearchSDT, setSearchSDT] = useState({ sdt: "" });
    const [khachHang, setKhachhang] = useState([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
    const [newKH, setNewKH] = useState();
    const [address, setAddress] = useState("");
    const [phieuTiem, setPhieuTiem] = useState({})
    const [phongKham, setPhongKham] = useState([])
    const [validateText, setValidateText] = useState("")
    const [validateStatus, setValidateStatus] = useState(true)

    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'phongkham' });
            setPhongKham(data);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    const setTextValidate = () => { setValidateText("") }

    const validateSDTKH = () => {
        var validate = Function.validateInput(newKH.sdt)
        console.log("validate", validate)
        if (validate.isInputValid === true) {
            return
        } else {
            setValidateText(validate.errorMessage)
            setValidateStatus(false)
        }
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

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setKhachhang([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
        setNewKH();
        setNewMKH();
        setValidateText("");
    };

    const handleMethodSelect = (event) => {
        setMethodSelect(event.target.value);
        setSearchMKH({ ma_khach_hang: "" })
        setSearchSDT({ sdt: "" })
    };

    const handleRadioChonPhongKham = (event) => {
        setMethodChonPhongKham(parseInt(event.target.value));
        setPhieuTiem(Object.assign({ ghi_chu: "null" }, phieuTiem));
    };

    async function getKHFromMKH() {
        try {
            var data = await Function.getKHFromMKH(SearchMKH);
            if (data.length === 0) {
                setKhachhang([{ id: "", ma_khach_hang: "", ten: "", sdt: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
                setSearchMKH({ ma_khach_hang: "" })
            } else setKhachhang(data);
            var age = TinhTuoi(data[0].ngay_sinh)
            var doi_tuong = age > 18 ? "người lớn" : "trẻ em"
            setPhieuTiem(Object.assign({ id_khach_hang: data[0].id, doi_tuong: doi_tuong }, phieuTiem));
        }
        catch (erro) {
            setKhachhang([{ id: "", ma_khach_hang: "", ten: "", sdt: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
            setSearchMKH({ ma_khach_hang: "" })
            alert("không tìm thấy khách hàng mã " + SearchMKH.ma_khach_hang)
        }
    }
    async function getKHFromSDT() {
        const validate = Function.validateInput(SearchSDT.sdt)
        if (validate.isInputValid === true) {
            try {
                var data = await Function.getKHFromSDT(SearchSDT);
                if (data.length === 0) {
                    setKhachhang([{ id: "", ma_khach_hang: "", ten: "", sdt: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
                    setSearchSDT({ sdt: "" })
                } else setKhachhang(data);
                var age = TinhTuoi(data[0].ngay_sinh)
                var doi_tuong = age > 18 ? "người lớn" : "trẻ em"
                setPhieuTiem(Object.assign({ id_khach_hang: data[0].id, doi_tuong: doi_tuong }, phieuTiem));
            }
            catch (erro) {
                setSearchSDT({ sdt: "" })
                setKhachhang([{ id: "", ma_khach_hang: "", ten: "", sdt: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
                alert("không tìm thấy khách có sđt " + SearchSDT.sdt)
            }
        } else {
            setValidateText(validate.errorMessage)
            return
        }
    }
    function changeKhachHangSearch(event) {
        if (methodSelect === 'MKH') {
            const newdata = { ...SearchMKH };
            newdata[event.target.name] = event.target.value;
            setSearchMKH(newdata);
        } else {
            const newdata = { ...SearchSDT };
            newdata[event.target.name] = event.target.value;
            setSearchSDT(newdata);
        }
    }
    function TinhTuoi(date) {
        var NS = date
        var ageDifMs = Date.now() - new Date(NS).getTime();
        var ageDate = new Date(ageDifMs);
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);

        return age;
    }
    function khachHangNew(event) {
        const newdata = { ...newKH };
        newdata[event.target.name] = event.target.value;
        if (event.target.name === 'ngay_sinh') {

            var age = TinhTuoi(event.target.value)
            var newDataPT = { ...phieuTiem }
            if (age > 18) {
                newDataPT.doi_tuong = "người lớn"
            } else {
                newDataPT.doi_tuong = "trẻ em"
            }
            setPhieuTiem(newDataPT)
        }
        setNewKH(newdata);
    }
    function handlePhieuTiem(event) {
        const newdata = { ...phieuTiem };
        newdata[event.target.name] = event.target.value;
        setPhieuTiem(newdata);
    }

    async function handleTaoMa() {
        var newMaKH = '';
        var khachHang = {}
        try {
            var khachHangs = await Function.getData({ "table": "khachhang" });
            if (khachHangs.length === 0) {
                setNewKH(Object.assign({ ma_khach_hang: 'mta1' }, newKH))
                setNewMKH("mta1")
            } else {
                khachHang = khachHangs[khachHangs.length - 1]
                newMaKH = newMaKH.concat('mta', parseInt(khachHang.ma_khach_hang.slice(3)) + 1)
                setNewKH(Object.assign({ ma_khach_hang: newMaKH }, newKH))
                setNewMKH(newMaKH)
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function submit() {
        var newChiTietPhongKham = {}
        phieuTiem.table = "phieutiem";
        phieuTiem.id_trang_thai = 1;
        phieuTiem.trang_thai = "chưa khám";

        newChiTietPhongKham.table = "chitietphongkham";
        newChiTietPhongKham.id_phong_kham = methodChonPhongKham

        if (value === 'old') {
            try {
                var PT = await Function.postData(phieuTiem);

                newChiTietPhongKham.id_phieu_tiem = PT.data.dataSave.id;
                newChiTietPhongKham.id_trang_thai = 1;
                newChiTietPhongKham.id_khach_hang = khachHang[0].id
                var CTPK = await Function.postData(newChiTietPhongKham);

                var edit = await Function.editTableNoSave({
                    table: "phongkham",
                    MainID: { "id": methodChonPhongKham },
                    so_nguoi: parseInt((phongKham.find(e => e.id === methodChonPhongKham)).so_nguoi + 1)
                });

                alert("Mời khách vào phòng khám số " + methodChonPhongKham);
                window.location.reload();
            }
            catch (error) {
                alert("Tạo phiếu khám thất bại 1");
                window.location.reload();
            }
        } else {
            newKH.table = "khachhang";

            try {
                var khachhang = await Function.postData(newKH);

                phieuTiem.id_khach_hang = khachhang.data.dataSave.id;
                var PT = await Function.postData(phieuTiem);

                newChiTietPhongKham.id_phieu_tiem = PT.data.dataSave.id;
                newChiTietPhongKham.id_trang_thai = 1;
                newChiTietPhongKham.id_khach_hang = khachhang.data.dataSave.id;
                var CTPK = await Function.postData(newChiTietPhongKham);

                var edit = await Function.editTableNoSave({
                    table: "phongkham",
                    MainID: { "id": methodChonPhongKham },
                    so_nguoi: parseInt((phongKham.find(e => e.id === methodChonPhongKham)).so_nguoi + 1)
                });
                alert("Mời khách vào phòng khám số " + methodChonPhongKham);
                window.location.reload();
            }
            catch (error) {
                await Function.deleteData({
                    MainID: { "id": phieuTiem.id_khach_hang },
                    table: 'khachhang',
                });
                alert("Tạo phiếu khám thất bại");
                window.location.reload();
            }
        }
    }
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
                                <div className="form-mid-three-w3l form-mid-three-w3l-top-search">
                                    <RadioGroup aria-label="quiz" value={methodSelect} onChange={handleMethodSelect} className='top_select_method_search'>
                                        <FormControlLabel value="MKH" control={<Radio />} label="Mã khách hàng" />
                                        <FormControlLabel value="SDT" control={<Radio />} label="Số điện thoại" />
                                    </RadioGroup>
                                    <div>
                                        <div className="iner-left">
                                            {
                                                (methodSelect === 'MKH') ? <label>Mã khách hàng</label> : <label>Số điện thoại</label>
                                            }
                                        </div>
                                        <div className="form-inn">
                                            <div>
                                                <input name={(methodSelect === 'MKH') ? "ma_khach_hang" : "sdt"} className="opt-select country-buttom" value={(methodSelect === 'MKH') ? SearchMKH.ma_khach_hang : SearchSDT.sdt} onChange={changeKhachHangSearch} onClick={setTextValidate} />
                                                <p style={{ color: 'red' }}>{validateText}</p>
                                            </div>
                                        </div>
                                        <Button variant="contained" className='top_select_method_search_btn' onClick={() => {
                                            (methodSelect === 'MKH') ? getKHFromMKH() : getKHFromSDT()
                                        }}>
                                            Tìm kiếm
                                        </Button>
                                    </div>
                                </div> :
                                <div className="form-mid-three-w3l">
                                    <br /> <br />
                                    <div className='form-mid-three-w3l-taoma'>
                                        <Button variant="contained" onClick={() => handleTaoMa()}>
                                            Tạo mã
                                        </Button>
                                        <p>MKH: {newMKH}</p>
                                    </div>
                                </div>
                        }

                    </div>
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
                                                <span>Số điện thoại</span>
                                                <p className='form-right-w3ls-ngaySinh'>{(khachHang === null) ? "" : khachHang[0].sdt}</p>
                                            </div>
                                        </div>
                                        <div className="form-right-w3ls">
                                            <div className='form-right-w3ls-span-ngaySinh'>
                                                <span>Đối tượng</span>
                                                <p className='form-right-w3ls-ngaySinh'>{(phieuTiem && phieuTiem.doi_tuong)}</p>
                                            </div>
                                            {/* <select className="opt-select country-buttom" onChange={handlePhieuTiem} name='doi_tuong'>
                                                <option selected="true" disabled="disabled">lựa chọn</option>
                                                <option value="người lớn">Người lớn</option>
                                                <option value="trẻ em">Trẻ em</option>
                                            </select> */}
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="form-group">
                                        <div className="form-right-w3ls form-left-w3ls-quequan">
                                            <span>Quê quán</span>
                                            <p className='form-right-w3ls-ngaySinh'>{(khachHang === null) ? "" : khachHang[0].que_quan}</p>
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

                                        <div className="form-left-w3ls form-left-w3ls-sdt">
                                            <span>Sđt</span>
                                            <div style={{ display: 'grid', width: '100%' }}>
                                                <input onChange={khachHangNew} type="text" className="form-control" name='sdt' onBlur={validateSDTKH} onClick={setTextValidate} />
                                                <p style={{ color: 'red', marginTop: '-15px' }}>{validateStatus ? "" : validateText}</p>
                                            </div>
                                        </div>

                                        <div className="form-right-w3ls">
                                            <div style={{ display: 'flex' }}>
                                                <span>Đối tượng</span>
                                                <p style={{ fontSize: '18px', color: 'black' }}>{(phieuTiem && phieuTiem.doi_tuong)}</p>
                                            </div>
                                            {/* <select className="opt-select country-buttom" onChange={handlePhieuTiem} name='doi_tuong'>
                                                <option selected="true" disabled="disabled">lựa chọn</option>
                                                <option value="người lớn">Người lớn</option>
                                                <option value="trẻ em">Trẻ em</option>
                                            </select> */}
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
                        <div className='chon_phong_kham'>
                            <RadioGroup aria-label="quiz" value={methodChonPhongKham} onChange={handleRadioChonPhongKham} className='top_select_method_search'>
                                {
                                    phongKham.map((item, index) => {
                                        if (item.id_loai_phong === 1) {
                                            return (
                                                <FormControlLabel key={index} value={item.id} control={<Radio />} label={(phongKham.length === 0) ? "" : item.ten + " (số người: " + item.so_nguoi + ")"} className={"chon_phong_kham_" + (index + 1)} />
                                            )
                                        }
                                    })
                                }
                                {/* <FormControlLabel value="1" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng khám 1 (" + phongKham[0].so_nguoi + "người)"} className='chon_phong_kham_1' />
                                <FormControlLabel value="2" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng khám 2 (" + phongKham[1].so_nguoi + "người)"} className='chon_phong_kham_2' />
                                <FormControlLabel value="3" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng khám 3 (" + phongKham[2].so_nguoi + "người)"} className='chon_phong_kham_3' /> */}
                            </RadioGroup>
                        </div>
                        <br />
                    </div>
                    <div className="set-reset">
                        <input type="submit" value="Xác nhận" onClick={() => submit()} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default LeTan;
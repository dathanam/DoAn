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
    const [dataThanhPho, setDataThanhPho] = useState(DataAddress.thanhPho);
    const [dataQuan, setDataQuan] = useState([]);
    const [dataPhuong, setDataPhuong] = useState([]);
    const [value, setValue] = React.useState('old');
    const [phongBenh, setPhongBenh] = useState([]);
    const [thuocs, setThuocs] = useState([]);
    const [thuoc1, setThuoc1] = useState([]);
    const [thuoc2, setThuoc2] = useState([]);
    const [price, setPrice] = useState({ price1: 0, price2: 0 });
    const [khachHang, setKhachhang] = useState({});
    const [khachHangSearch, setKhachhangSearch] = useState();
    console.log("khachHang", khachHang)


    const handleRadioChange = (event) => { setValue(event.target.value) };

    async function getKHFromMKH(){
        try {
            var data = await Function.getKHFromMKH(khachHangSearch);
            setKhachhang(data);
        }
        catch (erro) {
            console.log("erro", erro)
        }
    }
    function changeKhachHangSearch(event) {
        const newdata = { ...khachHangSearch };
        newdata[event.target.name] = event.target.value;
        setKhachhangSearch(newdata);
    }

    const handleAddressTP = (event) => {
        var newdata = [];
        DataAddress.quan.map(item => {
            if (item.idThanhPho == event.target.value) {
                newdata.push(item)
            }
        })
        setDataQuan(newdata)
    };
    const handleAddressQuan = (event) => {
        var newdata = [];
        DataAddress.phuong.map(item => {
            if (item.idQuan == event.target.value) {
                newdata.push(item)
            }
        })
        setDataPhuong(newdata)
    };
    const handleSelectPhongBenh1 = (event) => {
        var newdata = [];
        thuocs.map(item => {
            if (item.id_phong_benh == event.target.value) {
                newdata.push(item)
            }
        })
        setThuoc1(newdata)
        setPrice({
            price1: 0,
            price2: price.price2
        })
    };
    const handleSelectPhongBenh2 = (event) => {
        var newdata = [];
        thuocs.map(item => {
            if (item.id_phong_benh == event.target.value) {
                newdata.push(item)
            }
        })
        setThuoc2(newdata)
        setPrice({
            price1: price.price1,
            price2: 0
        })
    };

    const handleSelectThuoc1 = (event) => {
        setPrice({
            price1: parseFloat(event.target.value),
            price2: price.price2
        })
    }
    const handleSelectThuoc2 = (event) => {
        setPrice({
            price1: price.price1,
            price2: parseFloat(event.target.value)
        })
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
                                            <input name="ma_khach_hang" className="opt-select country-buttom" onChange={changeKhachHangSearch}/>
                                        </div>
                                    </div>
                                    <Button variant="contained" onClick={()=>getKHFromMKH()}>
                                        Tìm kiếm
                                    </Button>
                                </div> : ""
                        }

                    </div>
                    <form>
                        <div className="info-agile-persnal">
                            <h3>Thông tin khách hàng</h3>
                            <div className="form-group">
                                <div className="form-left-w3ls">
                                    <span>Họ và tên</span>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="form-right-w3ls">
                                    <span>Giới tính</span>
                                    <select className="opt-select country-buttom">
                                        <option value="category2">Nam</option>
                                        <option value="category1">Nữ</option>
                                    </select>
                                </div>

                                <div className="form-right-w3ls">
                                    <span>Đối tượng</span>
                                    <select className="opt-select country-buttom">
                                        <option value="">lựa chọn</option>
                                        <option value="category2">Người lớn</option>
                                        <option value="category1">Trẻ em</option>
                                    </select>
                                </div>

                                <div className="form-right-w3ls">
                                    <span>Ngày sinh</span>
                                    <input type="date" className="form-control" />
                                </div>
                                <div className="clear"></div>
                            </div>
                            {
                                (value === 'old') ?
                                    <div className="form-group">
                                        <div className="form-left-w3ls">
                                            <span>Quê quán</span>
                                            <input type="text" className="form-control" />
                                        </div>
                                    </div> :
                                    <>
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
                                                        <option>lựa chọn</option>
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
                                                        <option value="">Lựa chọn</option>
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
                                                    <select className="opt-select country-buttom">
                                                        <option value="">Lựa chọn</option>
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
                            <div className="sub-agile-info">
                                <h6>Thông tin dịch vụ, đơn thuốc</h6>
                            </div>
                            <div className="form-group-three">
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Dịch vụ 1</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom">
                                            <option value="">lựa chọn</option>
                                            <option value="category2">Tiêm</option>
                                            <option value="category1">Uống</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Phòng bệnh</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handleSelectPhongBenh1}>
                                            <option value="">Lựa chọn</option>
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
                                            <option value={0}>Lựa chọn</option>
                                            {
                                                thuoc1.map((item, index) => {
                                                    return (
                                                        <option value={item.gia_ban_le} key={index}>{Function.changeText(item.ten)}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>

                            <div className="form-group-three">
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Dịch vụ 2</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom">
                                            <option value="">lựa chọn</option>
                                            <option value="category2">Tiêm</option>
                                            <option value="category1">Uống</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-left-three-w3l">
                                    <div className="iner-left">
                                        <label>Phòng bệnh</label>
                                    </div>
                                    <div className="form-inn">
                                        <select className="opt-select country-buttom" onChange={handleSelectPhongBenh2}>
                                            <option value="">Lựa chọn</option>
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
                                            <option value={0}>Lựa chọn</option>
                                            {
                                                thuoc2.map((item, index) => {
                                                    return (
                                                        <option value={item.gia_ban_le} key={index}>{Function.changeText(item.ten)}</option>
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
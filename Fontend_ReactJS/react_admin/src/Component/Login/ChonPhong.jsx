import React, { useState, useEffect } from 'react';
import Function from '../../Function'
import '../../CSS/Login.css';
import { useHistory } from "react-router-dom";

function ChonPhong() {
    const history = useHistory();
    const [loaiPhong, setLoaiPhong] = useState([]);
    const [phongKhams, setPhongKhams] = useState([]);
    const [phongKham, setPhongKham] = useState([]);
    const [idPhongKham, setidPhongKham] = useState([]);
    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'loaiphong' });
            setLoaiPhong(data);

            var data1 = await Function.getData({ "table": 'phongkham' });
            setPhongKhams(data1);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    function changeLoaiPhong(event) {
        var newdata = [];
        phongKhams.map(item => {
            if (item.id_loai_phong === parseInt(event.target.value)) {
                newdata.push(item)
            }
        })
        setPhongKham(newdata)
    }
    function selectPhong(event) {
        setidPhongKham(event.target.value)
    }
    async function submit() {
        var data = await Function.getEmployeeFromToken()
        if (data[0].id_quyen === 2) {
            var edit = await Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(idPhongKham) },
                trang_thai: true
            });
        }
        history.push('/admin/phieutiem?phong=' + idPhongKham)
        localStorage.setItem("phongkham", idPhongKham);
        window.location.reload()
    }
    return (
        <div className="center">
            <h1>Chọn phòng</h1>
            <div className="form-right-w3ls chonphong">
                <span>Loại phòng</span>
                <select className="opt-select country-buttom" name='loaiphong' onChange={changeLoaiPhong}>
                    <option selected="true" disabled="disabled">lựa chọn</option>
                    {
                        loaiPhong.map((item, index) => {
                            return (
                                <option value={item.id} key={index}>{item.ten}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="form-right-w3ls chonphong">
                <span>Phòng</span>
                <select className="opt-select country-buttom" onChange={selectPhong}>
                    <option selected="true" disabled="disabled">lựa chọn</option>
                    {
                        phongKham.map((item, index) => {
                            if(item.trang_thai === false)
                            return (
                                <option value={item.id} key={index}>{item.ten}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="set-reset">
                <input type="submit" value="Vào phòng" onClick={submit} />
            </div>
        </div>
    );
}

export default ChonPhong;
import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';
import { useHistory } from "react-router-dom";

function KhachHang(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nhanVien, setNhanVien] = useState({})

    const get = () => {
        setLoading(true)
        setTimeout(() => {
            Function.getData({
                "token": localStorage.getItem("accessToken"),
                "table": query
            }).then(p => {
                setListData(p)
                setLoading(false)
            })
        }, 500)

        Function.getData({
            "token": localStorage.getItem("accessToken"),
            "table": "nhanvien"
        }).then(p => {
            setNhanVien(p)
        })
    }

    useEffect(() => {
        get();
    }, []);

    const fillTable = {
        columns: ["STT", "Tên", "Mã Khách Hàng", "Ngày Sinh", "Giới Tính", "Quê Quán", "Chức năng"],
        fill: ["ten", "ma_khach_hang", "ngay_sinh", "gioi_tinh", "que_quan"]
    }
    const fillEdit = {
        table: "quyen",
        data: [
            {
                name: "tên",
                fill: "ten",
                type: "search"
            }
        ]
    };
    const fillCreate = {
        table: "quyen",
        fill: [
            {
                name: "tên",
                fill: "ten",
                type: "search"
            },
            {
                name: "mã khách hàng",
                fill: "ma_khach_hang",
                type: "search"
            },
            {
                name: "ngày sinh",
                fill: "ngay_sinh",
                type: "datetime-local"
            },
            {
                name: "giới tính",
                fill: "gioi_tinh",
                type: "search"
            },
            {
                name: "quê quán",
                fill: "que_quan",
                type: "search"
            }
        ]
    };

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
                        <MainTop />
                        <TableUI fillTable={fillTable} data={listData} nhanVien={nhanVien} fillEdit={fillEdit} fillCreate={fillCreate} />
                    </main>

                    <MainRight />
                </>
            }
        </>
    );
}

export default KhachHang;
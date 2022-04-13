import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';
import { useHistory } from "react-router-dom";

function NhanVien(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quyen, setQuyen] = useState({})

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
            "table": "quyen"
        }).then(p => {
            setQuyen(p)
        })
    }

    useEffect(() => {
        get();
    }, []);

    const fillTable = {
        columns: ["STT", "Tên", "ngày sinh", "bằng cấp", "quyền", "địa chỉ", "sđt", "Chức năng"],
        fill: ["ten", "ngay_sinh", "bang_cap", "id_quyen", "dia_chi", "sdt"],
        name: "nhân viên"
    }
    const fillEdit = {
        table: "nhanvien",
        data: [
            {
                name: "quyền",
                fill: "quyen",
                type: "search"
            }
        ]
    };
    const fillCreate = {
        table: "nhanvien",
        fill: [
            {
                name: "tên",
                fill: "ten",
                type: "search"
            },
            {
                name: "ngày sinh",
                fill: "ngay_sinh",
                type: "date"
            },
            {
                name: "bằng cấp",
                fill: "bang_cap",
                type: "search"
            },
            {
                name: "địa chỉ",
                fill: "dia_chi",
                type: "search"
            },
            {
                name: "số điện thoại",
                fill: "sdt",
                type: "search"
            },
            {
                name: "quyền",
                fill: "id_quyen"
            },
            {
                name: "username",
                fill: "username",
                type: "search"
            },
            {
                name: "password",
                fill: "password",
                type: "password"
            }
        ]
    };
    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
                        <MainTop />
                        <TableUI fillTable={fillTable} data={listData} quyen={quyen} fillEdit={fillEdit} fillCreate={fillCreate} />
                    </main>

                    <MainRight />
                </>
            }
        </>
    );
}

export default NhanVien;
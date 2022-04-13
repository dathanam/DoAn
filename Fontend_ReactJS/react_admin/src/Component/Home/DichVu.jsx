import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';
import { useHistory } from "react-router-dom";

function DichVu() {
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
                console.log(p)
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
        columns: ["STT", "Dịch vụ", "Ngày tạo", "Ngày Sửa", "Người tạo", "Người sửa", "Chức năng"],
        fill: ["ten", "create_at", "update_at", "id_created", "id_updated"],
        name: "dịch vụ"
    }
    const fillEdit = {
        table: "dichvu",
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

export default DichVu;
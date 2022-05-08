import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';
import MainTop from './MainTop';
import { useHistory } from "react-router-dom";

function Role(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nhanVien, setNhanVien] = useState([])

    useEffect(async () => {
        try {
            setLoading(true);
            var data = await Function.getData({"table": query});
            setListData(data);

            var data1 = await Function.getAllData({"table": "nhanvien"});
            setNhanVien(data1)
            
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (erro) {
            setLoading(false);
        }
    }, [props]);

    const fillTable = {
        columns: ["STT", "Quyền", "Ngày tạo", "Ngày Sửa", "Người tạo", "Người sửa"],
        fill: ["ten", "create_at", "update_at", "id_created", "id_updated"],
        name: "quyền"
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
                </>
            }
        </>
    );
}

export default Role;
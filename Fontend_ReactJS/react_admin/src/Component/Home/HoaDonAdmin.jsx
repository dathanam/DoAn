import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';

function HoaDonAdmin(props) {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        try {
            setLoading(true);
            var data = await Function.getData({ "table": "phieutiem" });
            setListData(data);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (erro) {
            setLoading(false);
        }
    }, [props]);

    const fillTable = {
        columns: ["STT", "trạng thái", "đối tượng", "tổng tiền", "số lượng dịch vụ"],
        fill: ["id_trang_thai", "doi_tuong", "tong_tien", "id"],
        name: "hóa đơn"
    }
    const fillEdit = {
        table: "quyen",
        data: []
    };
    const fillCreate = {
        table: "quyen",
        fill: []
    };
    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
                        <TableUI fillTable={fillTable} data={listData} fillEdit={fillEdit} fillCreate={fillCreate}/>
                    </main>
                </>
            }
        </>
    );
}

export default HoaDonAdmin;
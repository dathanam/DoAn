import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';
import { useHistory } from "react-router-dom";

function PhongBenh(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
        try {
            setLoading(true);
            var data = await Function.getData({"table": query});
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
        columns: ["STT", "phòng bệnh", "số lượng vacxin"],
        fill: ["ten", "id"],
        name: "phòng bệnh"
    }
    const fillEdit = {
        table: "",
        data: []
    };
    const fillCreate = {
        table: "phongbenh",
        fill: [
            {
                name: "tên",
                fill: "ten",
                type: "search"
            },
            {
                name: "nguyên nhân",
                fill: "nguyen_nhan",
                type: "search"
            },
            {
                name: "triệu chứng",
                fill: "trieu_chung",
                type: "search"
            },
            {
                name: "phòng ngừa",
                fill: "phong_ngua",
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
                        <TableUI fillTable={fillTable} data={listData} fillEdit={fillEdit} fillCreate={fillCreate} />
                    </main>

                    <MainRight />
                </>
            }
        </>
    );
}

export default PhongBenh;
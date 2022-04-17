import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';
import { useHistory } from "react-router-dom";

function Thuoc(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [phongBenh, setPhongbenh] = useState([])
    useEffect(async () => {
        try {
            setLoading(true);
            var data = await Function.getData({ "table": query });
            setListData(data);

            var data1 = await Function.getAllData({ "table": "phongbenh" });
            setPhongbenh(data1)

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (erro) {
            setLoading(false);
        }
    }, [props]);

    const fillTable = {
        columns: ["STT", "Tên", "phòng bệnh", "số lượng", "hạn sử dụng", "nước sản xuất", "giá bán lẻ", "giá đặt mua", "tình trạng","chức năng"],
        fill: ["ten", "id_phong_benh","so_luong", "han_su_dung","nuoc_san_xuat", "gia_ban_le", "gia_dat_mua","tinh_trang"],
        name: "thuốc"
    }
    const fillEdit = {
        table: "",
        data: []
    };
    const fillCreate = {
        table: "quyen",
        fill: [
            {
                name: "tên",
                fill: "ten",
                type: "search"
            },{
                name: "số lượng",
                fill: "so_luong",
                type: "int"
            },{
                name: "lô",
                fill: "so_lo",
                type: "search"
            },{
                name: "nsx",
                fill: "ngay_san_xuat",
                type: "date"
            },{
                name: "hsd",
                fill: "han_su_dung",
                type: "date"
            },{
                name: "giá bán",
                fill: "gia_ban_le",
                type: "search"
            },{
                name: "giá đặt",
                fill: "gia_dat_mua",
                type: "search"
            },{
                name: "xuất xứ",
                fill: "nuoc_san_xuat",
                type: "search"
            },{
                name: "tình trạng",
                fill: "tinh_trang",
                type: "search"
            },{
                name: "đường tiêm",
                fill: "duong_tiem",
                type: "search"
            },{
                name: "bảo quản",
                fill: "bao_quan",
                type: "search"
            },{
                name: "đối tượng",
                fill: "doi_tuong",
                type: "search"
            },{
                name: "phòng bệnh",
                fill: "id_phong_benh",
            },
        ]
    };

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
                        <MainTop />
                        <TableUI fillTable={fillTable} data={listData} phongBenh={phongBenh} fillEdit={fillEdit} fillCreate={fillCreate} />
                    </main>

                    <MainRight />
                </>
            }
        </>
    );
}

export default Thuoc;
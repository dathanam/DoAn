import React, { useState, useEffect } from 'react';
import '../../CSS/HoaDon.css'
import Logo from '../../WPhoto/LogoTD2.png'
import Button from '@material-ui/core/Button';
import Function from '../../Function';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function HoaDon() {
    const classes = Styles();
    const [listKH, setListKH] = useState([{ id: "", ma_khach_hang: "", ten: "", ngay_sinh: "", gioi_tinh: "", que_quan: "", doi_tuong: "" }]);
    const [listPT, setListPT] = useState([]);
    const [phieuTiem, setPhieuTiem] = useState({ id: '', tong_tien: '', create_at: '', ten_thuoc1: '', phong_benh1: '', ten_thuoc2: '', phong_benh2: '' });
    const [khachHang, setKhachHang] = useState({ ten: '', que_quan: '', ngay_sinh: '' });
    const [thuocs, setThuocs] = useState([{ gia_ban_le: '' }]);
    const [chiTietPhieuTiem, setChiTietPhieuTiem] = useState([]);
    const [methodChonPhongKham, setMethodChonPhongKham] = React.useState('a');
    const [phongKham, setPhongKham] = useState([])
    const moment = require('moment')

    useEffect(async () => {
        try {
            var data = await Function.getData({ "table": 'khachhang' });
            setListKH(data);

            var data1 = await Function.getData({ "table": 'phieutiem' });
            setListPT(data1);

            var data2 = await Function.getData({ "table": 'phongkham' });
            setPhongKham(data2);

            var dataThuoc = await Function.getData({ table: 'thuoc'});
            setThuocs(dataThuoc);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    async function selectKhachHang(id) {
        try {
            var data = await Function.getPhieuTiemChuaThanhToanFromIdKH({ "id_khach_hang": id });
            setPhieuTiem(data[0]);

            var dataDetailPT = await Function.getChiTietPhieuTiemFromPT({ "id_phieu_tiem": data[0].id });
            setChiTietPhieuTiem(dataDetailPT);

            var data1 = await Function.getTableFromID({ table: 'khachhang', id: id });
            setKhachHang(data1[0]);
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleRadioChonPhongKham = (event) => {
        setMethodChonPhongKham(event.target.value);
    };

    async function submit() {
        try {
            const edit = {
                table: "phieutiem",
                MainID: { "id": phieuTiem.id },
                id_trang_thai: 3,
                trang_thai: "đã thanh toán"
            }
            var PT = await Function.editTableNoSave(edit);

            await Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(methodChonPhongKham) },
                so_nguoi: parseInt(parseInt(phongKham[parseInt(methodChonPhongKham)].so_nguoi) + 1)
            });

            var newChiTietPhongKham = {}
            newChiTietPhongKham.table = "chitietphongkham";
            newChiTietPhongKham.id_phong_kham = parseInt(methodChonPhongKham)
            newChiTietPhongKham.id_phieu_tiem = phieuTiem.id;
            newChiTietPhongKham.id_trang_thai = 3;
            newChiTietPhongKham.id_khach_hang = khachHang.id
            var CTPK = await Function.postData(newChiTietPhongKham);

            alert("Thanh toán thành công !");
            window.location.reload();
        }
        catch (error) {
            console.log(error)
        }
    }

    function Export2Doc(element, filename = '') {
        //  _html_ will be replace with custom html
        var meta = "Mime-Version: 1.0\nContent-Base: " + window.location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + window.location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>";
        //  _styles_ will be replaced with custome css
        var head = "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n";

        var html = document.getElementById(element).innerHTML;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        var css = (
            '<style>' +
            'img {width:300px;}table {border-collapse: collapse; border-spacing: 0;}td{padding: 6px;}' +
            '</style>'
        );
        //  Image Area %%%%
        var options = { maxWidth: 624 };
        var images = Array();
        var img = ("#" + element).find("img");
        for (var i = 0; i < img.length; i++) {
            // Calculate dimensions of output image
            var w = Math.min(img[i].width, options.maxWidth);
            var h = img[i].height * (w / img[i].width);
            // Create canvas for converting image to data URL
            var canvas = document.createElement("CANVAS");
            canvas.width = w;
            canvas.height = h;
            // Draw image to canvas
            var context = canvas.getContext('2d');
            context.drawImage(img[i], 0, 0, w, h);
            // Get data URL encoding of image
            var uri = canvas.toDataURL("image/png");
            (img[i]).attr("src", img[i].src);
            img[i].width = w;
            img[i].height = h;
            // Save encoded image to array
            images[i] = {
                type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                location: (img[i]).attr("src"),
                data: uri.substring(uri.indexOf(",") + 1)
            };
        }

        // Prepare bottom of mhtml file with image data
        var imgMetaData = "\n";
        for (var i = 0; i < images.length; i++) {
            imgMetaData += "--NEXT.ITEM-BOUNDARY\n";
            imgMetaData += "Content-Location: " + images[i].location + "\n";
            imgMetaData += "Content-Type: " + images[i].type + "\n";
            imgMetaData += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
            imgMetaData += images[i].data + "\n\n";

        }
        imgMetaData += "--NEXT.ITEM-BOUNDARY--";
        // end Image Area %%

        var output = meta.replace("_html_", head.replace("_styles_", css) + html) + imgMetaData;

        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(output);


        filename = filename ? filename + '.doc' : 'document.doc';


        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {

            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }
    return (
        <>
            <main>
                <div className="form-left-three-w3l">
                    <div className="iner-left">
                        <label>Khách hàng :</label>
                    </div>
                    <div className="form-inn">
                        <div className={classes.root}>
                            <ButtonGroup color="secondary" aria-label="outlined secondary button group">
                                {
                                    listPT.map((item, index) => {
                                        if (item.id_trang_thai === 2 || item.id_trang_thai === 6)
                                            return (
                                                <Button key={index} onClick={() => selectKhachHang(item.id_khach_hang)}>{listKH.find(e => e.id === item.id_khach_hang).ten}</Button>
                                            )
                                    })
                                }
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="invoice_wrapper" id='exportContent'>
                        <div className="header">
                            <div className="logo_invoice_wrap">
                                <div className="logo_sec">
                                    <img src={Logo} alt="logo" />
                                    <div className="title_wrap">
                                        <p className="title bold titleHeader">Trung tâm tiêm chủng Thành Đạt</p>
                                        <p className="sub_title light">236 Hoàng Quốc Việt - quận Bắc Từ Liêm - thành phố Hà Nội</p>
                                    </div>
                                </div>
                                <div className="invoice_sec">
                                    {/* <p className="invoice bold">Thông tin</p> */}
                                    <p className="invoice_no">
                                        <span className="bold">ID</span>
                                        <span>#{phieuTiem.id}</span>
                                    </p>
                                    <p className="invoice_no">
                                        <span className="bold">Ngày</span>
                                        <span>{moment(phieuTiem.create_at).utc().format('DD/MM/YYYY')}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="bill_total_wrap">
                                <div className="bill_sec">
                                    <p>Khách Hàng</p>
                                    <p className="bold name bill_sec_name_price">{Function.changeText(khachHang.ten)}</p>
                                    <span>Địa chỉ: {Function.changeText(khachHang.que_quan)}<br />ngày sinh: {moment(khachHang.ngay_sinh).utc().format('DD/MM/YYYY')}</span>
                                </div>
                                {/* <div className="total_wrap">
                            <p>Total Due</p>
                            <p className="bold price bill_sec_name_price">USD: 1200</p>
                        </div> */}
                            </div>
                        </div>
                        <div className="body">
                            <div className="main_table">
                                <div className="table_header">
                                    <div className="row">
                                        <div className="col col_no">STT</div>
                                        <div className="col col_des">Vacxin</div>
                                        <div className="col col_price">Giá</div>
                                        <div className="col col_qty">Số lượng</div>
                                        <div className="col col_total">Thành tiền</div>
                                    </div>
                                </div>
                                <div className="table_body">
                                    {
                                        chiTietPhieuTiem.map((item, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col col_no"><p>{index+1}</p></div>
                                                    <div className="col col_des">
                                                        <p className="bold">
                                                            {item.thuoc}
                                                        </p>
                                                        <p>
                                                            phòng bênh :{item.phong_benh}
                                                        </p>
                                                    </div>
                                                    <div className="col col_price">
                                                        <p>{thuocs.find(e => e.id === item.id_thuoc).gia_ban_le}</p>
                                                    </div>
                                                    <div className="col col_qty">
                                                        <p>1</p>
                                                    </div>
                                                    <div className="col col_total">
                                                        <p>{thuocs.find(e => e.id === item.id_thuoc).gia_ban_le}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="paymenthod_grandtotal_wrap">
                                <div className="paymethod_sec">
                                    <p className="bold">Phương thức thanh toán</p>
                                    <p>BIDV: 21610000488079</p>
                                </div>
                                <div className="grandtotal_sec">
                                    <p className="bold">
                                        <span>Tổng Tiền</span>
                                        <span>{phieuTiem.tong_tien.toLocaleString()} VNĐ</span>
                                    </p>
                                    <p>
                                        <span>Tax Vat 10%</span>
                                        <span>{(phieuTiem.tong_tien / 10).toLocaleString()}</span>
                                    </p>
                                    <p>
                                        <span>Discount 10%</span>
                                        <span>-{(phieuTiem.tong_tien / 10).toLocaleString()}</span>
                                    </p>
                                    <p className="bold">
                                        <span>Thành Tiền</span>
                                        <span>{phieuTiem.tong_tien.toLocaleString()} VNĐ</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <p>Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chung tâm</p>
                            {/* <div className="terms">
                                        <p className="bold tc">Chúc bạn và gia đình thật nhiều sức khỏe !</p>
                                        <p>
                                            Hẹ
                                        </p>
                                    </div> */}
                        </div>
                    </div>
                    <br />
                    <div className='chon_phong_kham'>
                        <RadioGroup aria-label="quiz" value={methodChonPhongKham} onChange={handleRadioChonPhongKham} className='top_select_method_search'>
                            <FormControlLabel value="4" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 1 (" + phongKham[3].so_nguoi + "người)"} className='chon_phong_kham_1' />
                            <FormControlLabel value="5" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 2 (" + phongKham[4].so_nguoi + "người)"} className='chon_phong_kham_2' />
                            <FormControlLabel value="6" control={<Radio />} label={(phongKham.length === 0) ? "" : "Phòng tiêm 3 (" + phongKham[5].so_nguoi + "người)"} className='chon_phong_kham_3' />
                        </RadioGroup>
                    </div>
                    <div className="set-reset">
                        {/* <button onClick={() => Export2Doc('exportContent')}>Export</button> */}
                        <input type="submit" value="Thanh toán" onClick={() => submit()} />
                    </div>
                </div>
            </main>
        </>
    );
}

export default HoaDon;
import React, { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'
import Function from '../../Function';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Switch from '@material-ui/core/Switch';

const Styles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

function Home() {
    const classes = Styles();
    var DataAddress = {
        quan: [
            { id: 1, idThanhPho: 1, name: 'quận ba đình' },
            { id: 2, idThanhPho: 1, name: 'quận bắc từ liêm' },
            { id: 3, idThanhPho: 1, name: 'quận cầu giấy' },
            { id: 4, idThanhPho: 1, name: 'quận đống đa' },
            { id: 5, idThanhPho: 1, name: 'quận hoàn kiếm' },
        ]
    }
    const today = new Date();
    const moment = require('moment');
    const [loaiPhongKham, setLoaiPhongKham] = useState([]);
    const [phongKham, setPhongKham] = useState([]);
    const [nhanVien, setNhanVien] = useState([]);
    const [optionWeek, setOptionWeek] = useState(null);
    const [optionDoanhThu, setOptionDoanhThu] = useState(null);
    const [doanhThuTheo2Thang, setDoanhThuTheo2Thang] = useState({});
    const [addPhongKham, setAddPhongKham] = useState({});
    const [addLoaiPhong, setAddLoaiPhong] = useState({});

    // Thống kê khách đến trong vòng 7 ngày
    var last = today.getDate() + 1;
    var first = last - 7;
    const today1 = moment(new Date(today.setDate(first)).toUTCString()).utc().format('YYYY-MM-DD')
    const today2 = moment(new Date(today.setDate(last)).toUTCString()).utc().format('YYYY-MM-DD')
    // End +++++

    // Doanh thu trong vòng 12 tháng
    const startDay = moment(new Date(new Date().getFullYear(), 1, 1)).utc().format('YYYY-MM-DD')
    const endDay = moment(new Date().setDate(new Date().getDate() + 1)).utc().format('YYYY-MM-DD')
    //end

    // Thống kê giới tính
    const [khachHangTheoKhuVuc, setKhachHangTheoKhuVuc] = useState();
    //end

    // Khách hàng theo tháng
    const startDayMonth = moment().startOf('month').format('YYYY-MM-DD');
    const endDayMonthNow = moment().endOf('month').format('YYYY-MM-DD');
    const endDayMonth = moment(new Date(endDayMonthNow).setDate(new Date(endDayMonthNow).getDate() + 1)).utc().format('YYYY-MM-DD');

    const endDayM = moment(new Date(startDayMonth).setDate(new Date(startDayMonth).getDate() - 1)).utc().format('YYYY-MM-DD');
    const startDayM = moment(new Date(new Date(endDayM).getFullYear(), new Date(endDayM).getMonth(), 2)).utc().format('YYYY-MM-DD');

    //end

    // Doanh thu theo tháng
    const options = {
        animationEnabled: true,
        title: {
            text: "Doanh thu tháng"
        },
        axisY: {
            title: "vnđ"
        },
        toolTip: {
            shared: true
        },
        data: [{
            type: "spline",
            name: "2016",
            showInLegend: true,
            dataPoints: [
                { y: 155, label: "Jan" },
                { y: 150, label: "Feb" },
                { y: 152, label: "Mar" }
            ]
        },
        {
            type: "spline",
            name: "2017",
            showInLegend: true,
            dataPoints: [
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 175, label: "Mar" },
                { y: 172, label: "Apr" },
                { y: 162, label: "May" },
                { y: 165, label: "Jun" },
                { y: 172, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" },
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 175, label: "Mar" },
                { y: 172, label: "Apr" },
                { y: 162, label: "May" },
                { y: 165, label: "Jun" },
                { y: 172, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" },
                { y: 172, label: "Jan" },
                { y: 173, label: "Feb" },
                { y: 175, label: "Mar" },
                { y: 172, label: "Apr" },
                { y: 162, label: "May" },
                { y: 165, label: "Jun" },
                { y: 172, label: "Jul" },
                { y: 168, label: "Aug" },
                { y: 175, label: "Sept" },
                { y: 170, label: "Oct" },
                { y: 165, label: "Nov" },
                { y: 169, label: "Dec" }
            ]
        }]
    }
    //End

    //Thêm loại phòng
    const [openLoaiPhong, setOpenLoaiPhong] = React.useState(false);
    const handleOpenLoaiPhong = () => { setOpenLoaiPhong(true) };
    const handleCloseLoaiPhong = () => {
        setOpenLoaiPhong(false);
        setAddLoaiPhong({})
    };
    function handleAddLoaiPhong(event) {
        const newdata = { ...addLoaiPhong };
        newdata[event.target.name] = event.target.value;
        setAddLoaiPhong(newdata);
    }
    async function submitAddLoaiPhong(event) {
        addLoaiPhong.table = "loaiphong"
        try {
            var LP = await Function.postData(addLoaiPhong);

            alert("Thêm thành công !");
            window.location.reload()
        }
        catch (error) {
            alert("Error");
            handleCloseLoaiPhong()
        }
        setOpen(false);
    }
    //End

    // Thêm phòng khám
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => {
        setOpen(false);
        setAddPhongKham({})
    };
    function handleAddPhongKham(event) {
        const newdata = { ...addPhongKham };
        newdata[event.target.name] = event.target.value;
        setAddPhongKham(newdata);
    }
    async function submitAddPhongKham(event) {
        addPhongKham.table = "phongkham"
        addPhongKham.so_nguoi = 0
        addPhongKham.trang_thai = false
        try {
            var PK = await Function.postData(addPhongKham);

            alert("Thêm thành công !");
            window.location.reload()
        }
        catch (error) {
            alert("Error");
            handleClose()
        }
        setOpen(false);
    }
    async function OpenRoom(id) {
        var data = {
            table: "phongkham",
            delete_flag: 0,
            MainID: { "id": id },
        }
        await Function.editTableNoSave(data);
        window.location.reload();
    }
    async function CloseRoom(id) {
        var data = {
            table: "phongkham",
            delete_flag: 1,
            MainID: { "id": id },
        }
        await Function.editTableNoSave(data);
        window.location.reload();
    }
    //end

    useEffect(async () => {
        try {
            var data = await Function.khachHangTheoTuan({ "startDay": today1, "endDay": today2 });
            var dateCount = [0, 0, 0, 0, 0, 0, 0];
            var dateCountDoanhThu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.data.map(item => {
                for (var i = 0; i < dateCount.length; i++) {
                    if (moment(item.create_at).utc().format('DD/MM/YYYY') === moment(new Date().setDate(new Date().getDate() - i)).utc().format('DD/MM/YYYY')) {
                        dateCount[i] += 1;
                        i = dateCount.length + 1;
                    }
                }
            });
            var setting = {
                title: {
                    text: "Khách hàng đến tiêm trong 7 ngày gần nhất"
                },
                data: [
                    {
                        type: "column",
                        dataPoints: [
                            { label: moment(new Date().setDate(new Date().getDate() - 6)).utc().format('DD/MM/YYYY'), y: dateCount[6] },
                            { label: moment(new Date().setDate(new Date().getDate() - 5)).utc().format('DD/MM/YYYY'), y: dateCount[5] },
                            { label: moment(new Date().setDate(new Date().getDate() - 4)).utc().format('DD/MM/YYYY'), y: dateCount[4] },
                            { label: moment(new Date().setDate(new Date().getDate() - 3)).utc().format('DD/MM/YYYY'), y: dateCount[3] },
                            { label: moment(new Date().setDate(new Date().getDate() - 2)).utc().format('DD/MM/YYYY'), y: dateCount[2] },
                            { label: "Hôm qua", y: dateCount[1] },
                            { label: "Hôm nay", y: dateCount[0] }
                        ]
                    }
                ]
            };
            setOptionWeek(setting);

            var data1 = await Function.doanhThuTheoThang({ "startDay": startDay, "endDay": endDay });

            data1.data.map(item => {
                for (var i = 0; i < dateCountDoanhThu.length; i++) {
                    var a = moment(item.create_at).utc().format('MM')
                    var b = moment(item.create_at).utc().format('YYYY')
                    if (parseInt(a) - i === -1 && parseInt(b) - parseInt(moment(new Date()).utc().format('YYYY')) === 0) {
                        dateCountDoanhThu[i - 2] += item.tong_tien
                    }
                }
            });

            var setting1 = {
                animationEnabled: true,
                title: {
                    text: `Doanh thu năm ${new Date().getFullYear()}`
                },
                axisY: {
                    title: "",
                    suffix: " VNĐ"
                },
                data: [
                    {
                        type: "splineArea",
                        color: "#7380ec",
                        xValueFormatString: "Doanh số",
                        yValueFormatString: "#,##0.## vnđ",
                        showInLegend: true,
                        legendText: "Doanh thu tính theo tháng",
                        dataPoints: [
                            { x: 1, y: dateCountDoanhThu[0] },
                            { x: 2, y: dateCountDoanhThu[1] },
                            { x: 3, y: dateCountDoanhThu[2] },
                            { x: 4, y: dateCountDoanhThu[3] },
                            { x: 5, y: dateCountDoanhThu[4] },
                            { x: 6, y: dateCountDoanhThu[5] },
                            { x: 7, y: dateCountDoanhThu[6] },
                            { x: 8, y: dateCountDoanhThu[7] },
                            { x: 9, y: dateCountDoanhThu[8] },
                            { x: 10, y: dateCountDoanhThu[9] },
                            { x: 11, y: dateCountDoanhThu[10] },
                            { x: 12, y: dateCountDoanhThu[11] }
                        ]
                    }
                ]
            };
            setOptionDoanhThu(setting1);

            var data2 = await Function.khachHangTheoKhuVuc();
            var CountKH = [{ quan: "quận ba đình", nam: "", nu: "", tong: 0 }, { quan: "quận bắc từ liêm", nam: 0, nu: 0, tong: 0 }, { quan: "quận cầu giấy", nam: 0, nu: 0, tong: 0 }, { quan: "quận đống đa", nam: 0, nu: 0, tong: 0 }, { quan: "quận hoàn kiếm", nam: 0, nu: 0, tong: 0 }]
            data2.data.map(item => {
                DataAddress.quan.map((icon, index) => {
                    if ((item.que_quan.indexOf(icon.name)) >= 0) {
                        CountKH[index].tong += item.so_luong
                        if (item.gioi_tinh === "nam") {
                            CountKH[index].nam += parseInt(item.so_luong)
                        }
                        else {
                            CountKH[index].nu += parseInt(item.so_luong)
                        }
                    }
                })
            })

            var CountKHdataPointsNu = []
            CountKH.map(item => {
                if (item.tong !== 0) {
                    CountKHdataPointsNu.push({
                        label: `${item.quan}`, y: item.nu / item.tong * 100
                    })
                }
            })

            var CountKHdataPointsNam = []
            CountKH.map(item => {
                if (item.tong !== 0) {
                    CountKHdataPointsNam.push({
                        label: `${item.quan}`, y: item.nam / item.tong * 100
                    })
                }
            })

            var setting2 = {
                title: {
                    text: "Khách hàng theo quận"
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    verticalAlign: "top"
                },
                axisY: {
                    suffix: "%"
                },
                data: [{
                    type: "stackedBar100",
                    color: "#ffbb55",
                    name: "Women",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    yValueFormatString: "#,###'%'",
                    dataPoints: CountKHdataPointsNu
                }, {
                    type: "stackedBar100",
                    color: "#111e88",
                    name: "Men",
                    showInLegend: true,
                    indexLabel: "{y}",
                    indexLabelFontColor: "white",
                    yValueFormatString: "#,###'%'",
                    dataPoints: CountKHdataPointsNam
                }]
            }
            setKhachHangTheoKhuVuc(setting2)

            // Doanh thu theo thang
            var listDoanhThuThangHientai = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var listDoanhThuThangTruoc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            var doanhThuThangHientai = await Function.doanhThuTheoThang({ "startDay": startDayMonth, "endDay": endDayMonth });
            var doanhThuThangTruoc = await Function.doanhThuTheoThang({ "startDay": startDayM, "endDay": endDayM });
            doanhThuThangHientai.data.map(item => {
                for (var i = 1; i < 32; i++) {
                    var a = moment(item.create_at).utc().format('DD')
                    if (parseInt(a) - i === 0) {
                        listDoanhThuThangHientai[i - 1] += item.tong_tien;
                        i = 32;
                    }
                }
            });
            var dataDoanhThuThangHientai =[]
            listDoanhThuThangHientai.map((item, index) =>{
                dataDoanhThuThangHientai.push(
                    { y: item, label: index+1 },
                )
            })
            doanhThuThangTruoc.data.map(item => {
                for (var i = 1; i < 32; i++) {
                    var a = moment(item.create_at).utc().format('DD')
                    if (parseInt(a) - i === 0) {
                        listDoanhThuThangTruoc[i - 1] += item.tong_tien;
                        i = 32;
                    }
                }
            });
            var dataDoanhThuThangTruoc =[]
            listDoanhThuThangTruoc.map((item, index) =>{
                dataDoanhThuThangTruoc.push(
                    { y: item, label: index+1 },
                )
            })

            var setting3 = {
                animationEnabled: true,
                title: {
                    text: "Doanh thu tháng"
                },
                axisY: {
                    title: "vnđ"
                },
                toolTip: {
                    shared: true
                },
                data: [{
                    type: "spline",
                    name: `tháng ${today.getMonth()}`,
                    showInLegend: true,
                    dataPoints: dataDoanhThuThangTruoc
                },
                {
                    type: "spline",
                    name: `tháng ${today.getMonth() + 1}`,
                    showInLegend: true,
                    dataPoints: dataDoanhThuThangHientai
                }]
            }

            setDoanhThuTheo2Thang(setting3)
            //End


            var PK = await Function.getAllData({ "table": 'phongkham' });
            setPhongKham(PK);

            var NV = await Function.getData({ "table": 'nhanvien' });
            setNhanVien(NV);

            var loaiPhong = await Function.getData({ "table": 'loaiphong' });
            setLoaiPhongKham(loaiPhong);
        }
        catch (error) {
            console.log(error)
        }
    }, []);

    return (
        <>
            <main1>
                <div className="main_top">
                    <button id="menu_btn" onClick={() => {
                        document.querySelector("aside").style.display = 'block'
                    }}>
                        <span className="material-icons-outlined">reorder</span>
                    </button>

                    <div className="date">
                        <input type="date" />
                    </div>

                    <div className="theme_toggler" onClick={() => {
                        document.body.classList.toggle('dark_theme_variables');
                        document.querySelector(".theme_toggler").querySelector('span:nth-child(1)').classList.toggle('active');
                        document.querySelector(".theme_toggler").querySelector('span:nth-child(2)').classList.toggle('active');
                    }}>
                        <span className="material-icons-outlined active">light_mode</span>
                        <span className="material-icons-outlined">dark_mode</span>
                    </div>
                </div>

                <div className="recent_order">
                    {doanhThuTheo2Thang && <CanvasJSChart options={doanhThuTheo2Thang} />}
                    <br />
                    <br />
                    {optionDoanhThu && <CanvasJSChart options={optionDoanhThu} />}
                    <br />
                    <br />
                    {optionWeek && <CanvasJSChart options={optionWeek} />}
                    <br />
                    <br />
                    {khachHangTheoKhuVuc && <CanvasJSChart options={khachHangTheoKhuVuc} />}
                    <br />
                    <br />
                </div>
            </main1>
            <div className="right">
                <div className="sales_analytics">
                    <h2>Danh sách phòng khám</h2>
                    {
                        phongKham.map((item, index) => {
                            return (
                                <div key={index} className="item online">
                                    {/* <div className="icon">
                                        <span className="material-icons-outlined">star</span>
                                    </div> */}
                                    <div className="right">
                                        <div className="info">
                                            <h3>{item.ten}</h3>
                                            <div className='phongKhamAdmin'>
                                                <small className="text_muted">{(item.trang_thai && nhanVien.length !== 0) ? `bs: ${nhanVien.find(e => e.id === item.id_updated).ten}` : "trống"}</small>
                                            </div>
                                        </div>
                                        <h5 className={(item.id_loai_phong === 1 || item.id_loai_phong === 2) ? "success" : "danger"}>{loaiPhongKham.length === 0 ? "" : loaiPhongKham.find(e => e.id === item.id_loai_phong).ten}</h5>
                                        <div>
                                            <h3>số người: {item.so_nguoi}</h3>
                                            {(item.delete_flag === 0) ? (item.so_nguoi === 0) ? <button className='openRoom' onClick={() => CloseRoom(item.id)}>Đóng</button> : "" : <button className='closeRoom' onClick={() => OpenRoom(item.id)}>Mở</button>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='addPhongLoaiPhong'>
                        <div className="item add_product">
                            <div onClick={handleOpen}>
                                <span className="material-icons-outlined">add</span>
                                <h3>Phòng</h3>
                            </div>
                        </div>
                        <div className="item add_product">
                            <div onClick={handleOpenLoaiPhong}>
                                <span className="material-icons-outlined">add</span>
                                <h3>Loại Phòng</h3>
                            </div>
                        </div>
                    </div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <div className={classes.paper}>
                                <DialogContent>
                                    <DialogContentText>
                                        Thêm mới phòng khám
                                    </DialogContentText>
                                    <form className={classes.form} noValidate>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="max-width">Loại phòng</InputLabel>
                                            <Select autoFocus name="id_loai_phong" onChange={handleAddPhongKham}>
                                                {
                                                    (loaiPhongKham && loaiPhongKham.map((item, index) => {
                                                        return (
                                                            <MenuItem key={index} value={item.id}>{item.ten}</MenuItem>
                                                        )
                                                    }))
                                                }
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="ten"
                                            label="Tên phòng"
                                            type="text"
                                            fullWidth
                                            onChange={handleAddPhongKham}
                                        />
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose} color="primary">
                                        Hủy
                                    </Button>
                                    <Button onClick={() => submitAddPhongKham()} color="primary" autoFocus>
                                        Lưu
                                    </Button>
                                </DialogActions>
                            </div>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={openLoaiPhong}
                        onClose={handleCloseLoaiPhong}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openLoaiPhong}>
                            <div className={classes.paper}>
                                <DialogContent>
                                    <DialogContentText>
                                        Thêm mới loại phòng
                                    </DialogContentText>
                                    <form className={classes.form} noValidate>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            name="ten"
                                            label="Tên"
                                            type="text"
                                            fullWidth
                                            onChange={handleAddLoaiPhong}
                                        />
                                    </form>
                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleCloseLoaiPhong} color="primary">
                                        Hủy
                                    </Button>
                                    <Button onClick={() => submitAddLoaiPhong()} color="primary" autoFocus>
                                        Lưu
                                    </Button>
                                </DialogActions>
                            </div>
                        </Fade>
                    </Modal>
                </div>
            </div>
        </>
    );
}

export default Home;
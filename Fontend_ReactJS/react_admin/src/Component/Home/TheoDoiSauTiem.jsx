import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../Spinner/Spinner';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Function from '../../Function';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';

const Styles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
    rootBtn: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2, 2),
        width: '500px'
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2, 2),
        width: '1000px'
    },
}));

function TheoDoiSauTiem(props) {
    const classes = Styles();
    const [loading, setLoading] = useState(false);
    const moment = require('moment')
    const [methodDichVu, setMethodDichVu] = useState('aaa');
    const [idKH, setidKH] = useState(0);
    const [idKHTSB, setidKHTSB] = useState(0);
    const [phieuTiem, setPhieuTiem] = useState([]);
    const [methodChonPhongKham, setMethodChonPhongKham] = React.useState('a');
    const [khachHang, setKhachHang] = useState([]);
    const [phongBenh, setPhongBenh] = useState([]);
    const [phongSauTiem, setPhongSauTiem] = useState([]);
    const [CTPTs, setCTPTs] = useState([]);
    const [CTPT, setCTPT] = useState([]);
    const [phongKham, setPhongKham] = useState([])
    const [ghiChu, setGhiChu] = useState({});
    const [tienSuBenh, setTienSuBenh] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => { setPage(newPage) };
    const handleRadioChonPhongKham = (event) => { setMethodChonPhongKham(parseInt(event.target.value)) };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleRadioChonDichVu = (event) => {
        setMethodDichVu(event.target.value);
        var CT = CTPT.find(c => c.dich_vu === event.target.value)
        var PB = phongBenh.find(c => c.id === CT.id_phong_benh)
        setGhiChu(Object.assign(ghiChu, { dich_vu: event.target.value, phong_benh: PB.ten }))
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = (idKH, idPT) => {
        setOpen(true);
        setidKH(idKH)
        setMethodDichVu('aaa');
        setGhiChu({ id_khach_hang: idKH })
        var newData = []
        CTPTs.map(item => {
            if (item.id_phieu_tiem === idPT) newData.push(item)
        })
        setCTPT(newData)
    };
    const handleClose = () => { setOpen(false); setCTPT([]) };

    function handGhiChu(event) {
        const newdata = { ...ghiChu };
        newdata[event.target.name] = event.target.value;
        setGhiChu(newdata);
    }

    //////////////////////////////////////////////////////
    const [openTSB, setOpenTSB] = React.useState(false);
    async function handleOpenTSB(idKH) {
        var data = await Function.getTienSuBenhFromMaKH({ "id_khach_hang": idKH });
        setTienSuBenh(data);
        setOpenTSB(true);
        setidKHTSB(idKH)
    };
    const handleCloseTSB = () => { setOpenTSB(false) };


    // Sau tiêm +++++++++
    const [openSauTiem, setOpenSauTiem] = React.useState(false);
    const [phieuTiemSauTiem, setPhieuTiemSauTiem] = React.useState({});
    async function handleOpenSauTiem(idKH, doi_tuong, idPT) {
        setOpenSauTiem(true);
        setPhieuTiemSauTiem({ "id_khach_hang": idKH, "doi_tuong": doi_tuong, "idPT": idPT })
    };
    const handleCloseSauTiem = () => { setOpenSauTiem(false); setPhieuTiemSauTiem({}); setMethodChonPhongKham('a') };

    async function vaoPhongSauTiem() {
        var newChiTietPhongKham = {}
        phieuTiemSauTiem.table = "phieutiem";
        phieuTiemSauTiem.id_trang_thai = 1;
        phieuTiemSauTiem.trang_thai = "sau tiêm";
        phieuTiemSauTiem.ghi_chu = "sau tiêm";

        newChiTietPhongKham.table = "chitietphongkham";
        newChiTietPhongKham.id_phong_kham = methodChonPhongKham

        try {
            const edit = {
                table: "phieutiem",
                MainID: { "id": parseInt(phieuTiemSauTiem.idPT) },
                id_trang_thai: 5,
                trang_thai: "hoàn thành",
                ghi_chu: "thêm phiếu tiêm"
            }

            await Function.editTableNoSave(edit);

            delete phieuTiemSauTiem['idPT']
            var idKHSauTiem = phieuTiemSauTiem.id_khach_hang
            var PT = await Function.postData(phieuTiemSauTiem);

            newChiTietPhongKham.id_phieu_tiem = PT.data.dataSave.id;
            newChiTietPhongKham.id_trang_thai = 1;
            newChiTietPhongKham.id_khach_hang = idKHSauTiem
            await Function.postData(newChiTietPhongKham);

            await Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": methodChonPhongKham },
                so_nguoi: parseInt((phongKham.find(e => e.id === methodChonPhongKham)).so_nguoi + 1)
            });

            alert("Mời khách vào phòng khám số " + methodChonPhongKham);
            window.location.reload();
        }
        catch (error) {
            alert("Tạo phiếu khám thất bại 1");
            window.location.reload();
        }
    }

    useEffect(async () => {
        try {
            setLoading(true);
            var newData = []
            var data = await Function.getData({ "table": 'phieutiem' });
            data.map(item => {
                if (item.id_trang_thai === 4) {
                    newData.push(item)
                }
            })
            setPhieuTiem(newData);

            var data1 = await Function.getData({ "table": 'khachhang' });
            setKhachHang(data1);

            var data2 = await Function.getData({ "table": 'phongbenh' });
            setPhongBenh(data2);

            var data3 = await Function.getData({ "table": 'chitietphieutiem' });
            setCTPTs(data3);

            var data4 = await Function.getData({ "table": 'phongkham' });
            var phongKham = []
            data4.map(item => {
                if (item.id_loai_phong === 3) {
                    phongKham.push(item)
                }
            })
            setPhongSauTiem(phongKham);

            var data5 = await Function.getData({ "table": 'phongkham' });
            setPhongKham(data5);

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (err) {
            setLoading(false);
        }
    }, []);

    async function submit(id) {
        try {
            const edit = {
                table: "phieutiem",
                MainID: { "id": parseInt(id) },
                id_trang_thai: 5,
                trang_thai: "hoàn thành"
            }

            var PT = await Function.editTableNoSave(edit);

            alert("Hoàn thành !");
            window.location.reload();
        }
        catch (error) {
            console.log(error)
        }
    }

    async function SaveTienSuBenh() {
        try {
            ghiChu.table = "tiensubenh"
            var PT = await Function.postData(ghiChu);

            alert("Đã lưu vào hệ thống");
            handleClose()
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {loading ? <Spinner /> :
                <main>
                    <div className="recent_order">
                        <div className="nameTable">
                            <h2>Theo dõi sau tiêm</h2>
                        </div>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>STT</TableCell>
                                            <TableCell>Tên khách hàng</TableCell>
                                            <TableCell>Ngày</TableCell>
                                            <TableCell>Thời gian kết thúc tiêm</TableCell>
                                            <TableCell>Thời gian kiểm tra</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            phieuTiem.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{(khachHang.length != 0) ? Function.changeText(khachHang.find(e => e.id === item.id_khach_hang).ten) : ""}</TableCell>
                                                        <TableCell>{moment(Function.changeDate(item.create_at)).utc().format('DD/MM/YYYY')}</TableCell>
                                                        <TableCell>{moment(Function.changeDate(item.update_at)).utc().format('hh:mm')}</TableCell>
                                                        <TableCell>{moment(Function.changeDate1(item.update_at)).utc().format('hh:mm')}</TableCell>
                                                        <TableCell>
                                                            <div className={classes.rootBtn}>
                                                                <div className='theodoithem'>
                                                                    <Button className='color1' size="small" variant="contained" onClick={() => handleOpenTSB(item.id_khach_hang)}>
                                                                        Xem tiền sử bệnh
                                                                    </Button>
                                                                    <Button className='color2' size="small" variant="contained" onClick={() => handleOpen(item.id_khach_hang, item.id)}>
                                                                        Ghi chú
                                                                    </Button>
                                                                    <Button className='color3' size="small" variant="contained" onClick={() => handleOpenSauTiem(item.id_khach_hang, item.doi_tuong, item.id)}>
                                                                        Vào phòng sau tiêm
                                                                    </Button>
                                                                    <Button className='color4' size="small" variant="contained" onClick={() => submit(item.id)}>
                                                                        Hoàn Thành
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </TableCell>
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
                                                                    <h2 id="transition-modal-title">{(khachHang.length != 0 && idKH !== 0) ? Function.changeText(khachHang.find(e => e.id === parseInt(idKH)).ten) : ""}</h2>
                                                                    <div className='chon_phong_kham'>
                                                                        <RadioGroup value={methodDichVu} onChange={handleRadioChonDichVu} className='top_select_method_search'>
                                                                            {(CTPT.find(e => e.id_dich_vu === 1) != null) ? <FormControlLabel value="tiêm phòng" control={<Radio />} label="Tiêm phòng" className='chon_phong_kham_1' /> : ""}
                                                                            {(CTPT.find(e => e.id_dich_vu === 2) != null) ? <FormControlLabel value="uống" control={<Radio />} label="Uống" className='chon_phong_kham_2' /> : ""}
                                                                        </RadioGroup>
                                                                    </div>
                                                                    <TextField
                                                                        name="ghi_chu"
                                                                        label="Ghi chú"
                                                                        multiline
                                                                        rows={4}
                                                                        variant="outlined"
                                                                        className='ghichu'
                                                                        onChange={handGhiChu}
                                                                    />
                                                                    <div className="set-reset">
                                                                        <ButtonGroup disableElevation variant="contained" color="primary">
                                                                            <Button onClick={handleClose}>Hủy</Button>
                                                                            <Button onClick={() => SaveTienSuBenh()}>Lưu</Button>
                                                                        </ButtonGroup>
                                                                    </div>
                                                                </div>
                                                            </Fade>

                                                        </Modal>

                                                        <Modal
                                                            aria-labelledby="transition-modal-title"
                                                            aria-describedby="transition-modal-description"
                                                            className={classes.modal}
                                                            open={openTSB}
                                                            onClose={handleCloseTSB}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                        >
                                                            <Fade in={openTSB}>
                                                                <div className={classes.paper1}>
                                                                    <h2 id="transition-modal-title">{(khachHang.length != 0 && idKHTSB !== 0) ? "Tiền sử bệnh của khách hàng: " + Function.changeText(khachHang.find(e => e.id === parseInt(idKHTSB)).ten) : "Chưa có thông tin tiền sử bệnh"}</h2>
                                                                    <br />
                                                                    {
                                                                        tienSuBenh.map((item, index) => {
                                                                            return (
                                                                                <>
                                                                                    <div className="form-group">
                                                                                        <div className="form-right-w3ls form-left-w3ls-quequan">
                                                                                            <p key={index} className='tiensubenh'>+ ngày: {moment(item.create_at).utc().format('DD-MM-YYYY')}  -  {item.dich_vu} &nbsp; phòng: {item.phong_benh} &nbsp;  - &nbsp;  có biểu hiện: {item.ghi_chu}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <br />
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Fade>
                                                        </Modal>

                                                        <Modal
                                                            aria-labelledby="transition-modal-title"
                                                            aria-describedby="transition-modal-description"
                                                            className={classes.modal}
                                                            open={openSauTiem}
                                                            onClose={handleCloseSauTiem}
                                                            closeAfterTransition
                                                            BackdropComponent={Backdrop}
                                                            BackdropProps={{
                                                                timeout: 500,
                                                            }}
                                                        >
                                                            <Fade in={openSauTiem}>
                                                                <div className={classes.paper}>
                                                                    <DialogContent>
                                                                        <DialogContentText>
                                                                            Chọn Phòng
                                                                        </DialogContentText>
                                                                        <div className='chon_phong_kham'>
                                                                            <RadioGroup aria-label="quiz" value={methodChonPhongKham} onChange={handleRadioChonPhongKham} className='top_select_method_search'>
                                                                                {
                                                                                    phongSauTiem.map((item, index) => {
                                                                                        return (
                                                                                            <FormControlLabel key={index} value={item.id} control={<Radio />} label={(phongSauTiem.length === 0) ? "" : item.ten + " (số người: " + item.so_nguoi + ")"} className={"chon_phong_kham_" + (index + 1)} />
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </RadioGroup>
                                                                        </div>
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        <Button autoFocus onClick={handleCloseSauTiem} color="primary">
                                                                            Hủy
                                                                        </Button>
                                                                        <Button color="primary" onClick={() => { vaoPhongSauTiem() }} autoFocus>
                                                                            Lưu
                                                                        </Button>
                                                                    </DialogActions>
                                                                </div>
                                                            </Fade>
                                                        </Modal>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[]}
                                component="div"
                                count={phieuTiem.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div >
                </main>
            }
        </>
    );
}

export default TheoDoiSauTiem;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Function from '../../Function';
import Button from '@material-ui/core/Button';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../Spinner/Spinner';

const Styles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },

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
    rootEdit: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '25ch',
    },
    select_model: {
        fontSize: '14px',
        fontWeight: 'bold'
    },
    button: {
        margin: theme.spacing(1),
    },
    rootCreate: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    rootBtnGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

function PhieuTiemThuNgan() {
    const moment = require('moment')
    const [khachHang, setKhachHang] = useState([])
    const [phieuTiem, setPhieuTiem] = useState([])
    console.log(phieuTiem)
    const [loading, setLoading] = useState(false);
    const classes = Styles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);

    const handleChangePage = (event, newPage) => { setPage(newPage) };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(async () => {
        try {
            setLoading(true);
            var data1 = await Function.getAllData({ "table": 'khachhang' });
            setKhachHang(data1);

            var data = await Function.getData({ "table": 'phieutiem' });
            data.forEach(element => {
                var dataAdd = data1.find(e => e.id === element.id_khach_hang);
                element.ten = (dataAdd && dataAdd.ten) ? dataAdd.ten : "";
            });
            setPhieuTiem(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
        catch (err) {
            console.log(err)
        }
    }, []);

    async function GuiLaiTien(idPT) {
        try {
            var phieuTiemEdit = {}
            phieuTiemEdit.tong_tien = 0;
            phieuTiemEdit.ghi_chu = "đã gửi lại tiền"
            phieuTiemEdit.MainID = { "id": idPT };
            phieuTiemEdit.table = "phieutiem"

            var data = await Function.editTableNoSave(phieuTiemEdit);

            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {loading ? <Spinner /> :
                <main>
                    <div className="art-bothside">
                        <div className="nameTable">
                            <h2>Danh sách phiếu tiêm</h2>
                        </div>
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>id</TableCell>
                                            <TableCell>khách hàng</TableCell>
                                            <TableCell>ngày tạo</TableCell>
                                            <TableCell>ghi chú</TableCell>
                                            <TableCell>tổng tiền</TableCell>
                                            <TableCell>trạng thái</TableCell>
                                            <TableCell>chức năng</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {phieuTiem.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{Function.changeText(row.ten)}</TableCell>
                                                    <TableCell>{moment(row.create_at).utc().format('DD-MM-YYYY')}</TableCell>
                                                    <TableCell>{row.ghi_chu}</TableCell>
                                                    <TableCell>{row.tong_tien.toLocaleString()}</TableCell>
                                                    <TableCell>{(row.trang_thai === 'hoàn thành') ? <div style={{ color: 'green', fontWeight: 'bold' }}>{row.trang_thai}</div> : (row.trang_thai === 'hủy tiêm') ? <div style={{ color: 'red', fontWeight: 'bold' }}>{row.trang_thai}</div> : <div style={{ color: 'orange', fontWeight: 'bold' }}>{row.trang_thai}</div>}</TableCell>
                                                    {
                                                        (row.id_trang_thai === 5 && row.trang_thai === 'hủy tiêm' && row.tong_tien !== 0) ?
                                                            <TableCell>
                                                                <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    className={classes.button}
                                                                    type="button"
                                                                    onClick={() => GuiLaiTien(row.id)}
                                                                >
                                                                    hoàn tiền
                                                                </Button>
                                                            </TableCell> : <TableCell></TableCell>
                                                    }
                                                </TableRow>
                                            )
                                        })}
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
                    </div>
                </main>
            }
        </>
    );
}

export default PhieuTiemThuNgan;
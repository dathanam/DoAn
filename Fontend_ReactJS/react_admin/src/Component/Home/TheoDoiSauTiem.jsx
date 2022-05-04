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
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';

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
}));

function TheoDoiSauTiem(props) {
    const classes = Styles();
    const moment = require('moment')
    const [phieuTiem, setPhieuTiem] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    useEffect(async () => {
        try {
            var newData = []
            var data = await Function.getData({ "table": 'phieutiem' });
            data.map(item => {
                if (item.id_trang_thai === 4) {
                    newData.push(item)
                }
            })
            setPhieuTiem(newData);
        }
        catch (err) {
            console.log(err)
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
    return (
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
                                        <TableRow >
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.id_khach_hang}</TableCell>
                                            <TableCell>{moment(Function.changeDate(item.create_at)).utc().format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{moment(Function.changeDate(item.update_at)).utc().format('hh:mm')}</TableCell>
                                            <TableCell>{moment(Function.changeDate1(item.update_at)).utc().format('hh:mm')}</TableCell>
                                            <TableCell>
                                                <div className={classes.rootBtn}>
                                                    <Button variant="contained" color="secondary" onClick={() => submit(item.id)}>
                                                        Hoàn Thành
                                                    </Button>
                                                </div>
                                            </TableCell>
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
    );
}

export default TheoDoiSauTiem;
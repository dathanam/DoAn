import React, { useState } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from "react-router-dom";

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
}));

function TableUI(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const moment = require('moment')
    const classes = Styles();
    const columns = props.columns;
    const data = props.rows;
    const fill = props.fill;
    const nhanVien = props.nhanVien;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openEdit, setOpenEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const handleOpenEdit = () => { setOpenEdit(true) };
    const handleCloseEdit = () => { setOpenEdit(false) };

    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const handleOpenDelete = () => { setOpenDelete(true) };
    const handleCloseDelete = () => { setOpenDelete(false) };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function changeEdit(event) {
        const newdata = { ...dataEdit };
        newdata[event.target.id] = event.target.value;
        setDataEdit(newdata);
    }

    const remove = (e) => {
        e.preventDefault();
        Function.deleteData(dataDelete)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert("Xóa thành công !");
                    window.location.reload()
                } else {
                    alert("Error 1");
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Error");
            })
    }
    return (
        <div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map((columns, index) => {
                                        return (
                                            <TableCell key={index}>{columns}</TableCell>
                                        )
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow >
                                        <TableCell>{index + 1}</TableCell>
                                        {
                                            fill.map((fill, index) => {
                                                if (fill === "create_at" || fill === "update_at") {
                                                    return (
                                                        <TableCell key={index}>{moment(row[fill]).utc().format('DD/MM/YYYY')}</TableCell>
                                                    )
                                                } else if (fill === "id_created" || fill === "id_updated") {
                                                    return (
                                                        <TableCell>{Function.changeText((nhanVien.find(arr => arr.id === row[fill])).ten)}</TableCell>
                                                    )
                                                } else return (
                                                    <TableCell>{Function.changeText(row[fill])}</TableCell>
                                                )
                                            })
                                        }
                                        <TableCell>
                                            <div className='tableUI_btn'>
                                                <button className="warning tableUI_btn1" onClick={handleOpenEdit}>
                                                    Sửa
                                                </button>
                                                <button className="primary tableUI_btn1">
                                                    Xem
                                                </button>
                                                <button className="danger tableUI_btn1" onClick={() => {
                                                    setDataDelete({
                                                        token: localStorage.getItem("accessToken"),
                                                        MainID: {"id":row.id},
                                                        table: query,
                                                        ten: row.ten
                                                    });
                                                    handleOpenDelete()
                                                }
                                                }>
                                                    Xóa
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* ========SỬA======== */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEdit}>
                    <div className={classes.paper}>
                        <div className="title_model">Thêm mới</div>
                        <form className={classes.rootEdit} noValidate autoComplete="off">
                            <TextField onChange={changeEdit} className='input_model' id="ten" label="Tên" type="search" variant="outlined" />
                            <br />

                            <div className="button_model">
                                <br />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<CloseIcon />}
                                    onClick={handleCloseEdit}
                                    type="button"
                                >
                                    Hủy
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<Icon>send</Icon>}
                                    type="submit"
                                >
                                    Lưu
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
            {/* ========END SỬA======== */}

            {/* ========XÓA======== */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openDelete}
                onClose={handleCloseDelete}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDelete}>
                    <div className={classes.paper}>
                        <div className="title_model">Xóa <strong>{dataDelete.ten}</strong> khỏi hệ thống ?</div>
                        <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => remove(e)}>
                            <div className="button_model">
                                <br />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<CloseIcon />}
                                    onClick={handleCloseDelete}
                                    type="button"
                                >
                                    Hủy
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<DeleteIcon />}
                                    type="submit"
                                    onClick={() => {
                                        handleCloseDelete()
                                    }}>
                                    Xóa
                                </Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
            {/* ========END XÓA======== */}
        </div>
    );
}

export default TableUI;
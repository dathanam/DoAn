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
import ToastSuccess from '../ToastSuccess';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}));

function TableUI(props) {
    const history = useHistory();
    const query = history.location.pathname.slice(7)
    const moment = require('moment')
    const classes = Styles();
    const data = props.data;
    const fillTable = props.fillTable;
    const fillEdit = props.fillEdit;
    const fillCreate = props.fillCreate;
    const nhanVien = props.nhanVien;
    const [dataDetail, setDataDetail] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const [dataCreate, setDataCreate] = useState({});
    console.log(dataCreate)

    const [openEdit, setOpenEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState({});
    const [idEdit, setIdEdit] = useState(0);
    const handleOpenEdit = () => { setOpenEdit(true) };
    const handleCloseEdit = () => { setOpenEdit(false) };

    const [openDelete, setOpenDelete] = useState(false);
    const [dataDelete, setDataDelete] = useState({});
    const handleOpenDelete = () => { setOpenDelete(true) };
    const handleCloseDelete = () => { setOpenDelete(false) };

    const toast_success = () => toast.success('Success', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    function handleCreate(event) {
        const newdata = { ...dataCreate };
        newdata[event.target.id] = event.target.value;
        setDataCreate(newdata);
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    function changeEdit(event) {
        const newdata = { ...dataEdit };
        newdata[event.target.id] = event.target.value;
        setDataEdit(newdata);
    }

    const post = (e) => {
        e.preventDefault();
        dataCreate.token = localStorage.getItem("accessToken");
        dataCreate.table = query;
        Function.postData(dataCreate)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert("Thêm thành công quyền '" + dataCreate.ten + "' vào hệ thống !");
                    // setTimeout(() => {
                    //     <ToastSuccess />
                    // }, 1000);
                    window.location.reload()
                    setDataCreate({});
                } else {
                    alert("Error");
                    handleClose()
                    setDataCreate({});
                }
            })
            .catch((err) => {
                alert("Error");
                handleClose()
                setDataCreate({});
            })
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

    const Edit = (e) => {
        e.preventDefault();
        const add = {
            token: localStorage.getItem("accessToken"),
            table: query,
            MainID: { "id": idEdit },
        }
        const newdata = Object.assign(dataEdit, add)

        Function.editData(newdata)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert("Cập nhật thành công !");
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

    const detailData = (id) => {
        const table = "";
        if (query === "xuatkho") {
            table = "chitietxuatkho"
        } else if (query === "nhapkho") {
            table = "chitietnhapkho"
        } else if (query === "khachhang") {
            table = "phieutiem"
        }
        const newdata = {
            token: localStorage.getItem("accessToken"),
            table: table,
            idCat: id,
        }

        Function.detailData(newdata)
            .then(p => {
                setDataDetail(p.data)
            })
    }

    return (
        <div className="recent_order">
            <div className="nameTable">
                <h2>Quyền</h2>
                <span className="material-icons-outlined" onClick={handleOpen}>add_circle</span>
            </div>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {
                                    fillTable.columns.map((columns, index) => {
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
                                            fillTable.fill.map((fill, index) => {
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
                                                <button className="warning tableUI_btn1" onClick={() => {
                                                    setIdEdit(row.id)
                                                    const newdata = {}
                                                    fillEdit.data.map((item, index) => {
                                                        newdata[item.fill] = row[item.fill]
                                                    })
                                                    setDataEdit(newdata)
                                                    handleOpenEdit()
                                                }}>
                                                    Sửa
                                                </button>
                                                {
                                                    (query === 'khachhang' || query === 'nhapkho' || query === 'xuatkho') ?
                                                        <button className="primary tableUI_btn1" onClick={() => detailData(row.id)}>
                                                            Xem
                                                        </button> : ""
                                                }
                                                <button className="danger tableUI_btn1" onClick={() => {
                                                    setDataDelete({
                                                        token: localStorage.getItem("accessToken"),
                                                        MainID: { "id": row.id },
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

            {/* ========THÊM MỚI======== */}
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
                        <div className="title_model">Thêm mới</div>
                        <form className={classes.rootCreate} noValidate autoComplete="off" onSubmit={(e) => post(e)}>
                            {
                                 fillCreate.fill.map((item, index) => {
                                    if (index === 3 || index === 6 || index === 9) {
                                        return (
                                            <>
                                                <br />
                                                <TextField onChange={handleCreate} className='input_model' id={item.fill} label={item.name} type={item.type} variant="outlined" key={index} />
                                            </>
                                        )
                                    } else {
                                        return (
                                            <TextField onChange={handleCreate} className='input_model' id={item.fill} label={item.name} type={item.type} variant="outlined" key={index} />
                                        )
                                    }
                                })
                            }
                            <br />
                            
                            <div className="button_model">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<CloseIcon />}
                                    onClick={handleClose}
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
                                    Thêm
                                </Button>
                            </div>

                        </form>
                    </div>
                </Fade>
            </Modal>
            {/* ========END THÊM MỚI======== */}
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
                        <div className="title_model">Thay Đổi</div>

                        {
                            fillEdit.data.map((item, index) => {
                                if (index === 3 || index === 6 || index === 9) {
                                    return (
                                        <>
                                            <br />
                                            <TextField onChange={changeEdit} className='input_model' id={item.fill} label={item.name} value={dataEdit[item.fill]} type={item.type} variant="outlined" key={index} />
                                        </>
                                    )
                                } else {
                                    return (
                                        <TextField onChange={changeEdit} className='input_model' id={item.fill} label={item.name} value={dataEdit[item.fill]} type={item.type} variant="outlined" key={index} />
                                    )
                                }
                            })
                        }
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
                                onClick={(e) => Edit(e)}
                            >
                                Lưu
                            </Button>
                        </div>
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
import React, { useEffect, useState } from 'react';
import Function from '../../Function';
import Spinner from '../../Spinner/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import ToastSuccess from '../ToastSuccess';
import TableUI from './TableUI';
import MainTop from './MainTop';
import MainRight from './MainRight';

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
    root: {
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

function Role() {
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = Styles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const [quyen, setQuyen] = useState({});
    const [nhanVien, setNhanVien] = useState({})

    const get = () => {
        setLoading(true)
        setTimeout(() => {
            Function.getData({
                "token": localStorage.getItem("accessToken"),
                "table": "quyen"
            }).then(p => {
                setListData(p)
                setLoading(false)
            })
        }, 500)

        Function.getData({
            "token": localStorage.getItem("accessToken"),
            "table": "nhanvien"
        }).then(p => {
            setNhanVien(p)
        })
    }
    const post = (e) => {
        e.preventDefault();
        quyen.token = localStorage.getItem("accessToken");
        quyen.table = "quyen";
        Function.postData(quyen)
            .then((res) => {
                if (res.data.statusCode === 200) {
                    alert("Thêm thành công quyền '" + quyen.ten + "' vào hệ thống !");
                    // setTimeout(() => {
                    //     <ToastSuccess />
                    // }, 1000);
                    window.location.reload()
                    setQuyen({});
                } else {
                    alert("Error");
                    handleClose()
                    setQuyen({});
                }
            })
            .catch((err) => {
                console.log(err)
                alert("Error");
                handleClose()
                setQuyen({});
            })
    }

    useEffect(() => {
        get();
    }, []);

    function handleCreate(event) {
        const newdata = { ...quyen };
        newdata[event.target.id] = event.target.value;
        setQuyen(newdata);
    }

    const columns = ["STT", "Quyền", "Ngày tạo", "Ngày Sửa", "Người tạo", "Người sửa", "Chức năng"];
    const fill = ["ten", "create_at", "update_at", "id_created", "id_updated"];

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
                        <MainTop />
                        <div className="recent_order">
                            <div className="nameTable">
                                <h2>Quyền</h2>
                                <span className="material-icons-outlined" onClick={handleOpen}>add_circle</span>
                            </div>
                            <TableUI columns={columns} rows={listData} fill={fill} nhanVien={nhanVien} />
                        </div>
                    </main>

                    <MainRight />

                    {/* --------------Model---------- */}
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
                                <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => post(e)}>
                                    <TextField onChange={handleCreate} className='input_model' id="ten" label="Tên" type="search" variant="outlined" />
                                    <br />

                                    <div className="button_model">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<DeleteIcon />}
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
                </>
            }
        </>
    );
}

export default Role;
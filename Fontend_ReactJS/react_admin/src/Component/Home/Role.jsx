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

function Role(props) {
    const moment = require('moment')
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = Styles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const [quyen, setQuyen] = useState({});

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
        }, 1000)
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

    const columns = ["STT", "Quyền", "Ngày tạo", "Người tạo", "Người sửa", "Chức năng"];
    const fill = ["ten", "create_at", "id_created", "id_updated"];

    return (
        <>
            {loading ? <Spinner /> :
                <>
                    <main>
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
                            <div className="nameTable">
                                <h2>Quyền</h2>
                                <span className="material-icons-outlined" onClick={handleOpen}>add_circle</span>
                            </div>
                            <TableUI columns={columns} rows={listData} fill={fill} />
                            {/* <table>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Quyền</th>
                                        <th>Người tạo</th>
                                        <th>người sửa</th>
                                        <th>Ngày tạo</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listData.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.ten}</td>
                                                    <td>{item.id_created}</td>
                                                    <td>{item.id_updated}</td>
                                                    <td>{moment(item.create_at).utc().format('DD/MM/YYYY')}</td>
                                                    <td className="warning">SỬA</td>
                                                    <td className="primary">XEM</td>
                                                    <td className="danger">XÓA</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <a href="">Show all</a> */}
                        </div>
                    </main>
                    <div className="right">
                        <div className="recent_updates">
                            <h2>Recent Update</h2>
                            <div className="updates">
                                <div className="update">
                                    <div className="profile_photo">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="message">
                                        <p><b>Hong Nhung</b>Thơm ngon mời bạn ăn nha</p>
                                        <small className="text_muted">2 minutes ago</small>
                                    </div>
                                </div>
                                <div className="update">
                                    <div className="profile_photo">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="message">
                                        <p><b>Hong Nhung</b>Thơm ngon mời bạn ăn nha</p>
                                        <small className="text_muted">2 minutes ago</small>
                                    </div>
                                </div>
                                <div className="update">
                                    <div className="profile_photo">
                                        <img src="" alt="" />
                                    </div>
                                    <div className="message">
                                        <p><b>Hong Nhung</b>Thơm ngon mời bạn ăn nha</p>
                                        <small className="text_muted">2 minutes ago</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="sales_analytics">
                            <h2>Sales Analytics</h2>
                            <div className="item online">
                                <div className="icon">
                                    <span className="material-icons-outlined">dashboard</span>

                                </div>
                                <div className="right">
                                    <div className="info">
                                        <h3>Online Order</h3>
                                        <small className="text_muted">Last 24 Hour</small>
                                    </div>
                                    <h5 className="success">+33%</h5>
                                    <h3>1234</h3>
                                </div>
                            </div>
                            <div className="item online">
                                <div className="icon">
                                    <span className="material-icons-outlined">dashboard</span>
                                </div>
                                <div className="right">
                                    <div className="info">
                                        <h3>Online Order</h3>
                                        <small className="text_muted">Last 24 Hour</small>
                                    </div>
                                    <h5 className="danger">-17%</h5>
                                    <h3>22</h3>
                                </div>
                            </div>
                            <div className="item customers">
                                <div className="icon">
                                    <span className="material-icons-outlined">dashboard</span>

                                </div>
                                <div className="right">
                                    <div className="info">
                                        <h3>Offline Order</h3>
                                        <small className="text_muted">Last 24 Hour</small>
                                    </div>
                                    <h5 className="success">+43%</h5>
                                    <h3>4433</h3>
                                </div>
                            </div>
                            <div className="item add_product">
                                <div>
                                    <span className="material-icons-outlined">dashboard</span>
                                    <h3>Add Product</h3>
                                </div>
                            </div>
                        </div>
                    </div>

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
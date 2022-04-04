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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Chart from './Chart.jsx';

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
    }
}));

function Home() {
    const [loading, setLoading] = useState(false);
    const today = new Date();
    const classes = Styles();
    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false) };
    const [nhanVien, setNhanVien] = useState({
        ten: "",
        bang_cap: "",
        dia_chi: "",
        ngay_sinh: "",
        sdt: "",
        username: "",
        password: "",
        id_quyen: ""
    });

    const get = () => {
        setLoading(true)
        setTimeout(() => {
            Function.getData({
                "token": localStorage.getItem("accessToken"),
                "table": "nhanvien"
            }).then(p => {
                setLoading(false)
            })
        }, 1000)
    }
    const post = (e) => {
        e.preventDefault();
        nhanVien.token = localStorage.getItem("accessToken");
        nhanVien.table = "nhanvien";
        Function.postData(nhanVien).then((res) => console.log(res));
    }

    useEffect(() => {
        get();
    }, []);

    function handleCreate(event) {
        const newdata = { ...nhanVien };
        newdata[event.target.id] = event.target.value;
        setNhanVien(newdata);
    }

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

                        <div className="insights">
                            <div className="sales">
                                <span className="material-icons-outlined">groups</span>
                                <div className="middle">
                                    <div className="left">
                                        <h3>Khách hàng tháng {today.getMonth() + 1}</h3>
                                        <h1>222</h1>
                                    </div>
                                    <div className="progress">
                                        <svg>
                                            <circle cx="38" cy="38" r="36"></circle>
                                        </svg>
                                        <div className="number">
                                            <p>81%</p>
                                        </div>
                                    </div>
                                </div>
                                <small className="text_muted">Tháng {today.getMonth()}: 400</small>
                            </div>

                            <div className="expenses">
                                <span className="material-icons-outlined">receipt_long</span>
                                <div className="middle">
                                    <div className="left">
                                        <h3>Hóa đơn tháng {today.getMonth() + 1}</h3>
                                        <h1>300</h1>
                                    </div>
                                    <div className="progress">
                                        <svg>
                                            <circle cx="38" cy="38" r="36"></circle>
                                        </svg>
                                        <div className="number">
                                            <p>81%</p>
                                        </div>
                                    </div>
                                </div>
                                <small className="text_muted">Tháng {today.getMonth()}: 1000</small>
                            </div>

                            <div className="income">
                                <span className="material-icons-outlined">paid</span>
                                <div className="middle">
                                    <div className="left">
                                        <h3>Doanh thu tháng {today.getMonth() + 1}</h3>
                                        <h1>100,000,000</h1>
                                    </div>
                                    <div className="progress">
                                        <svg>
                                            <circle cx="38" cy="38" r="36"></circle>
                                        </svg>
                                        <div className="number">
                                            <p>50%</p>
                                        </div>
                                    </div>
                                </div>
                                <small className="text_muted">Tháng {today.getMonth()}: 100,000,000 vnđ</small>
                            </div>

                        </div>

                        <div className="recent_order">
                            {/* <Table columns={columns} rows={rows} /> */}
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
                                    <TextField onChange={handleCreate} className='input_model' id="ngay_sinh" label="Ngày sinh" type="date" variant="outlined" />
                                    <TextField onChange={handleCreate} className='input_model' id="dia_chi" label="Địa chỉ" type="search" variant="outlined" />
                                    <br />
                                    <TextField onChange={handleCreate} className='input_model' id="sdt" label="Số điện thoại" type="search" variant="outlined" />
                                    <TextField onChange={handleCreate} className='input_model' id="bang_cap" label="Bằng Cấp" type="search" variant="outlined" />
                                    <FormControl onChange={handleCreate} variant="outlined" className={classes.formControl}>
                                        <InputLabel htmlFor="outlined-age-native-simple" className={classes.select_model}>Quyền-Vị trí</InputLabel>
                                        <Select
                                            native
                                            label="Quyền-Vị trí"
                                            inputProps={{
                                                name: 'Quyền-Vị trí',
                                                id: 'id_quyen',
                                            }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={1}>Admin</option>
                                            <option value={2}>Bác sỹ</option>
                                            <option value={3}>Quản lý kho</option>
                                            <option value={4}>Lễ tân</option>
                                        </Select>
                                    </FormControl>
                                    <br />
                                    <TextField onChange={handleCreate} className='input_model' id="username" label="Username" type="search" variant="outlined" />
                                    <TextField onChange={handleCreate} className='input_model' id="password" label="Password" type="password" variant="outlined" />
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

export default Home;
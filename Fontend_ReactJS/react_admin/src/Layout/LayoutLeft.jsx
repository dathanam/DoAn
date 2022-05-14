import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/Layout.css';
import Function from '../Function';
import Spinner from '../Spinner/Spinner';
import logoTD from '../WPhoto/LogoTD2.png'
import jwt_decode from "jwt-decode";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LayoutLeft(props) {
    const [nhanVien, setNhanVien] = useState([{ ten: 'admin' }])
    const [loading, setLoading] = useState(false);
    const roleUser = jwt_decode(localStorage.getItem('accessToken')).role;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => { setOpen(true) };
    const handleClose = () => { setOpen(false) };
    const history = useHistory();

    useEffect(async () => {
        try {
            var data = await Function.getEmployeeFromToken();
            setNhanVien(data);
        }
        catch (erro) {
            console.log("erro", erro)
        }
        setTimeout(() => {

        }, 500);
    }, [props]);

    // 1 Admin, 2 bac sỹ, 3 quản lý kho, 4 lễ tân, 5 thu ngân
    const [dataSidebar, setDataSidebar] = useState([
        {
            name: "Tạo phiếu tiêm",
            icon: "home",
            role: [4],
            number: false,
            active: true,
            query: "letan"
        },
        {
            name: "Phiếu tiêm",
            icon: "home",
            role: [2],
            number: false,
            active: true,
            query: "phieutiem"
        },
        {
            name: "Trang chủ",
            icon: "home",
            role: [1],
            number: false,
            active: true,
            query: ""
        }, {
            name: "Dịch Vụ",
            icon: "auto_fix_high",
            role: [1, 2, 4],
            number: false,
            active: false,
            query: "dichvu"
        }, {
            name: "Hóa đơn",
            icon: "auto_fix_high",
            role: [5],
            number: false,
            active: false,
            query: "hoadon"
        }, {
            name: "Sau tiêm",
            icon: "timelapse",
            role: [2],
            number: false,
            active: false,
            query: "theodoi"
        }, {
            name: "Khách Hàng",
            icon: "group_add",
            role: [1, 2, 4],
            number: false,
            active: false,
            query: "khachhang"
        },
        , {
            name: "Phiếu Tiêm",
            icon: "collections_bookmark",
            role: [1],
            number: false,
            active: false,
            query: "adminphieutiem"
        },{
            name: "Hóa Đơn",
            icon: "free_cancellation",
            role: [1],
            number: false,
            active: false,
            query: "adminhoadon"
        }, {
            name: "Nhân Viên",
            icon: "person",
            role: [1],
            number: false,
            active: false,
            query: "nhanvien"
        }, {
            name: "Phòng Bệnh",
            icon: "health_and_safety",
            role: [1, 2],
            number: false,
            active: false,
            query: "phongbenh"
        }, {
            name: "Thuốc",
            icon: "vaccines",
            role: [1, 2],
            number: false,
            active: false,
            query: "thuoc"
        }, {
            name: "Quyền",
            icon: "star_rate",
            role: [1],
            number: false,
            active: false,
            query: "quyen"
        }
    ]);

    const DisActiveAll = (sidebar) => {
        dataSidebar.map(item => item.active = false)
        sidebar.active = true;
    }
    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
    }));

    function SimpleDialog(props) {
        const classes = useStyles();
        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
        };

        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Chắc chắn muốn thoát chưa ?</DialogTitle>
                <div className="button_model1">
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<ClearIcon />}
                        onClick={handleClose}
                        type="button"
                    >
                        Hủy
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        endIcon={<ExitToAppIcon />}
                        type="button"
                        onClick={() => {
                            setTimeout(() => {
                                logout()
                            }, 1000)
                        }}
                    >
                        Thoát
                    </Button>
                </div>
            </Dialog>
        );
    }

    async function logout() {
        var idPK = localStorage.getItem("phongkham")
        if (idPK != null) {
            var edit = await Function.editTableNoSave({
                table: "phongkham",
                MainID: { "id": parseInt(idPK) },
                trang_thai: false
            });
        }
        history.push("/")
        localStorage.removeItem("phongkham");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        window.location.reload()
    }

    return (
        <aside>
            <div className="top">
                <div className="logo">
                    <img src={logoTD} alt="avata" />
                    {/* <h2>EGA<span className="danger">TOR</span></h2> */}
                </div>
                <div className="close" id="close_btn" onClick={() => {
                    document.querySelector("aside").style.display = 'none'
                    document.querySelector("aside").style.animation = 'showMenu 400ms ease forwards'
                }}>
                    <span className="material-icons-outlined">close</span>
                </div>
            </div>
            <div className="infomation">
                <img src={nhanVien[0].anh} alt="" />
                <b>{Function.changeText(nhanVien[0].ten)}</b>
            </div>
            <div className="sidebar">
                {
                    dataSidebar.map((item, index) => {
                        if (item.role.findIndex(k => k === roleUser) >= 0) {
                            return (
                                <a key={index} href="#" className={item.active ? "active" : ""} onClick={() => {
                                    DisActiveAll(item)
                                    history.push("/admin/" + item.query)
                                }}>
                                    <span className="material-icons-outlined">{item.icon}</span>
                                    <h3>{item.name}</h3>
                                </a>
                            )
                        }
                    })
                }
                <a href="#" onClick={handleClickOpen}>
                    <span className="material-icons-outlined">logout</span>
                    <h3>Logout</h3>
                </a>
                <SimpleDialog open={open} onClose={handleClose} />
            </div>
        </aside>
    );
}

export default LayoutLeft;
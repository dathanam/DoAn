import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../CSS/Layout.css';
import logo from '../WPhoto/logo.jpg'
import logoTD from '../WPhoto/LogoTD2.png'
import jwt_decode from "jwt-decode";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function LayoutLeft() {
    const roleUser = jwt_decode(localStorage.getItem("accessToken")).role
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {setOpen(true)};
    const handleClose = () => {setOpen(false)};
    const history = useHistory();

    const [dataSidebar, setDataSidebar] = useState([
        {
            name: "Home",
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
            name: "Khách Hàng",
            icon: "group_add",
            role: [1, 2, 4],
            number: false,
            active: false,
            query: "khachhang"
        }, {
            name: "Nhân Viên",
            icon: "person",
            role: [1],
            number: false,
            active: false,
            query: "nhanvien"
        }, {
            name: "Nhập Kho",
            icon: "bookmark_added",
            role: [1, 3],
            number: false,
            active: false,
            query: "nhapkho"
        }, {
            name: "Xuất Kho",
            icon: "bookmark_remove",
            role: [1, 3],
            number: false,
            active: false,
            query: "xuatkho"
        }, {
            name: "Phiếu Tiêm",
            icon: "text_snippet",
            role: [2],
            number: false,
            active: false,
            query: "phieutiem"
        }, {
            name: "Phòng Bệnh",
            icon: "health_and_safety",
            role: [1, 2, 3],
            number: false,
            active: false,
            query: "phongbenh"
        }, {
            name: "Thuốc",
            icon: "vaccines",
            role: [1, 2, 3],
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
        }, {
            name: "Thiết Bị Vật Tư",
            icon: "api",
            role: [1, 3],
            number: false,
            active: false,
            query: "thietbivattu"
        }, {
            name: "Trạng Thái",
            icon: "rule",
            role: [1],
            number: false,
            active: false,
            query: "trangthai"
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
                        onClick={() =>{setTimeout(() => {
                            logout()
                        }, 1000)}}
                    >
                        Thoát
                    </Button>
                </div>
            </Dialog>
        );
    }

    function logout(){
        localStorage.removeItem("accessToken");
        history.push("/")
        window.location.reload()
    }

    return (
        <aside>
            <div className="top">
                <div className="logo">
                    <img src={logoTD} alt="" />
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
                <img src={logo} alt="" />
                <b>Nguyễn Thành Đạt</b>
            </div>
            <div className="sidebar">
                {
                    dataSidebar.map((item, index) => {
                        if (item.role.findIndex(k => k === roleUser) >= 0) {
                            return (
                                <a key={index} href="#" className={item.active ? "active" : ""} onClick={() => { 
                                    DisActiveAll(item)
                                    history.push("/admin/"+item.query)
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
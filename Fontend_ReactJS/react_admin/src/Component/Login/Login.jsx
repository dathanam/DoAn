import React, { useState } from 'react';
import '../../CSS/Login.css';
import api from '../../api';
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const [dataLogin, setDataLogin] = useState({
        username: "",
        password: "",
    })

    function handle(event) {
        const newdata = { ...dataLogin };
        newdata[event.target.id] = event.target.value;
        setDataLogin(newdata);
    }

    function submit(e) {
        e.preventDefault();
        api.login(dataLogin)
            .then((res) => {
                console.log(res)
                localStorage.setItem("accessToken", res.data.token);
                history.push("/admin");
                window.location.reload();
            })
            .catch(err => {
                setDataLogin({
                    username: "",
                    password: ""
                })
                alert("UserName Or Password are wrong")
            })
    }

    return (
        <div className="center">
            <h1>Login</h1>
            <form onSubmit={(e) => submit(e)}>
                <div className="txt_field">
                    <input onChange={handle} id="username" value={dataLogin.username} type="text" required />
                    <span></span>
                    <label>Username</label>
                </div>
                <div className="txt_field">
                    <input onChange={handle} id="password" value={dataLogin.password} type="password" required />
                    <span></span>
                    <label>Password</label>
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
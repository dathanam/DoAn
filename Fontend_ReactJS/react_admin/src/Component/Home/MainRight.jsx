import React, { useState, useEffect, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import avata from '../../WPhoto/logo.jpg'

// import io from "socket.io-client";

const Styles = makeStyles((theme) => ({
    button1: {
        margin: theme.spacing(1),
        float: 'left'
    },
    button2: {
        margin: theme.spacing(1),
        float: 'right'
    },
}));

 //const socket = io.connect('http://localhost:3333')

function MainRight(props) {
    const classes = Styles();

    const [state, setState] = useState({ message: '', name: '' });
    const [chat, setChat] = useState([]);

    // useEffect(() =>{
    //     socket.on('message', ({name, message}) =>{
    //         setChat([...chat, {name, message}])
    //     })
    // })

    const onTextChange = e =>{
        // setState({...state, [e.target.name] : e.target.value})
    }

    const onMessageSubmit =(e) =>{
        // e.preventDefault();
        // const {name, message} = state
        // socket.emit('message', {name, message})
        // setState({ message: '', name: '' })
    }

    const renderChat = () => {
        return chat.map(({ name, message }, index) => {
            <div className="update" key={index}>
                <div className="profile_photo">
                    <img src={avata} alt="" />
                </div>
                <div className="message">
                    <p><b>{name} </b>{message}</p>
                    <small className="text_muted">2 minutes ago</small>
                </div>
            </div>
        })
    }

    return (
        <div className="right">
            <div className="recent_updates">
                <h2>Home Chat</h2>
                <div className="updates">
                    <div className='header_chat'>
                        <form onSubmit={onMessageSubmit}>
                            <textarea className='input_chat' placeholder='Message...'
                                name='message' onChange={e => onTextChange(e)} value={state.message} />
                            <div className='btn_chat'>
                                <div className='tableUI_btn'>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button1}
                                        startIcon={<DeleteIcon />}
                                        type="button"
                                    >
                                        Hủy
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button2}
                                        endIcon={<Icon>send</Icon>}
                                        type="submit"
                                    >
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className='list_message'>
                        {renderChat()}
                    </div>
                </div>
            </div>
            {/* <div className="sales_analytics">
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
            </div> */}
        </div>
    );
}

export default MainRight;
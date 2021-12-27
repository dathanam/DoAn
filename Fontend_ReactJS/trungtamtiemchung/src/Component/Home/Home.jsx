import React from 'react';

function Home() {
    return (
        <div className="main">
            <div className="top_bar">
                <div className="search">
                    <input type="text" name="search" placeholder="search here...." />
                    <label for="search"><i className='bx bx-search-alt-2'></i></label>
                </div>
                <i className='bx bxs-user-circle'></i>
                <div className="user">
                    <img src="./avatar.jpg" alt="avatar" />
                </div>
            </div>
            <div className="cards">
                <div className="card">
                    <div className="card_content">
                        <div className="number">67</div>
                        <div className="card_name">Appointments</div>
                    </div>
                    <div className="icon-box">
                        <i className='bx bx-box'></i>
                    </div>
                </div>
                <div className="card">
                    <div className="card_content">
                        <div className="number">99</div>
                        <div className="card_name">Appointments</div>
                    </div>
                    <div className="icon-box">
                        <i className='bx bx-caret-right-circle'></i>
                    </div>
                </div>
                <div className="card">
                    <div className="card_content">
                        <div className="number">88</div>
                        <div className="card_name">Appointments</div>
                    </div>
                    <div className="icon-box">
                        <i className='bx bxs-credit-card'></i>
                    </div>
                </div>
                <div className="card">
                    <div className="card_content">
                        <div className="number">100</div>
                        <div className="card_name">Appointments</div>
                    </div>
                    <div className="icon-box">
                        <i className='bx bxl-mastercard'></i>
                    </div>
                </div>
            </div>
            <div className="tables">
                <div className="last-appointments">
                    <div className="heading">
                        <h2>Last Appointments</h2>
                        <a href="#" className="btn">View All</a>
                    </div>
                    <table className="appointments">
                        <thead>
                            <td>Name</td>
                            <td>Doctor</td>
                            <td>Condition</td>
                            <td>hehe</td>
                            <td>hehe</td>
                            <td>hehe</td>
                            <td>hehe</td>
                            <td>Action</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Nhung</td>
                                <td>
                                    <i className='bx bxs-show'></i>
                                    <i className='bx bxs-edit'></i>
                                    <i className='bx bxs-trash'></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Nhung</td>
                                <td>
                                    <i className='bx bxs-show'></i>
                                    <i className='bx bxs-edit'></i>
                                    <i className='bx bxs-trash'></i>
                                </td>
                            </tr>
                            <tr>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Pham</td>
                                <td>Thi</td>
                                <td>Hong</td>
                                <td>Nhung</td>
                                <td>
                                    <i className='bx bxs-show'></i>
                                    <i className='bx bxs-edit'></i>
                                    <i className='bx bxs-trash'></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="doctor-visiting">
                    <div className="heading">
                        <h2>Doctor Visiting</h2>
                        <a href="#" className="btn">View All</a>
                    </div>
                    <table className="visiting">
                        <thead>
                            <td>photo</td>
                            <td>name</td>
                            <td>visit</td>
                            <td>Detail</td>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="img-box-small">
                                        <img src="./avatar.jpg" alt="avatar" />
                                    </div>
                                </td>
                                <td>Thành đạt</td>
                                <td>Hà nội</td>
                                <td>
                                    <i className='bx bxs-show'></i>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="img-box-small">
                                        <img src="./avatar.jpg" alt="avatar" />
                                    </div>
                                </td>
                                <td>Thành đạt</td>
                                <td>Hà nội</td>
                                <td>
                                    <i className='bx bxs-show'></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
import React from 'react';

function Home() {
    const today = new Date();

    return (
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
        </>
    );
}

export default Home;
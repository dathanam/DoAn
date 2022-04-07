import React from 'react';

function MainRight(props) {
    return (
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
    );
}

export default MainRight;
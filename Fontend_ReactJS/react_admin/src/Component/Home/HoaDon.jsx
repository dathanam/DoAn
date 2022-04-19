import React from 'react';
import '../../CSS/HoaDon.css'
import Logo from '../../WPhoto/LogoTD2.png'

function HoaDon() {
    return (
        <div className="wrapper">
            <div className="invoice_wrapper">
                <div className="header">
                    <div className="logo_invoice_wrap">
                        <div className="logo_sec">
                            <img src={Logo} alt="logo" />
                                <div className="title_wrap">
                                    <p className="title bold titleHeader">Trung tâm tiêm chủng Thành Đạt</p>
                                    <p className="sub_title light">236 Hoàng Quốc Việt - quận Bắc Từ Liêm - thành phố Hà Nội</p>
                                </div>
                        </div>
                        <div className="invoice_sec">
                            {/* <p className="invoice bold">Thông tin</p> */}
                            <p className="invoice_no">
                                <span className="bold">ID</span>
                                <span>#3456</span>
                            </p>
                            <p className="date">
                                <span className="bold">Ngày</span>
                                <span>34/45/5678</span>
                            </p>
                        </div>
                    </div>
                    <div className="bill_total_wrap">
                        <div className="bill_sec">
                            <p>Khách Hàng</p>
                            <p className="bold name bill_sec_name_price">Nguyễn trần nhất quyết</p>
                            <span>236 Hoàng Quốc Việt - quận Bắc Từ Liêm - thành phố Hà Nội<br />
                                +987 6545676</span>
                        </div>
                        {/* <div className="total_wrap">
                            <p>Total Due</p>
                            <p className="bold price bill_sec_name_price">USD: 1200</p>
                        </div> */}
                    </div>
                </div>
                <div className="body">
                    <div className="main_table">
                        <div className="table_header">
                            <div className="row">
                                <div className="col col_no">STT</div>
                                <div className="col col_des">Vacxin</div>
                                <div className="col col_price">Giá</div>
                                <div className="col col_qty">Số lượng</div>
                                <div className="col col_total">Thành tiền</div>
                            </div>
                        </div>
                        <div className="table_body">
                            <div className="row">
                                <div className="col col_no"><p>01</p></div>
                                <div className="col col_des">
                                    <p className="bold">
                                        web designing
                                    </p>
                                    <p>
                                        Trong bài này chúng ta sẽ học
                                    </p>
                                </div>
                                <div className="col col_price">
                                    <p>$300</p>
                                </div>
                                <div className="col col_qty">
                                    <p>2</p>
                                </div>
                                <div className="col col_total">
                                    <p>600</p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col col_no"><p>01</p></div>
                                <div className="col col_des">
                                    <p className="bold">
                                        web designing
                                    </p>
                                    <p>
                                        Trong bài này chúng ta sẽ học
                                    </p>
                                </div>
                                <div className="col col_price">
                                    <p>$300</p>
                                </div>
                                <div className="col col_qty">
                                    <p>2</p>
                                </div>
                                <div className="col col_total">
                                    <p>600</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="paymenthod_grandtotal_wrap">
                        <div className="paymethod_sec">
                            <p className="bold">Phương thức thanh toán</p>
                            <p>BIDV: 21610000488079</p>
                        </div>
                        <div className="grandtotal_sec">
                            <p className="bold">
                                <span>Tổng Tiền</span>
                                <span>$7500</span>
                            </p>
                            <p>
                                <span>Tax Vat 10%</span>
                                <span>$300</span>
                            </p>
                            <p>
                                <span>Discount 10%</span>
                                <span>-$300</span>
                            </p>
                            <p className="bold">
                                <span>Thành Tiền</span>
                                <span>$7500.0</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <p>Cảm ơn bạn đã tin tưởng</p>
                    <div className="terms">
                        <p className="bold tc">Terms & Conditions</p>
                        <p>
                            Takes advantage of latest JavaScript features, bringing design patterns and mature solutions to Node.js world.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoaDon;
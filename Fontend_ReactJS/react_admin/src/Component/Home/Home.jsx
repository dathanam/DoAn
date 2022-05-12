import React, { useState, useEffect } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts'
import Function from '../../Function';

function Home() {
    var DataAddress = {
        quan: [
            { id: 1, idThanhPho: 1, name: 'quận ba đình' },
            { id: 2, idThanhPho: 1, name: 'quận bắc từ liêm' },
            { id: 3, idThanhPho: 1, name: 'quận cầu giấy' },
            { id: 4, idThanhPho: 1, name: 'quận đống đa' },
            { id: 5, idThanhPho: 1, name: 'quận hoàn kiếm' },
        ]
    }
    const today = new Date();
    const moment = require('moment');
    const [phongKham, setPhongKham] = useState([]);
    const [optionWeek, setOptionWeek] = useState(null);
    const [optionDoanhThu, setOptionDoanhThu] = useState(null);

    // Thống kê khách đến trong vòng 7 ngày
    var last = today.getDate() + 1;
    var first = last - 7;
    const today1 = moment(new Date(today.setDate(first)).toUTCString()).utc().format('YYYY-MM-DD')
    const today2 = moment(new Date(today.setDate(last)).toUTCString()).utc().format('YYYY-MM-DD')
    // End +++++

    // Doanh thu trong vòng 12 tháng
    const startDay = moment(new Date(new Date().getFullYear(), 1, 1)).utc().format('YYYY-MM-DD')
    const endDay = moment(new Date().setDate(new Date().getDate() + 1)).utc().format('YYYY-MM-DD')
    //end

    // Thống kê giới tính
    const [khachHangTheoKhuVuc, setKhachHangTheoKhuVuc] = useState();
    console.log(khachHangTheoKhuVuc)
    //enG

    useEffect(async () => {
        try {
            var data = await Function.khachHangTheoTuan({ "startDay": today1, "endDay": today2 });
            var dateCount = [0, 0, 0, 0, 0, 0, 0];
            var dateCountDoanhThu = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            data.data.map(item => {
                for (var i = 0; i < dateCount.length; i++) {
                    if (moment(item.create_at).utc().format('DD/MM/YYYY') === moment(new Date().setDate(new Date().getDate() - i)).utc().format('DD/MM/YYYY')) {
                        dateCount[i] += 1;
                        i = dateCount.length + 1;
                    }
                }
            });
            var setting = {
                title: {
                    text: "Khách hàng đến tiêm trong 7 ngày gần nhất"
                },
                data: [
                    {
                        type: "column",
                        dataPoints: [
                            { label: moment(new Date().setDate(new Date().getDate() - 6)).utc().format('DD/MM/YYYY'), y: dateCount[6] },
                            { label: moment(new Date().setDate(new Date().getDate() - 5)).utc().format('DD/MM/YYYY'), y: dateCount[5] },
                            { label: moment(new Date().setDate(new Date().getDate() - 4)).utc().format('DD/MM/YYYY'), y: dateCount[4] },
                            { label: moment(new Date().setDate(new Date().getDate() - 3)).utc().format('DD/MM/YYYY'), y: dateCount[3] },
                            { label: moment(new Date().setDate(new Date().getDate() - 2)).utc().format('DD/MM/YYYY'), y: dateCount[2] },
                            { label: "Hôm qua", y: dateCount[1] },
                            { label: "Hôm nay", y: dateCount[0] }
                        ]
                    }
                ]
            };
            setOptionWeek(setting);

            var data1 = await Function.doanhThuTheoThang({ "startDay": startDay, "endDay": endDay });

            data1.data.map(item => {
                for (var i = 0; i < dateCountDoanhThu.length; i++) {
                    var a = moment(item.create_at).utc().format('MM')
                    var b = moment(item.create_at).utc().format('YYYY')
                    if (parseInt(a) - i === -1 && parseInt(b) - parseInt(moment(new Date()).utc().format('YYYY')) === 0) {
                        dateCountDoanhThu[i - 2] += item.tong_tien
                    }
                }
            });

            var setting1 = {
                animationEnabled: true,
                title: {
                    text: `Doanh thu năm ${new Date().getFullYear()}`
                },
                axisY: {
                    title: "",
                    suffix: " VNĐ"
                },
                data: [
                    {
                        type: "splineArea",
                        color: "#7380ec",
                        xValueFormatString: "Doanh số",
                        yValueFormatString: "#,##0.## vnđ",
                        showInLegend: true,
                        legendText: "Doanh thu tính theo tháng",
                        dataPoints: [
                            { x: 1, y: dateCountDoanhThu[0] },
                            { x: 2, y: dateCountDoanhThu[1] },
                            { x: 3, y: dateCountDoanhThu[2] },
                            { x: 4, y: dateCountDoanhThu[3] },
                            { x: 5, y: dateCountDoanhThu[4] },
                            { x: 6, y: dateCountDoanhThu[5] },
                            { x: 7, y: dateCountDoanhThu[6] },
                            { x: 8, y: dateCountDoanhThu[7] },
                            { x: 9, y: dateCountDoanhThu[8] },
                            { x: 10, y: dateCountDoanhThu[9] },
                            { x: 11, y: dateCountDoanhThu[10] },
                            { x: 12, y: dateCountDoanhThu[11] }
                        ]
                    }
                ]
            };
            setOptionDoanhThu(setting1);

            var data2 = await Function.khachHangTheoKhuVuc();
            var CountKH = [{ quan: "quận ba đình", nam: "", nu: "" }, { quan: "quận bắc từ liêm", nam: 0, nu: 0, tong: 0 }, { quan: "quận cầu giấy", nam: 0, nu: 0, tong: 0 }, { quan: "quận đống đa", nam: 0, nu: 0, tong: 0 }, { quan: "quận hoàn kiếm", nam: 0, nu: 0, tong: 0 }]
            data2.data.map(item => {
                DataAddress.quan.map((icon, index) => {
                    if ((item.que_quan.indexOf(icon.name)) >= 0) {
                        CountKH[index].tong += item.so_luong
                        if (item.gioi_tinh === "nam") {
                            CountKH[index].nam += parseInt(item.so_luong)
                        }
                        else {
                            CountKH[index].nu += parseInt(item.so_luong)
                        }
                    }
                })
            })
            setKhachHangTheoKhuVuc(CountKH)

            // var PK = await Function.getData({ "table": 'phongkham' });
            // setPhongKham(PK);
        }
        catch (error) {
            console.log(error)
        }
    }, []);

    const options = {
        title: {
            text: "Khách hàng theo quận"
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "top"
        },
        axisY: {
            suffix: "%"
        },
        data: [{
            type: "stackedBar100",
            color: "#ffbb55",
            name: "Women",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { label: `quận ba đình ${khachHangTheoKhuVuc[0].tong} người`, y: khachHangTheoKhuVuc[0].nu / khachHangTheoKhuVuc[0].tong * 100 },
                { label: `quận bắc từ liêm ${khachHangTheoKhuVuc[1].tong} người`, y: khachHangTheoKhuVuc[1].nu / khachHangTheoKhuVuc[1].tong * 100 },
                { label: `quận cầu giấy ${khachHangTheoKhuVuc[2].tong} người`, y: khachHangTheoKhuVuc[2].nu / khachHangTheoKhuVuc[2].tong * 100 },
                { label: `quận đống đa ${khachHangTheoKhuVuc[3].tong} người`, y: khachHangTheoKhuVuc[3].nu / khachHangTheoKhuVuc[3].tong * 100 },
                { label: `quận hoàn kiếm ${khachHangTheoKhuVuc[4].tong} người`, y: khachHangTheoKhuVuc[4].nu / khachHangTheoKhuVuc[4].tong * 100 },
            ]
        }, {
            type: "stackedBar100",
            color: "#111e88",
            name: "Men",
            showInLegend: true,
            indexLabel: "{y}",
            indexLabelFontColor: "white",
            yValueFormatString: "#,###'%'",
            dataPoints: [
                { label: `quận ba đình ${khachHangTheoKhuVuc[0].tong} người`, y: khachHangTheoKhuVuc[0].nam / khachHangTheoKhuVuc[0].tong * 100 },
                { label: `quận bắc từ liêm ${khachHangTheoKhuVuc[1].tong} người`, y: khachHangTheoKhuVuc[1].nam / khachHangTheoKhuVuc[1].tong * 100 },
                { label: `quận cầu giấy ${khachHangTheoKhuVuc[2].tong} người`, y: khachHangTheoKhuVuc[2].nam / khachHangTheoKhuVuc[2].tong * 100 },
                { label: `quận đống đa ${khachHangTheoKhuVuc[3].tong} người`, y: khachHangTheoKhuVuc[3].nam / khachHangTheoKhuVuc[3].tong * 100 },
                { label: `quận hoàn kiếm ${khachHangTheoKhuVuc[4].tong} người`, y: khachHangTheoKhuVuc[4].nam / khachHangTheoKhuVuc[4].tong * 100 },
            ]
        }]
    }

    return (
        <>
            <main1>
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
                                <h1>1,000,000,000</h1>
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
                    {optionWeek && <CanvasJSChart options={optionWeek} />}
                    <br />
                    <br />
                    {optionDoanhThu && <CanvasJSChart options={optionDoanhThu} />}
                    <br />
                    <br />
                    <CanvasJSChart options={options} />
                    <br />
                    <br />
                </div>
            </main1>
            <div className="right">
                {/* <div className="recent_updates">
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
                </div> */}
                <div className="sales_analytics">
                    <h2>Danh sách phòng khám</h2>
                    {
                        phongKham.map((item, index) => {
                            return (
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
                            )
                        })
                    }
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
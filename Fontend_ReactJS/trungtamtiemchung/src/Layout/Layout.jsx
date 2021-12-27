import React from 'react';
import './Layout.css'

function Layout() {
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <a href="">
                        <div className="title">Brand Name</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className='bx bx-user'></i>
                        <div className="title">Home</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className='bx bx-user'></i>
                        <div className="title">User</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className='bx bxl-product-hunt'></i>
                        <div className="title">Product</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className='bx bxs-store'></i>
                        <div className="title">Store</div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <i className='bx bx-cart-alt'></i>
                        <div className="title">Cart</div>
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Layout;
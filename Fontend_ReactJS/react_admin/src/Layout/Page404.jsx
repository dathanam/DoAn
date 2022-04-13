import React from 'react';
import '../CSS/Page404.css'

function page404() {
    return (
        <div className="page_404">
            <div className="row">
                <div className="col-12 page_404_col12">
                    <button className="btn_page_404">
                        <a className='a_page_404' href="/admin">Go to home</a>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default page404;
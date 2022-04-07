import React from 'react';

function MainTop(props) {
    return (
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
    );
}

export default MainTop;
import React, { memo } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastSuccess(props) {
    const toast_success = () => toast.success('Success', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return (
        <div className='toast'>
            {toast_success()}
            < ToastContainer />
        </ div>
    );
}

export default React.memo(ToastSuccess);
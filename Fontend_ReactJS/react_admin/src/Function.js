import api from './api'
export default {
    getData: async (data) => {
        const response = await api.getData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getAllData: async (data) => {
        const response = await api.getAllData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getTableFromID: async (data) => {
        const response = await api.getTableFromID(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getEmployeeFromToken: async () => {
        const response = await api.getEmployeeFromToken({ token: localStorage.getItem("accessToken") })
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getKHFromMKH: async (data) => {
        const response = await api.getKHFromMKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getKHFromSDT: async (data) => {
        const response = await api.getKHFromSDT(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getPhieuTiemFromMKH: async (data) => {
        const response = await api.getPhieuTiemFromMKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getPhieuTiemChuaThanhToanFromIdKH: async (data) => {
        const response = await api.getPhieuTiemChuaThanhToanFromIdKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getPhieuTiemChuaTiemFromIdKH: async (data) => {
        const response = await api.getPhieuTiemChuaTiemFromIdKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getPhieuTiemHoanThanhFromIdKH: async (data) => {
        const response = await api.getPhieuTiemHoanThanhFromIdKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getChiTietPhieuTiemFromPT: async (data) => {
        const response = await api.getChiTietPhieuTiemFromPT(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getTienSuBenhFromMaKH: async (data) => {
        const response = await api.getTienSuBenhFromMaKH(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    postData: async (data) => {
        const response = await api.postData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    editData: async (data) => {
        const response = await api.editData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    editTableNoSave: async (data) => {
        const response = await api.editTableNoSave(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    deleteData: async (data) => {
        const response = await api.deleteData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    detailData: async (data) => {
        const response = await api.detailData(Object.assign({ token: localStorage.getItem("accessToken") }, data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    changeText: (str) => {
        if (str === "") return
        else {
            str = str.toString();
            let words = str.split(" ").map(word => {
                return word[0].toUpperCase() + word.slice(1);
            })
            return words.join(" ");
        }
    },

    changeDate: (date) =>{
        const date1 = new Date(date)
        return date1.setTime(date1.getTime() + 7 * 60 * 60 * 1000);
    },
    
    changeDate1: (date) =>{
        const date1 = new Date(date)
        return date1.setTime(date1.getTime() + 7.5 * 60 * 60 * 1000);
    },

    khachHangTheoTuan: async (data) => {
        const response = await api.khachHangTheoTuan(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    doanhThuTheoThang: async (data) => {
        const response = await api.doanhThuTheoThang(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    khachHangTheoKhuVuc: async (data) => {
        const response = await api.khachHangTheoKhuVuc(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    khachHangThang: async (data) => {
        const response = await api.khachHangThang(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    validateInput: (sdt) => {
        const regexp = /^\d{10,11}$/;
        const checkingResult = regexp.exec(sdt);
        if (checkingResult !== null) {
            return {
                isInputValid: true,
                errorMessage: ''
            };
        } else {
            return {
                isInputValid: false,
                errorMessage: 'Số điện thoại phải có 10-11 chữ số.'
            };
        }
    }

}
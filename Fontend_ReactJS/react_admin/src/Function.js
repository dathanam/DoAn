import api from './api'
export default {
    getData: async (data) => {
        const response = await api.getData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getAllData: async (data) => {
        const response = await api.getAllData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getTableFromID: async (data) => {
        const response = await api.getTableFromID(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    getEmployeeFromToken: async () => {
        const response = await api.getEmployeeFromToken({token: localStorage.getItem("accessToken")})
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

    postData: async (data) => {
        const response = await api.postData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    editData: async (data) => {
        const response = await api.editData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    deleteData: async (data) => {
        const response = await api.deleteData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    detailData: async (data) => {
        const response = await api.detailData(Object.assign({token: localStorage.getItem("accessToken")},data))
        if (response && response.data) {
            return response;
        }
        return;
    },

    changeText: (str) => {
        str = str.toString();
        let words = str.split(" ").map(word => {
            return word[0].toUpperCase() + word.slice(1);
        })
        return words.join(" ");
    },

}
import api from './api'
export default {
    getData: async (data) => {
        const response = await api.getData(data)
        if (response && response.data) {
            return response.data;
        }
        return;
    },

    postData: async (data) => {
        const response = await api.postData(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    editData: async (data) => {
        const response = await api.editData(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    deleteData: async (data) => {
        const response = await api.deleteData(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    detailData: async (data) => {
        const response = await api.detailData(data)
        if (response && response.data) {
            return response;
        }
        return;
    },

    changeText: (str) => {
        var convertToArray = str.toLowerCase().split(' ');
        var result = convertToArray.map(function (val) {
            return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
        });

        return result.join(' ');
    },

}
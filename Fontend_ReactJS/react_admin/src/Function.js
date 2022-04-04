import api from './api'
export default{
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

}
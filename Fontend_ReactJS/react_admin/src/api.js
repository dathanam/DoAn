import { axios } from './HeaderApi'
export default{
    login: (data) => axios.post('/login', data),

    getData:(data) => axios.post('/getData', data),

    postData:(data) => axios.post('/addData', data),
}
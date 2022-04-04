import Axios from "axios";

export const axios = Axios.create({
    baseURL: "http://localhost:3333",
    //baseURL: "https://nws-management.herokuapp.com/",
    // headers: { Auth: "Simple AUTH" },
    timeout: 3000,
});
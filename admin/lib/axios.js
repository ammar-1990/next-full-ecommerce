import axios from "axios";

export const newAxios = axios.create({
    baseURL:'http://localhost:3000/api',
    withCredentials:true
})
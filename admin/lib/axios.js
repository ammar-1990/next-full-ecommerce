import axios from "axios";

export const newAxios = axios.create({
    baseURL:'https://next-full-ecommerce.vercel.app/api',
    withCredentials:true
})
import axios from "axios"

const INVOICES_API = import.meta.env.VITE_INVOICES_API
const authAPI = import.meta.env.VITE_USERS_API

const url1 = "http://localhost:3002/api/v1/auth"

export const postInvoice = async (data) => {
    const response = await axios.post(`${INVOICES_API}`, data);

    return response.data;
}

export const postUser = async (data) => {
    const response = await axios.post(`${authAPI}`, data);
    console.log(response);
    return response.data;
}

export const loginAPI = async (data) => {
    const response = await axios.post(`${authAPI}/login`, data, { withCredentials: true });

    console.log(response);

    return response.data;
}
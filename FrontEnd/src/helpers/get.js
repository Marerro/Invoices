import axios from "axios";

// WILL FIX IT LATER.
// const url = import.meta.env.INVOICES_API
const authAPI = import.meta.env.USERS_API

const url = "http://localhost:3002/api/v1/invoices";
const url2 = "http://localhost:3002/api/v1/invoices/all";
// Count of Invoices
export const countofInvoices = async () => {
    const response = await axios.get(url);

    return response.data;
}

export const allInvoices = async () => {
    const response = await axios.get(url2);

    return response.data;
}

export const logout = async () => {
    const response = await axios.get(`${authAPI}/logout`, { withCredentials: true });

    return response.data;
}



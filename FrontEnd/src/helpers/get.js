import axios from "axios";

const authAPI = import.meta.env.VITE_USERS_API
const INVOICES_API = import.meta.env.VITE_INVOICES_API;

// Count of Invoices
export const countofInvoices = async () => {
    const response = await axios.get(INVOICES_API);

    return response.data;
}

export const allInvoices = async () => {
    const response = await axios.get(`${INVOICES_API}/all`);

    return response.data;
}

export const logout = async () => {
    const response = await axios.get(`${authAPI}/logout`, { withCredentials: true });

    return response.data;
}



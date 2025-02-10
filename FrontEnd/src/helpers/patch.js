import axios from "axios"

const INVOICES_API = import.meta.env.VITE_INVOICES_API;

export const EditUser = async (id, data) => {

    const response = await axios.patch(`${INVOICES_API}/update/${id}`, data)
    return response.data;
}
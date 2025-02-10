import axios from "axios"

const INVOICES_API = import.meta.env.VITE_INVOICES_API;


export const deleteInvoice = async (id) => {
    const response = await axios.delete(`${INVOICES_API}/delete/${id}`);

    return response.data;
}
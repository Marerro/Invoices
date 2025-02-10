import axios from "axios"

const url = "http://localhost:3002/api/v1/invoices/delete";

export const deleteInvoice = async (id) => {
    const response = await axios.delete(`${url}/${id}`);

    return response.data;
}
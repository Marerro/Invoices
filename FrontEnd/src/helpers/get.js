import axios from "axios";

const url = "http://localhost:3002/api/v1/users";
const url2 = "http://localhost:3002/api/v1/users/all";
// Count of Invoices
export const countofInvoices = async () => {
    const response = await axios.get(url);

    return response.data;
}

export const allInvoices = async () => {
    const response = await axios.get(url2);

    return response.data;
}



import axios from "axios"

const url = "http://localhost:3002/api/v1/users";

const url1 = "http://localhost:3002/api/v1/auth"

export const postInvoice = async (data) => {
    const response = await axios.post(url, data);

    return response.data;
}

export const postUser = async (data) => {
    const response = await axios.post(url1, data);
    console.log(response);
    return response.data;
}
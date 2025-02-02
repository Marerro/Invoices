import axios from "axios"

const url = "http://localhost:3002/api/v1/users";

export const postInvoice = async (data) => {
    const response = await axios.post(url, data);

    console.log(response);

    return response.data;
}
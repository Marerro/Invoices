import axios from "axios"

const url = "http://localhost:3002/api/v1/users/update"
export const EditUser = async (id, data) => {

    const response = await axios.patch(`${url}/${id}`, data)
    return response.data;
}
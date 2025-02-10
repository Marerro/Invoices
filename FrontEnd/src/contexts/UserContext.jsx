import axios from "axios";
import { createContext, useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL;

export const UserContext = createContext(null); 

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${API_URL}/auth/me`, {
                    withCredentials: true
                });
                setUser(response.data.data);
                localStorage.setItem("user", JSON.stringify(response.data.data));
            } catch (error) {

                setUser(null);
                console.log(error.response.data.message);
            } finally {
                setLoading(false); 
            }
    };
    fetchUser();
  }, []);


    return (
        <UserContext.Provider value={{user, setUser, loading}}>
            {children}
        </UserContext.Provider>
    );
}
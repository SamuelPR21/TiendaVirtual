import axios from "axios";
import {API_USER} from  "../utils/constans"

export const login = async (username, email) => {
    try {
        const response = await axios.post(`${API_USER}/login`, {
        username,
        email,
        });
        
        console.log("Login", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }

}

export const profile =  async() => {
    try {
        const response = await axios.get(`${API_USER}/profile`, {
            withCredentials: true,
        });
        
        console.log("Profile", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
    }
}


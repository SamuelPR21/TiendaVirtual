import axios from "axios";
import {API_USER} from  "../utils/constans"

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_USER}/login`, {
        email,
        password
        },{
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }

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

export const register = async (userData) => {
    try {
      const response = await axios.post(
        `${API_USER}/register`,
        userData,
        {
          withCredentials: true, 
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("✅ Register:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error durante el register:", error.response || error);
      throw error.response || error;
    }
  };


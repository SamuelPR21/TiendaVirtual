import axios from "axios";
import { API_OFERTS } from "../utils/constans";


export const getAllOfferts = async () => {
    const { data } = await axios.get( `${API_OFERTS}/getOfferts` ,{
        withCredentials: true,
    });
    return data; 
}
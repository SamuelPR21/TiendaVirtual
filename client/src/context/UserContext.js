import React, {createContext, useState, useEffect, useContext} from "react";
import { profile, logout } from "../API/user";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);


export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await profile();
                setUser(data);
            } catch (error){
                setUser(null);
            }finally{
                setLoading (false)
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            if(!user?._id){
                console.warn("No user is currently logged in.");
                return;
            }
            await logout(user.id);
            setUser (null);
            console.log("User logged out successfully.");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, loading, handleLogout }}>
        {children}
      </UserContext.Provider>
    );
}


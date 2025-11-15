import { createContext,  useState, useEffect } from "react";
import {profile} from "../API/user"

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        profile()
        .then((data) => {
            setUser(data);
        })
        .catch((error) => {
            setUser(null);
        })
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
}


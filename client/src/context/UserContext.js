import React, { createContext, useState, useEffect, useContext } from "react";
import { profile, logout } from "../API/user";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAndPersistUser = (u) => {
    setUser(u);
    if (u) localStorage.setItem("user", JSON.stringify(u));
    else localStorage.removeItem("user");
  };

  const refreshProfile = async () => {
    try {
      const data = await profile();         // { user: {...} }
      setAndPersistUser(data?.user || null);
      return data?.user || null;
    } catch {
      setAndPersistUser(null);
      return null;
    }
  };

  useEffect(() => {
    const cached = localStorage.getItem("user");
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch { localStorage.removeItem("user"); }
    }
    (async () => {
      await refreshProfile();               // sincroniza con backend
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = async () => {
    try { await logout(user?.id); } catch (e) { /* no-op */ }
    finally { setAndPersistUser(null); }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setAndPersistUser, loading, handleLogout, refreshProfile }}>
      {children}
    </UserContext.Provider>
  );
}

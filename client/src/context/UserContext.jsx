import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);   // { userId, username } | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/me", { credentials: "include" })
      .then(response => (response.ok ? response.json() : null))
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await fetch("http://localhost:5000/logout", { method: "POST", credentials: "include" }).catch(()=>{});
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

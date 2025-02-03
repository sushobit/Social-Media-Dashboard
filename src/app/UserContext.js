import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUserName(storedUser); // Set username from localStorage on initial load
    }
  }, []);

  const login = (username) => {
    setUserName(username);
    localStorage.setItem("username", username);
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setUserName("");
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <UserContext.Provider value={{ userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

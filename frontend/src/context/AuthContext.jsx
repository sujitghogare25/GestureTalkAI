import React, { createContext, useState, useEffect } from "react";

// ✅ Create Auth Context
export const AuthContext = createContext();

// ✅ AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check for stored token on page refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Login Function
  const login = (token) => {
    localStorage.setItem("user", JSON.stringify(token));
    setUser(token);
  };

  // ✅ Logout Function
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export AuthProvider
export { AuthProvider };

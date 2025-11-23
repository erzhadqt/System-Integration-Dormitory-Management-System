import { createContext, useContext, useState } from "react";
import api from '../api'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  });

  const logout = async () => {
    // 1. Notify Backend (Optional but good for clean-up)
    try {
      const token = localStorage.getItem("access"); // Ensure you use the correct key name
      if (token) {
        await api.post("app/logout/", {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.warn("Logout endpoint error:", error);
      // We continue executing logout even if backend fails
    }

    // 2. Clear Local Storage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    // ... remove any other stored items like 'username', 'given_name'

    // 3. Reset State
    setUser(null);

    // 4. Redirect
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

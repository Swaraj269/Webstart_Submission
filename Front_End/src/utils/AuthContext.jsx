import { createContext, useContext, useEffect, useState } from "react";
import API from "./Axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (credentials) => {
    try {
      // Replace this with real backend login request
      // const res = await API.post("/auth/login", credentials);

      // Simulated response:
      const res = {
        data: {
          token: "mock-jwt-token",
          user: { name: "John", role: "user" },
        },
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

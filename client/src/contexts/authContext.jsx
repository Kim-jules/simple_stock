import { useContext, useState, createContext, useEffect } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (credentials) => {
    try {
      const res = await axios.post("/auth/register", credentials);
      return res.data;
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  };

  const login = async (credentials) => {
    try {
      await axios.post("/auth/login", credentials);
      const res = await getProfile(); // get user after login
      // setUser(res.data.user);
      return res?.user || null;
    } catch (error) {
      throw error.response?.data || { message: "Login failed." };
    }
  };

  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await axios.get("/auth/profile");
      setUser(res.data.user);
      return res.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

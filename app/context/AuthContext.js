"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null); // Initialize with null or initial user state

  // Example of login function
  const login = (userData) => {
    // Logic to authenticate user, e.g., API call
    setUser(userData); // Set authenticated user data
  };

  // Example of logout function
  const logout = () => {
    // Logic to clear user session, e.g., API call
    setUser(null); // Clear authenticated user data
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

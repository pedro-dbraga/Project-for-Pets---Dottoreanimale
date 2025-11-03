import React from "react";
import useAuth from "./hook/useAuth";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const { authenticated, loading, user, handleLogin, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ authenticated, loading, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

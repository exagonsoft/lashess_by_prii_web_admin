"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (t: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) setToken(saved);
  }, []);

  // Keep localStorage in sync
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthToken() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthToken must be used inside <AuthProvider>");
  }
  return ctx;
}

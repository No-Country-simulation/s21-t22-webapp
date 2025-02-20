import React, { createContext, useState, ReactNode } from "react";

// Define el tipo para el contexto
type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

// Crea el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define el proveedor de autenticación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

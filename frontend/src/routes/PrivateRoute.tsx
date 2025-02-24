import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../auth/stores/authStore";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = true;

  // IMPORTANTE:: ARREGLAR PROBLEMA CON RUTAS || "/viajes" es una ruta publica para todo usuario
  //const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar el contenido de la ruta
  return <Outlet />;
};

export default PrivateRoute;

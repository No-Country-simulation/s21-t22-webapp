import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ReactElement } from "react";
import Home from "../pages/Home";
import Travels from "../pages/Travels";
import Viajes from "../pages/Viajes";
import Profile from "../auth/components/Profile";
import PrivateRoute from "./PrivateRoute";
import Login from "../auth/components/Login";

type Route = {
  path: string;
  element: ReactElement;
  children?: Route[];
};

// Genera 50 asientos (NO BORRAR!!!)
const generateSeats = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    numero: index + 1,
    // Genera aleatoriamente si el asiento está ocupado o libre
    tipo: Math.random() > 0.3 ? "libre" : "ocupado",
  }));
};

// Genera 50 asientos (NO BORRAR!!)
const sampleSeats = generateSeats(50);

const browserRoutes = createBrowserRouter([
  // RUTAS PUBLICAS
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/travels/:origin/:destination/:date",
    element: <Travels />,
  },

  // RUTAS PRIVADAS  ( para ingresar a rutas privadas, en "/login" poner---> user:admin clave:1234)
  {
    path: "/profile",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/viajes",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <Viajes />,
      },
    ],
  },
] as Route[]);

const AppRouter: React.FC = () => {
  return <RouterProvider router={browserRoutes} />;
};

export default AppRouter;

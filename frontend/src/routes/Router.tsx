import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import { ReactElement } from "react";
import Home from "../pages/Home";
import Travels from "../pages/Travels";
import Viajes from "../pages/Viajes";
import Profile from "../auth/components/Profile";
import PrivateRoute from "./PrivateRoute";
import Login from "../auth/components/Login";
import TestPage from "../pages/TestPage";
import BusSeatSelector from "../components/BusSeatSelector";
import { Reserva } from "../pages/Reserva";

interface Seat {
  id: number;
  numero: number;
  tipo: "libre" | "ocupado";
}

// Genera 50 asientos (NO BORRAR!!!)
const generateSeats = (count: number): Seat[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    numero: index + 1,
    tipo: Math.random() > 0.3 ? "libre" : "ocupado",
  }));
};

// Genera 50 asientos (NO BORRAR!!)
const sampleSeats = generateSeats(50);

const browserRoutes: RouteObject[] = [
  // RUTAS PUBLICAS
  {
    path: "/",
    element: <Home />,
    index: true, // Asegúrate de que `index` sea `true` o `undefined`
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/travels/:origin/:destination/:date",
    element: <Travels />,
  },
  {
    path: "/testpage",
    element: <TestPage />,
  },
  {
    path: "/reserva",
    element: <Reserva seats={sampleSeats} quantity={2} />,
  },
  {
    path: "/viajes",
    element: <Viajes />,
  },

  // RUTAS PRIVADAS (para ingresar a rutas privadas, en "/login" poner ---> user:admin clave:1234)
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
];

const AppRouter: React.FC = () => {
  return <RouterProvider router={createBrowserRouter(browserRoutes)} />;
};

export default AppRouter;

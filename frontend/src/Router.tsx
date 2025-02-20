import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ReactElement } from "react";
import Prueba, { Anidada1, Anidada2 } from "./pages/Prueba";
// import BusSeatSelector from './components/BusSeatSelector';
import Home from './pages/Home';

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
  {
    path: "/",
    // element: <BusSeatSelector seats={sampleSeats} quantity={2} />,
    element: <Home />,
  },
  {
    path: "/prueba",
    element: <Prueba />,
    children: [
      {
        path: "anidada1",
        element: <Anidada1 />,
      },
      {
        path: "anidada2",
        element: <Anidada2 />,
      },
    ],
  },
] as Route[]);

const AppRouter: React.FC = () => {
  return (
    <AuthProvider>
      <RouterProvider router={browserRoutes} />
    </AuthProvider>
  );
};

export default AppRouter;

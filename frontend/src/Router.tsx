import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider";
import { ReactElement } from "react";
import Prueba, { Anidada1, Anidada2 } from "./pages/Prueba";
import App from "./App"; // Importa App.tsx

type Route = {
  path: string;
  element: ReactElement;
  children?: Route[];
};

const browserRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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

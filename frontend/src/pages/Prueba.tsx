import { Link, Outlet } from "react-router-dom";

export const Anidada1 = () => {
  return <div>Ruta anidada 1</div>;
};

export const Anidada2 = () => {
  return <div>Ruta anidada 2</div>;
};

const Prueba = () => {
  return (
    <div>
      Esta es una ruta de prueba
      <Link to="/">Volver al inicio</Link>
      <h2>Links de rutas anidadas de prueba</h2>
      <Link to="anidada1">Anidada 1</Link>
      <Link to="anidada2">Anidada 2</Link>
      <Outlet />
    </div>
  );
};

export default Prueba;

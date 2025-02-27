// src/services/route.service.js
import { findRouteByName, createRoute } from "../repositories/route.repository.js";
import { findStopsByIds } from "../repositories/stop.repository.js";
import { distance } from "../utils/graph/distance.graph.js";

export const addRouteService = async ({ routeName, stops }) => {
  // Validar que todas las paradas existen
  const stopObjects = await findStopsByIds(stops);
  
  if (stopObjects.length !== stops.length) {
    throw new Error("Una o más paradas no existen");
  }

  // Verificar si la ruta ya existe
  const existingRoute = await findRouteByName(routeName);
  if (existingRoute) {
    throw new Error("Ya existe una ruta con este nombre");
  }

  // Crear las conexiones entre las paradas
  const newConnections = [];

  for (let i = 0; i < stopObjects.length - 1; i++) {
    const stop1 = stopObjects[i];
    const stop2 = stopObjects[i + 1];

    // Calcular la distancia entre paradas consecutivas
    const dist = distance(
      stop1.location.lat,
      stop1.location.lng,
      stop2.location.lat,
      stop2.location.lng
    );

    newConnections.push({
      from: stop1._id,
      to: stop2._id,
      distance: dist,
    });
  }

  // Crear la nueva ruta con sus conexiones
  const newRoute = {
    name: routeName,
    connections: newConnections,
  };

  // Crear la ruta en la base de datos
  return await createRoute(newRoute);
};

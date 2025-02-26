import Route from "../models/route.model.js";
import Stop from "../models/stops.model.js";
import { dijkstra } from "../utils/graph/dijkstra.graph.js";
import { distance } from "../utils/graph/distance.graph.js";

export const addRoute = async (req, res) => {
  try {
    const { routeName, from, to } = req.body;
    // Validar si las paradas existen
    const stopFrom = await Stop.findById(from);
    const stopTo = await Stop.findById(to);
    if (!stopFrom || !stopTo) {
      return res.status(404).json({ error: "Una o ambas paradas no existen" });
    }

    // Buscar las rutas existentes
    const existingRoute = await Route.findOne({ name: routeName });
    if (existingRoute) {
      return res
        .status(400)
        .json({ error: "Ya existe una ruta con este nombre" });
    }

    // Calcular la distancia entre las paradas usando la fórmula de distancia
    const distanceValue = distance(
      stopFrom.location.lat,
      stopFrom.location.lng,
      stopTo.location.lat,
      stopTo.location.lng
    );

    // Crear nuevas conexiones para esta ruta
    const newConnections = [
      {
        from: stopFrom._id,
        to: stopTo._id,
        distance: distanceValue,
      },
    ];

    // Crear una nueva ruta
    const newRoute = new Route({
      name: routeName,
      connections: newConnections,
    });

    await newRoute.save();

    // Generar conexiones adicionales usando el algoritmo de Dijkstra
    const shortestPath = await dijkstra(newRoute._id, from, to);

    // Agregar las conexiones del camino más corto a la ruta
    if (shortestPath.ruta.length > 1) {
      for (let i = 0; i < shortestPath.ruta.length - 1; i++) {
        const stop1 = shortestPath.ruta[i];
        const stop2 = shortestPath.ruta[i + 1];
        const dist = distance(
          stop1.location.lat,
          stop1.location.lng,
          stop2.location.lat,
          stop2.location.lng
        );
        newRoute.connections.push({
          from: stop1._id,
          to: stop2._id,
          distance: dist,
        });
      }
    }

    await newRoute.save();

    res.status(201).json({
      message: "Ruta añadida correctamente",
      route: newRoute,
      shortestPath,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al añadir la ruta", details: error.message });
  }
};

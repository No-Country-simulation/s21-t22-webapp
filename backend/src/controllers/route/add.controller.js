import Route from "../models/route.model.js";
import Stop from "../models/stops.model.js";
import { distance } from "../utils/graph/distance.graph.js";

export const agregarRuta = async (req, res) => {
  try {
    const { routeName, stops } = req.body;

    if (!Array.isArray(stops) || stops.length < 2) {
      return res.status(400).json({
        error: "Se deben proporcionar al menos dos paradas para la ruta",
      });
    }

    // Validar que todas las paradas existen
    const stopObjects = await Stop.find({ _id: { $in: stops } });

    if (stopObjects.length !== stops.length) {
      return res.status(404).json({ error: "Una o más paradas no existen" });
    }

    // Verificar si la ruta ya existe
    const existingRoute = await Route.findOne({ name: routeName });
    if (existingRoute) {
      return res
        .status(400)
        .json({ error: "Ya existe una ruta con este nombre" });
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
    const newRoute = new Route({
      name: routeName,
      connections: newConnections,
    });

    await newRoute.save();

    res.status(201).json({
      message: "Ruta añadida correctamente",
      route: newRoute,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al añadir la ruta", details: error.message });
  }
};

//se debe pasar un array de ids de paradas y el nombre de la ruta

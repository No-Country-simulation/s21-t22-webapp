import Trip from "../../models/trip.model.js";
import Route from "../../models/route.model.js";
import {
  buildGraphFromConnections,
  canTravel,
} from "../../utils/graph/bfs.graph.js";

export const searchTrips = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        message: "Debes proporcionar las paradas de origen y destino",
      });
    }

    const fromStr = from.toString();
    const toStr = to.toString();

    // Obtener todas las rutas
    const allRoutes = await Route.find().populate(
      "connections.from connections.to"
    );

    // Filtrar las rutas donde from puede llegar a to
    const validRoutes = [];
    for (const route of allRoutes) {
      // Construir el grafo
      const graph = buildGraphFromConnections(route.connections);

      if (canTravel(graph, fromStr, toStr)) {
        validRoutes.push(route._id);
      }
    }

    if (validRoutes.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay rutas disponibles entre estas paradas" });
    }

    // Buscar viajes con esas rutas
    const trips = await Trip.find({
      route: { $in: validRoutes },
    })
      .populate("route")
      .populate("bus");

    if (trips.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay viajes disponibles para estas paradas" });
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error al buscar viajes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

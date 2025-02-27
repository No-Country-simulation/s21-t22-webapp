import Trip from "../../models/trip.model.js";
import Route from "../../models/route.model.js";

export const searchTrips = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res
        .status(400)
        .json({
          message: "Debes proporcionar las paradas de origen y destino",
        });
    }

    // Buscar rutas que contengan ambas paradas
    const routes = await Route.find({ stops: { $all: [from, to] } }).populate(
      "stops"
    );

    // Filtrar rutas donde "from" aparece antes que "to"
    const validRoutes = routes.filter((route) => {
      const fromIndex = route.stops.findIndex(
        (stop) => stop._id.toString() === from
      );
      const toIndex = route.stops.findIndex(
        (stop) => stop._id.toString() === to
      );
      return fromIndex !== -1 && toIndex !== -1 && fromIndex < toIndex;
    });

    if (validRoutes.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay rutas disponibles entre estas paradas" });
    }

    // Buscar viajes que usen estas rutas y tengan asientos disponibles
    const trips = await Trip.find({
      route: { $in: validRoutes.map((route) => route._id) },
    })
      .populate("route")
      .populate("bus");

    if (trips.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay viajes disponibles para esta ruta" });
    }

    res.status(200).json(trips);
  } catch (error) {
    console.error("Error al buscar viajes:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

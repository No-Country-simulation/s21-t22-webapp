import Trip from "../../models/trip.model.js";

export const getTrip = async (req, res) => {
  try {
    const { routeId } = req.params;
    const trips = await Trip.find({ route: routeId }).populate("bus route");

    if (!trips.length) {
      return res
        .status(404)
        .json({ error: "No hay viajes disponibles para esta ruta" });
    }

    res.json(trips);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los viajes", details: error.message });
  }
};

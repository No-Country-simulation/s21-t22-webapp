import Trip from "../../models/trip.model.js";
import Route from "../../models/route.model.js";
import Bus from "../../models/bus.model.js";

export const createTrip = async (req, res) => {
  try {
    const { routeId, busId, departureDate, arrivalDate, price } = req.body;

    // Verificar si la ruta existe
    const route = await Route.findById(routeId);
    if (!route) {
      return res.status(404).json({ error: "La ruta no existe" });
    }

    // Verificar si el bus existe
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "El bus no existe" });
    }

    // Crear el viaje
    const newTrip = new Trip({
      route: routeId,
      bus: busId,
      departureDate,
      arrivalDate,
      price,
    });

    await newTrip.save();

    res.status(201).json({
      message: "Viaje creado con éxito",
      trip: newTrip,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al crear el viaje", details: error.message });
  }
};

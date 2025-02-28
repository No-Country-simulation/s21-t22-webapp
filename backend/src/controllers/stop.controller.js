import stopService, { createStopService } from "../services/stop.service.js";
import Stop from "../models/stops.model.js"
import Trip from "../models/trip.model.js"

export const createStopController = async (req, res) => {
  try {
    const { name, lat, lng } = req.body;

    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: "Nombre, latitud y longitud son obligatorios" });
    }

    // Llamar al servicio para crear la parada
    const newStop = await createStopService({ name, lat, lng });

    res.status(201).json({ message: "Parada creada exitosamente", stop: newStop });
  } catch (error) {
    console.error("Error al crear la parada:", error);
    res.status(500).json({ message: "Error interno del servidor", details: error.message });
  }
};

export const findStopsByQuery = async (req, res) => {
  try {
    const { q } = req.query;
    const stops = await stopService.findStopsByQuery(q);
    return res.status(200).json({ stops });
  } catch (error) {
    console.error("Error al buscar paradas:", error.message);
    return res.status(400).json({ message: error.message });
  }
};

import { obtenerViajesService, obtenerViajePorIdService } from "../services/trip.service.js";

// Obtener todos los viajes
export const obtenerViajesController = async (req, res) => {
  try {
    const trips = await obtenerViajesService();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los viajes", details: error.message });
  }
};

// Obtener un viaje por ID
export const obtenerViajePorIdController = async (req, res) => {
  try {
    const trip = await obtenerViajePorIdService(req.params.tripId);
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el viaje", details: error.message });
  }
};

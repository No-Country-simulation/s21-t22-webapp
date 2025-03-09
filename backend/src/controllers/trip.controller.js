import {
  obtenerViajesService,
  obtenerViajePorIdService,
  createTripService, 
  getTripsByRouteIdService, 
  searchTripsService, 
  getTripsForDate,
  getAvailableSeatsService
} from "../services/trip.service.js";

export const getAvailableSeatsController = async (req, res) => {
  try {
    const { tripId, fromStopId, toStopId } = req.query;

    if (!tripId || !fromStopId || !toStopId) {
      return res.status(400).json({ message: "Faltan parámetros requeridos." });
    }

    // 🔹 Limpiar IDs (eliminar espacios y saltos de línea)
    const cleanTripId = tripId.trim();
    const cleanFromStopId = fromStopId.trim();
    const cleanToStopId = toStopId.trim();

    const availableSeats = await getAvailableSeatsService(cleanTripId, cleanFromStopId, cleanToStopId);

    res.json({ availableSeats });
  } catch (error) {
    console.error("Error en getAvailableSeatsController:", error);
    res.status(500).json({ message: "Error al obtener los asientos disponibles.", error: error.message });
  }
};




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

export const buscarViajePorFecha = async (req, res) => {
  try {
    const { id1, id2, fecha } = req.query;

    // Obtener los viajes mediante el servicio
    const trips = await getTripsForDate(id1, id2, fecha);

    return res.status(200).json(trips);
  } catch (error) {
    console.error("Error al buscar el viaje:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor", details: error.message });
  }
};

export const createTripController = async (req, res) => {
  try {
    const { routeId, busId, departureDate, arrivalDate, price } = req.body;

    // Llamar al servicio para crear el viaje
    const newTrip = await createTripService({
      routeId,
      busId,
      departureDate,
      arrivalDate,
      price,
    });

    res.status(201).json({
      message: "Viaje creado con éxito",
      trip: newTrip,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al crear el viaje",
      details: error.message,
    });
  }
};

export const getTripController = async (req, res) => {
  try {
    const { routeId } = req.params;

    // Llamar al servicio para obtener los viajes por ruta
    const trips = await getTripsByRouteIdService(routeId);

    if (!trips.length) {
      return res
        .status(404)
        .json({ error: "No hay viajes disponibles para esta ruta" });
    }

    res.json(trips);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los viajes",
      details: error.message,
    });
  }
};

export const searchTripsController = async (req, res) => {
  try {
    const { from, to } = req.query;

    // Llamar al servicio para buscar los viajes
    const trips = await searchTripsService({ from, to });

    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: "Error interno del servidor",
      details: error.message,
    });
  }
};



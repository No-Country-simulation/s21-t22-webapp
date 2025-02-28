// src/controllers/trip.controller.js
import { createTripService, getTripsByRouteIdService, searchTripsService } from "../services/trip.service.js";

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

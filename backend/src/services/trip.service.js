import { getAllTrips, getTripById } from "../repositories/trip.repository.js";

// Obtener todos los viajes
export const obtenerViajesService = async () => {
  try {
    return await getAllTrips();
  } catch (error) {
    throw new Error("Error al obtener los viajes: " + error.message);
  }
};

// Obtener un viaje por ID
export const obtenerViajePorIdService = async (tripId) => {
  try {
    const trip = await getTripById(tripId);
    if (!trip) {
      throw new Error("Viaje no encontrado");
    }
    return trip;
  } catch (error) {
    throw new Error("Error al obtener el viaje: " + error.message);
  }
};

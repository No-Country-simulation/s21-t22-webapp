import Trip from "../models/trip.model.js";

export const getAllTrips = async () => {
  try {
    return await Trip.find().populate("route seats.availability.stop");
  } catch (error) {
    throw new Error("Error al obtener los viajes: " + error.message);
  }
};

export const getTripById = async (tripId) => {
  try {
    return await Trip.findById(tripId).populate("route seats.availability.stop");
  } catch (error) {
    throw new Error("Error al buscar el viaje: " + error.message);
  }
};

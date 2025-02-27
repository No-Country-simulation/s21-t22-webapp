import Trip from "../models/trip.model.js";

export const findTripById = async (tripId) => {
  return await Trip.findById(tripId).populate("route seats.availability.stop");
};
export const createTrip = async (tripData) => {
  try {
    const newTrip = new Trip(tripData);
    await newTrip.save();
    return newTrip;
  } catch (error) {
    throw new Error("Error al crear el viaje: " + error.message);
  }
};

export const getTripsByRouteId = async (routeId) => {
  try {
    return await Trip.find({ route: routeId }).populate("bus route");
  } catch (error) {
    throw new Error("Error al obtener los viajes: " + error.message);
  }
};

export const getTripsByRoutes = async (validRoutes) => {
  try {
    return await Trip.find({
      route: { $in: validRoutes },
    }).populate("route").populate("bus");
  } catch (error) {
    throw new Error("Error al obtener los viajes: " + error.message);
  }
};
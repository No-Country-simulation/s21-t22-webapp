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

export const findTripsByDate = async (startDate, endDate) => {
  return await Trip.find({
    departureDate: { $gte: startDate, $lte: endDate }
  })
    .select("departureDate arrivalDate bus route")
    .populate({
      path: "route",
      select: "name connections",
      populate: {
        path: "connections.from connections.to",
        select: "name"
      }
    })
    .lean();
};
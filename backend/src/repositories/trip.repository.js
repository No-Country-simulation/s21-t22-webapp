import Reservation from "../models/reservation.model.js";
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

export const findTripById = async (tripId, session = null) => {
  try {
    return await Trip.findById(tripId).populate("route seats.availability.stop").session(session);
  } catch (error) {
    throw new Error("Error al obtener el viaje: " + error.message);
  }
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
    .select("departureDate arrivalDate bus route seatType duration")
    .populate({
      path: "route",
      select: "name connections",
      populate: {
        path: "connections.from connections.to",
        select: "name imgUrl"
      }
    })
    .populate({
      path: "bus",
      select: "company" // Selecciona los campos que necesites del bus
    })
    .lean();
};
// Obtener un viaje con asientos y paradas
export const getTripWithSeats = async (tripId) => {
  try {
    return await Trip.findById(tripId).populate("route seats.availability.stop");
  } catch (error) {
    throw new Error("Error al obtener el viaje con asientos: " + error.message);
  }
};

// Obtener los asientos reservados para un viaje y tramo
export const getReservedSeats = async (tripId, fromStopId, toStopId) => {
  try {
    const reservations = await Reservation.find({
      trip: tripId,
      from: fromStopId,
      to: toStopId,
    });

    return reservations.map(res => res.seatNumber);
  } catch (error) {
    throw new Error("Error al obtener los asientos reservados: " + error.message);
  }
};



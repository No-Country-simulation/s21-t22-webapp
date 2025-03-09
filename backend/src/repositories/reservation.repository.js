// src/repositories/reservation.repository.js
import Reservation from "../models/reservation.model.js";

// Función para crear una reserva
export const createReservation = async (reservationData, session = null) => {
  try {
    const reservation = await Reservation.create([reservationData], { session });
    return reservation[0];
  } catch (error) {
    throw new Error("Error al crear la reserva: " + error.message);
  }
};

// Función para obtener reservas por viaje
export const getReservationsByTrip = async (tripId, seatNumber, session = null) => {
  try {
    const query = { trip: tripId, seatNumber };
    return session
      ? await Reservation.find(query).session(session)
      : await Reservation.find(query);
  } catch (error) {
    throw new Error("Error al obtener las reservas para el viaje: " + error.message);
  }
};

// Función para buscar una reserva por ID (necesaria en el servicio de pagos)
export const findReservationById = async (reservationId) => {
  try {
    return await Reservation.findById(reservationId);
  } catch (error) {
    throw new Error("Error al buscar la reserva: " + error.message);
  }
};

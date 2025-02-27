// src/repositories/reservation.repository.js
import Reservation from "../models/reservation.model.js";

export const findReservationById = async (reservationId) => {
  try {
    return await Reservation.findById(reservationId);
  } catch (error) {
    throw new Error("Error al buscar la reserva: " + error.message);
  }
};

export const createReservation = async (reservationData) => {
  try {
    const reservation = await Reservation.create(reservationData);
    return reservation;
  } catch (error) {
    throw new Error("Error al crear la reserva: " + error.message);
  }
};

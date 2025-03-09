// src/services/reservation.service.js
import mongoose from "mongoose";
import { findTripById } from "../repositories/trip.repository.js";
import { getReservationsByTrip, createReservation } from "../repositories/reservation.repository.js";

// Obtener asientos disponibles para un viaje
export const obtenerAsientosLibresService = async (tripId) => {
  try {
    const trip = await findTripById(tripId);
    if (!trip) throw new Error("Viaje no encontrado");

    const asientosLibres = trip.seats.filter((seat) =>
      seat.availability.some((avail) => avail.isAvailable)
    );

    return asientosLibres;
  } catch (error) {
    throw new Error("Error al obtener los asientos libres: " + error.message);
  }
};

export const reservarAsientoService = async ({ tripId, userId, seatNumber, from, to }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Convertir tripId a ObjectId
    const objectIdTripId = new mongoose.Types.ObjectId(tripId);

    // Buscar reservas previas en el mismo viaje y asiento
    const existingReservations = await getReservationsByTrip(objectIdTripId, seatNumber, session);

    // Verificar si el asiento está ocupado en el rango de paradas
    const isSeatTaken = existingReservations.some(reservation => {
      return (
        (from >= reservation.from && from < reservation.to) ||
        (to > reservation.from && to <= reservation.to) ||
        (from <= reservation.from && to >= reservation.to)
      );
    });

    if (isSeatTaken) {
      throw new Error("El asiento ya está reservado en el rango de paradas seleccionado");
    }

    // Crear la reserva
    const reservationData = {
      trip: objectIdTripId,
      user: userId,
      seatNumber,
      from,
      to,
      price: 100, // Puede ser calculado dinámicamente
    };

    const reservation = await createReservation(reservationData, session);

    await session.commitTransaction();
    session.endSession();

    return { reservation, precioFinal: reservationData.price };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error en el servicio de reserva: " + error.message);
  }
};

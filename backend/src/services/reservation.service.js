// src/services/reservation.service.js
import mongoose from "mongoose";
import { createReservation } from "../repositories/reservation.repository.js";
import { findTripById } from "../repositories/trip.repository.js";
import { findStopById } from "../repositories/stop.repository.js";

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

// Reservar un asiento
export const reservarAsientoService = async ({ tripId, userId, seatNumber, from, to }) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Validar paradas
    const stopFrom = await findStopById(from, session);
    const stopTo = await findStopById(to, session);
    if (!stopFrom || !stopTo) throw new Error("Una o ambas paradas no existen");

    // Obtener el viaje
    const trip = await findTripById(tripId, session);
    if (!trip) throw new Error("Viaje no encontrado");

    // Buscar el asiento
    const seat = trip.seats.find((s) => s.seatNumber === seatNumber);
    if (!seat) throw new Error("Asiento no encontrado");

    // Verificar disponibilidad del asiento
    const isAvailable = seat.availability.every((avail) => avail.isAvailable);
    if (!isAvailable) throw new Error("El asiento no está disponible");

    // Marcar el asiento como no disponible
    seat.availability.forEach((avail) => {
      avail.isAvailable = false;
    });

    // Guardar el viaje actualizado
    await trip.save({ session });

    // Crear la reserva
    const reservationData = {
      trip: tripId,
      user: userId,
      seatNumber,
      from,
      to,
      price: 100, // Precio fijo o calculado de otra manera
    };

    const reservation = await createReservation(reservationData, session);

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    return { reservation, precioFinal: reservationData.price };
  } catch (error) {
    // Revertir la transacción en caso de error
    await session.abortTransaction();
    session.endSession();
    throw new Error("Error en el servicio de reserva: " + error.message);
  }
};
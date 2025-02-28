import Trip from "../models/trip.model.js";
import Stop from "../models/stops.model.js";
import { createReservation } from "../repositories/reservation.repository.js";

// Lógica para reservar un asiento
export const reservarAsientoService = async ({ tripId, userId, seatNumber, from, to }) => {
  // Buscar el viaje
  const trip = await Trip.findById(tripId).populate("seats.availability.stop");
  if (!trip) {
    throw new Error("Viaje no encontrado");
  }

  console.log("Viaje encontrado:", trip);
  console.log("Asientos del viaje:", trip.seats);
  const seat = trip.seats.find((s) => s.seatNumber === seatNumber);
  console.log("Asiento encontrado:", seat);
  if (!seat) {
    throw new Error("Asiento no encontrado");
  }

  // Verificar la disponibilidad en las paradas 'from' y 'to'
  const availabilityFrom = seat.availability.find(
    (a) => a.stop._id.toString() === from
  );
  const availabilityTo = seat.availability.find(
    (a) => a.stop._id.toString() === to
  );

  if (!availabilityFrom || !availabilityTo) {
    throw new Error("Las paradas no están disponibles para este asiento");
  }

  if (!availabilityFrom.isAvailable || !availabilityTo.isAvailable) {
    throw new Error("El asiento no está disponible en las paradas seleccionadas");
  }

  // Si todo está bien, reservamos el asiento: actualizamos la disponibilidad
  availabilityFrom.isAvailable = false; // El asiento ya no está disponible en la parada de origen
  availabilityTo.isAvailable = false; // El asiento ya no está disponible en la parada de destino

  // Guardamos los cambios en el viaje
  await trip.save();

  // Calcular el precio de la reserva (puedes ajustar este cálculo según tus necesidades)
  const precioBase = 100; // Este es un valor de ejemplo, usa lo que sea relevante para tu sistema
  const precioFinal = precioBase;

  // Crear la reserva
  const reservationData = {
    trip: tripId,
    user: userId,
    seatNumber,
    from,
    to,
    price: precioFinal,
  };

  const reservation = await createReservation(reservationData);

  return { reservation, precioFinal };
};





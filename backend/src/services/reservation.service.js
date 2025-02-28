// src/services/reservation.service.js
import Trip from "../../models/trip.model.js";
import Stop from "../../models/stops.model.js";
import { dijkstra } from "../../utils/graph/dijkstra.graph.js";
import { createReservation } from "../repositories/reservation.repository.js";

// Lógica para reservar un asiento
export const reservarAsientoService = async ({ tripId, userId, seatNumber, from, to }) => {
  // Valida si las paradas existen
  const stopFrom = await Stop.findById(from);
  const stopTo = await Stop.findById(to);
  if (!stopFrom || !stopTo) {
    throw new Error("Una o ambas paradas no existen");
  }

  // Buscar el viaje
  const trip = await Trip.findById(tripId).populate("route seats.availability.stop");
  if (!trip) {
    throw new Error("Viaje no encontrado");
  }

  // Calcular ruta
  const resultadoRuta = await dijkstra(trip.route._id, from, to);
  if (!resultadoRuta || resultadoRuta.ruta.length === 0) {
    throw new Error("No se pudo calcular la ruta");
  }

  // Encontrar el asiento
  const seat = trip.seats.find((s) => s.seatNumber === seatNumber);
  if (!seat) {
    throw new Error("Asiento no encontrado");
  }

  // Verifica la disponibilidad del asiento en cada tramo del recorrido
  let disponible = true;
  for (let i = 0; i < resultadoRuta.ruta.length - 1; i++) {
    const tramo = resultadoRuta.ruta[i];
    const index = seat.availability.findIndex(
      (avail) => avail.stop.toString() === tramo
    );
    if (index === -1 || !seat.availability[index].isAvailable) {
      disponible = false;
      break;
    }
  }

  if (!disponible) {
    throw new Error("El asiento no está disponible en todo el tramo");
  }

  // Calcular el precio basado en la distancia
  const precioBasePorKm = 10;
  const precioFinal = resultadoRuta.distanciaTotal * precioBasePorKm;

  // Marcar el asiento como ocupado
  for (let i = 0; i < resultadoRuta.ruta.length - 1; i++) {
    const tramo = resultadoRuta.ruta[i];
    const index = seat.availability.findIndex(
      (avail) => avail.stop.toString() === tramo
    );
    if (index !== -1) seat.availability[index].isAvailable = false;
  }

  // Guardar los cambios en el viaje
  await trip.save();

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

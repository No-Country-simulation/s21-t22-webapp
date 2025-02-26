import Trip from "../models/trip.model.js";
import Reservation from "../models/reservation.model.js";
import { dijkstra } from "../utils/graph/dijkstra.graph.js";
import Stop from "../models/stops.model.js";

export const reservarAsiento = async (req, res) => {
  try {
    const { tripId, userId, seatNumber, from, to } = req.body;

    // Valida si las paradas existen
    const stopFrom = await Stop.findById(from);
    const stopTo = await Stop.findById(to);
    if (!stopFrom || !stopTo) {
      return res.status(404).json({ error: "Una o ambas paradas no existen" });
    }

    // Buscar el viaje
    const trip = await Trip.findById(tripId).populate(
      "route seats.availability.stop"
    );
    if (!trip) return res.status(404).json({ error: "Viaje no encontrado" });

    const resultadoRuta = await dijkstra(trip.route._id, from, to);
    if (!resultadoRuta || resultadoRuta.ruta.length === 0) {
      return res.status(400).json({ error: "No se pudo calcular la ruta" });
    }

    // Encontrar el asiento
    const seat = trip.seats.find((s) => s.seatNumber === seatNumber);
    if (!seat) return res.status(404).json({ error: "Asiento no encontrado" });

    // Verifica disponibilidad en cada tramo del recorrido
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
      return res
        .status(400)
        .json({ error: "El asiento no está disponible en todo el tramo" });
    }

    // Calcular el precio basado en la distancia sin aplicar descuentos
    const precioBasePorKm = 10;
    const precioFinal = resultadoRuta.distanciaTotal * precioBasePorKm;

    // Marcar el asiento como ocupado en los tramos seleccionados
    for (let i = 0; i < resultadoRuta.ruta.length - 1; i++) {
      const tramo = resultadoRuta.ruta[i];
      const index = seat.availability.findIndex(
        (avail) => avail.stop.toString() === tramo
      );
      if (index !== -1) seat.availability[index].isAvailable = false;
    }

    // Guardar los cambios en el viaje
    await trip.save();

    const reservation = await Reservation.create({
      trip: tripId,
      user: userId,
      seatNumber,
      from,
      to,
      price: precioFinal,
    });

    res.status(201).json({
      message: "Reserva realizada con éxito",
      reserva: reservation,
      precioTotal: precioFinal,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al procesar la reserva", details: error.message });
  }
};

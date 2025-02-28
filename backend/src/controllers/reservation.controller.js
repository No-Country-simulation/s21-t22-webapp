// src/controllers/reservation.controller.js
import Trip from "../models/trip.model.js";
import { reservarAsientoService } from "../services/reservation.service.js";

export const obtenerAsientosDisponibles = async (req, res) => {
  try {
    const { tripId } = req.params;

    // Buscar el viaje por ID
    const trip = await Trip.findById(tripId).populate("seats.availability.stop");

    if (!trip) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    // Preparar la información de los asientos disponibles y ocupados
    const asientos = trip.seats.map((seat) => {
      const asientosDisponibles = seat.availability.filter((avail) => avail.isAvailable);
      return {
        seatNumber: seat.seatNumber,
        asientosDisponibles: asientosDisponibles,
        ocupados: seat.availability.length - asientosDisponibles.length,
      };
    });

    res.status(200).json({
      message: "Asientos obtenidos con éxito",
      asientos,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los asientos",
      details: error.message,
    });
  }
};

export const reservarAsientoController = async (req, res) => {
  try {
    const { tripId, userId, seatNumber, from, to } = req.body;

    console.log("Datos de la reserva recibidos:", { tripId, userId, seatNumber, from, to });

    // Llamamos al servicio para realizar la reserva
    const { reservation, precioFinal } = await reservarAsientoService({
      tripId,
      userId,
      seatNumber,
      from,
      to,
    });

    res.status(201).json({
      message: "Reserva realizada con éxito",
      reserva: reservation,
      precioTotal: precioFinal,
    });
  } catch (error) {
    console.error("Error al procesar la reserva:", error);
    res.status(500).json({
      error: "Error al procesar la reserva",
      details: error.message,
    });
  }
};


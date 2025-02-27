// src/controllers/reservation.controller.js
import { reservarAsientoService } from "../services/reservation.service.js";

export const reservarAsientoController = async (req, res) => {
  try {
    const { tripId, userId, seatNumber, from, to } = req.body;

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
    res.status(500).json({
      error: "Error al procesar la reserva",
      details: error.message,
    });
  }
};

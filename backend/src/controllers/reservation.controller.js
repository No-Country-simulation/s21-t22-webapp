import { obtenerAsientosLibresService, reservarAsientoService } from "../services/reservation.service.js";

// Obtener asientos libres
export const obtenerAsientosLibresController = async (req, res) => {
  try {
    const asientosLibres = await obtenerAsientosLibresService(req.params.tripId);
    res.status(200).json(asientosLibres);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los asientos libres", details: error.message });
  }
};

// Reservar un asiento
export const reservarAsientoController = async (req, res) => {
  try {
    const { tripId, userId, seatNumber, from, to } = req.body;

    // Validar campos obligatorios
    if (!tripId || !userId || !seatNumber || !from || !to) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Validar tipos de datos
    if (typeof seatNumber !== "number") {
      return res.status(400).json({ error: "El número de asiento debe ser un número" });
    }

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
    res.status(500).json({ error: "Error al procesar la reserva", details: error.message });
  }
};
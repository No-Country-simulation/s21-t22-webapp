// src/controllers/payment.controller.js
import { processPaymentService } from "../services/payment.service.js";

export const processPayment   = async (req, res) => {
  try {
    const { reservationId, paymentMethod, amount } = req.body;

    // Llamamos al servicio para procesar el pago
    const payment = await processPaymentService(reservationId, paymentMethod, amount);

    res.status(201).json({
      message: "Pago procesado con éxito",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al procesar el pago",
      details: error.message,
    });
  }
};

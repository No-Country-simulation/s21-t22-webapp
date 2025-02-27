// src/services/payment.service.js
import { findReservationById } from "../repositories/reservation.repository.js";
import { createPayment } from "../repositories/payment.repository.js";

export const processPaymentService = async (reservationId, paymentMethod, amount) => {
  const reservation = await findReservationById(reservationId);
  if (!reservation) {
    throw new Error("Reserva no encontrada");
  }

  if (amount !== reservation.price) {
    throw new Error("Monto incorrecto para la reserva");
  }

  const paymentData = {
    reservation: reservationId,
    user: reservation.user,
    amount,
    paymentMethod,
    status: "completed",
  };

  return await createPayment(paymentData);
};

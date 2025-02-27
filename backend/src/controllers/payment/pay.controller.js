import Payment from "../../models/payment.model.js";
import Reservation from "../../models/reservation.model.js";

export const processPayment = async (req, res) => {
  try {
    const { reservationId, paymentMethod, amount } = req.body;

    // Verificar si la reserva existe
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Verificar que el monto coincide con el precio de la reserva
    if (amount !== reservation.price) {
      return res
        .status(400)
        .json({ message: "Monto incorrecto para la reserva" });
    }

    // Crear el pago
    const payment = new Payment({
      reservation: reservationId,
      user: reservation.user,
      amount,
      paymentMethod,
      status: "completed",
    });

    await payment.save();

    res.status(201).json({ message: "Pago registrado exitosamente", payment });
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

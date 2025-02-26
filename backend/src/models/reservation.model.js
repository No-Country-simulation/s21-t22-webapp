import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    seatNumber: { type: Number, required: true }, // Número de asiento asignado
    from: { type: mongoose.Schema.Types.ObjectId, ref: "Stop", required: true }, // Parada de origen
    to: { type: mongoose.Schema.Types.ObjectId, ref: "Stop", required: true }, // Parada de destino
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);

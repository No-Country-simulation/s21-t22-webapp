import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: String, required: true }, // Parada de origen
    to: { type: String, required: true }, // Parada de destino
    seatNumber: { type: Number, required: true }, // Número de asiento
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);

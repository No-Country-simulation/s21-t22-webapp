import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema(
  {
    trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    from: { type: String, required: [true, "Origin is require"] }, // Parada de origen
    to: { type: String, required: [true, "Destination is require"] }, // Parada de destino
    seatNumber: { type: Number, required: [true, "Seat number is require"] }, // Número de asiento
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", ReservationSchema);

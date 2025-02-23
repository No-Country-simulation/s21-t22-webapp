import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    departureDate: { type: Date, required: true }, // Fecha de salida
    arrivalDate: { type: Date, required: true }, // Fecha de llegada
    availableSeats: { type: Number, required: true }, // Asientos disponibles
  },
  { timestamps: true }
);

export default mongoose.model("Trip", TripSchema);

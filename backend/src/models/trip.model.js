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
    seats: [
      {
        seatNumber: Number,
        availability: [
          {
            stop: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
            isAvailable: Boolean,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Trip", TripSchema);

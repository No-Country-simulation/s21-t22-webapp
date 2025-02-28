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
        seatNumber: { type: Number, required: true },
        availability: [
          {
            stop: { type: mongoose.Schema.Types.ObjectId, ref: "Stop" },
            isAvailable: { type: Boolean, default: true }, // isAvailable agregado
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Agregar índices
TripSchema.index({ bus: 1 }); // Índice en el campo "bus"
TripSchema.index({ route: 1 }); // Índice en el campo "route"
TripSchema.index({ "seats.seatNumber": 1 }); // Índice en el campo "seats.seatNumber"

export default mongoose.model("Trip", TripSchema);
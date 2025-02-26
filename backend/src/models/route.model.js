import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Ejemplo: "Buenos Aires - La Plata"
    stops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stop", // Referencia a las paradas
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Route", RouteSchema);

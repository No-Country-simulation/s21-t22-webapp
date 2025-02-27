import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Ejemplo: "Ruta Buenos Aires - Mendoza"
    connections: [
      {
        from: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stop",
          required: true,
        }, // Parada de origen
        to: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Stop",
          required: true,
        }, // Parada de destino
        distance: { type: Number, required: true }, // Distancia entre ambas paradas en km
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Route", RouteSchema);

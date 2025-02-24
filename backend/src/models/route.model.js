import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Route's name is require"] }, // Nombre de la ruta (Ej: "CDMX - Guadalajara")
    stops: [
      {
        name: String, // Nombre de la parada (Ej: "León")
        location: { lat: Number, lng: Number }, // Coordenadas para Google Maps
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Route", RouteSchema);

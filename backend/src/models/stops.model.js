import mongoose from "mongoose";

const StopSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, // Nombre de la parada (Ejemplo: Buenos Aires)
    location: {
      lat: { type: Number, required: true }, //Latitud
      lng: { type: Number, required: true }, //Longitud
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stop", StopSchema);

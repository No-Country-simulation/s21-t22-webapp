import mongoose from "mongoose";

const BusSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true, unique: true }, // Placa del bus
    capacity: { type: Number, required: true }, // Número total de asientos
    company: { type: String, required: true }
  },
  { timestamps: true },
);

export default mongoose.model("Bus", BusSchema);

import mongoose from "mongoose";

const BusSchema = new mongoose.Schema(
  {
    plate: {
      type: String,
      required: true,
      unique: [true, "The plate is require"],
    }, // Placa del bus
    capacity: { type: Number, required: true }, // Número total de asientos
  },
  { timestamps: true }
);

export default mongoose.model("Bus", BusSchema);

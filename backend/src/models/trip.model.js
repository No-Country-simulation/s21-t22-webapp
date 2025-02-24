import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    origin_id: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true },
    bus_id: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    departureDate: { type: Date, required: true },
    arrivalDate: { type: Date, required: true },
    price: {type: mongoose.Schema.Types.Decimal128, required: true},
    miles_reward: { type: Number, required: true, default: 0},
    featured: { type: Boolean, required: true, default: false}
  },
  { timestamps: true }
);

export default mongoose.model("Trip", TripSchema);

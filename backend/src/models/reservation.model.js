import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  trip: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seatNumber: { type: Number, required: true },
  from: { type: mongoose.Schema.Types.ObjectId, ref: "Stop", required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: "Stop", required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reservation", ReservationSchema);

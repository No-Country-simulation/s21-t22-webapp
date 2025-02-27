import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema(
  {
    minKm: { type: Number, required: true },
    maxKm: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Discount", DiscountSchema);

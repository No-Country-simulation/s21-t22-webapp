import mongoose from "mongoose";

export const discountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    miles_required: { type: Number, required: true },
    discount_type: { type: String, enum: ['PERCENTAGE', 'FIXED_AMOUNT'], required: true },
    value: { type: mongoose.Schema.Types.Decimal128, required: true },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'DISABLED'], required: true }
}, { timestamps: true });

export const Discount = mongoose.model('Discount', discountSchema);
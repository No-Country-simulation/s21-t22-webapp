import mongoose from 'mongoose';

export const userDiscountSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    discount: { type: mongoose.Types.ObjectId, ref: 'Discount', required: true },
    redeemed_at: { type: Date, required: true },
    used_at: { type: Date }
}, { timestamps: true });

export const UserDiscount = mongoose.model('UserDiscount', userDiscountSchema);
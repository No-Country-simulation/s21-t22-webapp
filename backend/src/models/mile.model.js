import mongoose from "mongoose";

export const mileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    trip_id: { type: mongoose.Types.ObjectId, ref: 'Trip', required: true },
    miles_earned: { type: Number, required: true },
    earned_at: { type: Date, default: Date.now }
}, { timestamps: true });

export const Mile = mongoose.model('Mile', mileSchema);
import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    trip_id: { type: mongoose.Types.ObjectId, ref: 'Trip', required: true },
    boarding_stop_id: {type: mongoose.Types.ObjectId, ref: 'TripStop', required: true},
    alighting_stop_id: {type: mongoose.Types.ObjectId, ref: 'TripStop', required: true},
    seat_number: { type: Number, required: true },
    purchase_date: { type: Date, default: Date.now },
    status: { type: String, enum: ['ACTIVE', 'CANCELLED']},
}, { timestamps: true })

export const Ticket = mongoose.model('Ticket', ticketSchema)
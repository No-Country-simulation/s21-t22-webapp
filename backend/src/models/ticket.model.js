import mongoose from "mongoose";

export const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    trip: { type: mongoose.Types.ObjectId, ref: 'Trip', required: true },
    seat_number: { type: Number, required: true },
    purchase_date: { type: Date, default: Date.now }
}, { timestamps: true })

export const Ticket = mongoose.model('Ticket', ticketSchema)
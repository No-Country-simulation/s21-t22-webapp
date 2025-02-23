import mongoose from 'mongoose';

export const seatSchema = new mongoose.Schema({
    trip: { type: mongoose.Types.ObjectId, ref: 'Trip', required: true },
    ticket: { type: mongoose.Types.ObjectId, ref: 'Ticket' },
    number: { type: Number, required: true },
    status: { type: String, enum: ['AVAILABLE', 'RESERVED', 'OCCUPIED'], required: true }
}, { timestamps: true });

export const Seat = mongoose.model('Seat', seatSchema);
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    ticket: { type: mongoose.Types.ObjectId, ref: 'Ticket', required: true },
    amount: { type: mongoose.Schema.Types.Decimal128, required: true },
    payment_method: { type: String, enum: ['MERCADO_PAGO'], required: true },
    payment_date: { type: Date, default: Date.now }
}, { timestamps: true })

export const Payment = mongoose.model('Payment', paymentSchema);
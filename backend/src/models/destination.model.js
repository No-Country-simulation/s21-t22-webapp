import mongoose from 'mongoose';

export const destinationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    city: { type: String, required: true },
    code: { type: String, unique: true, required: true }
}, { timestamps: true });

export default mongoose.model('Destination', destinationSchema);
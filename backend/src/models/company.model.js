import mongoose from 'mongoose';

export const companySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    logo_url: { type: String }
}, { timestamps: true })

export const Company = mongoose.model('Company', companySchema);
import mongoose from "mongoose";

export const TripStopSchema = new mongoose.Schema({
    trip_id: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true},
    destination_id: { type: mongoose.Schema.Types.ObjectId, ref: "Destination", required: true},
    stop_order: { type: Number, required: true},
    arrival_time: { type: Date },
    departure_time: { type: Date },
    }, {timestamp: true}
);

export default mongoose.model('TripStop', TripStopSchema)
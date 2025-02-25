import TripStop from "../models/tripStop.model.js";

const createTripStop = async (data) => {
    return await TripStop.create(data);
}

const getTripStops = async () => {
    return await TripStop.find().populate(["trip_id", "destination_id"]);
}

export default { createTripStop, getTripStops };
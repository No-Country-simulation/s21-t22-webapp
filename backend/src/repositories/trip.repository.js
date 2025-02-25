import Trip from "../models/trip.model.js";

const createTrip = async (data) => {
    return await Trip.create(data);
}

const getTrips = async () => {
    return await Trip.find().populate(["origin_id", "destination_id", "bus_id"]);
}

export default { createTrip, getTrips };
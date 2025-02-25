import Destination from "../models/destination.model.js";

const createDestination = async (data) => {
    return await Destination.create(data);
}

const getDestinations = async () => {
    return await Destination.find()
}

export default { createDestination, getDestinations };
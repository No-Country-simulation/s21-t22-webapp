import tripRepository from "../repositories/trip.repository.js"

const createTrip = async (data) => {
    return await tripRepository.createTrip(data)
}

const getTrips = async () => {
    return await tripRepository.getTrips()
}

export default { createTrip, getTrips };
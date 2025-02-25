import tripStopRepository from "../repositories/tripStop.repository.js"

const createTripStop = async (data) => {
    return await tripStopRepository.createTripStop(data)
}

const getTripStops = async () => {
    return await tripStopRepository.getTripStops()
}

export default { createTripStop, getTripStops };
import destinationRepository from "../repositories/destination.repository.js"

const createDestination = async (data) => {
    return await destinationRepository.createDestination(data)
}

const getDestinations = async () => {
    return await destinationRepository.getDestinations()
}

export default { createDestination, getDestinations };
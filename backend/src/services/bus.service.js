import busRepository from "../repositories/bus.repository.js"

const createBus = async (data) => {
    return await busRepository.createBus(data)
}

const getBuses = async () => {
    return await busRepository.getBuses()
}

export default { createBus, getBuses };
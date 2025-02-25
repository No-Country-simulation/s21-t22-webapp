import busService from "../services/bus.service.js"

export const createBus = async (req, res) => {
    try {
        const bus = await busService.createBus(req.body);
        return res.status(201).json(bus)
    } catch(e) {
        console.log(e)
    }
}

export const getBuses = async (req, res) => {
    const buses = await busService.getBuses();
    return res.status(200).json(buses)
}
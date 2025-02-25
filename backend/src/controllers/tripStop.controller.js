import tripStopService from "../services/tripStop.service.js"

export const createTripStop = async (req, res) => {
    try {
        const tripStop = await tripStopService.createTripStop(req.body);
        return res.status(201).json(tripStop)
    } catch(e) {
        console.log(e)
    }
}

export const getTripStops = async (req, res) => {
    const tripStops = await tripStopService.getTripStops();
    return res.status(200).json(tripStops)
}
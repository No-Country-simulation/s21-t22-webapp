import tripService from "../services/trip.service.js"

export const createTrip = async (req, res) => {
    try {
        const trip = await tripService.createTrip(req.body);
        return res.status(201).json(trip)
    } catch(e) {
        console.log(e)
    }
}

export const getTrips = async (req, res) => {
    const trips = await tripService.getTrips();
    return res.status(200).json(trips)
}
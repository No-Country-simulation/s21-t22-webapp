import destinationService from "../services/destination.service.js"

export const createDestination = async (req, res) => {
    try {
        const destination = await destinationService.createDestination(req.body);
        return res.status(201).json(destination)
    } catch(e) {
        console.log(e)
    }
}

export const getDestinations = async (req, res) => {
    const destinations = await destinationService.getDestinations();
    return res.status(200).json(destinations)
}
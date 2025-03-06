import express from "express";

import { 
    obtenerViajesController,
    obtenerViajePorIdController,
    createTripController, 
    getTripController, 
    searchTripsController, 
    buscarViajePorFecha,
    getAvailableSeatsController
} from "../controllers/trip.controller.js";


const tripRouter = express.Router();


// Obtener todos los viajes
tripRouter.get("/viajes", obtenerViajesController);

// Obtener un viaje por ID
tripRouter.get("/viajes/:tripId", obtenerViajePorIdController);

tripRouter.post("/create", createTripController);
tripRouter.get("/get/:routeId", getTripController);
tripRouter.get("/search", searchTripsController);
tripRouter.get("/search-trips", buscarViajePorFecha)
tripRouter.get("/available-seats", getAvailableSeatsController);

export default tripRouter;

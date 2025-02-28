import express from "express";
import { 
    createTripController, 
    getTripController, 
    searchTripsController, 
    buscarViajePorFecha 
} from "../controllers/trip.controller.js";

const tripRouter = express.Router(); // Asegúrate de definir esto antes de usarlo

tripRouter.post("/create", createTripController);
tripRouter.get("/get/:routeId", getTripController);
tripRouter.get("/search", searchTripsController);
tripRouter.get("/search-trips", buscarViajePorFecha)

export default tripRouter;

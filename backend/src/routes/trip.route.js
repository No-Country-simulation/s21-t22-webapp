import express from "express";

import { createTripController, getTripController, searchTripsController } from "../controllers/trip.controller.js";


const tripRouter = express.Router();

tripRouter.post("/create", createTripController);
tripRouter.get("/get", getTripController);
tripRouter.get("/search", searchTripsController);
export default tripRouter;

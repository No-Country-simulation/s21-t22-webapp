import express from "express";
import { createTrip, getTrips } from "../controllers/trip.controller.js";

const tripRouter = express.Router();

tripRouter.get("/", getTrips)
tripRouter.post("/", createTrip)

export default tripRouter;
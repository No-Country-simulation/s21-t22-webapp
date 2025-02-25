import express from "express";
import { createTripStop, getTripStops } from "../controllers/tripStop.controller.js";

const tripStopRouter = express.Router();

tripStopRouter.get("/", getTripStops)
tripStopRouter.post("/", createTripStop)


export default tripStopRouter;
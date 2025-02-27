import express from "express";

import { createTrip } from "../controllers/trip/create.controller.js";
import { getTrip } from "../controllers/trip/get.controller.js";
import { searchTrips } from "../controllers/trip/search.controller.js";

const tripRouter = express.Router();

tripRouter.post("/create", createTrip);
tripRouter.get("/get", getTrip);
tripRouter.get("/search", searchTrips);
export default tripRouter;

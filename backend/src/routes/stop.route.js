import express from "express";
import { findStopsByQuery, getAllStops, createStopController} from "../controllers/stop.controller.js";


const stopsRouter = express.Router();

// Endpoint para crear una nueva parada
stopsRouter.post("/create", createStopController);
stopsRouter.get("/get-all", getAllStops)
stopsRouter.get("/search", findStopsByQuery)

export default stopsRouter;

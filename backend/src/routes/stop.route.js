import express from "express";
import { createStop } from "../controllers/stops/create.controller.js";
import { buscarViajePorFecha, findStopsByQuery } from "../controllers/stop.controller.js";

const stopsRouter = express.Router();

// Endpoint para crear una nueva parada
stopsRouter.post("/create", createStop);
stopsRouter.get("/searchtrip", buscarViajePorFecha)
stopsRouter.get("/search", findStopsByQuery)

export default stopsRouter;

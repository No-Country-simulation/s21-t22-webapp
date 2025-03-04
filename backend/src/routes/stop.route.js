import express from "express";
import { createStop } from "../controllers/stops/create.controller.js";
import { findStopsByQuery } from "../controllers/stop.controller.js";

const stopsRouter = express.Router();

// Endpoint para crear una nueva parada
stopsRouter.post("/create", createStop);
stopsRouter.get("/search", findStopsByQuery)

export default stopsRouter;

import express from "express";
import { obtenerViajesController, obtenerViajePorIdController } from "../controllers/trip.controller.js";

const tripRouter = express.Router();

// Obtener todos los viajes
tripRouter.get("/viajes", obtenerViajesController);

// Obtener un viaje por ID
tripRouter.get("/viajes/:tripId", obtenerViajePorIdController);

export default tripRouter;

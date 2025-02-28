import express from "express";
import { obtenerViajesController, obtenerViajePorIdController } from "../controllers/trip.controller.js";

const router = express.Router();

// Obtener todos los viajes
router.get("/viajes", obtenerViajesController);

// Obtener un viaje por ID
router.get("/viajes/:tripId", obtenerViajePorIdController);

export default router;

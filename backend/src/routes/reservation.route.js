import express from "express";
import { obtenerAsientosLibresController, reservarAsientoController } from "../controllers/reservation.controller.js";

const router = express.Router();

// Obtener asientos libres
router.get("/viaje/:tripId/asientos-libres", obtenerAsientosLibresController);

// Hacer una reserva de asiento
router.post("/reservar", reservarAsientoController);

export default router;

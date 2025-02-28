import express from "express";
import { obtenerAsientosLibresController, reservarAsientoController } from "../controllers/reservation.controller.js";

const reservationRouter = express.Router();

// Endpoint para obtener los asientos disponibles y ocupados
reservationRouter.get("/asientos/:tripId", obtenerAsientosDisponibles);

// Obtener asientos libres
router.get("/viaje/:tripId/asientos-libres", obtenerAsientosLibresController);

// Hacer una reserva de asiento
router.post("/reservar", reservarAsientoController);

export default reservationRouter;

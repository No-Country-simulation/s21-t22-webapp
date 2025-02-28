import express from "express";
import { obtenerAsientosLibresController, reservarAsientoController } from "../controllers/reservation.controller.js";

const reservationRouter = express.Router();

// Obtener asientos libres
reservationRouter.get("/viaje/:tripId/asientos-libres", obtenerAsientosLibresController);

// Hacer una reserva de asiento
reservationRouter.post("/reservar", reservarAsientoController);

export default reservationRouter;

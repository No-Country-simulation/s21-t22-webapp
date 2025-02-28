import express from "express";
import { obtenerAsientosDisponibles, reservarAsientoController } from "../controllers/reservation.controller.js";

const reservationRouter = express.Router();

// Endpoint para obtener los asientos disponibles y ocupados
reservationRouter.get("/asientos/:tripId", obtenerAsientosDisponibles);

// Endpoint para reservar un asiento
reservationRouter.post("/reservar", reservarAsientoController);

export default reservationRouter;

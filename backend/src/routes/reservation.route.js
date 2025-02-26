import express from "express";
import { reservarAsiento } from "../controllers/reservation.controller.js";

const router = express.Router();

// Endpoint para reservar un asiento
router.post("/reservar", reservarAsiento);

export default router;

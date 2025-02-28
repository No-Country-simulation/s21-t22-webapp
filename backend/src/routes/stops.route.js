import express from "express";
import { createStop } from "../controllers/stops/create.controller.js";

const stopsRouter = express.Router();

// Endpoint para crear una nueva parada
stopsRouter.post("/create", createStop);

export default stopsRouter;

import express from "express";
import { addRouteController } from "../controllers/route.controller.js";

const routRouter = express.Router();

// Endpoint para añadir una nueva ruta
routRouter.post("/add", addRouteController);

export default routRouter;

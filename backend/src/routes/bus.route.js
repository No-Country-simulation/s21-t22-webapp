import express from "express";
import { createBus, getBuses } from "../controllers/bus.controller.js";

const busRouter = express.Router();

busRouter.get("/", getBuses)
busRouter.post("/", createBus)

export default busRouter;
import express from "express";
import { addBus } from "../controllers/bus.controller.js";

const busRouter = express.Router();

busRouter.post("/add", addBus);

export default busRouter;

import express from "express";
import { addBus } from "../controllers/bus/add.controller.js";

const busRouter = express.Router();

busRouter.post("/add", addBus);

export default busRouter;

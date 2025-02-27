import express from "express";
import { addRouteController } from "../controllers/route.controller.js";

const routRouter = express.Router();

routRouter.post("/add", addRouteController);

export default routRouter;

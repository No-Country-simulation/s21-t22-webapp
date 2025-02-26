import express from "express";
import { addRoute } from "../controllers/route/add.controller.js";

const routRouter = express.Router();

routRouter.post("/add", addRoute);

export default routRouter;

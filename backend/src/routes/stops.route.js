import express from "express";
import { createStop } from "../controllers/stops/create.controller.js";

const stopsRouter = express.Router();

stopsRouter.post("/create", createStop);

export default stopsRouter;

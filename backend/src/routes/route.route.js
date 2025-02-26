import express from "express";
import { addRoute } from "../controllers/route/add.controller.js";

const router = express.Router();

router.post("/agregar", addRoute);

export default router;

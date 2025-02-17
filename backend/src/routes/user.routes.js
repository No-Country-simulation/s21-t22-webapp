import express from "express";
import { getUsers, createUserController } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUserController);

export default router;

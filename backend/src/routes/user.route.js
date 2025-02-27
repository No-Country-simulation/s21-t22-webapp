import express from "express";
import {
  getUsers,
  createUserController,
} from "../controllers/user/user.controller.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", createUserController);

export default userRouter;

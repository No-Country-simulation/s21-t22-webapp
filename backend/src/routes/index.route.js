import express from "express";
import userRouter from "./user.route.js";
import cityRouter from "./cities.route.js";
import authRouter from "./auth.routes.js";

const indexRouter = express.Router(); // 🔹 Corregido

indexRouter.use("/user", userRouter);
indexRouter.use("/cities", cityRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;

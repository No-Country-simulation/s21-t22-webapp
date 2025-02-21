import express from "express";
import userRouter from "./user.route.js";
import cityRouter from "./cities.route.js";

const indexRouter = express.Router(); // 🔹 Corregido

indexRouter.use("/user", userRouter);
indexRouter.use("/cities", cityRouter);

export default indexRouter;

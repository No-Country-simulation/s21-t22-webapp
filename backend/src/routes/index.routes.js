import express from "express";
import userRouter from "./user.routes.js";

//instance of server
const indexRoute = express();

//instance of router
const router = express.Router();

router.use("/user", userRouter);

export default indexRoute;

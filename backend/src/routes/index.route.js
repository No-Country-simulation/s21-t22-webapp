import express from "express";
import userRouter from "./user.route.js";
import cityRouter from "./cities.route.js";

//instance of server
const indexRouter = express();

//instance of router
const router = express.Router();

router.use("/user", userRouter);
router.use("/cities", cityRouter);

export default indexRouter;

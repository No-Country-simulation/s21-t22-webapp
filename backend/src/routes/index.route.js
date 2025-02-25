import express from "express";
import userRouter from "./user.route.js";
import ticketRouter from "./ticket.route.js";
import destinationRouter from "./destination.route.js";
import busRouter from "./bus.route.js"
import companyRouter from "./company.route.js"
import tripRouter from "./trip.route.js"
import tripStopRouter from "./tripStop.route.js"

const indexRouter = express.Router(); // 🔹 Corregido

indexRouter.use("/user", userRouter);
indexRouter.use("/ticket", ticketRouter);
indexRouter.use("/destination", destinationRouter);
indexRouter.use("/bus", busRouter);
indexRouter.use("/company", companyRouter);
indexRouter.use("/trip", tripRouter);
indexRouter.use("/tripstop", tripStopRouter)

export default indexRouter;

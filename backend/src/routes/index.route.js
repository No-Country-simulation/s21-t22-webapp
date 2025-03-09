import express from "express";
/*-----Importación de los routers----*/
import userRouter from "./user.route.js";
import routRouter from "./route.route.js";
import busRouter from "./bus.route.js";
import paymentRouter from "./payment.route.js";
import tripRouter from "./trip.route.js";
import stopRouter from "./stop.route.js";
import reservationRouter from "./reservation.route.js";
import awsRouter from "./s3.route.js";

const indexRouter = express.Router();

/*-----Manejo de las rutas-----*/
indexRouter.use("/user", userRouter);
indexRouter.use("/route", routRouter);
indexRouter.use("/bus", busRouter);
indexRouter.use("/payment", paymentRouter);
indexRouter.use("/trip", tripRouter);
indexRouter.use("/stop", stopRouter);
indexRouter.use("/reservation", reservationRouter);
indexRouter.use("/reservation", awsRouter);


export default indexRouter;

import express from "express";
/*-----Importación de los routers----*/
import userRouter from "./user.route.js";
import routRouter from "./route.route.js";
import busRouter from "./bus.route.js";
import paymentRouter from "./payment.route.js";
import tripRouter from "./trip.route.js";
/*import cityRouter from "./cities.route.js";*/

const indexRouter = express.Router();

/*-----Manejo de las rutas-----*/
indexRouter.use("/user", userRouter);
indexRouter.use("/route", routRouter);
indexRouter.use("/bus", busRouter);
indexRouter.use("/payment", paymentRouter);
indexRouter.use("/trip", tripRouter);
/*indexRouter.use("/cities", cityRouter);*/

export default indexRouter;

import express from "express";
import { processPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/pay", processPayment);

export default paymentRouter;

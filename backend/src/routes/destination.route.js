import express from "express";
import { createDestination, getDestinations } from "../controllers/destination.controller.js";

const destinationRouter = express.Router();

destinationRouter.get("/", getDestinations)
destinationRouter.post("/", createDestination)


export default destinationRouter;
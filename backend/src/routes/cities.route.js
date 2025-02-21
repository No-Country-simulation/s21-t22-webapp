import express from "express";
import cityController from "../controllers/city.controller.js";

const cityRouter = express.Router();

cityRouter.get("/search", cityController.searchCities);

export default cityRouter;

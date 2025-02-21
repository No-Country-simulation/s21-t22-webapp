import express from "express";
import cityController from "../controllers/cityController.js";

const cityRouter = express.Router();

cityRouter.get("/search", cityController.searchCities);

export default cityRouter;

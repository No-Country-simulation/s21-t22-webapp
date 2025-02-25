import express from "express";
import { createCompany, getCompanies } from "../controllers/company.controller.js";

const companyRouter = express.Router();

companyRouter.get("/", getCompanies)
companyRouter.post("/", createCompany)

export default companyRouter;
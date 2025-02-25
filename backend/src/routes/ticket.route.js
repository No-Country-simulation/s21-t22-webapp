import express from "express";
import { createTicket, getTickets } from "../controllers/ticket.controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/", getTickets)
ticketRouter.post("/", createTicket)

export default ticketRouter;
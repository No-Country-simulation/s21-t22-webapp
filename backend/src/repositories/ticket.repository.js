import Ticket from "../models/ticket.model.js";

const createTicket = async (data) => {
    return await Ticket.create(data);
}

const getTickets = async () => {
    return await Ticket.find().populate(["user_id", "trip_id", "boarding_stop_id", "alighting_stop_id"]);
}

export default { createTicket , getTickets};
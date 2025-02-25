import ticketService from "../services/ticket.service.js"

export const createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.json(ticket);
    } catch(e) {
        // !!
    }
}

export const getTickets = async (req, res) => {
    const ticket = await ticketService.getTickets();
    return res.status(200).json(ticket)
}

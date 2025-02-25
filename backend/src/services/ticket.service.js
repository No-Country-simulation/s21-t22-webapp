import ticketRepository from "../repositories/ticket.repository.js"

const createTicket = (data) => {
    return ticketRepository.createTicket(data)
}

const getTickets = async () => {
    return await ticketRepository.getTickets()
}

export default { createTicket, getTickets };
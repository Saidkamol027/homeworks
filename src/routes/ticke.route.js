import { Router } from 'express'
import { TicketController } from '../controllers/ticket.controller.js'
import { ValidateMiddleware } from '../middlewares/validations.middleware.js'
import { ticketValidation } from '../validations/ticket.validator.js'

const ticketRoute = Router()
const controller = new TicketController()

ticketRoute.get('/', controller.getAllTicket)
ticketRoute.post(
	'/',
	ValidateMiddleware(ticketValidation),
	controller.createTicket
)
ticketRoute.get('/:id', controller.getTicketById)
ticketRoute.patch(
	'/:id',
	ValidateMiddleware(ticketValidation),
	controller.updateTicket
)
ticketRoute.delete('/:id', controller.deleteTicket)

export { ticketRoute }

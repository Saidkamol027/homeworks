import { Ticket } from '../models/ticket.model.js'
import { BaseException } from '../utils/base.exception.js'
import { successRes } from '../utils/success.response.js'

export class TicketController {
	async getAllTicket(req, res, next) {
		try {
			const tickets = await Ticket.find().populate('transport')

			return successRes(res, 200, 'success', tickets)
		} catch (error) {
			next(error)
		}
	}
	async getTicketById(req, res, next) {
		try {
			const { id } = req.params

			const ticket = await Ticket.findById(id)

			if (!ticket) {
				throw new BaseException("Bunday id'ga ega ticket mavjud emas", 404)
			}

			return successRes(res, 200, 'success', ticket)
		} catch (error) {
			next(error)
		}
	}
	async createTicket(req, res, next) {
		try {
			const { passengerName, seatNumber, transport } = req.body

			const createTicket = await Ticket.create({
				passengerName,
				seatNumber,
				transport,
			})

			return successRes(res, 201, 'success', createTicket)
		} catch (error) {
			next(error)
		}
	}
	async updateTicket(req, res, next) {
		try {
			const { id } = req.params
			const { passengerName, seatNumber, transport } = req.body

			const ticket = await Ticket.findById(id)

			if (!ticket) {
				throw new BaseException("Bunday id'ga ega ticket mavjud emas", 404)
			}

			const updateTicket = await Ticket.findByIdAndUpdate(
				id,
				{
					passengerName,
					seatNumber,
					transport,
				},
				{ new: true }
			)

			return successRes(res, 200, 'success', updateTicket)
		} catch (error) {
			next(error)
		}
	}
	async deleteTicket(req, res, next) {
		try {
			const { id } = req.params

			const deleteTicket = await Ticket.findByIdAndDelete(id)

			if (!deleteTicket) {
				throw new BaseException("Bunday id'ga ega ticket mavjud emas", 404)
			}

			return successRes(res, 200, 'success')
		} catch (error) {
			next(error)
		}
	}
}

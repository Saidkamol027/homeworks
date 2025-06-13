import { Transport } from '../models//transport.model.js'
import { BaseException } from '../utils/base.exception.js'
import { checkValidObjectId } from '../utils/check.id.js'
import { successRes } from '../utils/success.response.js'

export class TransportController {
	async getAllTransport(req, res, next) {
		try {
			const transports = await Transport.find()

			return successRes(res, 200, 'success', transports)
		} catch (error) {
			next(error)
		}
	}
	async createTransport(req, res, next) {
		try {
			const { name, type, seats } = req.body

			const newTransport = await Transport.create({ name, type, seats })

			return successRes(res, 201, 'Transport yaratildi', newTransport)
		} catch (error) {
			next(error)
		}
	}
	async getTransportById(req, res, next) {
		try {
			const { id } = req.params

			checkValidObjectId(id)

			const transport = await Transport.findById(id)

			if (!transport) {
				throw new BaseException("Bunday id'ga ega transport mavjud emas", 404)
			}

			return successRes(res, 200, 'success', transport)
		} catch (error) {
			next(error)
		}
	}
	async updateTransport(req, res, next) {
		try {
			const { id } = req.params
			const { name, type, seats } = req.body

			const transport = await Transport.findById(id)

			if (!transport) {
				throw new BaseException("Bunday id'ga ega transport mavjud emas", 404)
			}

			const updateTransport = await Transport.findByIdAndUpdate(
				id,
				{
					name,
					type,
					seats,
				},
				{ new: true }
			)

			return successRes(
				res,
				200,
				'Transport muvaffaqiyatli yangilandi',
				updateTransport
			)
		} catch (error) {
			next(error)
		}
	}
	async deleteTransport(req, res, next) {
		try {
			const { id } = req.params

			const deleteTransport = await Transport.findByIdAndDelete(id)

			if (!deleteTransport) {
				throw new BaseException("Bunday id'ga ega transport mavjud", 404)
			}
			return successRes(res, 200, "Transport muvaffaqiyatli o'chirildi")
		} catch (error) {
			next(error)
		}
	}
}

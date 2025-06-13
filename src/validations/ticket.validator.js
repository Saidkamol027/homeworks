import Joi from 'joi'
import mongoose from 'mongoose'

export const ticketValidation = Joi.object({
	passengerName: Joi.string(),
	seatNumber: Joi.number().integer().min(1),
	transport: Joi.string()
		.custom((value, helpers) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				return helpers.error('Bunday id mavjud emas')
			}
			return value
		})
		.required(),
})

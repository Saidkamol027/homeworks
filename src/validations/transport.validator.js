import Joi from 'joi'

export const transportValidation = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().valid('bus', 'train', 'plane').required(),
	seats: Joi.number().integer().min(1).required(),
})

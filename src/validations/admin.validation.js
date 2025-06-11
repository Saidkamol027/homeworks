import Joi from 'joi'

export const AdminCreateValidation = Joi.object({
	username: Joi.string().min(6).max(14).required(),
	password: Joi.string()
		.min(8)
		.max(16)
		.required()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
		),
	role: Joi.string().optional(),
	isActive: Joi.boolean().optional(),
	image: Joi.string().optional(),
})

export const AdminUpdateValidation = Joi.object({
	username: Joi.string().min(6).max(14).required(),
	password: Joi.string()
		.min(8)
		.max(16)
		.required()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
		),
	role: Joi.string().optional(),
	isActive: Joi.boolean().optional(),
	image: Joi.string().optional(),
})

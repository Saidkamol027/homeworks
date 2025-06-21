import Joi from 'joi'

export const registerCustomerValidation = Joi.object({
	name: Joi.string().min(3).max(50).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(8).max(16).required(),
})

export const registerVerifyOtpValidation = Joi.object({
	email: Joi.string().email().required(),
	otp: Joi.string().length(6).required(),
})

export const forgotPasswordValidation = Joi.object({
	email: Joi.string().email().required(),
})

export const forgotVerifyOtpValidation = Joi.object({
	email: Joi.string().email().required(),
	otp: Joi.string().length(6).required(),
	newPassword: Joi.string().min(8).required(),
})

export const resetPasswordValidation = Joi.object({
	email: Joi.string().email().required(),
	newPassword: Joi.string().min(6).max(16).required(),
	password: Joi.string().min(8).max(16).required(),
})

export const loginCustomerValidation = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
})

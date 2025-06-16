import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller.js'
import { ValidateMiddleware } from '../middlewares/validations.middleware.js'
import {
	forgotPasswordValidation,
	forgotVerifyOtpValidation,
	loginCustomerValidation,
	registerCustomerValidation,
	registerVerifyOtpValidation,
	resetPasswordValidation,
} from '../validations/customer.validation.js'

const customerRoute = Router()
const controller = new CustomerController()

customerRoute.post(
	'/register',
	ValidateMiddleware(registerCustomerValidation),
	controller.register
)
customerRoute.post(
	'/register-verify-otp',
	ValidateMiddleware(registerVerifyOtpValidation),
	controller.registerVerifyOtp
)
customerRoute.post(
	'/forgot-password',
	ValidateMiddleware(forgotPasswordValidation),
	controller.forgotPassword
)
customerRoute.post(
	'/forgot-verify-otp',
	ValidateMiddleware(forgotVerifyOtpValidation),
	controller.forgotVerifyOtp
)
customerRoute.post(
	'/reset-password',
	ValidateMiddleware(resetPasswordValidation),
	controller.resetPassword
)
customerRoute.post(
	'/login',
	ValidateMiddleware(loginCustomerValidation),
	controller.login
)

export { customerRoute }

import { Router } from 'express'
import { CustomerController } from '../controllers/customer.controller.js'

const customerRoute = Router()
const controller = new CustomerController()

customerRoute.post('/register', controller.register)
customerRoute.post('/register-verify-otp', controller.registerVerifyOtp)
customerRoute.post('/forgot-password', controller.forgotPassword)
customerRoute.post('/forgot-verify-otp', controller.forgotVerifyOtp)
customerRoute.post('/reset-password', controller.resetPassword)
customerRoute.post('/login', controller.login)

export { customerRoute }

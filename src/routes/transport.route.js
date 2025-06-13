import { Router } from 'express'
import { TransportController } from '../controllers/transport.controller.js'
import { ValidateMiddleware } from '../middlewares/validations.middleware.js'
import { transportValidation } from '../validations/transport.validator.js'

const transportRoute = Router()
const controller = new TransportController()

transportRoute.get('/', controller.getAllTransport)
transportRoute.post(
	'/',
	ValidateMiddleware(transportValidation),
	controller.createTransport
)
transportRoute.get('/:id', controller.getTransportById)
transportRoute.patch(
	'/:id',
	ValidateMiddleware(transportValidation),
	controller.updateTransport
)
transportRoute.delete('/:id', controller.deleteTransport)

export { transportRoute }

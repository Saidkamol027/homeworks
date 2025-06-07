import { Router } from 'express'
import authController from '../controllers/auth.controller.js'

const authRoute = Router()

authRoute.get('/:id', authController.getUserById)
authRoute.post('/', authController.register)
authRoute.post('/', authController.login)
authRoute.patch('/:id', authController.updateUser)
authRoute.delete('/:id', authController.deleteUser)
authRoute.get('/', authController.getAllUsers)

export { authRoute }

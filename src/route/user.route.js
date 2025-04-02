import { Router } from 'express'
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	login,
	register,
	updateUser,
} from '../controller/users.controller.js'
const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/', createUser)
userRoute.get('/:id', getUserById)
userRoute.patch('/:id', updateUser)
userRoute.delete('/:id', deleteUser)
userRoute.post('/register', register)
userRoute.post('/login', login)

export default userRoute

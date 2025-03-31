import { Router } from 'express'
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserById,
	updateUser,
} from '../controller/users.controller.js'
const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/', createUser)
userRoute.get('/:id', getUserById)
userRoute.patch('/:id', updateUser)
userRoute.delete('/:id', deleteUser)

export default userRoute

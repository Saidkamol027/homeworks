const { Router } = require('express')
const {
	getAllUsers,
	getUsersById,
	createUsers,
	updateUsers,
} = require('../controller/users.controller')
const userRoute = Router()

userRoute.get('/', getAllUsers)
userRoute.post('/', createUsers)
userRoute.get('/:id', getUsersById)
userRoute.patch('/:id', updateUsers)

module.exports = { userRoute }

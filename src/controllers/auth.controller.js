import bcrypt from 'bcrypt'
import { User } from '../models/admin.models.js'
import { BaseException } from '../utils/base.exception.js'
import {} from '../utils/check.id.js'

class UserController {
	async register(req, res, next) {
		try {
			const { name, email, password } = req.body

			const existsUser = await User.findOne({ email })

			if (existsUser) {
				throw new BaseException(
					"Bunday email allaqachon ro'yhatdan o'tgan",
					409
				)
			}

			if (password.length < 8) {
				throw new BaseException(
					'Parol uzunligi kamida 8 ta belgidan iborat bo‘lishi kerak',
					400
				)
			}

			const passwordHash = await bcrypt.hash(password, 10)

			const user = await User.create({ name, email, password: passwordHash })

			res.status(201).json({ message: 'success', data: user })
		} catch (error) {
			next(error)
		}
	}
	async login(req, res, next) {
		try {
			const { email, password } = req.body

			const user = await User.findOne({ email })

			if (!user) {
				throw new BaseException('Email yoki parol hato', 400)
			}

			const verifyPassword = await bcrypt.compare(password, user.password)

			if (!verifyPassword) {
				throw new BaseException('Parol xato', 400)
			}

			res.status(200).json({ message: 'Tizimga muvaffaqiyatli kirildi' })
		} catch (error) {
			next(error)
		}
	}
	async getUserById(req, res, next) {
		try {
			const { id } = req.params

			checkValidObjectId(id)

			const user = await User.findById(id)

			if (!user) {
				throw new BaseException("Bunday id'ga ega user mavjud emas", 404)
			}

			res.status(200).json({ message: 'success', data: user })
		} catch (error) {
			next(error)
		}
	}
	async updateUser() {
		try {
			const { name, email, newPassword, password } = req.body

			const user = await User.findOne({ email })

			if (!user) {
				throw new BaseException("Bunday email oldin ro'yhatdan o'tmagan", 400)
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if(!isMatch){
				throw new BaseException("Password hato kiritldi",400)
			}

			const updateUser = await User.fin
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()

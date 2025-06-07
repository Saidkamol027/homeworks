import bcrypt from 'bcrypt'
import { User } from '../models/user.models.js'
import { BaseException } from '../utils/base.exception.js'
import { checkValidObjectId } from '../utils/check.id.js'

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
	async updateUser(req, res, next) {
		try {
			const { id } = req.params
			const { name, email, newPassword, password } = req.body

			checkValidObjectId(id)

			const user = await User.findById(id)

			if (!user) {
				throw new BaseException('Bunday foydalanuvchi mavjud emas', 404)
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				throw new BaseException('Eski parol hato kiritildi', 400)
			}

			const updateData = { name, email }

			if (newPassword) {
				if (newPassword.length < 8) {
					throw new BaseException(
						"Yangi parol uzunligi kamida 8 bo'lishi kerak",
						400
					)
				}
				updateData.password = await bcrypt.hash(newPassword, 10)
			}

			const updateUser = await User.findByIdAndUpdate(id, updateData, {
				new: true,
			})

			res.status(200).json({
				message: 'Foydalanuvchi muvaffaqiyatli yangilandi',
				data: updateUser,
			})
		} catch (error) {
			next(error)
		}
	}
	async deleteUser(req, res, next) {
		try {
			const { id } = req.params

			checkValidObjectId(id)

			const deleteUser = await User.findByIdAndDelete(id)

			if (!deleteUser) {
				throw new BaseException('Bunday foydalanuvchi mavjud emas', 404)
			}

			res
				.status(200)
				.json({ message: "Foydalanuvchi muvaffaqiyatli o'chirildi" })
		} catch (error) {
			next(error)
		}
	}
	async getAllUsers(req, res, next) {
		try {
			const users = await User.find()

			res.status(200).json({ message: 'success', data: users })
		} catch (error) {
			next(error)
		}
	}
}

export default new UserController()

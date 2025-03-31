import bcrypt from 'bcrypt'
import User from '../model/user.model.js'
import { checkObjectId, handlerServerError } from '../utils/user.utils.js'

export const getAllUsers = async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query
		const users = await User.find()
			.select('-password')
			.limit(limit * 1)
			.skip((page - 1) * limit)

		res.status(200).json({ message: 'success', data: users })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export const getUserById = async (req, res) => {
	try {
		const { id } = req.params
		if (!checkObjectId(res, id)) return

		const user = await User.findById(id).select('-password')
		if (!user) {
			return res
				.status(404)
				.json({ message: 'Bunday foydalanuvchi mavjud emas' })
		}

		res.json({ message: 'success', data: user })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export const createUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body
		const existUser = await User.findOne({ email })

		if (existUser) {
			return res.status(400).json({ message: 'Bunday email allaqachon mavjud' })
		}

		const passwordHash = await bcrypt.hash(password, 10)

		const user = new User({ name, email, password: passwordHash, role })
		await user.save()

		res.json({ message: 'success', data: user })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params
		const { name, email, password, role } = req.body

		if (!checkObjectId(res, id)) return

		const user = await User.findById(id)
		if (!user) {
			return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
		}

		if (email && email !== user.email) {
			const existsUser = await User.findOne({ email })
			if (existsUser) {
				return res
					.status(400)
					.json({ message: 'Bunday email allaqachon mavjud' })
			}
		}

		let hashPassword = user.password
		if (password) {
			hashPassword = await bcrypt.hash(password, 10)
		}

		const updatedData = {
			name: name || user.name,
			email: email || user.email,
			password: hashPassword || user.password,
			role: role || user.role,
		}

		const updateUser = await User.findByIdAndUpdate(id, updatedData, {
			new: true,
		})

		res.json({ message: 'success', data: updateUser })
	} catch (error) {
		handlerServerError(error, res)
	}
}

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params
		if (!checkObjectId(res, id)) return

		const deleteUser = await User.findByIdAndDelete(id)
		if (!deleteUser) {
			return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
		}

		res.status(200).json({
			message: "Foydalanuvchi muvaffaqiyatli o'chirildi",
			data: deleteUser,
		})
	} catch (error) {
		handlerServerError(error, res)
	}
}

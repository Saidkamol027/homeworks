import bcrypt, { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
	ACCESS_TOKEN_EXPIRE_TIME,
	ACCESS_TOKEN_SECRET,
	REFRESH_TOKEN_EXPIRE_TIME,
	REFRESH_TOKEN_SECRET,
} from '../config/jwt.config.js'
import { BaseException } from '../exception/base.exception.js'
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

export const register = async (req, res) => {
	try {
		const { name, email, password, role } = req.body

		const foundedUser = await User.findOne({ email })

		if (foundedUser) {
			throw new BaseException('User already exists, try another email ', 409)
		}

		const passwordHash = await hash(password, 10)

		const user = await User.create({
			email,
			name,
			password: passwordHash,
			role,
		})

		const accessToken = jwt.sign(
			{ id: user.id, role: user.role },
			ACCESS_TOKEN_SECRET,
			{
				expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
				algorithm: 'HS256',
			}
		)

		const refreshToken = jwt.sign(
			{
				id: user.id,
				role: user.role,
			},
			REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
				algorithm: 'HS256',
			}
		)

		res.status(201).json({
			message: 'success',
			tokens: { accessToken, refreshToken },
			data: user,
		})
	} catch (error) {
		handlerServerError(error, res)
	}
}

export const login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })

		if (!user) {
			throw new BaseException('User not found', 404)
		}

		const isMatch = await compare(password, user.password)

		if (!isMatch) {
			throw new BaseException('Invalid password', 401)
		}

		const accessToken = jwt.sign(
			{ id: user.id, role: user.role },
			ACCESS_TOKEN_SECRET,
			{
				expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
				algorithm: 'HS256',
			}
		)

		const refreshToken = jwt.sign(
			{ id: user.id, role: user.role },
			REFRESH_TOKEN_SECRET,
			{
				expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
				algorithm: 'HS256',
			}
		)

		res.send({
			message: 'success',
			data: user,
			tokens: {
				accessToken,
				refreshToken,
			},
		})
	} catch (error) {
		next(error)
	}
}
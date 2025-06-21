import { compare, hash } from 'bcrypt'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
import { Customer } from '../models/customer.model.js'
import { BaseException } from '../utils/base.exception.js'
import {
	generateAccessToken,
	generateRefreshToken,
} from '../utils/generate.token.js'
import { deleteOtp, saveOtp, verifyOtp } from '../utils/otp.cache.js'
import { otpGenerate } from '../utils/otp.generate.js'
import { sendResponse } from '../utils/response.js'
import { sendMail } from '../utils/send.mail.js'
config()

export class CustomerController {
	async register(req, res, next) {
		try {
			const { name, email, phone, password } = req.body

			const exists = await Customer.findOne({ email })

			if (exists) {
				throw new BaseException(
					"Bunday email allaqachon ro'yxatdan o'tgan",
					409
				)
			}

			const otp = await otpGenerate()
			const passwordHash = await hash(password, 10)

			const newCustomer = await Customer.create({
				name,
				email,
				phone,
				password: passwordHash,
				isVerified: false,
			})
			saveOtp(email, otp)

			const html = `<h2>Emailni tasdiqlash uchun OTP:</h2><h1>${otp}</h1><p>Bu kod 10 daqiqa amal qiladi</p>`
			await sendMail(email, "Ro'yhatdan o'tish uchun OTP", html)

			return sendResponse(res, 201, 'success', {
				message: 'OTP yuborildi. Emailingizni tasdiqlang.',
			})
		} catch (error) {
			next(error)
		}
	}

	async registerVerifyOtp(req, res, next) {
		try {
			const { email, otp } = req.body

			const customer = await Customer.findOne({ email })

			if (!customer) {
				throw new BaseException('Email topilmadi', 404)
			}
			const existsOtp = verifyOtp(email, otp)

			if (!existsOtp) {
				throw new BaseException('OTP xato yoki eskirgan', 401)
			}

			customer.isVerified = true
			await customer.save()
			deleteOtp(email)

			return sendResponse(res, 200, 'success', {
				message: 'Ro‘yxatdan o‘tish muvaffaqiyatli tugallandi',
			})
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body

			const customer = await Customer.findOne({ email })

			if (!customer) {
				throw new BaseException('Email yoki parol xato', 404)
			}

			const isMatch = await compare(password, customer.password)

			if (!isMatch) {
				throw new BaseException('Email yoki parol xato', 404)
			}

			if (customer.isVerified != true) {
				throw new BaseException('Email tasdiqlanmagan', 401)
			}

			const accessToken = generateAccessToken(customer._id, 'customer')
			const refreshToken = generateRefreshToken(customer._id)

			res.cookie('accessToken', accessToken, {
				httpOnly: true,
				maxAge: 15 * 60 * 1000,
				sameSite: 'strict',
			})

			res.cookie('refreshToken', refreshToken, {
				httpOnly: true,
				maxAge: 7 * 24 * 60 * 60 * 1000,
				sameSite: 'strict',
			})

			return sendResponse(res, 200, 'success', {
				message: 'Muvaffaqiyatli kirildi',
				accessToken,
				refreshToken,
				data: customer,
			})
		} catch (error) {
			next(error)
		}
	}

	async forgotPassword(req, res, next) {
		try {
			const { email } = req.body

			const customer = await Customer.findOne({ email })
			if (!customer) {
				throw new BaseException('Bunday email topilmadi', 404)
			}

			const otp = await otpGenerate()
			saveOtp(email, otp)
			await customer.save()

			const html = `<h2>Parolni tiklash uchun OTP:</h2><h1>${otp}</h1><p>Bu kod 10 daqiqa amal qiladi</p>`
			await sendMail(email, 'Parolni tiklash OTP', html)

			return sendResponse(res, 200, 'success', {
				message: 'Emailga OTP yuborildi',
			})
		} catch (error) {
			next(error)
		}
	}

	async forgotVerifyOtp(req, res, next) {
		try {
			const { email, otp, newPassword } = req.body

			const customer = await Customer.findOne({ email })

			if (!customer) {
				throw new BaseException('Bunday email topilmadi', 404)
			}
			const existsOtp = verifyOtp(email, otp)

			if (!existsOtp) {
				throw new BaseException('OTP xato yoki eskirgan', 401)
			}

			deleteOtp(email)
			const passwordHash = await hash(newPassword, 10)
			customer.password = passwordHash
			await customer.save()

			return sendResponse(res, 200, 'success', {
				message: 'Parol yangilandi',
			})
		} catch (error) {
			next(error)
		}
	}

	async resetPassword(req, res, next) {
		try {
			const { password, newPassword } = req.body
			const token = req.headers.authorization?.split(' ')[1]

			if (!token) {
				throw new BaseException('Token yo‘q yoki eskirgan', 401)
			}

			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
			const customer = await Customer.findById(decoded.userId)

			if (!customer) {
				throw new BaseException('Foydalanuvchi topilmadi', 404)
			}

			const isMatch = await compare(password, customer.password)
			if (!isMatch) {
				throw new BaseException('Parol xato', 400)
			}

			const passwordHash = await hash(newPassword, 10)
			customer.password = passwordHash
			await customer.save()

			return sendResponse(res, 200, 'success', {
				message: 'Parol yangilandi',
			})
		} catch (error) {
			next(error)
		}
	}

	async refreshToken(req, res, next) {
		try {
			const token = req.cookies.refreshToken
			if (!token) throw new BaseException('Refresh token topilmadi', 401)

			const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
			const customer = await Customer.findById(decoded.userId)
			if (!customer) throw new BaseException('Foydalanuvchi topilmadi', 404)

			const newAccessToken = generateAccessToken(customer._id, 'customer')

			res.cookie('accessToken', newAccessToken, {
				httpOnly: true,
				maxAge: 15 * 60 * 1000,
				sameSite: 'strict',
			})

			return sendResponse(res, 200, 'success', {
				message: 'Yangi access token yaratildi',
			})
		} catch (error) {
			next(error)
		}
	}
}

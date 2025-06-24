import jwt from 'jsonwebtoken'
import { BaseException } from '../utils/base.exception.js'

export const AuthMiddleware = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			throw new BaseException('Token mavjud emas', 401)
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

		req.user = decoded

		next()
	} catch (err) {
		next(err)
	}
}

import { config } from 'dotenv'
import jwt from 'jsonwebtoken'
config()

const generateAccessToken = (userId, role) => {
	return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '15m',
	})
}

const generateRefreshToken = userId => {
	return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: '7d',
	})
}

export { generateAccessToken, generateRefreshToken }

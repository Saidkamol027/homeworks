import { config } from 'dotenv'
import nodemailer from 'nodemailer'
config()

export const sendMail = async (to, subject, html) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.USER_MAIL,
				pass: process.env.USER_PASS,
			},
		})

		await transporter.sendMail({
			from: `Auth system ${process.env.USER_MAIL}`,
			to,
			subject,
			html,
		})
	} catch (error) {
		console.log('Email yuborishda xato')
	}
}

import { config } from 'dotenv'
import mongoose from 'mongoose'
config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI)
		return '✅ MongoDB ulandi!'
	} catch (err) {
		console.error('❌ MongoDB ulanishda xatolik:', err)
		process.exit(1)
	}
}

export default connectDB

import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL)
		console.log("MongoDB'ga muvaffaqiyatli ulandi ✅")
	} catch (error) {
		console.log('MongoDB ga ulanishda hato ❌')
		process.exit(1)
	}
}

const APP_PORT = process.env.PORT || 5000

export { APP_PORT, connectDB }

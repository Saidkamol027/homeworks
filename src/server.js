import { httpServer } from './app.js'
import { APP_PORT } from './config/db.js'
import { connectDB } from './config/mongo.config.js'

await connectDB()

httpServer.listen(APP_PORT, () => {
	console.log(`🚀 Server ishlayapti: http://localhost:${APP_PORT}`)
})

import { app } from './app.js'
import { APP_PORT, connectDB } from './config/db.config.js'

await connectDB()

app.listen(APP_PORT, () => {
	console.log(`Server ${APP_PORT} da ishlamoqda`)
})

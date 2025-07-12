import { app } from './app.js'
import { APP_PORT } from './config/db.config.js'

app.listen(APP_PORT, () => {
	console.log(`Server ${APP_PORT} da ishlamoqda`)
})

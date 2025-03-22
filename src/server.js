import app from './app.js'
import APP_PORT from './config/db.js'
import connectDB from './config/mongo.config.js'

connectDB()
	.then(data => console.log(data))
	.catch(err => {
		console.log(err)
	})

app.listen(APP_PORT, (req, res) => {
	console.log(`Server ${APP_PORT} da ishlamoqda`)
})

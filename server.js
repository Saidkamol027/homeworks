const express = require('express')
const { userRoute } = require('./src/route/users.route')
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/users', userRoute)

app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})

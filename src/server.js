const express = require('express')
require('dotenv').config()
const { productRoute } = require('./route/product.route')
const app = express()
app.use(express.json())

app.use('/product', productRoute)

const port = process.env.PORT || 5000
app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})

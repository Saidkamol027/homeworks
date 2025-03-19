const express = require('express')
const { productRoute } = require('./route/products.route')
const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.use('/products', productRoute)

app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})

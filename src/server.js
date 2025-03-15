const express = require('express')
require('dotenv').config()
const { productRoute } = require('./route/product.route')
const { categoriesRoute } = require('./route/category.route')
const app = express()
app.use(express.json())

app.use('/products', productRoute)
app.use('/categories', categoriesRoute)

const port = process.env.PORT || 5000
app.listen(port, (req, res) => {
	console.log(`Server ${port} da ishlamoqda`)
})

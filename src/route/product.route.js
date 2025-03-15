const { Router } = require('express')
const {
	getAllProducts,
	getAllProductsById,
} = require('../controller/product.controller')
const productRoute = Router()

productRoute.get('/', getAllProducts)
productRoute.get('/:id', getAllProductsById)

module.exports = { productRoute }

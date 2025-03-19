const { Router } = require('express')
const {
	getAllProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controller/products.controller')
const productRoute = Router()

productRoute.get('/', getAllProducts)
productRoute.post('/', createProduct)
productRoute.get('/:id', getProductById)
productRoute.patch('/:id', updateProduct)
productRoute.delete('/:id', deleteProduct)

module.exports = { productRoute }

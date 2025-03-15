const { Router } = require('express')
const {
	getAllProducts,
	getAllProductsById,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('../controller/product.controller')
const productRoute = Router()

productRoute.get('/', getAllProducts)
productRoute.get('/:id', getAllProductsById)
productRoute.post('/', createProduct)
productRoute.patch('/:id', updateProduct)
productRoute.delete('/:id', deleteProduct)

module.exports = { productRoute }

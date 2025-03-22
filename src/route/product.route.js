import { Router } from 'express'

import {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
} from '../controller/product.controller.js'

const productRoute = Router()

productRoute.get('/', getAllProducts)
productRoute.post('/', createProduct)
productRoute.put('/:id', updateProduct)
productRoute.get('/:id', getProductById)
productRoute.delete('/:id', deleteProduct)

export default productRoute

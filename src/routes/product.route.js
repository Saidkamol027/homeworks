import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'

const productRoute = Router()

productRoute.get('/', ProductController.getAllProduct)
productRoute.get('/:id', ProductController.getProductById)
productRoute.post('/', ProductController.createProduct)
productRoute.patch('/:id', ProductController.updateProduct)
productRoute.delete('/:id', ProductController.deleteProduct)

export { productRoute }

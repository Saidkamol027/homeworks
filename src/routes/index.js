import { Router } from 'express'
import { productRoute } from './product.route.js'

const router = Router()

router.use('/product', productRoute)

export { router }

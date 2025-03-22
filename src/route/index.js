import { Router } from 'express'
import productRoute from './product.route.js'

const router = Router()

router.use('/', productRoute)

export default router

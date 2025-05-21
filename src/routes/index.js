import { Router } from 'express'
import { fruitRoute } from './fruit.route.js'

const router = Router()

router.use('/fruit', fruitRoute)

export { router }

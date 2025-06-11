import { Router } from 'express'
import { adminRoute } from './admin.route.js'

const router = Router()

router.use('/admin', adminRoute)

export { router }

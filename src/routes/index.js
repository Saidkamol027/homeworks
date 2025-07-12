import { Router } from 'express'
import { pasportInfoRoute } from './pasport.info.route.js'
import { teacherRoute } from './teacher.route.js'

const router = Router()

router.use('/teacher', teacherRoute)
router.use('/teacher', pasportInfoRoute)

export { router }

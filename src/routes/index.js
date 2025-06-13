import { Router } from 'express'
import { ticketRoute } from './ticke.route.js'
import { transportRoute } from './transport.route.js'

const router = Router()

router.use('/transport', transportRoute)
router.use('/ticket', ticketRoute)

export { router }

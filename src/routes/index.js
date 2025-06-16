import { Router } from 'express'
import { customerRoute } from './customer.route.js'
import { ticketRoute } from './ticke.route.js'
import { transportRoute } from './transport.route.js'

const router = Router()

router.use('/transport', transportRoute)
router.use('/ticket', ticketRoute)
router.use('/customer', customerRoute)

export { router }

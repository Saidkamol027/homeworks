import { Router } from 'express'
import { PassportInfoController } from '../controllers/pasport.info.student.js'

const pasportInfoRoute = Router()
const controller = new PassportInfoController()

pasportInfoRoute.get('/', controller.getAll)
pasportInfoRoute.get('/:id', controller.getById)
pasportInfoRoute.post('/', controller.create)
pasportInfoRoute.put('/:id', controller.update)
pasportInfoRoute.delete('/:id', controller.delete)

export { pasportInfoRoute }

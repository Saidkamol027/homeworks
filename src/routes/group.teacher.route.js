import { Router } from 'express'
import { GroupTeacherController } from '../controllers/group.teacher.controller.js'

const groupTeacherRoute = Router()
const controller = new GroupTeacherController()

groupTeacherRoute.get('/', controller.getAll)
groupTeacherRoute.get('/:id', controller.getById)
groupTeacherRoute.post('/', controller.create)
groupTeacherRoute.put('/:id', controller.update)
groupTeacherRoute.delete('/:id', controller.delete)

export { groupTeacherRoute }

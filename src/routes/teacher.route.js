import { Router } from 'express'
import { TeacherController } from '../controllers/teacher.controller.js'

const teacherRoute = Router()
const controller = new TeacherController()

teacherRoute.get('/', controller.getAllTeacher)
teacherRoute.get('/:id', controller.getTeacherById)
teacherRoute.post('/', controller.createTeacher)
teacherRoute.put('/:id', controller.updateTeacher)
teacherRoute.delete('/:id', controller.deleteTeacher)

export { teacherRoute }

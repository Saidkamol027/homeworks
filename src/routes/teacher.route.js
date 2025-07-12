import express from 'express'
import { TeacherController } from '../controllers/teacher.controller.js'

const router = express.Router()
const controller = new TeacherController()

router.get('/', controller.getAllTeacher.bind(controller))
router.get('/:id', controller.getTeacherById.bind(controller))
router.post('/', controller.createTeacher.bind(controller))
router.put('/:id', controller.updateTeacher.bind(controller))
router.delete('/:id', controller.deleteTeacher.bind(controller))

export default router

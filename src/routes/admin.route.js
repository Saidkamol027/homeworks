import { Router } from 'express'
import { AdminController } from '../controllers/admin.controllers.js'
import { ValidateMiddleware } from '../middlewares/validations.middleware.js'
import {
	AdminCreateValidation,
	AdminUpdateValidation,
} from '../validations/admin.validation.js'

const adminRoute = Router()
const admincontoller = new AdminController()

adminRoute.get('/', admincontoller.getAllAdmin)
adminRoute.post(
	'/',
	ValidateMiddleware(AdminCreateValidation),
	admincontoller.createAdmin
)
adminRoute.get('/:id', admincontoller.getAdminById)
adminRoute.patch(
	'/:id',
	ValidateMiddleware(AdminUpdateValidation),
	admincontoller.updateAdmin
)
adminRoute.delete('/:id', admincontoller.deleteAdmin)

export { adminRoute }

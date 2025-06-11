import { hash } from 'bcrypt'
import { Admin } from '../models/admin.models.js'
import { BaseException } from '../utils/base.exception.js'
import { checkValidObjectId } from '../utils/check.id.js'
import { successRes } from '../utils/success.response.js'

export class AdminController {
	async getAllAdmin(req, res, next) {
		try {
			const admins = await Admin.find()

			return successRes(res, 200, 'success', admins)
		} catch (error) {
			next(error)
		}
	}
	async getAdminById(req, res, next) {
		try {
			const { id } = req.params

			checkValidObjectId(id)

			const admin = await Admin.findById(id)

			if (!admin) {
				throw new BaseException('Bunday isda ega admin mavjud emas', 404)
			}

			return successRes(res, 200, 'success', admin)
		} catch (error) {
			next(error)
		}
	}
	async createAdmin(req, res, next) {
		try {
			const { username, password, isActive = true, role, image } = req.body

			const admin = await Admin.findOne({ username })

			if (admin) {
				throw new BaseException('Bunday username allaqachon ishlatilgan', 409)
			}

			const passwordHash = await hash(password, 10)

			const newAdmin = await Admin.create({
				username,
				password: passwordHash,
				isActive: isActive,
				role,
				image,
			})

			return successRes(
				res,
				201,
				"Admin muvaffaqiyatli ro'yhatdan o'tdi",
				newAdmin
			)
		} catch (error) {
			next(error)
		}
	}

	async updateAdmin(req, res, next) {
		try {
			const { id } = req.params
			const { username, password, isActive, role, image } = req.body

			checkValidObjectId(id)

			const admin = await Admin.findById(id)

			if (!admin) {
				throw new BaseException("Bunday id'ga ega admin mavjud emas", 404)
			}

			const existsAdmin = await Admin.findOne({ username })

			if (existsAdmin) {
				throw new BaseException('Bunday username allaqachon mavjud', 409)
			}

			const passwordHash = await hash(password, 10)

			const newAdmin = await Admin.findByIdAndUpdate(id, {
				username,
				password: passwordHash,
				isActive,
				role,
				image,
			})

			return successRes(
				res,
				200,
				'Admin malumotlari muvaffaqiyatli yangilandi',
				newAdmin
			)
		} catch (error) {
			next(error)
		}
	}
	async deleteAdmin(req, res, next) {
		try {
			const { id } = req.params

			const deleteAdmin = await Admin.findByIdAndDelete(id)

			if (!deleteAdmin) {
				throw new BaseException('Bunday id ga ega admin mavjud emas', 404)
			}

			return successRes(res, 200, "Admin muvaffaqiyatli o'chirildi")
		} catch (error) {
			next(error)
		}
	}
}

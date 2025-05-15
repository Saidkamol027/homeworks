import { isValidObjectId } from 'mongoose'
import { BaseException } from '../exception/base.exception.js'
import { Product } from '../model/product.model.js'

class ProductController {
	async getProductById(req, res, next) {
		try {
			const { id } = req.params

			if (!isValidObjectId(id)) {
				throw new BaseException('ID malumot turi notogri', 403)
			}

			const product = await Product.findById(id)

			if (!product) {
				throw new BaseException("Bunday id'lik product mavjud emas")
			}
			res.status(200).json({ message: 'success', data: product })
		} catch (error) {
			next(error)
		}
	}
	async getAllProduct(req, res, next) {
		try {
			const products = await Product.find()

			res.status(200).json({ message: 'success', data: products })
		} catch (error) {
			next(error)
		}
	}
	async createProduct(req, res, next) {
		try {
			const { name, color } = req.body

			const product = new Product({ name, color })
			await product.save()

			res.status(201).json({ message: 'success', data: product })
		} catch (error) {
			next(error)
		}
	}
	async updateProduct(req, res, next) {
		try {
			const { id } = req.params
			const { name, color } = req.body

			if (!isValidObjectId(id)) {
				throw new BaseException('ID malumot turi notogri ', 403)
			}

			const newProduct = await Product.findByIdAndUpdate(
				id,
				{ name, color },
				{ new: true }
			)

			res.status(201).json({ message: 'success', data: newProduct })
		} catch (error) {
			next(error)
		}
	}
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params

			if (!isValidObjectId(id)) {
				throw new BaseException('ID notogri formatda', 403)
			}

			const product = await Product.findByIdAndDelete(id)

			if (!product) {
				throw new BaseException('Bunday id lik product mavjud emas', 404)
			}

			res.status(200).json({ message: 'success', data: product })
		} catch (error) {
			next(error)
		}
	}
}

export default new ProductController()

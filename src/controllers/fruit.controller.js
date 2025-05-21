import { isValidObjectId } from 'mongoose'
import { BaseException } from '../exception/base.exception.js'
import { Fruit } from '../model/fruit.model.js'

class FruitController {
	async getFruitById(req, res, next) {
		try {
			const { id } = req.params

			if (!isValidObjectId(id)) {
				throw new BaseException('ID malumot turi notogri', 403)
			}

			const fruit = await Fruit.findById(id)

			if (!fruit) {
				throw new BaseException("Bunday id'lik fruit mavjud emas")
			}
			res.status(200).json({ message: 'success', data: fruit })
		} catch (error) {
			next(error)
		}
	}

	async getAllFruit(req, res, next) {
		try {
			const fruit = await Fruit.find()
			res.status(200).json({ message: 'success', data: fruit })
		} catch (error) {
			next(error)
		}
	}

	async createFruit(req, res, next) {
		try {
			const { name, price } = req.body

			const fruit = new Fruit({ name, price })
			await fruit.save()

			res.status(201).json({ message: 'success', data: fruit })
		} catch (error) {
			next(error)
		}
	}

	async updateFruit(req, res, next) {
		try {
			const { id } = req.params
			const { name, price } = req.body

			if (!isValidObjectId(id)) {
				throw new BaseException('ID malumot turi notogri ', 403)
			}

			const newFruit = await Fruit.findByIdAndUpdate(
				id,
				{ name, price },
				{ new: true }
			)

			if (!newFruit) {
				throw new BaseException('Bunday id dagi mahsulot mavjud emas')
			}

			res.status(201).json({ message: 'success', data: newFruit })
		} catch (error) {
			next(error)
		}
	}

	async deleteFruit(req, res, next) {
		try {
			const { id } = req.params

			if (!isValidObjectId(id)) {
				throw new BaseException('ID notogri formatda', 403)
			}

			const fruit = await Fruit.findByIdAndDelete(id)

			if (!fruit) {
				throw new BaseException('Bunday id lik fruit mavjud emas', 404)
			}

			res.status(200).json({ message: 'success', data: fruit })
		} catch (error) {
			next(error)
		}
	}
}

export default new FruitController()

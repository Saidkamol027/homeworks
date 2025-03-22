import { isValidObjectId } from 'mongoose'
import Product from '../model/product.model.js'

const handleServerError = (res, error) => {
	console.error(error)
	res.status(500).json({ error: 'Server bilan muammo' })
}

const getAllProducts = async (req, res) => {
	try {
		const products = await Product.find()
		res
			.status(200)
			.json({ message: 'success', count: products.length, data: products })
	} catch (error) {
		handleServerError(res, error)
	}
}

const getProductById = async (req, res) => {
	try {
		const { id } = req.params

		if (!isValidObjectId(id)) {
			return res
				.status(400)
				.json({ message: "Noto'g'ri ID formati, iltimos to'g'ri ID kiriting" })
		}

		const product = await Product.findById(id)
		if (!product) return res.status(404).json({ message: 'Mahsulot topilmadi' })

		res.json({ message: 'success', data: product })
	} catch (error) {
		handleServerError(res, error)
	}
}

const createProduct = async (req, res) => {
	try {
		const { name, price, description, count } = req.body
		if (!name || !price || !description || !count) {
			return res.status(400).json({ error: "Barcha maydonlarni to'ldiring" })
		}

		const product = await Product.create({ name, price, description, count })
		res.status(201).json({ message: 'success', data: product })
	} catch (error) {
		handleServerError(res, error)
	}
}

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		if (!isValidObjectId(id))
			return res.status(400).json({ message: 'Yaroqsiz ID' })

		const product = await Product.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!product) return res.status(404).json({ error: 'Mahsulot topilmadi' })

		res.json({ message: 'success', data: product })
	} catch (error) {
		handleServerError(res, error)
	}
}

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		if (!isValidObjectId(id))
			return res.status(400).json({ error: `Bunday ${id} ID yaroqsiz` })

		const deletedProduct = await Product.findByIdAndDelete(id)
		if (!deletedProduct)
			return res.status(404).json({ error: 'Bunday mahsulot mavjud emas' })

		res.json({ message: "O'chirildi", data: deletedProduct })
	} catch (error) {
		handleServerError(res, error)
	}
}

export {
	createProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
}

const { pool } = require('../config/pg')

const getAllCategories = async (req, res) => {
	try {
		const categories = await pool.query('SELECT * FROM  categories;')
		res.status(200).json(categories)
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const getAllCategoriesById = async (req, res) => {
	try {
		const { id } = req.params
		const categories = await pool.query(
			'SELECT * FROM categories WHERE id = $1',
			[Number(id)]
		)

		if (categories.rows.length === 0) {
			return res.status(404).json({ message: 'Bunday catedoriya mavjud emas' })
		}

		res.status(200).json(categories.rows[0])
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const createCategories = async (req, res) => {
	try {
		const { name, description, price } = req.body
		const categories = await pool.query(
			'INSERT INTO categories (name, description, price) VALUES ($1, $2, $3 ) RETURNING * ',
			[name, description, price]
		)

		if (categories.rows.length === 0) {
			res.status(404).json(err.message)
		}

		res.status(200).json(categories.rows[0])
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const updateCategories = async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, price } = req.body

		const product = await pool.query(
			'UPDATE products SET name=$1, description=$2, price=$3 WHERE id=$4 RETURNING *',
			[name, description, price, id]
		)

		if (categories.rowCount === 0) {
			return res.status(404).json("Hech qanday ma'lumot topilmadi")
		}

		res.status(200).json(categories.rows[0])
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const deleteCategories = async (req, res) => {
	try {
		const { id } = req.params
		const categories = await pool.query(
			'DELETE FROM categories WHERE id = $1 RETURNING *',
			[id]
		)
		if (categories.rowCount.length === 0) {
			res.status(404).json('Malumot yoq')
		}

		res.status(200).json({
			message: "Mahsulot o'chirildi",
			deleteProduct: categories.rows[0],
		})
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

module.exports = {
	getAllCategories,
	getAllCategoriesById,
	createCategories,
	updateCategories,
	deleteCategories,
}

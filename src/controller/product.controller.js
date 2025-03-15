const { pool } = require('../config/pg')

const getAllProducts = async (req, res) => {
	try {
		const product = await pool.query('SELECT * FROM products;')
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const getAllProductsById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await pool.query('SELECT * FROM products WHERE id = $1', [
			Number(id),
		])

		if (product.rows.length === 0) {
			return res.status(404).json({ message: 'Mahsulot topilmadi' })
		}

		res.status(200).json(product.rows[0])
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const createProduct = async (req, res) => {
	try {
		const { name, price, description, category_id, stock } = req.body
		const product = await pool.query(
			'INSERT INTO products (name, price, description, category_id, stock) VALUES ($1,$2,$3,$4,$5) RETURNING * ',
			[name, price, description, category_id, stock]
		)

		if (product.rows.length === 0) {
			res.status(404).json(err.message)
		}

		res.status(200).json(product.rows[0])
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const { name, price, description, stock } = req.body

		const product = await pool.query(
			'UPDATE products SET name=$1, price=$2, description=$3, stock=$4 WHERE id=$5 RETURNING *',
			[name, price, description, stock, id]
		)

		if (product.rowCount === 0) {
			return res.status(404).json("Hech qanday ma'lumot topilmadi")
		}

		res.status(200).json(product.rows[0])
	} catch (error) {
		res.status(500).json(error.message)
	}
}

const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await pool.query(
			'DELETE FROM products WHERE id = $1 RETURNING *',
			[id]
		)
		if (product.rowCount.length === 0) {
			res.status(404).json('Malumot yoq')
		}

		res
			.status(200)
			.json({ message: "Mahsulot o'chirildi", deleteProduct: product.rows[0] })
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

module.exports = {
	getAllProducts,
	getAllProductsById,
	createProduct,
	updateProduct,
	deleteProduct,
}

const { pool } = require('../config/pg')

const getAllProducts = async (req, res) => {
	try {
		const product = await pool.query('SELECT * FROM product;')
		res.status(200).json(product)
	} catch (error) {
		res.status(500).json('Server bilan muammo')
	}
}

const getAllProductsById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await pool.query('SELECT * FROM product WHERE id = $1', [
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

module.exports = { getAllProducts, getAllProductsById }

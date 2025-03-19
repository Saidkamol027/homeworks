const { pool } = require('../config/db.config')

exports.getAllProducts = async (req, res) => {
	try {
		const { limit = 10, page = 1 } = req.query
		const offset = (page - 1) * limit

		const products = await pool.query(
			'SELECT * FROM users LIMIT $1 OFFSET $2',
			[limit, page]
		)

		if (products.rowCount === 0) {
			res.status(404).json({ error: 'Mahsulot topilmadi' })
		}

		res.status(200).json(products.rows)

		res.status(200).json(products.rows)
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Server bilan muammo', details: error.message })
	}
}

exports.getProductById = async (req, res) => {
	try {
		const { id } = req.params
		const product = await pool.query('SELECT * FROM products WHERE id = $1', [
			id,
		])

		if (product.rowCount === 0) {
			return res
				.status(404)
				.json({ error: "Bunday 'id'lik product mavjud emas" })
		}

		res.status(200).json(product.rows[0])
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Server bilan muammo', details: error.message })
	}
}

exports.createProduct = async (req, res) => {
	try {
		const { name, description, price, rating, count, color } = req.body

		if (!name || !description || !price || !rating || !count || !color) {
			return res.status(400).json({ error: 'Barcha maydonlarni to‘ldiring' })
		}

		const product = await pool.query(
			'INSERT INTO products (name, description, price, rating, count, color) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
			[name, description, price, rating, count, color]
		)

		res.status(201).json({
			message: "Mahsulot muvaffaqiyatli qo'shildi",
			data: product.rows[0],
		})
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Server bilan muammo', details: error.message })
	}
}

exports.updateProduct = async (req, res) => {
	try {
		const { id } = req.params
		const { name, description, price, rating, count, color } = req.body

		if (!name || !description || !price || !rating || !count || !color) {
			return res.status(400).json({ error: 'Barcha maydonlarni to‘ldiring' })
		}

		const product = await pool.query(
			'UPDATE products SET name = $1, description = $2, price = $3, rating = $4, count = $5, color = $6 WHERE id = $7 RETURNING *',
			[name, description, price, rating, count, color, id]
		)

		if (product.rowCount === 0) {
			return res.status(404).json({ error: "Bunday 'id'lik product yo'q" })
		}

		res.status(200).json({
			message: 'Mahsulot muvaffaqiyatli yangilandi',
			data: product.rows[0],
		})
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Server bilan muammo', details: error.message })
	}
}

exports.deleteProduct = async (req, res) => {
	try {
		const { id } = req.params
		const product = await pool.query(
			'DELETE FROM products WHERE id = $1 RETURNING *',
			[id]
		)

		if (product.rowCount === 0) {
			return res.status(404).json({ error: 'Bunday product mavjud emas' })
		}

		res.status(200).json({
			message: 'Mahsulot muvaffaqiyatli o‘chirildi',
			data: product.rows[0],
		})
	} catch (error) {
		res
			.status(500)
			.json({ error: 'Server bilan muammo', details: error.message })
	}
}

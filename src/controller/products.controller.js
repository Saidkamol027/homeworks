const { pool } = require('../config/db.config')

exports.getAllProducts = async (req, res) => {
	try {
		const {
			limit = 10,
			page = 1,
			sortField = 'id',
			sortOrder = 'ASC',
			min_price,
			max_price,
		} = req.query

		const limitNum = Number(limit)
		const pageNum = Number(page)

		if (isNaN(limitNum) || isNaN(pageNum) || limitNum <= 0 || pageNum <= 0) {
			return res
				.status(400)
				.json({ message: `Limit yoki Page noto‘g‘ri formatda!` })
		}

		const offset = (pageNum - 1) * limitNum

		const possibleFields = [
			'id',
			'name',
			'description',
			'price',
			'rating',
			'count',
			'color',
		]
		const possibleOrders = ['ASC', 'DESC']

		if (
			!possibleFields.includes(sortField) ||
			!possibleOrders.includes(sortOrder)
		) {
			return res.status(400).json({
				message: `Sort field ${sortField} yoki sort order ${sortOrder} noto‘g‘ri yuborildi`,
			})
		}

		let filterText = ''
		const params = []
		let paramIndex = 1

		if (min_price !== undefined) {
			if (isNaN(Number(min_price))) {
				return res
					.status(400)
					.json({ message: `Min price ${min_price} noto‘g‘ri!` })
			}
			filterText += ` WHERE price >= $${paramIndex}`
			params.push(min_price)
			paramIndex++
		}

		if (max_price !== undefined) {
			if (isNaN(Number(max_price))) {
				return res
					.status(400)
					.json({ message: `Max price ${max_price} noto‘g‘ri!` })
			}
			filterText += filterText
				? ` AND price <= $${paramIndex}`
				: ` WHERE price <= $${paramIndex}`
			params.push(max_price)
			paramIndex++
		}

		const totalCountQuery = `SELECT COUNT(*) FROM products ${filterText}`
		const totalCountResult = await pool.query(totalCountQuery, params)
		const totalCount = +totalCountResult.rows[0].count

		params.push(limitNum, offset)
		const productsQuery = `SELECT * FROM products ${filterText} ORDER BY ${sortField} ${sortOrder} LIMIT $${paramIndex} OFFSET $${
			paramIndex + 1
		}`
		const productsResult = await pool.query(productsQuery, params)

		res.send({
			message: 'Success ✅',
			limit: limitNum,
			page: pageNum,
			count: totalCount,
			data: productsResult.rows,
		})
	} catch (error) {
		res.status(500).json({ message: 'Serverda xatolik!', error: error.message })
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
